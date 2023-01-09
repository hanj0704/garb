/************************************************
 * testSwipe.module.js
 * Created at 2023. 1. 2. 오후 4:52:19.
 *
 * @author HANS
 ************************************************/

/**
 *
 * @param {Event} e
 */
function eventStopper(e) {
	e.stopPropagation();
	e.preventDefault();
}

/**
 *
 * @param {cpr.controls.Container} container
 */
function SlideView(container) {
	this._container = container;
	/** @type cpr.controls.layouts.FlowLayout */
	this._layout = container.getLayout();
};

SlideView.prototype.originSpacing = 0 ;
/**
 * 한 페이지에서 표시할 콘텐츠 수
 */
SlideView.prototype.showCount = 2;

/**
 * 페이지 내 한 컨텐츠의 너비. 0인 경우 비율로 균등 분배합니다.
 */
SlideView.prototype.itemSize = 0;

/**
 * 자동 재생시 애니메이션의 길이. 단위 초.
 */
SlideView.prototype.autoPlayDuration = 1.0;

/**
 * 자동 재생시, 각 재생간의 간격. 단위 초. 0 이상의 값을 주면 start()시 자동 재생이 시작됩니다. 0을 주는 경우, 자동으로 재생을 시작하지 않습니다.
 */
SlideView.prototype.autoPlayDelay = 0;

/**
 * 터치 또는 마우스로 드래그중 놓았을 때, 스내핑 애니메이션의 길이. 단위 초.
 */
SlideView.prototype.snapDuration = 0.3;

/**
 * 페이지니션을 표시할 것인지 여부.
 */
SlideView.prototype.showPaginition = true;

/**
 * 좌우 버튼의 너비
 */
SlideView.prototype.navigationButtonWidth = 30;

/**
 * 좌우버튼에 추가적으로 줄 클래스 명.
 * @type String
 */
SlideView.prototype.navigationButtonClassName = null;

/**
 * 무한 스크롤 사용 여부.
 */
SlideView.prototype.useInfiniteScroll = false;


SlideView.prototype.infiniteTarget = null;

SlideView.prototype.finder = null;
SlideView.prototype.nowTimer = null;
SlideView.prototype.accel = null;
/** @type cpr.animation.Animator */
SlideView.prototype.inertiaAnimator = null;
/**
 * 네비게이션 버튼 표시 스타일
 * <li>hover: 컨테이너 가장자리에 호버 시킴</li>
 * <li>outside: 컨테이나 가장자리 바깥쪽에 표시</li>
 * <li>content-hover: 가운데 정렬된 콘텐츠의 가장자리에 호버 시킴</li>
 * <li>content-outside: 가운데 정렬된 콘텐츠의 가장자리에 바깥쪽에 표시</li></li>
 * <li>none: 버튼 표시 안함</li>
 */
SlideView.prototype.navigationButtonStyle = "inside";

/**
 * 페이지네이션 표시 스타일
 * <li>inner-right: 컨테이너 우측 하단에 표시</li>
 * <li>inner-line: 컨테이너 중앙 하단에 라인표시</li>
 * <li>inner-remote : start/pause 버튼이 있는 중앙 하단 페이지네이션</li>
 * <li>normal : 컨테이너 하단 가장자리 바깥쪽 표시</li>
 */
SlideView.prototype.paginationStyle = "normal";
/**
 * 시작 페이지 번호 0부터 시작.
 */
SlideView.prototype.initialPage = 0;

/**
 * <li>left: 시작 컨트롤이 왼쪽 끝에서 시작</li>
 * <li>center: 시작 컨트롤이 가운데에서 시작</li>
 * <li>right: 시작 컨트롤이 오른쪽 끝에서 시작</li>
 */
SlideView.prototype.startAlign = "left";

/**
 * @type Slidepagination
 */
SlideView.prototype._pagination = null;
/**
 * @type cpr.controls.UIControl[]
 */
SlideView.prototype._originalChildren = [];
SlideView.prototype._knownScreenX = -1;
SlideView.prototype._knownScreenY = -1;
SlideView.prototype._moveClientY = -1;
SlideView.prototype.scrollMode = null;
SlideView.prototype._initialScrollLeft = -1;
/** @type cpr.controls.Container */
SlideView.prototype._innerContainer = null;
/** @type cpr.controls.layouts.FlowLayout */
SlideView.prototype._innerLayout = null;

/** @type cpr.geometry.Rectangle */
SlideView.prototype._knownBounds = null;

/** @type cpr.controls.Button */
SlideView.prototype._prevButton = null;

/** @type cpr.controls.Button */
SlideView.prototype._nextButton = null;

