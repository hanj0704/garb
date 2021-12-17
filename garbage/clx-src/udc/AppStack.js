/************************************************
 * AppStack.js
 * Created at 2018. 10. 24. 오전 11:13:46.
 *
 * @author jeeeyul
 ************************************************/
var lastKnownStateId = 0;

/** 브라우저의 히스토리와 동기화 중인지 여부. */
var historySynchronized = false;

/**
 * 각 앱의 정보를 담은 스택 엘리먼트 객체.
 * 
 * @param {cpr.controls.EmbeddedApp} embeddedApp 임베디드 앱.
 * @param {(cpr.core.AppInstance)=>void} init (Optional) 초기화 함수.
 * @param {Boolean} keepContent (Optional) 다른 앱이 푸시될 때, 상태를 유지할 지 여부. 기본값 false
 * 
 * @constructor
 */
function StackInfo(embeddedApp, init) {
	this.init = init;
	this.embeddedApp = embeddedApp;
	this.state = {
		"appId": embeddedApp.app.id,
		"id": lastKnownStateId++
	};
}

/**
 * 현재 앱 스택.
 * @type StackInfo[]
 */
var stack = [];

/**
 * 앞으로 가기 앱 스택.
 * @type StackInfo[]
 */
var redoStack = []

/**
 * 현재 화면에 표시중인 앱 정보를 얻습니다.
 */
function getActiveStackInfo() {
	if (stack.length > 0) {
		return stack[stack.length - 1];
	} else {
		return null;
	}
}

/**
 * 현재 화면 바로 이전에 표시중이던 앱 정보를 얻습니다.
 */
function getPreviousAppInfo() {
	if (stack.length > 1) {
		return stack[stack.length - 2];
	} else {
		return null;
	}
}

/**
 * 앱 스택에 새로운 앱을 추가합니다.
 * 
 * @param {String} appId 새로 시작할 앱의 URI
 * @param {(cpr.core.AppInstance)=>void} init (Optional) 앱이 시작된 뒤 초기화를 수행할 프로시져.
 * @param {boolean} createState
 * @param {Boolean} keepContent (Optional) 다른 앱이 푸시될 때, 상태를 유지할 지 여부. 기본값 false
 */
function push(appId, init, createState, keepContent) {
	if (keepContent == null) {
		keepContent = false;
	}
	cpr.core.App.load(appId, function(loadedApp) {
		var current = getActiveStackInfo();
		if (current) {
			if (keepContent === false) {
				current.embeddedApp.app = null;
			}

			current.embeddedApp.visible = false;
		}

		var ea = new cpr.controls.EmbeddedApp(null, loadedApp);
		var newInfo = new StackInfo(ea, init);
		stack.push(newInfo);

		if (init) {
			ea.ready(function(ea) {
				init(ea.getEmbeddedAppInstance());
			});
		}

		app.getContainer().addChild(ea, {
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px"
		});

		if (createState) {
			redoStack = [];
			if (stack.length === 1) {
				history.replaceState(newInfo.state, loadedApp.title);
			} else {
				history.pushState(newInfo.state, loadedApp.title);
			}
		}

		document.title = loadedApp.title || loadedApp.id;
	});
}

/**
 * 
 * @param {StackInfo} info
 */
function pushWithExistingStackInfo(info) {
	var appId = info.state.appId;
	cpr.core.App.load(appId, function(loadedApp) {
		document.title = loadedApp.title || loadedApp.id;
		getActiveStackInfo().embeddedApp.visible = false;

		stack.push(info);

		info.embeddedApp = new cpr.controls.EmbeddedApp(null, loadedApp);
		if (info.init) {
			info.embeddedApp.ready(function(ea) {
				info.init(ea);
			});
		}

		app.getContainer().addChild(info.embeddedApp, {
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px"
		});

		info.embeddedApp.visible = true;
	});
}

/**
 * 이전 앱으로 돌아갑니다.
 * 현재 앱은 파기됩니다.
 */
function pop() {
	if (stack.length === 0) {
		return;
	}

	if (historySynchronized) {
		history.back();
	} else {
		doPop();
	}
}

