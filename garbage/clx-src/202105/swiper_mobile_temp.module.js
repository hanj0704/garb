/************************************************
 * swiper.module.js
 * Created at 2021. 3. 8. 오전 11:13:06.
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
	var layout = container.getLayout();
	
	if (layout instanceof cpr.controls.layouts.FlowLayout == false){
		throw new cpr.exceptions.IllegalArgumentException("플로우 레이아웃에서만 사용가능 합니다.");
	}
	
	/** @type cpr.controls.layouts.FlowLayout */
	this._layout = container.getLayout();
};
/**
 * 2021.03.30추가, showCount를 바꿀 경우가 있을 떄, 원본 레이아웃의 spacing을 저장하기 위해 사용.
 */
SlideView.prototype.originSpacing =0;
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
SlideView.prototype.autoPlayDuration = 0.3;

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
SlideView.prototype.showPagination = true;

/**
 * 페이지니션을 사용자가 원하는 위치에 표시할 것인지 여부.
 */
SlideView.prototype.adjustPagination = false;

/**
 * 좌우 버튼의 너비
 */
SlideView.prototype.navigationButtonWidth = 48;


/**
 * 좌우 버튼의 높이
 */
SlideView.prototype.navigationButtonHeight = 48;

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

/**
 * 네비게이션 버튼 표시 스타일
 * <li>hover: 컨테이너 가장자리에 호버 시킴</li>
 * <li>outside: 컨테이나 가장자리 바깥쪽에 표시</li>
 * <li>content-hover: 가운데 정렬된 콘텐츠의 가장자리에 호버 시킴</li>
 * <li>content-outside: 가운데 정렬된 콘텐츠의 가장자리에 바깥쪽에 표시</li></li>
 * <li>cover: 콘텐츠의 가장자리에 걸쳐 표시</li></li>
 * <li>none: 버튼 표시 안함</li>
 */
SlideView.prototype.navigationButtonStyle = "cover";

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
 * @type SlidePagination
 */
SlideView.prototype._pagination = null;
/**
 * @type cpr.controls.UIControl[]
 */
SlideView.prototype._originalChildren = [];
SlideView.prototype._knownScreenX = -1;
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

SlideView.prototype.hasScroll = false;

SlideView.prototype.scrollMode = null;
SlideView.prototype.touchVector = null;
SlideView.prototype._transform = function() {
		if (this._container.getActualRect().width === 0) {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(this._transform.bind(this));
		return;
	}
	var height = this._container.getViewPortRect().height;
	this._container.style.addClass("cl-unselectable");
	this._layout.horizontalAlign = "center";
	this._layout.scrollable = false;
	this._originalChildren = this._container.getChildren();

	this._innerContainer = new cpr.controls.Container();
	this._innerContainer.style.addClass("slide-inner");
	var layout = new cpr.controls.layouts.FlowLayout();
	layout.lineWrap = false;
	layout.scrollable = false;
	if(this._layout.spacing != 0)
	this.originSpacing = this._layout.spacing;
	layout.spacing = this.originSpacing;
	this._innerContainer.setLayout(layout);
	this._innerLayout = layout;
	this._layout.spacing = 0;
	this._layout.scrollable = false;

	var itemConstraint = {
		height: "100%"
	};

	var itemSizeExpression = this.itemSize + "px";

	if (this.itemSize <= 0) {
		itemSizeExpression = "(100% - " + (this.showCount) * layout.spacing + "px) / " + this.showCount;
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
		}
	}

	this._container.getChildren().forEach((function( /* cpr.controls.UIControl */ each, idx) {
		each.userAttr("-snap-point", "true");
		itemConstraint.height = "300px",
		itemConstraint.autoSize="height";
		this._innerContainer.addChild(each, itemConstraint);
	}).bind(this));
	this._container.addChild(this._innerContainer, {
		width: this.itemSize > 0 ? this.showCount * this.itemSize + (this.showCount - 1) * layout.spacing + 2 + "px" : "100%", //XXX 보정치 추가
		height: "100%"
	});

	this._pagination = new SlidePagination(this);
	this._pagination.control.userAttr("swiped", "true");
	this._container.getParent().floatControl(this._pagination.control);
//	this._updateActivePageButton = _.debounce(this._updateActivePageButton.bind(this),50);
	this._innerContainer.addEventListener("scroll", this._updateActivePageButton.bind(this));
	this.updateContentHeight();
		this._innerContainer.scrollTo(1, 0,0.3,cpr.animation.TimingFunction.EASE_IN);
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
//	this._updateActivePageButton = _.debounce(this._updateActivePageButton.bind(this), 50);

	this._onResize = this._onResize.bind(this);