/** @type cpr.animation.Animator */
SlideView.prototype._activeAnimator = null;
SlideView.prototype._autoPlayTimerID = -1;
SlideView.prototype._lastChild = null;
SlideView.prototype._transform = function() {
//	var height = this._container.getViewPortRect().height;
	this._container.style.addClass("cl-unselectable");
	this._layout.horizontalAlign = "center";
	this._layout.scrollable = false;
	this._originalChildren = this._container.getChildren();
	this._lastChild = this._originalChildren[this._originalChildren.length -1];
	this._innerContainer = new cpr.controls.Container();
	var layout = new cpr.controls.layouts.FlowLayout();
	layout.lineWrap = false;
	layout.scrollable = false;
	if(this._layout.horizontalSpacing != 0) {
		this.originSpacing = this._layout.horizontalSpacing;
	}
	layout.spacing = this.originSpacing;
	this._innerContainer.setLayout(layout);
	this._innerLayout = layout;
	this._layout.horizontalSpacing = 0;
	this._layout.scrollable = false;
//	var vbIsMobile = /iPad|Macintosh/i.test(navigator.userAgent);
//	if(vbIsMobile) {
//		this._container.getAppInstance().getContainer().overscrollBehavior = "none";
//	}
	var itemConstraint = {
		height: "100%"
	};

	var itemSizeExpression = this.itemSize + "px";

	if (this.itemSize <= 0) {

		itemSizeExpression = "(100% - " + (this.showCount) * (layout.horizontalSpacing) + "px) / " + this.showCount;
		itemConstraint.width = "calc(" + itemSizeExpression + ")";
	} else {
		itemConstraint.width = this.itemSize + "px";
	}

	if (this.useInfiniteScroll === false) {
		switch (this.startAlign) {
			case "center":
				{
					var padder = new cpr.controls.Output();
					padder.style.addClass("placeholder");
					this._innerContainer.addChild(padder, {
						width: cpr.utils.Util.template("calc((100% - ${spacing} - ${eachWidth}) / 2 - ${spacing})", {
							eachWidth: "(" + itemSizeExpression + ")",
							spacing: layout.spacing + "px"
						}),
						height: "100%"
					});
					break;
				}

			case "right":
				{
					var padder = new cpr.controls.Output();
					padder.style.addClass("placeholder");
					this._innerContainer.addChild(padder, {
						width: cpr.utils.Util.template("calc(100% - 2 * ${spacing} - ${eachWidth})", {
							eachWidth: "(" + itemSizeExpression + ")",
							spacing: layout.spacing + "px"
						}),
						height: "100%"
					});
					break;
				}
			case "left" :
			{
				break;
			}
			default :
			break;
		}
	}

	this._container.getChildren().forEach((function( /* cpr.controls.UIControl */ each, idx) {
		each.userAttr("-snap-point", "true");
		this._innerContainer.addChild(each, itemConstraint);
	}).bind(this));
	this._container.addChild(this._innerContainer, {
		width: this.itemSize > 0 ? this.showCount * this.itemSize + (this.showCount - 1) * layout.spacing + "px" : "100%",
		height: "100%"
	});

	this._pagination = new Slidepagination(this);

	if(this.paginationStyle == "inner-line") {

		this._container.getParent().floatControl(this._pagination.control);
	 } else {

		this._container.getParent().floatControl(this._pagination.control);
	 }

 	if(!this.finder) {
		this.finder = this._findScroller(this._container);
	}

}

/**
 * 슬라이드뷰를 시작합니다.
 * 시작하기전 모든 설정이 마쳐져야 합니다.
 */
SlideView.prototype.start = function() {
	if (this._container.getActualRect().width === 0) {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(this.start.bind(this));
		return;
	}

	this._transform();

	this._onMouseDown = this._onMouseDown.bind(this);
	this._onMouseUp = this._onMouseUp.bind(this);
	this._onMouseMove = this._onMouseMove.bind(this);

	this._onTouchEnd = this._onTouchEnd.bind(this);
	this._onTouchStart = this._onTouchStart.bind(this);
	this._onTouchMove = this._onTouchMove.bind(this);

	this._doUpdateButtons = _.debounce(this._doUpdateButtons.bind(this), 500);
	this._updateActivePageButton = _.debounce(this._updateActivePageButton.bind(this), 50);

	this._onResize = this._onResize.bind(this);

	this._innerContainer.addEventListener("scroll", this._updateActivePageButton);
	this._container.addEventListener("mousedown", this._onMouseDown);
	this._container.addEventListener("touchstart", this._onTouchStart);
	this._container.addEventListenerOnce("dispose", this._handleDispose.bind(this));
	cpr.core.NotificationCenter.INSTANCE.subscribe("main-size-changed", this, this._updateButtons);
	cpr.core.NotificationCenter.INSTANCE.subscribe("swipe-transition-occured", this, this._onResize);
	cpr.core.NotificationCenter.INSTANCE.subscribe(cpr.core.SystemTopics.RESIZE, this, this._onResize);
//	cpr.core.NotificationCenter.INSTANCE.subscribe(TAB_FOLDER_CHANGED, this, this._onResize);

	this._updateActivePageButton();

	if (this.autoPlayDelay > 0) {
		this.autoPlay();
	}

	if (this.initialPage > 0) {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec((function() {
			if (this._container.disposed) {
				return;
			}
			this.setActivePage(this.initialPage);
		}).bind(this));
	}

	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec((function() {
		if (this._container.disposed) {
			return;
		}
		this._doUpdateButtonsImmediatly();
	}).bind(this));
};

/**
 * 자동 재생을 시작합니다. autoPlayDelay가 지정된 경우, 슬라이드 시작시 자동으로 재생이 시작됩니다.
 */
SlideView.prototype.autoPlay = function() {
	if (this._autoPlayTimerID >= 0) {
		return;
	}
	this._autoPlayTimerID = setInterval(this.showNext.bind(this), (this.autoPlayDelay + this.autoPlayDuration) * 1000);
};