function doPop() {
	if (stack.length === 0) {
		return;
	}

	var appToReveal = getPreviousAppInfo();
	if (appToReveal) {
		if (appToReveal.embeddedApp.app === null) {
			cpr.core.App.load(appToReveal.state.appId, function(loadedApp) {
				appToReveal.embeddedApp.app = loadedApp;
				document.title = loadedApp.title || loadedApp.id;
			});
		} else {
			document.title = appToReveal.embeddedApp.app.title || appToReveal.embeddedApp.app.id;
		}
		appToReveal.embeddedApp.visible = true;

	}

	var appToDispose = stack.pop();
	appToDispose.embeddedApp.dispose();
	redoStack.push(appToDispose);

	return appToDispose;
}

/**
 * 브라우저의 popstate 이벤트를 처리하는 핸들러.
 * @param {PopStateEvent} e
 */
function handlePoppedState(e) {
	var state = e.state;

	// 이전 기록에서 일치하는 항목 검색.
	var prevAppInfo = stack.filter(function( /* StackInfo */ each) {
		return each.state.id == state.id;
	})[0];

	// 이후 기록에서 일치하는 항목 검색.
	var nextAppInfo = redoStack.filter(function( /* StackInfo */ each) {
		return each.state.id == state.id;
	})[0];

	// 이전 항목 일치 처리.
	if (prevAppInfo) {
		while (getActiveStackInfo() != prevAppInfo) {
			doPop();
		}
	}

	// 이후 항목 일치 처리.
	else if (nextAppInfo) {
		/** @type AppInfo */
		var current;
		do {
			current = redoStack.pop()
			pushWithExistingStackInfo(current);
		} while (current !== nextAppInfo)
	}
}

/**
 * 앱 스택에 새로운 앱을 추가합니다. 현재 표시중이던 앱은 숨겨 집니다.
 * 
 * @param {String} appId 새로 시작할 앱의 URI
 * @param {(cpr.core.AppInstance)=>void} init (Optional) 앱이 시작된 뒤 초기화를 수행할 프로시져.
 * @param {Boolean} keepContent (Optional) 현재 앱의 컨텐츠를 유지한 상태로 푸시할 것인지 여부. 기본값: false.
 */
exports.push = function(appId, init, keepContent) {
	if (keepContent == null) {
		keepContent = false;
	}
	push(appId, init, historySynchronized, keepContent);
};

exports.pop = pop;

/**
 * 브라우저 히스토리 감시를 시작 합니다.
 */
function beginWatchHistory() {
	if (historySynchronized) {
		return
	}
	window.addEventListener("popstate", handlePoppedState);
	historySynchronized = true;
};

/**
 * 브라우저 히스토리 감시를 중단합니다.
 */
function stopWatchHistory() {
	if (!historySynchronized) {
		return;
	}
	window.removeEventListener("popstate", handlePoppedState);
	historySynchronized = false;
};

/**
 * 첫 번째 앱으로 돌아갑니다.
 * 팝 된 앱 인스턴스들은 모두 파기되고, UI 상태가  유실 됩니다.
 */
exports.returnToTopApp = function() {
	if (stack.length <= 1) {
		return;
	}

	if (historySynchronized) {
		history.go(-(stack.length - 1));
	} else {
		while (stack.length > 1) {
			doPop();
		}
	}
};

exports.peek = function() {
	if (stack.length > 0) {
		var appInfo = stack[stack.length - 1];
		return appInfo.embeddedApp;
	} else {
		return null;
	}
}

/**
 * 이전 앱으로 돌아갑니다.
 * 현재 앱은 파기 됩니다.
 */
exports.back = function() {
	if (stack.length > 1) {
		pop();
	}
}

/**
 * 앞으로 이동합니다. 이동할 기록이 없으면 아무일도 생기지 않습니다.
 */
exports.forward = function() {
	if (redoStack.length > 0) {
		if (historySynchronized) {
			history.go(1);
		} else {
			var next = redoStack.pop();
			pushWithExistingStackInfo(next);
		}
	}
};

/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange( /* cpr.events.CPropertyChangeEvent */ e) {
	switch (e.property) {
		case "synchronizeWithHistory":
			{
				if (e.newValue) {
					beginWatchHistory();
				} else {
					stopWatchHistory();
				}
				break;
			}
	}
}

/*
 * Body에서 unload 이벤트 발생 시 호출.
 * 앱이 언로드된 후 발생하는 이벤트입니다.
 */
function onBodyUnload( /* cpr.events.CEvent */ e) {
	stopWatchHistory();
}

beginWatchHistory();
