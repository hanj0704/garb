/************************************************
 * mySlide.module.js
 * Created at 2024. 9. 23. 오전 9:58:39.
 *
 * @author Sound
 ************************************************/

function eventStopper(e){
    e.stopPropagation();
    e.preventDefault();
}

function SlideSlope(pcContainer) {
    if(pcContainer.type != "container" || pcContainer.getLayout().type != "flowlayout") {
        return;
    }

    this._container = pcContainer;
    this._layout = pcContainer.getLayout();
    this._originChild = pcContainer.getChildren();
    this._originConstraint = pcContainer.getChildren().map(function(each,idx){
        return {
            key : each.uuid,
            constriant:each.getParent().getConstraint(each),
            index:idx
        }
    });
    this._slope = null;
//    this._setup(pcContainer.getAppInstance());

} 

SlideSlope.prototype.isInfinite = true;
SlideSlope.prototype.showCount = 1;
SlideSlope.prototype.moveItemCount =0;
SlideSlope.prototype.animateTime = 0.5;
SlideSlope.prototype.animateDuration = 2;
SlideSlope.prototype._interval = null;

SlideSlope.prototype._originHSpacing = 0;
SlideSlope.prototype._originVSpacing = 0;
SlideSlope.prototype._slLayout = null;

SlideSlope.prototype._startX = 0;
SlideSlope.prototype._startY = 0;
SlideSlope.prototype._prevX = null;
SlideSlope.prototype._scrollMode = null;

SlideSlope.prototype.restore = function(){

    this._container.setLayout(this._layout);

    let me = this;

    this._originChild.forEach(function(each,idx){
        me._container.addChild(each,me._originConstraint[idx]);
    });
}


SlideSlope.prototype.ride = function(){

    let vcContainerSlope = new cpr.controls.Container();
    vcContainerSlope.clipContent = true;

    let vcFlowLayout = new cpr.controls.layouts.FlowLayout();
    vcFlowLayout.scrollable = true;
    vcFlowLayout.lineWrap = false;

    this._originHSpacing = this._layout.horizontalSpacing;
    this._originVSpacing = this._layout.verticalSpacing;

    vcFlowLayout.horizontalSpacing = this._originHSpacing;
	vcContainerSlope.setLayout(vcFlowLayout);
    this._slope = vcContainerSlope;
    this._slLayout = vcFlowLayout;

    let itemWidth = "";
    let itemSizeCount = 0;
    let spacingNum = 0;
    let me = this;
    this._originChild.forEach(function(each){
        let fr = each.userAttr("fraction") != "" ? Number(each.userAttr("fraction")) : 1;
        itemWidth = "calc((100% - " + (me.showCount) * (vcFlowLayout.horizontalSpacing) + "px) / " + me.showCount+"*"+fr+")";
        console.log(itemWidth);
        vcContainerSlope.addChild(each,{
            width : itemWidth,
            height: "100%"
        });
    });

    this._container.addChild(vcContainerSlope,{
        width:"100%",
        height:"100%"
    });

    this._slope.addEventListener("mousedown",this._onMouseDown);
//    this._slope.addEventListener("touchstart",this._onToucnStart);
}

/**
 * 다음 아이템으로 이동하는 함수
 * 현재 표시중인 아이템에서 moveItemCOunt만큼 인덱스가 추가된 컨트롤까지 얼마나 스크롤을 이동해야하는지 계산하고
 */
SlideSlope.prototype.showNext = function(){
    let moveCount = this.moveItemCount || this.showCount;
    console.log(moveCount);
    let nowItem = this._findCloseControl(null,false);
    let children = this._slope.getChildren();
    let targetItemIndex = children.indexOf(nowItem) + moveCount;
    if(this.isInfinite) {
        targetItemIndex = this._reorder2(children.indexOf(nowItem), targetItemIndex);
    }
     else {
        if(targetItemIndex + this.showCount -1 == children.length) {
            targetItemIndex = 0;
        }
     }
     if(targetItemIndex > children.length -1) {
        targetItemIndex = children.length - this.showCount;
     }
     let movement = this._slope.getChildren()[targetItemIndex].getOffsetRect().x - this._slope.getViewPortRect().x - this._originHSpacing;
     this._slope.adjustScroll(movement,0,this.animateTime,cpr.animation.TimingFunction.EASE_IN);
}

SlideSlope.prototype.showPrev = function(){

    let moveCount = 0 || this.moveItemCount;

    let nowItem = this._findCloseControl(null,false);
    let target = this._slope.getChildren().indexOf(nowItem)-moveCount;

    if(this.isInfinite) {
        target = this._reorder2(this._slope.getChildren().indexOf(nowItem),target);
    }
    if(target<=0) {
        this._slope.scrollTo(0,0,0.5,cpr.animation.TimingFunction.EASE_IN);
    } else {
        let movement = this._slope.getViewPortRect().x - this._originHSpacing - this._slope.getChildren()[target].getOffsetRect().x;
        this._slope.adjustScroll(-movement,0,this.animateTime,cpr.animation.TimingFunction.EASE_IN);
    }
}

SlideSlope.prototype._reorder2 = function(nowIndex,targetIndex) {
    let container = this._slope;
    let children = container.getChildren();
    if(nowIndex < targetIndex) {
        let index = targetIndex + this.showCount - children.length;
        if(index > 0) {
            for(let i = 0; i <index; i++) {
                let targets = container.getChildren()[0];
                container.reorderChild(targets,container.getChildren().length);
                container.adjustScroll(-(targets.getActualRect().width+this._originHSpacing),0);
            }
            cpr.core.DeferredUpdateManager.INSTANCE.update();
            return targetIndex - index;
        }
        return targetIndex;
    } else {
        let index = targetIndex;
        if(targetIndex < 0) {
            for(let i=0; i<Math.abs(index); i++) {
                let targets = container.getChildren().pop();
                container.reorderChild(targets,0);
                container.adjustScroll((targets.getActualRect().width-this._originHSpacing),0);
            }
            return 0;
        }
        return targetIndex;
    }
}