/**
 * 자동 재생중인 경우, 자동 재생을 중단합니다.
 */
SlideView.prototype.stopAutoPlay = function() {
	if (this._autoPlayTimerID >= 0) {
		clearInterval(this._autoPlayTimerID);
		this._autoPlayTimerID = -1;
	}
};

SlideView.prototype._handleDispose = function() {
	this.stopAutoPlay();
	this._container.removeEventListener("mousedown", this._onMouseDown);
	this._container.removeEventListener("touchstart", this._onTouchStart);
	cpr.core.NotificationCenter.INSTANCE.unsubcribeAllTopic(this);
};

/**
 * 터치 시작 처리 핸들러
 * @param {cpr.events.CTouchEvent} e
 */
SlideView.prototype._onTouchStart = function(e) {
	if (this._activeAnimator) {
		return;
	}

	var touch = e.targetTouches.item(0);
	this._knownScreenX = touch.clientX;
	this._knownScreenY = touch.clientY;
	this._moveClientY = touch.clientY;
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x;

	window.addEventListener("touchmove", this._onTouchMove,{
		capture : false
	});
	window.addEventListener("touchend", this._onTouchEnd);

	e.stopPropagation();
//	e.preventDefault();
	this.stopAutoPlay();
};

/**
 * 터치 이동 핸들러
 * @param {cpr.events.CTouchEvent} e
 */
SlideView.prototype._onTouchMove = function(e) {
	var touch = e.targetTouches.item(0);
	var stX = Math.abs(this._knownScreenX - touch.clientX);
	var stY = Math.abs(this._knownScreenY -  touch.clientY);
	var vbIsMobile = /iPad|Macintosh/i.test(navigator.userAgent);
	if(vbIsMobile) {
		this._container.getAppInstance().getContainer().overscrollBehavior = "none";
	}
	if(this.scrollMode == null) {
		if(stX > stY && stX-stY > 5) {
//		if(stX > stY) {
			this.scrollMode = "vertical";
		}
		 else if(stX <= stY && stY-stX > 5 && this.finder) {
//		else {
			this.scrollMode = "horizon";
		}
	} else {
		if(this.scrollMode == "vertical") {
			document.body.style.overflowY = "hidden";
			this._handleMove(touch.clientX);
//			e.stopPropagation();
		}
		else if(this.scrollMode == "horizon" && this.finder) {
			this._horizonMove(touch.clientY);
		}
	}
			e.stopPropagation();
//	this._handleMove(touch.clientX);
//	e.preventDefault();
};
SlideView.prototype._horizonMove = function(clientY){

//	var container = this._innerContainer;

	// 터치/마우스의 이동량을 구함.
	var delta = this._moveClientY - clientY;
	this._moveClientY = clientY;
	var now = moment();
	if(this.nowTimer != null) {
		var vnDiff = moment.duration(now.diff(this.nowTimer)).asMilliseconds();
//		console.log(dif);
		this.accel = delta/vnDiff;
	}
	// 새로운 뷰포트의 위치
//	var newScrollLeft = this._initialScrollLeft + delta;

//	cpr.core.DeferredUpdateManager.INSTANCE.update();
	this.nowTimer =now;
	this.finder.adjustScroll(0,delta,0);
}
SlideView.prototype._inertiaMove = function(){
	if(Math.abs(this.accel) < 1) {
		return;
	} else {

	var vbIsMinus = this.accel < 0? true : false;
	var vnAbsAccel = Math.abs(this.accel);
	vnAbsAccel = vnAbsAccel > 3 ? 3 : vnAbsAccel;
	var vnMoveAmount = 0;
	var sangsu = 8.24;
	var vnFriction = Math.floor(vnAbsAccel/sangsu*100)/100;
	while(vnAbsAccel > 0.7) {
		vnAbsAccel  = vnAbsAccel * vnFriction;
		vnMoveAmount +=vnAbsAccel;
	}
		vnMoveAmount = Math.floor(vnMoveAmount * 1000);
	vnMoveAmount = vbIsMinus ? -vnMoveAmount : vnMoveAmount ;
	var that = this;
		that.finder.adjustScroll(0, vnMoveAmount,0.5,cpr.animation.TimingFunction.EASE_OUT_CUBIC);
	}
}
SlideView.prototype._findScroller = function(ctrl){
	/** @type cpr.controls.Container */
	var control = ctrl;
	var vnViewport = control.getViewPortRect().height;
	var vnContent = control.getContentPaneRect().height;
	var result = null;
	if(vnContent > vnViewport+10) {
		result = control;
	} else {
		if(control.getParent()) {
			result =  this._findScroller(control.getParent());
		} else {
			result = null;
		}
	}

	return result;
}
/**
 * 터치 종료 핸들러
 * @param {cpr.events.CTouchEvent} e
 */
SlideView.prototype._onTouchEnd = function(e) {
	document.body.style.overflowY = null;
	if(this.scrollMode == "horizon" && this.finder) {
		this._inertiaMove();
	}
	this.scrollMode = null;
	window.removeEventListener("touchmove", this._onTouchMove);
	window.removeEventListener("touchend", this._onTouchEnd);
	this._knownScreenX = -1;
	this._knownScreenY = -1;
	this._snapToClosestContent();
	var vbIsMobile = /iPad|Macintosh/i.test(navigator.userAgent);
	if(vbIsMobile) {
		this._container.getAppInstance().getContainer().overscrollBehavior = "auto";
	}
};