//	this._innerContainer.addEventListener("scroll", this._updateActivePageButton);
	this._container.addEventListener("mousedown", this._onMouseDown);
	this._container.addEventListener("touchstart", this._onTouchStart);
	this._container.addEventListenerOnce("dispose", this._handleDispose.bind(this));
	cpr.core.NotificationCenter.INSTANCE.subscribe("main-size-changed", this, this._updateButtons);
	cpr.core.NotificationCenter.INSTANCE.subscribe("swipe-transition-occured", this, this._onResize);
	cpr.core.NotificationCenter.INSTANCE.subscribe(cpr.core.SystemTopics.RESIZE, this, this._onResize);
	cpr.core.NotificationCenter.INSTANCE.subscribe("swipe-size-changed",this, this.updateContentHeight);
//	this._updateActivePageButton();

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
SlideView.prototype.startButton = function(){
	var container = this._innerContainer;
	var layout = this._innerLayout;
	
	
	var buttons = new cpr.controls.Button();
	buttons.value = "->";
	buttons.style.addClass("hanCont");
	container.floatControl(buttons,{
		"left" :"-100px",
		"top" : "calc(50%)",
		"width":"100px",
		"height":"100px"
	});
}

SlideView.prototype.hanButton = function(cliX){
	var container = this._innerContainer;
	var layout = this._innerLayout;

	// 스크롤 불능일 경우 중단.
	if (container.getViewPortRect().width >= container.getContentPaneRect().width) {
		return;
	}

	if (this._knownScreenX < 0) {
		return;
	}

	// 터치/마우스의 이동량을 구함.
	var delta = this._knownScreenX - cliX;

	// 새로운 뷰포트의 위치
	var newScrollLeft = this._initialScrollLeft + delta;
	
	
	var btns = container.getChildren().find(function(each){
		if(each.isFloated()){
			
			return each;
		}
	});
	
	if(this._knownScreenX - cliX > 0){
		
		if(delta > 50) {
			delta = 50
		}
		container.floatControl(btns,{
			left : this._initialScrollLeft+container.getActualRect().width - delta+"px"
			
		});
	} else {
		
		if(Math.abs(delta) > 50) {
			delta =  -50
		}
		container.floatControl(btns,{
			left : this._initialScrollLeft-100 - delta +"px"
		})
	}
}
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
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x;
	window.addEventListener("touchmove", this._onTouchMove);
	window.addEventListener("touchend", this._onTouchEnd);
	this.startButton();
	e.stopPropagation();
	this.stopAutoPlay();
};

/**
 * 터치 이동 핸들러
 * @param {cpr.events.CTouchEvent} e
 */
SlideView.prototype._onTouchMove = function(e) {
	
	var touch = e.targetTouches.item(0);
	
	var stx = Math.abs(this._knownScreenX - touch.clientX);
	var sty = Math.abs(this._knownScreenY - touch.clientY);
	if(this.scrollMode == null) {
		if(stx>sty) {
			this.scrollMode = "vertical";
		}
		if(stx<sty) {
			this.scrollMode = "horizon";
		}
	}
	 else {
	 	if(this.scrollMode == "vertical") {
			document.body.style.overflowY= "hidden";
//			this._handleMove(touch.clientX);
			this.hanButton(touch.clientX);
	 		
	 	}
	 	else if(this.scrollMode == "horizon") {
	 		
	 	}
	 }
			
	e.stopPropagation();
};

/**
 * 터치 종료 핸들러
 * @param {cpr.events.CTouchEvent} e
 */
