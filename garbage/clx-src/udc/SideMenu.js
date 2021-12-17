/************************************************
 * SideMenu.js
 * Created at 2018. 12. 14. 오후 12:34:06.
 *
 * @author jeeeyul
 ************************************************/

var settings = {
	menuItemHeight: 20
}

/** @type HTMLDivElement */
var rootNode;

/** @type String */
var selectedAppId;

var rendered = false;
/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onMenuShellLoad( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var menuShell = e.control;

	rootNode = e.content;
	if(!rootNode){
		return;
	}

	var ds = app.lookup("menuData");
	var rootGroupRows = ds.findAllRow("parent == null || parent == ''");

	rootGroupRows.forEach(function( /* cpr.data.Row */ each) {
		var group = createRootGroup(each);
		rootNode.appendChild(group);
	});
	
	// 첫번째 그룹을 자동 펼침
	var firstGroup = rootNode.querySelector(".menu-group .content-pane .menu-group");
	if(firstGroup){
		removeClass(firstGroup, "collapsed");
	}
	
	rendered = true;
}

/**
 * @param {cpr.data.Row }row
 */
function hasChildren(row) {
	var dataSet = app.lookup("menuData");
	var filter = _.template("parent == '<%=data%>'")({
		data: row.getValue("id")
	});
	return dataSet.findFirstRow(filter) != null;
}

/**
 * @param {cpr.data.Row }row
 */
function getChildren(row) {
	var dataSet = app.lookup("menuData");
	var filter = _.template("parent == '<%=data%>'")({
		data: row.getValue("id")
	});
	return dataSet.findAllRow(filter);
}

/**
 * 
 * @param {cpr.data.Row} data
 */
function createRootGroup(data) {
	var group = document.createElement("div");
	group.className = "menu-group";

	group.appendChild(createMenuItemNode(data));

	var contentPane = document.createElement("div");
	contentPane.className = "content-pane";
	group.appendChild(contentPane);

	var children = getChildren(data);
	children.forEach(function( /* cpr.data.Row */ each) {
		var subGroups = createSubGroup(each);
		contentPane.appendChild(subGroups);
	});

	return group;
}

/**
 * 
 * @param {cpr.data.Row} row
 */
function createMenuItemNode(row) {
	var menuItem = document.createElement("div");
	menuItem.className = "menu-item";
	var depth = getDepth(row);

	if (depth >= 2) {
		menuItem.style.paddingLeft = (depth * 20) + "px";
	}

	var icon = document.createElement("div");
	icon.className = "icon";
	/** @type String */
	var iconURL = row.getValue("icon");
	if (iconURL && iconURL.trim().length > 0) {
		icon.style.backgroundImage = "url(" + iconURL + ")";
	}

	menuItem.appendChild(icon);

	var title = document.createElement("div");
	title.className = "title";
	title.textContent = row.getValue("title");
	menuItem.appendChild(title);

	/** @type String */
	var parent = row.getValue("parent");
	var hasParent = parent && parent.trim().length > 0;
	if (hasParent && hasChildren(row)) {
		var expandArea = document.createElement("div");
		expandArea.className = "expand-area";
		menuItem.appendChild(expandArea);

		var expandButton = document.createElement("div");
		expandButton.className = "expand-button";
		expandArea.appendChild(expandButton);
	}

	/** @type String */
	var appId = row.getValue("app");
	if (appId && appId.trim().length > 0) {
		menuItem.setAttribute("data-app", appId);
		menuItem.addEventListener("click", function() {
			select(appId);
		});
	}

	return menuItem;
}

/**
 * @param {HTMLElement} dom
 * @param {String} className
 */
function addClass(dom, className) {
	var names = dom.className.split(/\s+/g);
	var index = names.indexOf(className);
	if (index === -1) {
		names.push(className);
		dom.className = names.join(" ");
	}
}

/**
 * @param {HTMLElement} dom
 * @param {String} className
 */
function removeClass(dom, className) {
	var names = dom.className.split(/\s+/g);
	var index = names.indexOf(className);
	if (index !== -1) {
		names.splice(index, 1);
		dom.className = names.join(" ");
	}
}

/**
 * 
 * @param {HTMLDivElement} group
 */
function toggleGroup(group) {
	/** @type HTMLDivElement */
	var contentPane = group.querySelector(".content-pane");

	var classNames = group.className.split(/\s+/g);

	var collapseIndex = classNames.indexOf("collapsed");
	if (collapseIndex === -1) {
		closeGroup(group);

	} else {
		openGroup(group);
	}
}

/**
 * 
 * @param {HTMLDivElement} group
 */
function closeGroup(group) {
	var classNames = group.className.split(/\s+/g);
	var collapseIndex = classNames.indexOf("collapsed");
	if (collapseIndex === -1) {
		classNames.push("collapsed");
		group.className = classNames.join(" ");
	}
	
	app.getContainer().redraw();
}