/**
 * 마우스 다운 핸들러
 * @param {cpr.events.CMouseEvent} e
 */
SlideView.prototype._onMouseDown = function(e) {
	if (e.button !== 0) {
		return;
	}
	if (this._activeAnimator) {
		return;
	}

	// 마우스가 다운 된 위치를 기억 해 둠.
//	this._knownScreenX = e.screenX;
	this._knownScreenX = e.clientX;

	// 현재 뷰포트의 위치를 기억해 둠.
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x;

	window.addEventListener("mouseup", this._onMouseUp);
	window.addEventListener("mousemove", this._onMouseMove);

	// 혹시라도 마우스 업이 내비게이션 버튼에서 일어나, 드래깅 상태가 지속되는 문제를 미연에 방지.
	if (this._prevButton && this._nextButton) {
		this._prevButton.removeEventListener("mouseup", eventStopper);
		this._nextButton.removeEventListener("mouseup", eventStopper);
	}

	this.stopAutoPlay();
	e.stopPropagation();
};

/**
 * 마우스/터치의 이동 처리.
 * @param {Number} screenX
 */
SlideView.prototype._handleMove = function(screenX) {
	var container = this._innerContainer;
//	var layout = this._innerLayout;

	// 스크롤 불능일 경우 중단.
	if (container.getViewPortRect().width >= container.getContentPaneRect().width) {
		return;
	}

	if (this._knownScreenX < 0) {
		return;
	}

	// 터치/마우스의 이동량을 구함.
	var delta = this._knownScreenX - screenX;

	// 새로운 뷰포트의 위치
	var newScrollLeft = this._initialScrollLeft + delta;

	// 왼쪽 경계선 너머로 스크롤.
	if (newScrollLeft < 0) {
		if (this.useInfiniteScroll === false) {
			container.scrollTo(0, 0);
			return;
		}
		var children = container.getChildren();

		// 오른쪽 끝 자식을 떼어 내어 왼쪽으로 이동시키고, 스크롤 상황을 업데이트 함.

		var lastChild = children[children.length - 1];
		container.reorderChild(lastChild, 0);
		var fix = this._innerLayout.spacing + lastChild.getOffsetRect().width;
		this._initialScrollLeft += fix;
		container.scrollTo(fix, 0);
		cpr.core.DeferredUpdateManager.INSTANCE.update();
		return;
	}

	// 오른쪽 경계선 너머로 스크롤.
	else if (newScrollLeft + container.getViewPortRect().width > container.getContentPaneRect().width) {
		if (this.useInfiniteScroll === false) {
			container.scrollTo(container.getContentPaneRect().width - container.getViewPortRect().width, 0);
			return;
		}
		var children = container.getChildren();

		// 첫번째 자식을 떼어내어 오른쪽 끝으로 이동시키고 스크롤 상황을 업데이트 함.
		var firstChild = children[0];

		var fix = firstChild.getOffsetRect().width + this._innerLayout.spacing;
		this._initialScrollLeft -= fix;
		container.reorderChild(firstChild, children.length);
		container.adjustScroll(-fix, 0);
		cpr.core.DeferredUpdateManager.INSTANCE.update();
		return;
	}
	container.scrollTo(newScrollLeft, 0);
}

/**
 *
 * @param {MouseEvent} e
 */
SlideView.prototype._onMouseMove = function(e) {
	this._handleMove(e.clientX);
	e.preventDefault();
};

/**
 *
 * @param {MouseEvent} e
 */
SlideView.prototype._onMouseUp = function(e) {
	window.removeEventListener("mouseup", this._onMouseUp);
	window.removeEventListener("mousemove", this._onMouseMove);
	this._knownScreenX = -1;
	this._snapToClosestContent();
	if (this._prevButton && this._nextButton) {
		this._prevButton.addEventListener("mouseup", eventStopper);
		this._nextButton.addEventListener("mouseup", eventStopper);
	}
		if(this.autoPlayDelay > 0) {
			this.autoPlay();
		}
};

SlideView.prototype._updateButtons = function() {
	if (this._container.disposed) {
		return;
	}
	if (this._prevButton) {
		this._prevButton.dispose();
		this._prevButton = null;
	}
	if (this._nextButton) {
		this._nextButton.dispose();
		this._nextButton = null;
	}

	this._pagination.control.visible = false;
	this._doUpdateButtons();
}