SlideView.prototype._onTouchEnd = function(e) {
	document.body.style.overflowY= null;
	this.scrollMode = null;
	window.removeEventListener("touchmove", this._onTouchMove);
	window.removeEventListener("touchend", this._onTouchEnd);
	this._knownScreenX = -1;
	this._snapToClosestContent();
	var rects = this._innerContainer.getActualRect();
	var hanjin = null;
	this._innerContainer.getChildren().forEach(function(/*cpr.controls.UIControl*/each){
		if(each.isFloated()) {
			var buttonRect = each.getActualRect().left;
			if(buttonRect > 0) {
				if(rects.width - buttonRect > 45) {
					hanjin = "next";
				}
			} else {
				if(Math.abs(buttonRect) < 55) {
					hanjin="prev";
				}
			}
			each.dispose();
			
		}
	});
	if(hanjin == "next"){
		this.showNext();
	}
	 else if(hanjin == "prev") {
	 	this.showPrev();
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
	//this._knownScreenX = e.screenX;
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
	var layout = this._innerLayout;

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
	//this._handleMove(e.screenX);
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
//	this._updateVisibleCtrl();
//	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(this._snapToClosestContent.bind(this));
	this._snapToClosestContent();
	if (this._prevButton && this._nextButton) {
		this._prevButton.addEventListener("mouseup", eventStopper);
		this._nextButton.addEventListener("mouseup", eventStopper);
	}
};

SlideView.prototype._updateButtons = function() {
	if (this._container.getActualRect().width === 0) {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(this._updateButtons.bind(this));
		return;
	}
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
	if(!this._pagination.control.disposed){
		
		this._pagination.control.visible = false;
		this._doUpdateButtons();
	}
}

SlideView.prototype._doUpdateButtonsImmediatly = function() {
	if (this._container.disposed) {
		return;
	}

	this._knownBounds = this._container.getOffsetRect();
	
	var shouldShowButtons = this._innerContainer.getChildrenCount() > 1 && this._innerContainer.getViewPortRect().width < this._innerContainer.getContentPaneRect().width;
	if (false) {
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
		if (!this._pagination.control.disposed) {
			
			this._pagination.control.visible = this.showPagination;
			if (this.showPagination) {
				if (this.adjustPagination) {
					this._pagination.control.style.css({
						top: "13px",
						left: "68px"
					});
				} else {
					this._pagination.control.style.css({
						top: this._knownBounds.bottom + "px",
						left: this._knownBounds.left + "px",
						width: this._knownBounds.width + "px"
					});
					this._pagination.control.style.animateFrom({
						"opacity": "0"
					});
				}
			}
		}
		if (this.navigationButtonStyle != "none") {
			this._prevButton = new cpr.controls.Button();
			this._prevButton.style.addClass("slide-button");
			this._prevButton.style.addClass("slide-prev-button");
			if (this.useInfiniteScroll != true){
				this._prevButton.enabled = false;
			}
			if (this.navigationButtonClassName) {
				this._prevButton.style.addClass(this.navigationButtonClassName);
			}
			this._prevButton.addEventListener("click", (function() {
				this.stopAutoPlay();
				this.showPrev();
				if (this.autoPlayDelay > 0){
					this.autoPlay();
				} else {
					this._prevButton.enabled = false;
					this._nextButton.enabled = true;
				}
			}).bind(this));

			this._prevButton.addEventListener("mousedown", eventStopper);
			this._prevButton.addEventListener("mouseup", eventStopper);
			this._prevButton.addEventListener("click", eventStopper);
			
			this._nextButton = new cpr.controls.Button();
			this._nextButton.style.addClass("slide-button");
			this._nextButton.style.addClass("slide-next-button");
			if (this.navigationButtonClassName) {
				this._nextButton.style.addClass(this.navigationButtonClassName);
			}
			this._nextButton.addEventListener("click", (function() {
				this.stopAutoPlay();
				this.showNext();
				if (this.autoPlayDelay > 0){
					this.autoPlay();
				}
			}).bind(this));
			this._nextButton.addEventListener("mousedown", eventStopper);
			this._nextButton.addEventListener("mouseup", eventStopper);
			this._nextButton.addEventListener("click", eventStopper);
			
			/** @type cpr.controls.Container */
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
						leftCosntraint.left = this._knownBounds.left - this.navigationButtonWidth + "px";
						rightConstraint.left = this._knownBounds.right + "px";
						break;
					}
				case "cover":
					{
						leftCosntraint.left = this._knownBounds.left - (this.navigationButtonWidth / 2) + (this._container.getLayout().leftMargin /2) + "px";
						leftCosntraint.height = this.navigationButtonHeight + "px";
						leftCosntraint.top = this._knownBounds.top + ((this._knownBounds.height / 2) - (this.navigationButtonHeight / 2)) + "px";
						rightConstraint.left = this._knownBounds.right - (this.navigationButtonWidth / 2) - (this._container.getLayout().rightMargin / 2) + "px";
						rightConstraint.height = this.navigationButtonHeight + "px";
						rightConstraint.top = this._knownBounds.top + ((this._knownBounds.height / 2) - (this.navigationButtonHeight / 2)) + "px";
					}
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
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x
	var animator = new cpr.animation.Animator(this.autoPlayDuration, cpr.animation.TimingFunction.EASE_IN_OUT);
	var me = this;
	var fullWidth = this._innerContainer.getViewPortRect().width;
	var firstChild = this._innerContainer.getChildren()[0];
	var firstChildRect = firstChild.getOffsetRect();
	var oneWidth = firstChildRect.width + firstChildRect.left;
	
	animator.addTask(function(p) {
		me._handleMove(p * oneWidth);
	});
	this._activeAnimator = animator;
	animator.run().then((function() {
		this._activeAnimator = null;
		if(this._prevButton){
			var checker = this._findMostCloseControl(this._innerContainer.getViewPortRect().left );
			if(checker == firstChild) {
				this._prevButton.enabled = false;
			}
		}
	}).bind(this));
};

SlideView.prototype.showNext = function() {
	if (this._activeAnimator) {
		return;
	}

	var target = this._findMostCloseControl(this._innerContainer.getViewPortRect().right);
	if (target) {
		var offset = target.getOffsetRect().right;
		this._innerContainer.scrollTo(offset - this._innerContainer.getViewPortRect().width, 0, this.autoPlayDuration);
		
		/* 무한 스크롤 상태일 때 처음으로 되돌림 */
		if (this.useInfiniteScroll) {
			if (this.infiniteTarget == target) {
				this._innerContainer.scrollTo(0, 0, this.autoPlayDuration);
				return;
			} else {
				this.infiniteTarget = target;
			}
		} else {
			var last = this._innerContainer.getViewPortRect().left + this._innerContainer.getViewPortRect().right;
			//리소스를 덜 소비하는 쪽으로 찾길 바람
			/** @type Container */
			var child = this._innerContainer.getChildren();
			var lastChild = child[child.length-1];
			if(this._nextbutton){
				
				if(lastChild == target) {
					this._nextButton.enabled = false;
				} else {
					this._prevButton.enabled = true;
				}
			}
		}
	}
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
	children.filter(function( /* cpr.controls.UIControl */ each) {
		return each.userAttr("-snap-point") == "true";
	}).forEach((function( /* cpr.controls.UIControl */ each) {
		var eachDistance = Math.abs(each.getOffsetRect().x - this._innerLayout.spacing - viewportX);
		if (eachDistance < shortedDistance) {
			shortedDistance = eachDistance;
			controlToScroll = each;
		}
	}).bind(this));
	return controlToScroll;
};

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
	//TODO 슬라이드 시 버튼 활성/비활성화
	if (this.useInfiniteScroll == false){
		var children = this._innerContainer.getChildren();
		if(this._prevButton){
			
			if(children.indexOf(controlToScroll) != 0) {
				this._prevButton.enabled = true;
			} else {
				this._prevButton.enabled = false;
			}
		}
		if(this._nextButton){
			
			if(children.indexOf(controlToScroll) + this.showCount == children.length) {
				this._nextButton.enabled = false;
			} else {
				this._nextButton.enabled = true;
			}
		}
	}
	if (controlToScroll && viewPortRect.width >= controlToScroll.getOffsetRect().width) {
		var mover = controlToScroll.getOffsetRect().x - this._innerLayout.spacing;
		this._innerContainer.scrollTo(mover, 0, duration, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
	}
};


SlideView.prototype.getActivePage = function() {
	var control = this._findMostCloseControl(this._innerContainer.getViewPortRect().x);
	return Math.floor(this._originalChildren.indexOf(control) / this.showCount);
};

/**
 * @param {Number} page
 * @param {Number} duration (Optional)
 */
SlideView.prototype.setActivePage = function(page, duration) {
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
	this._pagination.control.getChildren().forEach(function( /* cpr.controls.Button */ each, idx) {
		if (idx == activePage) {
			each.style.addClass("active");
		} else {
			each.style.removeClass("active");
		}
	});
	if(this.onBeforeChangePagination){
		this.onBeforeChangePagination();
	}
	//2021-04-23 페이지네이션 컨텐츠 밑에 붙게하는 스크립트]
//	cpr.core.DeferredUpdateManager.INSTANCE.update();
	var closer = this._findMostCloseControl(this._innerContainer.getViewPortRect().x);
	if(this._pagination.control) {
		this._pagination.control.getParent().floatControl(this._pagination.control,{
			top : closer.getActualRect().height+"px",
		});
	}
	this._innerContainer.getParent().updateConstraint(this._innerContainer, {
		height : closer.getActualRect().height+this._pagination.control.getActualRect().height+"px"
	});
	if (this.onChangePagination) {
		this.onChangePagination();
	}
	
}

SlideView.prototype.updateContentHeight = function(){
	cpr.core.DeferredUpdateManager.INSTANCE.update()
	
	var closer = this._findMostCloseControl(this._innerContainer.getViewPortRect().x);
	if(this._pagination.control) {
		this._pagination.control.getParent().floatControl(this._pagination.control,{
			top : closer.getActualRect().height+"px",
		});
	}
	this._innerContainer.getParent().updateConstraint(this._innerContainer, {
		height : closer.getActualRect().height+this._pagination.control.getActualRect().height+"px"
	});
	cpr.core.DeferredUpdateManager.INSTANCE.update()
	this._snapToClosestContent(0);
}
SlideView.prototype._updateVisibleCtrl = function(){
	
	var closer = this._findMostCloseControl(this._innerContainer.getViewPortRect().x);
	this._innerContainer.getParent().updateConstraint(this._innerContainer, {
		height : closer.getActualRect().height+this._pagination.control.getActualRect().height+"px"
	});
	
	cpr.core.DeferredUpdateManager.INSTANCE.update();
	
}

/**
 * 슬라이드 페이지인덱서 영역을 생성합니다.
 * @param {SlideView} owner
 */
function SlidePagination(owner) {
	this._owner = owner;
	this.control = new cpr.controls.Container();
	this.control.visible = false;
	this.control.clipContent = false;
	this.control.style.addClass("paginations");
	var layout = new cpr.controls.layouts.FlowLayout();
	if (this.adjustPagination){
//		layout.topMargin = 0;
		layout.rightMargin = 0;
		layout.bottomMargin = 0;
		layout.leftMargin = 0;
		layout.horizontalAlign = "left";
		layout.verticalAlign = "middle";
	} else {
		layout.topMargin = 20;
		layout.rightMargin = 0;
		layout.bottomMargin = 0;
		layout.leftMargin = 0;
		layout.horizontalAlign = "center";
		layout.verticalAlign = "middle";
	}
	layout.lineWrap = false;
	layout.spacing = 12;
	layout.scrollable = false;
	this.control.setLayout(layout);
	this._populateButtons();
};

/** @type cpr.controls.Container */
SlidePagination.prototype.control = null;

SlidePagination.prototype._populateButtons = function() {
	var pageCount = Math.ceil(this._owner._originalChildren.length / this._owner.showCount);
	for (var idx = 0; idx < pageCount; idx++) {
		(function(idx) {
			var pageButton = new cpr.controls.Output();
			pageButton.style.addClass("pagination-blt");
			pageButton.addEventListener("click", (function(e) {
				this._owner.stopAutoPlay();
				if (this._owner._activeAnimator) {
					this._owner._activeAnimator.stop();
					this._owner._activeAnimator = null;
				}
				this._owner.setActivePage(idx, this._owner.autoPlayDuration);
			}).bind(this));
			if(this._owner._originalChildren[idx].visible == true){
				
				this.control.addChild(pageButton, {
					width: "6px",
					height: "6px",
					autoSize: "both"
				});
			}
		}).bind(this)(idx);
	}
};


/**
 * 페이지네이션이 변경되었을 때의 콜백.
 */
SlideView.prototype.onChangePagination = function() {
	
}

SlideView.prototype.onBeforeChangePagination = function(){
	
}

/**
 * 슬라이더의 한번에 보일 아이템 갯수를 수정하는 경우가 있을 경우, innerCOntainer를 초기화하는함수입니다.
 * 해당 함수를 수행후 showCount를 변경하고 _transfrom을 수행하십시오.
 */
SlideView.prototype.clear = function(){
	if (this._container.getActualRect().width === 0) {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(this.clear.bind(this));
		return;
	}
	var vcInnerContainer = this._container;
		
		this._innerContainer.getChildren().forEach(function(each){
		vcInnerContainer.addChild(each, {
			width:"100px",
			height:"100px",
			autoSize:"none"
		});
		});
		
		this._innerContainer.dispose();
		this._pagination.control.dispose();
}

SlideView.prototype.paginationRestore = function(){
	
	this._pagination.control.dispose();
	this._pagination.control = null;
	this._pagination = new SlidePagination(this);
	this._pagination.control.userAttr("swiped", "true");
	this._container.getParent().floatControl(this._pagination.control);
}
SlideView.prototype.restore = function(){
	
	

}

SlideView.prototype.getNowVisibleCtrl = function(){
	
	var vcNowVisibleCtrl = this._findMostCloseControl(this._innerContainer.getViewPortRect().x);
	
	return vcNowVisibleCtrl;
}
/**
 * 
 * @param {cpr.controls.Container} container
 */
exports.slidify = function(container) {
	return new SlideView(container);
};

exports.SlideView = SlideView;