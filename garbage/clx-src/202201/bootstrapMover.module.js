/************************************************
 * bootstrap.module.js
 * Created at 2022. 1. 21. 오후 4:45:30.
 *
 * @author HANS
 ************************************************/

var mnDivider = 12;
var msMobColIdx = "mob-colIndex";
var msMobColSpan = "mob-colSpan";
var msMobRowIdx = "mob-rowIndex";
var msMobRowSpan = "mob-rowSpan";
var msDetectMobScreen = "mobile";

cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
	var control = e.control;
	
	if(control instanceof cpr.core.AppInstance) {
		/** @type cpr.core.AppInstance */
		var voAppIns = e.control;
		
		var vaCtrls = voAppIns.getContainer().getAllRecursiveChildren().filter(function(each){
			
			if(each.userAttr(msMobColIdx) != "") {
				return each;
			}
		}).forEach(function(each){
			new BootStrapMover(each);
		});
	}
});

/**
 * 
 * @param {cpr.controls.UIControl} pcContainer
 */
function BootStrapMover(pcContainer){
	this._Cont = pcContainer;
	this._aps = pcContainer.getAppInstance();
	this._order = 0 ;
	this._constraint = null;
	this._parentHeight = 0;
	this._isChanged = false;
	this.start();
}


BootStrapMover.prototype.start = function(){
	if (this._Cont.getActualRect().width === 0) {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(this.start.bind(this));
		return;
	} else {
//		this._onScreenChange.call(this);
	}
	this._shapeMemory();
	this._aps.addEventListener("screen-change",this._onScreenChange.bind(this));
}

BootStrapMover.prototype._shapeMemory = function(){
	this._order = this._Cont.getParent().getChildren().indexOf(this._Cont);
	this._constraint = this._Cont.getParent().getConstraint(this._Cont);
	this._parentHeight = this._Cont.getParent().getViewPortRect().height;
}

BootStrapMover.prototype._onScreenChange = function(/*cpr.events.CScreenChangeEvent*/e){
	var vsScreenNm = e.screen.name;
	if(vsScreenNm.indexOf(msDetectMobScreen) != -1) {
		this._isChanged = true;
		this._mobTransfrom();
	} else {
		if(this._isChanged) {
			
		this._restore();
		}
	}
}

BootStrapMover.prototype._mobTransfrom = function(){
	var vcCont = this._Cont;
	var vsMobRowIdx = vcCont.userAttr(msMobRowIdx);
	var vsMobRowSp = vcCont.userAttr(msMobRowSpan);
	var vsMobColIdx = vcCont.userAttr(msMobColIdx);
	var vsMobColSp = vcCont.userAttr(msMobColSpan);
	
	var vaNeighbor = vcCont.getParent().getChildren().filter(function(each){
		return each.userAttr(msMobRowIdx) == vsMobRowIdx;
	});
	if(vaNeighbor.length ==1 && vaNeighbor[0] == vcCont) {
		//같은 행 상에 자신만 존재하는 경우
		var vnHeight =  Math.round(Number(vsMobRowSp) * this._parentHeight / mnDivider);
		vcCont.getParent().updateConstraint(vcCont, {
			"width" : "calc(100% - 20px)",
			"height" : vnHeight + "px"
		});
	} else {
//		console.log("zz");
		var vaUptown = vcCont.getParent().getChildren().filter(function(each){
			return Number(each.userAttr(msMobRowIdx)) < Number(vsMobRowIdx);
		});
		var vnUptownLength = vaUptown.length;
		
//		console.log(this._parentHeight);
//		console.log(vcCont.getParent().getViewPortRect());
		console.log(vcCont);
		vaNeighbor.sort(function(a,b){
			return Number(a.userAttr(msMobColIdx)) - Number(b.userAttr(msMobColIdx));
		});
		var that = this;
		vaNeighbor.forEach(function(each,idx){
			
			each.getParent().reorderChild(each, vnUptownLength+idx);
			var vnWidth = Math.round(Number(each.userAttr(msMobColSpan)) *100 / mnDivider);
			var vnHeight = 0;
			if(vcCont instanceof cpr.controls.Container) {
				
				 vnHeight =   Math.round(Number(vsMobRowSp) * that._parentHeight / mnDivider);
			each.getParent().updateConstraint(each, {
				"width" : "calc("+vnWidth+"% - 20px)",
				"height": vnHeight+"px"
			});
			} else {
				
				 vnHeight = Math.round(Number(each.userAttr(msMobRowSpan)) * 100 / mnDivider);
				each.getParent().updateConstraint(each, {
					"width" : "calc("+vnWidth+"% - 20px)",
					"height": "calc("+vnHeight+"% - 20px)"
				});
			}
			console.log(vnHeight);
			
		});
	}
}

BootStrapMover.prototype._restore = function(){
	this._isChanged = false;
	this._Cont.getParent().reorderChild(this._Cont, this._order);
	this._Cont.getParent().updateConstraint(this._Cont, this._constraint);
};