SlideView.prototype._doUpdateButtonsImmediatly = function() {
	if (this._container.disposed) {
		return;
	}

	this._knownBounds = this._container.getOffsetRect();

	var shouldShowButtons = this._innerContainer.getChildrenCount() > 1 && this._innerContainer.getViewPortRect().width < this._innerContainer.getContentPaneRect().width;
	if (!shouldShowButtons) {
		if (this._prevButton) {
			this._prevButton.dispose();
			this._prevButton = null;
		}
		if (this._nextButton) {
			this._nextButton.dispose();
			this._nextButton = null;
		}
		this._pagination.control.visible = false;
	} else {
		this._pagination.control.visible = this.showPaginition;
		if (this.showPaginition) {
			if(this.paginationStyle == "inner-right") {

				this._pagination.control.style.css({
					top : this._knownBounds.bottom-40 + "px",
					left : this._knownBounds.left + "px",
					width : this._knownBounds.width + "px"
				})
			}
			else if(this.paginationStyle == "inner-line"){
				this._pagination.control.style.css({
					top :  "calc(80%)",
					left : this._knownBounds.left +64+ "px",
					width : this._knownBounds.width - 128 + "px",
					height : "4px"
				})
			}
			else if(this.paginationStyle == "inner-remote"){
				this._pagination.control.style.css({
//					top: "calc(85%)",
					bottom : "68px",
					left: this._knownBounds.left + 64+"px",
					width: this._knownBounds.width  + "px"
				})
			}
			else {

				this._pagination.control.style.css({
					top: this._knownBounds.bottom+12 + "px",
					left: this._knownBounds.left + "px",
					width: this._knownBounds.width + "px"
				});
			}
			this._pagination.control.style.animateFrom({
				"opacity": "0"
			});
		}

		if (this.navigationButtonStyle != "none") {
			this._prevButton = new cpr.controls.Button();
			if(this.navigationButtonStyle == "outside"){

				this._prevButton.style.addClass("slide-button-out");
			} else {

				this._prevButton.style.addClass("slide-button");
			}
				this._prevButton.style.addClass("slide-prev-button");
			if (this.navigationButtonClassName) {
				this._prevButton.style.addClass(this.navigationButtonClassName);
			}
			this._prevButton.addEventListener("click", (function() {
				this.stopAutoPlay();
				this.showPrev();
			}).bind(this));

			this._prevButton.addEventListener("mousedown", eventStopper);
			this._prevButton.addEventListener("mouseup", eventStopper);
			this._prevButton.addEventListener("click", eventStopper);
			this._nextButton = new cpr.controls.Button();
			if(this.navigationButtonStyle == "outside") {

				this._nextButton.style.addClass("slide-button-out");
			} else {

			this._nextButton.style.addClass("slide-button");
			}
				this._nextButton.style.addClass("slide-next-button");
			if (this.navigationButtonClassName) {
				this._nextButton.style.addClass(this.navigationButtonClassName);
			}
			this._nextButton.addEventListener("click", (function() {
				this.stopAutoPlay();
				this.showNext();
			}).bind(this));
			this._nextButton.addEventListener("mousedown", eventStopper);
			this._nextButton.addEventListener("mouseup", eventStopper);
			this._nextButton.addEventListener("click", eventStopper);

			var superContainer = this._container.getParent();
			var leftCosntraint = {
				left: this._knownBounds.left + "px",
				top: this._knownBounds.top + "px",
				height: this._knownBounds.height + "px",
				width: this.navigationButtonWidth + "px"
			};
			var rightConstraint = {
				left: this._knownBounds.right - this.navigationButtonWidth + "px",
				top: this._knownBounds.top + "px",
				height: this._knownBounds.height + "px",
				width: this.navigationButtonWidth + "px"
			};
			switch (this.navigationButtonStyle) {
				case "inside":
					{
						break;
					}
				case "content-hover":
					{
						var offsetRect = this._innerContainer.getOffsetRect();
						leftCosntraint.left = offsetRect.x + "px";
						leftCosntraint.top = offsetRect.y + "px";
						rightConstraint.left = offsetRect.right - this.navigationButtonWidth + "px";
						rightConstraint.top = offsetRect.y + "px";
						superContainer = this._container;
						break;
					}
				case "content-outside":
					{
						var offsetRect = this._innerContainer.getOffsetRect();
						leftCosntraint.left = offsetRect.x - this.navigationButtonWidth + "px";
						leftCosntraint.top = offsetRect.y + "px";
						rightConstraint.left = offsetRect.right + "px";
						rightConstraint.top = offsetRect.y + "px";
						superContainer = this._container;
						break;
					}
				case "outside":
					{
						leftCosntraint.height = "56px";
						leftCosntraint.top = this._knownBounds.top + 60+"px";
						rightConstraint.height = "56px";
						rightConstraint.top = this._knownBounds.top + 60 +"px";

						leftCosntraint.left = this._knownBounds.left - this.navigationButtonWidth-8 + "px";
						rightConstraint.left = this._knownBounds.right +8+ "px";

						break;
					}
				default :
				break;
			}

			superContainer.floatControl(this._prevButton, leftCosntraint);
			superContainer.floatControl(this._nextButton, rightConstraint);
			this._prevButton.visible = false;
			this._nextButton.visible = false;
			cpr.core.DeferredUpdateManager.INSTANCE.asyncExec((function() {
				if (this._container.disposed) {
					return;
				}
				if (this._prevButton) {
					this._prevButton.visible = true;
					this._prevButton.style.animateFrom({
						"opacity": "0"
					});
				}
				if (this._nextButton) {
					this._nextButton.visible = true;
					this._nextButton.style.animateFrom({
						"opacity": "0"
					});
				}
			}).bind(this));

		}
				this._snapToClosestContent();
	}

}

SlideView.prototype._doUpdateButtons = function() {
	if (this._container.disposed) {
		return;
	}
	this._doUpdateButtonsImmediatly();
};

SlideView.prototype._onResize = function() {
	if (this._container.disposed) {
		return;
	}

	// 처음 그리는 경우.
	if (!this._knownBounds) {
		this._updateButtons();
	}

	// 그외의 경우, 컨테이너의 영역이 달라진 경우에만 새로 그림.
	else if (this._knownBounds.equals(this._container.getOffsetRect()) === false) {
		this._updateButtons();
	}
};

