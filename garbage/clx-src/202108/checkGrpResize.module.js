/************************************************
 * checkGrpResize.module.js
 * Created at 2021. 7. 26. 오후 4:41:15.
 *
 * @author HANS
 ************************************************/



var attributeNm = "usr-id"

/**
 * 체크박스를 반응형으로 colCount를 바꾸는 객체 리턴
 * @param {cpr.core.AppInstance} poAppIns
 */
globals.CheckResponsiveModule = function(poAppIns){
	
	return new resizeMod(poAppIns);
}

/**
 * 화면상에 있는 체크박스그룹의 fixedWidth에 NumberString이 들어가있는 체크박스인 경우, 해당 컨트롤의 colCount를 수정합니다.
 * @param {cpr.core.AppInstance} poAppIns
 */
var resizeMod = function(poAppIns){
	var that = this;
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		var vcContainer = poAppIns.getContainer();
	
	/** @type cpr.controls.CheckBoxGroup[] */
	var vaChild = vcContainer.getAllRecursiveChildren().filter(function(each){
		if(each instanceof cpr.controls.CheckBoxGroup && typeof each.fixedWidth != "boolean"){
			if(each.userAttr("ignoreResize")==""){
				
				return each;
			}
		}
	});
	
	vaChild.forEach(function(each){
		
		each.htmlAttr(attributeNm,each.uuid);
		
		
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
			var findExpress = "*[data-usr-" + attributeNm + "='" + each.uuid + "']";
			var dom = document.querySelector(findExpress);
			var checkBox = dom.querySelector(".cl-checkbox");
			
			var regexp = /[^0-9]/g;
			var paddingLeft = getComputedStyle(checkBox).paddingLeft.replace(regexp, "");
			var paddingRight = getComputedStyle(checkBox).paddingRight.replace(regexp, "");
			var vnPadding= Number(paddingLeft) + Number(paddingRight);
			each.userData("paddingNum",vnPadding)
		});
	});
	that.checkGrps = vaChild;
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
		CheckResizer.call(that);
	});
	
		
	});
	/**
	 * start를 하면 윈도우 resize 시, colCount를 계산하는 이벤트 리스너를 추가합니다.
	 */
	this.start = function() {

		var eventListener = CheckResizer.bind(this);
		window.addEventListener("resize", eventListener);
		
		poAppIns.addEventListener("before-unload", function(){
			window.removeEventListener("resize", eventListener);
		});
		
	}
}

/**
 * padding과 fixedWidth를 사용하여 전체 체크박스그룹크기를 나누어 colCount를 지정하는 함수
 */
function CheckResizer(){
	/** @type cpr.controls.CheckBoxGroup[] */
	var vaCheckGrps = this.checkGrps;
	
	vaCheckGrps.forEach(function(each){
		
		var vnPadding = each.userData("paddingNum");
		var cbgMinWidth = Number(each.fixedWidth) + vnPadding;
			var rec = each.getActualRect().width;
			var colCnt = Math.floor(rec/cbgMinWidth);
			if(colCnt < 1) colCnt =1;
			
			if(each.colCount != colCnt) {
				each.colCount = colCnt;
			}
	});
}
