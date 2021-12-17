/************************************************
 * fetch.module.js
 * Created at 2021. 7. 26. 오전 10:56:57.
 *
 * @author HANS
 ************************************************/

/**
 * 
 * @param {cpr.core.AppInstance} poAppIns
 * @param {cpr.controls.UIControl} pcTargetCtrl
 */
globals.fetchContainer = function(poAppIns,pcTargetCtrl){
//	return new FecthModule(poAppIns,pcTargetCtrl);

	var vcContainer = poAppIns.getContainer();
	var voLayout = vcContainer.getLayout();
	var knownBottomReached = false;
	
	if(!(voLayout instanceof cpr.controls.layouts.VerticalLayout)) {
		return;
	}
	vcContainer.addEventListener("scroll", function(e){
		
		var viewport = vcContainer.getViewPortRect();
		var loader = vcContainer.getLastChild();
	
	var bottomReached = viewport.intersects(loader.getOffsetRect());
	if (knownBottomReached != bottomReached && bottomReached) {
		
		if (fetchCount >= maxFetchCount) {
			loader.style.animateAndReverse({
				"transform": "scale(1.3)",
				"color": "red"
			}, 0.2);
		} else {
			_fetch();
		}
	}
	knownBottomReached = bottomReached;
	});
}


function _fetch(){
	
}


globals.tempFetchModuler = function(poAppIns,pcTargetCtrl,pnMaxCnt) {
	
	return new FetchModel();
}

/**
 * 
 * @param {cpr.core.AppInstance} poAppIns
 * @param {cpr.controls.UIControl} pcTargetCtrl
 * @param {Number} pnMaxCnt
 */
var FetchModel = function(poAppIns,pcTargetCtrl,pnMaxCnt){
	this.aps = poAppIns;
	this.reached = false;
	this.copyMod = createCtrlCopyModule();
	this.max = pnMaxCnt;
	
	this.scroll();

}

FetchModel.prototype.scroll = function(){
	
	var vcContainer = this.aps.getContainer();
	var mine = this;
	vcContainer.addEventListener("scroll", function(e){
		var viewport = vcContainer.getViewPortRect();
		var loader = vcContainer.getLastChild();
	
	var bottomReached = viewport.intersects(loader.getOffsetRect());
	if (mine.reached != bottomReached && bottomReached) {
		
		if (fetchCount >= maxFetchCount) {
			loader.style.animateAndReverse({
				"transform": "scale(1.3)",
				"color": "red"
			}, 0.2);
		} else {
			_fetch();
		}
	}
	mine.rec = bottomReached;
	});
}