SlideView.prototype.showPrev = function() {
		if (this._activeAnimator) {
		return;
	}
	this._snapToClosestContent(0);
	this._knownScreenX = 0;
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x;
	var animator = new cpr.animation.Animator(this.autoPlayDuration, cpr.animation.TimingFunction.EASE_IN_OUT);
	var me = this;
	var fullWidth = this._innerContainer.getViewPortRect().width;
	animator.addTask(function(p) {
		me._handleMove(p * fullWidth);
	});
	this._activeAnimator = animator;
	animator.run().then((function() {
		this._activeAnimator = null;
		var target = this._findMostCloseControl(this._innerContainer.getViewPortRect().left);
		this.infiniteTarget =target;
	}).bind(this));
};

SlideView.prototype.showNext = function() {
	if (this._activeAnimator) {
		return;
	}
	if(this._originalChildren.length % this.showCount ==0) {
		this._snapToClosestContent(0);
	}

	this._knownScreenX = 0;
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x;
	var target = this._findMostCloseControl(this._innerContainer.getViewPortRect().x);
	var targetIndex = this._originalChildren.indexOf(target)+1;
	if(this._originalChildren.length == targetIndex) {
		targetIndex = 0;
	}
	var activePage = targetIndex;
	var vsPageStyle = this.paginationStyle;
	if(vsPageStyle == "inner-line"){
		var vcContPage = this._pagination.control;
			var pageCount = Math.ceil(this._originalChildren.length/ this.showCount);
			var vnPercent = Math.floor(100/pageCount);

		vcContPage.updateConstraint(vcContPage.getFirstChild(), {
			left : "calc("+(vnPercent*activePage)+"%)"
		});
	}
	var animator = new cpr.animation.Animator(this.autoPlayDuration,cpr.animation.TimingFunction.EASE_IN_OUT);
	var me = this;
	var fullWidth = this._innerContainer.getViewPortRect().width;
	animator.addTask(function(p){
		me._handleMove(-p * fullWidth);
	});
	this._activeAnimator = animator;
	animator.run().then((function(){
		this._activeAnimator = null;
	}).bind(this));
};

/**
 * 가장 가까운 컨텐츠로 스크롤 시킵니다.
 * @param {Number} viewportX
 * @param {Boolean} rightFirst (Optional)
 */
SlideView.prototype._findMostCloseControl = function(viewportX, rightFirst) {
	if (rightFirst === undefined) {
		rightFirst = false;
	}
	var shortedDistance = Number.MAX_VALUE;
	/** @type cpr.controls.UIControl */
	var controlToScroll = null;
	var children = this._innerContainer.getChildren();
	if (rightFirst) {
		children = children.reverse();
	}
	var vaVips = this._getPrimiaryItems();
	children.filter(function( /* cpr.controls.UIControl */ each) {
		return each.userAttr("-snap-point") == "true";
	}).filter(function(each,index){
		if(vaVips.indexOf(index) != -1) {
			return each;
		}
	}).forEach((function( /* cpr.controls.UIControl */ each) {
		var eachDistance = Math.abs(each.getOffsetRect().x - this._innerLayout.spacing - viewportX);
		if (eachDistance < shortedDistance) {
			shortedDistance = eachDistance;
			controlToScroll = each;
		}
	}).bind(this));
	return controlToScroll;
};
SlideView.prototype._getPrimiaryItems = function(){
	var vnCount = this.showCount;
	var vaChildren = this._innerContainer.getChildren();
	var vnChildLength =vaChildren.length;
	var vaResult = [];
	var a = vnChildLength/vnCount;
	var vnRepeatLength = Math.ceil(a);
	//7/3
	for(var i = 0 ; i < vnRepeatLength ; i++) {
		vaResult.push(vnCount * i);
	}
	if(a%1 != 0 && a%vnCount != 0) {
		var morePush = vnChildLength - vnCount;
		vaResult.push(morePush);
	}
	return vaResult;
}
//SlideView.prototype._findMostCloseControlWithShowCount = function(viewportX, rightFirst) {
//	if(rightFirst == undefined) {
//		rightFirst = false;
//	}
//	var shortedDistance = Number.MAX_VALUE;
//	var controlToScroll = null;
//	var children = this._innerContainer.getChildren();
//	if(rightFirst) {
//		children = children.reverse();
//	}
//	children.filter(function(each){
//		return each.userAttr("-snap-point") == "true";
//	}).forEach(function(each){
//		var eachDistance = Math.abs(each.getOffsetRect().x - this._innerLayout.spacing - viewportX);
//
//	});
//}

/**
 * 가장 가까운 컨텐츠로 스크롤 시킵니다.
 */