SlideSlope.prototype._autoReorder = function(){
    let container = this._slope;
    let children = container.getChildren();
    let targetCtrl = this._findCloseControl();
    let index = children.indexOf(targetCtrl);
    if(index == 0){
        let targets = container.getChildren().pop();
        container.reorderChild(targets,0);
        container.adjustScroll((targets.getActualRect().width+this._originHSpacing),0);
    }
    else if(index + this.showCount+1 >= children.length) {
        let targets = container.getChildren()[0];
        container.reorderChild(targets,container.getChildren().length);
        container.adjustScroll(-(targets.getActualRect().width + this._originHSpacing),0);
    }
}

SlideSlope.prototype._findCloseControl = function(vpX,isComplete) {
    let viewportX = vpX || this._slope.getViewPortRect().x;
    let complete = isComplete === undefined ? false : isComplete;
    let target = null;
    let me = this;
    let mover = me.moveItemCount;
    let children = me._slope.getChildren();
    let finder = null;

    if(complete) {
        finder = children.reduce(function(a,b){
            if(a.getOffsetRect().x - me._originHSpacing - viewportX < 0) {
                return b;
            }
            if(a.getOffsetRect().x - me._originHSpacing - viewportX > b.getOffsetRect().x - me._originHSpacing - viewportX) {
                return b;
            }
            return a;
        },children[0]);
    } else {
        finder = children.reduce(function(a,b){
            if(Math.abs((a.getOffsetRect().x-me._originHSpacing)-viewportX) > Math.abs((b.getOffsetRect().x-me._originHSpacing) - viewportX)) {
                if(isComplete && (b.getOffsetRect().x - me._originHSpacing)-viewportX < 0) {
                    return a;
                }
                return b;
            }
            return a;
        },children[0]);
    }
    return finder;
}

SlideSlope.prototype._scrollToClosest = function(){
    let target= this._findCloseControl();
}

SlideSlope.prototype._onMouseDown = function(e) {
    if(e.button !== 0) {
        return;
    }

    this._startX = e.clientX;
    this._prevX = e.clientX;
	
    window.addEventListener("mousemove",this._onMouseMove);
    window.addEventListener("mouseup",this._onMouseUp);
    e.stopPropagation();
}

SlideSlope.prototype._onMouseMove = function(e){
    let now = e.clientX;
    if(this._prevX != null) {
        let delta = this._prevX - now;
        this._prevX = now;
        console.log("delta")
        this._slope.adjustScroll(delta,0);
        if(this.isInfinite) {
            this._autoReorder();
        }
    }
}

SlideSlope.prototype._onMouseUp = function(e){
    window.removeEventListener("monsemove",this._onMouseMove);
    window.removeEventListener("mouseup",this._onMouseUp);
    let ctrl = this._findCloseControl();
    this._slope.scrollTo(ctrl.getOffsetRect().x - this._originHSpacing,0,0.1,cpr.animation.TimingFunction.EASE_IN);
}

SlideSlope.prototype._onToucnStart = function(e){
    let touch = e.targetTouches.item(0);
    this._startX = touch.clientX;
    this._prevX = touch.clientX;
    this._startY = touch.clientY;

    window.addEventListener("touchmove",this._onTouchMove,{
        capture:false
    });
    window.addEventListener("touchend",this._onTouchEnd);
}

SlideSlope.prototype._onTouchMove = function(e){
    let touch = e.targetTouches.item(0);
    let stX = Math.abs(this._startX - touch.clientX);
    let stY = Math.abs(this._startY - touch.clientY);
    var vbIsMobile = /iPad|Macinthsh/i.test(navigator.userAgent);
    if(vbIsMobile) {
        this._container.getAppInstance().getContainer().overscrollBehavior = "none";
    }
    if(this._scrollMode == null) {
        if(stx > stY && stX - stY > 5) {
            this._scrollMode = "vertical";
        } else if(stX <= stY && stY - stX > 5) {
            this._scrollMode = "horizon";
        }
    } else {
        if(this._scrollMode == "vertical") {
            let now = touch.clientX;
            document.body.style.overflowY = "hidden";
            let delta = this._prevX - now;
            this._prevX = now;
            this._slope.adjustScroll(detlta,0);
            
            if(this.isInfinite) {
                this._autoReorder();
            }
        } else if(this._scrollMode == "horizon") {
            return;
        }
    }
    e.stopPropagation();
}

SlideSlope.prototype._onTouchEnd = function(e){
    document.body.style.overflowY = null;
    this._scrollMode = null;
    window.removeEventListener("touchmove",this._onTouchMove);
    window.removeEventListener("touchend",this._onTouchEnd);
    this._startX = -1;
    this._startY = -1;
    var vbIsMobile = /iPad|Macinthsh/i.test(navigator.userAgent);
    if(vbIsMobile) {
        this._container.getAppInstance().getContainer().overscrollBehavior = "auto";
    }
    let ctrl = this._findCloseControl();
    this._slope.scrollTo(ctrl.getOffsetRect().x - this._originHSpacing,0,0.1,cpr.animation.TimingFunction.EASE_IN);
}

SlideSlope.prototype.autoPlay = function(){
    if(this._interval) {
        clearInterval(this._interval);
    }
    let that = this;
    this._interval = setInterval(that.showNext.bind(that),that.animateDuration*1000);
}

globals.createSlope = function(pcContainer) {
    return new SlideSlope(pcContainer);
}