/**
 * 
 * @param {HTMLDivElement} group
 */
function openGroup(group) {
	/** @type HTMLDivElement */
	var parentContentPane = group.parentNode;
	var nodeList = parentContentPane.querySelectorAll(".menu-group");
	for (var idx = 0; idx < nodeList.length; idx++) {
		/** @type HTMLDivElement */
		var each = nodeList.item(idx);
		if (each != group) {
			closeGroup(each);
		}
	}

	var classNames = group.className.split(/\s+/g);
	var collapseIndex = classNames.indexOf("collapsed");
	if (collapseIndex !== -1) {
		classNames.splice(collapseIndex, 1);
		group.className = classNames.join(" ");
	}
	
	app.getContainer().redraw();
}

/**
 * 
 * @param {cpr.data.Row} data
 */
function createSubGroup(data) {
	/**
	 * 
	 * @param {cpr.data.Row} data
	 */

	var group = document.createElement("div");
	group.className = "menu-group collapsed";
	var menuItem = createMenuItemNode(data);
	menuItem.addEventListener("click", function() {
		toggleGroup(group);
	});
	group.appendChild(menuItem);

	var contentPane = document.createElement("div");
	contentPane.className = "content-pane";
	group.appendChild(contentPane);

	getChildren(data).forEach(function( /* cpr.data.Row */ each) {
		if (hasChildren(each)) {
			contentPane.appendChild(createSubGroup(each));
		} else {
			contentPane.appendChild(createLeafItem(each));
		}
	});

	return group;
}

/**
 * 
 * @param {cpr.data.Row} row
 */
function createLeafItem(row) {
	var group = document.createElement("div");
	group.className = "leaf";
	group.appendChild(createMenuItemNode(row));
	return group;
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onMenuShellInit( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var menuShell = e.control;
	if (rendered) {
		e.preventDefault();
	}
}

/*
 * Body에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBodyClick( /* cpr.events.CMouseEvent */ e) {
	var event = new cpr.events.CUIEvent("click");
	app.dispatchEvent(event);
}

/*
 * @param {String} appId
 */
function select(appId) {
	if (selectedAppId == appId) {
		return;
	}
	selectedAppId = appId;
	var nodeList = rootNode.querySelectorAll(".menu-item");
	for (var idx = 0; idx < nodeList.length; idx++) {
		/** @type HTMLElement */
		var each = nodeList.item(idx);

		if (each.getAttribute("data-app") == appId) {
			addClass(each, "selected");
		} else {
			removeClass(each, "selected");
		}
	}

	var event = new cpr.events.CUIEvent("app-select");
	event.userData = appId;
	app.dispatchEvent(event);
}

/**
 * 
 * @param {cpr.data.Row} row
 */
function hasParent(row) {
	/** @type String */
	var parent = row.getValue("parent");

	if (parent && parent.trim().length > 0) {
		return findRow(parent) != null;
	} else {
		return false;
	}
}

/**
 * 
 * @param {cpr.data.Row} row
 */
function getParent(row) {
	/** @type String */
	var parent = row.getValue("parent");

	if (parent && parent.trim().length > 0) {
		return findRow(parent)
	} else {
		return null;
	}
}

/**
 * 
 * @param {cpr.data.Row} row
 */
function getDepth(row) {
	var finger = row;
	var result = 0;
	while (hasParent(finger)) {
		finger = getParent(finger);
		result++;
	}
	return result;
}

/**
 * 
 * @param {String} id
 */
function findRow(id) {
	return app.lookup("menuData").findFirstRow("id == '" + id + "'");
}

/**
 * 현재 미니 모드로 작동하고 있는지 여부를 표시합니다.
 */
exports.isMiniMode = function() {
	return app.lookup("menuShell").style.hasClass("mini");
};

/**
 * 미니 모드에 진입합니다.
 */
exports.enterMiniMode = function() {
	app.lookup("menuShell").style.addClass("mini");
	console.log("enter");
};

/**
 * 미니 모드를 중단합니다.
 */
exports.exitMiniMode = function() {
	app.lookup("menuShell").style.removeClass("mini");
	console.log("exit");
};

/*
 * Body에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onBodyMouseenter(/* cpr.events.CMouseEvent */ e){
	var enterEvent  = new cpr.events.CUIEvent("enter");
	app.dispatchEvent(enterEvent);
}


/*
 * Body에서 mouseleave 이벤트 발생 시 호출.
 * 사용자가 컨트롤 및 컨트롤의 자식 영역 바깥으로 마우스 포인터를 이동할 때 발생하는 이벤트.
 */
function onBodyMouseleave(/* cpr.events.CMouseEvent */ e){
	var leaveEvent  = new cpr.events.CUIEvent("leave");
	app.dispatchEvent(leaveEvent);
}

exports.select = select;

exports.getMenuData = function(){
	return app.lookup("menuData");
}