SlideView.prototype._snapToClosestContent = function(duration) {
	if (duration == null) {
		duration = this.snapDuration;
	}
	if (this._container.disposed) {
		return;
	}
	var viewPortRect = this._innerContainer.getViewPortRect();
	var controlToScroll = this._findMostCloseControl(viewPortRect.x);
	var index = this._originalChildren.indexOf(controlToScroll);
	var showCount = this.showCount;
	var order = Math.ceil(index / showCount);
//	if(bungi == this._originalChildren.length) {
//		order += 1
//	}

//	if(showCount != 1 && order%showCount == 0) {
//		order = 0;
//	}
//	 else {
//
//	}
	var target = this._originalChildren[order * showCount];
	controlToScroll = target;
	if (controlToScroll && viewPortRect.width >= controlToScroll.getOffsetRect().width) {
		this._innerContainer.scrollTo(controlToScroll.getOffsetRect().x - this._innerLayout.spacing, 0, duration, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
	}
};

SlideView.prototype.getActivePage = function() {
	var control = this._findMostCloseControl(this._innerContainer.getViewPortRect().x);
	var vnRemain = this._originalChildren.length%this.showCount;
	if(vnRemain != 0 && (this._originalChildren.indexOf(control) == this._originalChildren.length - this.showCount)) {
		return Math.ceil(this._originalChildren.indexOf(control) / this.showCount)
	} else {
		return Math.floor(this._originalChildren.indexOf(control) / this.showCount);
	}
};

/**
 * @param {Number} page
 * @param {Number} duration (Optional)
 */
SlideView.prototype.setActivePage = function(page, duration) {
	//page = pagination select Index;
	if (this._container.disposed) {
		return;
	}
	if (duration == null) {
		duration = 0;
	}
	var targetControl = this._originalChildren[page * this.showCount];
	if (targetControl) {
		this._innerContainer.scrollTo(targetControl.getOffsetRect().x - this._innerLayout.spacing, 0, duration);
	}
};

SlideView.prototype._updateActivePageButton = function() {
	if (this._container.disposed) {
		return;
	}
	var activePage = this.getActivePage();
	var vsPageStyle = this.paginationStyle;
	var vcContPage = this._pagination.control;
	if(vsPageStyle == "inner-right"){
		this._pagination.control.getChildren().forEach(function( /* cpr.controls.Button */ each, idx) {
			if (idx == activePage) {
				each.style.addClass("active");
					vcContPage.updateConstraint(each, {
						width : "24px"
					});
			} else {
				each.style.removeClass("active");
					vcContPage.updateConstraint(each, {
						width : "8px"
					});
			}
		});
	}
	else if(vsPageStyle == "inner-line") {
		var pageCount = Math.ceil(this._originalChildren.length/ this.showCount);
		var vnPercent = Math.floor(100/pageCount);

	vcContPage.updateConstraint(vcContPage.getFirstChild(), {
		left : "calc("+(vnPercent*activePage)+"%)"
	});
	} else if(vsPageStyle == "inner-remote") {
//		var pageCount = Math.ceil(this._originalChildren.length / this.showCount);

		this._pagination.current.value = activePage+1;
	}
	 else {
		this._pagination.control.getChildren().forEach(function( /* cpr.controls.Button */ each, idx) {
		if (idx == activePage) {
			each.style.addClass("active");
		} else {
			each.style.removeClass("active");
		}
		});
	}
}

/**
 *05-20 customize
 * @param {SlideView} owner
 */
function Slidepagination(owner) {
	this._owner = owner;
	this.control = new cpr.controls.Container();
	this.control.visible = false;

	if(this._owner.paginationStyle == "inner-line") {

		var layouts = new cpr.controls.layouts.XYLayout();
		layouts.animationTimingFunction = cpr.animation.TimingFunction.EASE_OUT_CUBIC;
		layouts.animationDuration = owner.autoPlayDuration;
		this.control.style.setClasses(["pagination-grp"]);
		this.control.style.css("box-shadow", "inset 0px -1px 0px 0px rgba(255,255,255,0.5)");
		this.control.setLayout(layouts);
		this._populateLine();
	} else if(this._owner.paginationStyle =="inner-remote"){
		var layout = new cpr.controls.layouts.FlowLayout();
		this.control.style.setClasses(["pagination-grp"]);
//		var vsPageStype = this._owner.paginationStyle;
		layout.leftMargin= 0 ;
		layout.rightMargin = 0;
		layout.bottomMargin = 0;
		layout.topMargin = 0;
		layout.horizontalSpacing = 24;
		layout.verticalSpacing = 0;
		layout.horizontalAlign = "left";
		layout.verticalAlign = "middle";
		layout.lineWrap = false;
		layout.scrollable = false;
		this.control.setLayout(layout);
		this._populateRemoteControl();


	} else {

		var layout = new cpr.controls.layouts.FlowLayout();
		this.control.style.setClasses(["pagination-grp"]);
		var vsPageStyle = this._owner.paginationStyle;
		layout.leftMargin = 0;
		layout.rightMargin = 0;
		layout.bottomMargin = 0 ;
		layout.topMargin = 0;
		layout.horizontalSpacing = 16;
		layout.horizontalAlign = "center";
		if(vsPageStyle == "inner-right") {
			layout.rightMargin = 22;
			layout.horizontalSpacing = 6;
			layout.horizontalAlign = "right";
		}

		layout.verticalAlign = "middle";
		this.control.setLayout(layout);
		this._populateButtons();
	}
};

/** @type cpr.controls.Container */
Slidepagination.prototype.control = null;
/** @type cpr.controls.Output */
Slidepagination.prototype.current = null;
/** @type cpr.controls.Button */
Slidepagination.prototype.remote = null;

Slidepagination.prototype._populateButtons = function() {
	var pageCount = Math.ceil(this._owner._originalChildren.length / this._owner.showCount);
	var that = this;
	var createPageButtonEvt = function(idx){
			var pageButton = new cpr.controls.Button();
			if(this._owner.paginationStyle == "normal") {
				pageButton.style.addClass("btn-slide");
			}else {

				pageButton.style.addClass(this._owner.paginationStyle);
			}
			pageButton.addEventListener("click", (function(e) {
				this._owner.stopAutoPlay();
				if (this._owner._activeAnimator) {
					this._owner._activeAnimator.stop();
					this._owner._activeAnimator = null;
				}
				this._owner.setActivePage(idx, this._owner.autoPlayDuration);
			}).bind(this));
			if (this._owner.paginationStyle == "inner-right") {
				this.control.addChild(pageButton, {
					width: "8px",
					height: "8px",
					autoSize: "none"
				});
			} else {
				this.control.addChild(pageButton, {
					width: "12px",
					height: "12px",
					autoSize: "none"
				});
			}

	}
	for (var idx = 0; idx < pageCount; idx++) {
		createPageButtonEvt.call(that,idx);
	}
};

Slidepagination.prototype._populateLine = function(){
	var pageCount = Math.ceil(this._owner._originalChildren.length/ this._owner.showCount);

	var output = new cpr.controls.Output();
	var vnPercent = Math.floor(100/pageCount);
	output.style.addClass(this._owner.paginationStyle);
	this.control.addChild(output, {
		left : "0px",
		top : "0px",
		width : "calc("+vnPercent+"%)",
		height : "4px"
	});
}
/**
 *
 * @param {Boolean} pbOnOff true : start, false : pause
 */
Slidepagination.prototype._remote = function(pbOnOff){

	var vcBtn = this.remote;
	var that = this._owner;
	if(pbOnOff) {
		if(vcBtn.style.hasClass("paused")) {
			vcBtn.style.removeClass("paused");
		}
		that.autoPlay();

	} else {
		if(!vcBtn.style.hasClass("paused")){
			vcBtn.style.addClass("paused");
		}
		that.stopAutoPlay();
	}
}

Slidepagination.prototype._populateRemoteControl = function(){
	var pageCount = Math.ceil(this._owner._originalChildren.length / this._owner.showCount);
	var that = this._owner;
	var me = this;
	var vcPrevBtn = new cpr.controls.Button();
	vcPrevBtn.style.setClasses("page-remote","prev");
	vcPrevBtn.addEventListener("click", (function() {
				me._remote(false);
				this.showPrev();
	}).bind(that));

	this.control.addChild(vcPrevBtn, {
		width : "28px",
		height : "28px",
		autoSize : "none"
	});

	var vcPauseBtn = new cpr.controls.Button();
	vcPauseBtn.style.setClasses(["page-remote","pause"]);
	vcPauseBtn.addEventListener("click",(function(ev){
		var vcCtrl = ev.control;
		if(vcCtrl.style.hasClass("paused")){
			vcCtrl.style.removeClass("paused");
			this.autoPlay();
		} else {
			vcCtrl.style.addClass("paused");
			this.stopAutoPlay();
		}
	}).bind(that));

	this.remote = vcPauseBtn

	this.control.addChild(vcPauseBtn, {
		width : "28px",
		height : "28px",
		autoSize : "none"
	});

	var vcNextBtn = new cpr.controls.Button();
	vcNextBtn.style.setClasses(["page-remote","next"]);
	vcNextBtn.addEventListener("click", (function(){
		me._remote(false);
		this.showNext();
	}).bind(that));
	this.control.addChild(vcNextBtn, {
		width : "28px",
		height : "28px",
		autoSize : "none"
	});

	var vcGrpCount = new cpr.controls.Container();
	var voFlowLayout = new cpr.controls.layouts.FlowLayout();
	voFlowLayout.horizontalSpacing =2;
	voFlowLayout.lineWrap = false;
	voFlowLayout.scrollable = false;
	voFlowLayout.horizontalAlign = "left";
	voFlowLayout.verticalAlign = "middle";
	vcGrpCount.setLayout(voFlowLayout);

	var vcOptCurrent = new cpr.controls.Output();
	vcOptCurrent.style.setClasses(["fs-sm","fw-bold","text-primary"]);
	vcOptCurrent.value = "1";

	this.current = vcOptCurrent;

	vcGrpCount.addChild(vcOptCurrent, {
		width : "20px",
		height : "28px",
		autoSize : "width"
	});

	var vcOptSlash = new cpr.controls.Output();
	vcOptSlash.style.setClasses(["fs-tn","fw-light","text-white"]);
	vcOptSlash.value = "/";
	vcGrpCount.addChild(vcOptSlash, {
		width : "8px",
		height: "28px",
		autoSize : "width"
	});
	var vcOptTotal = new cpr.controls.Output();
	vcOptTotal.style.setClasses(["fs-sm","text-white"]);
//	vcOptTotal.displayExp ="'/ ' + text";
	vcOptTotal.value = pageCount;
	vcGrpCount.addChild(vcOptTotal, {
		width:"20px",
		height : "28px",
		autoSize : "width"
	});
	this.control.addChild(vcGrpCount, {
		width : "28px",
		height : "28px",
		autoSize : "width"
	});
}
/**
 *
 * @param {cpr.controls.Container} container
 */
exports.slidify = function(container) {
	return new SlideView(container);
};

exports.SlideView = SlideView;