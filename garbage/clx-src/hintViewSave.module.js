/************************************************
 * viewHint.module.js
 * Created at 2020. 3. 19. 오전 11:46:40.
 * Modified at 2020.04.02 조한진
 * 변경점 : DesignGuide와  함께 사용 방법이 제공되었습니다.
 * 		 일시적으로 useClassHintMode를 사용하지 않아도 모든 컨트롤이 가진 클래스가 제공되도록 수정되었습니다.
 * 		현재 그리드내에 배치된 컨트롤들의 클래스들을 확인할 수 없는 문제가 있습니다.
 * Modified at 2020.04.01 조한진
 * 변경점 : 생성되는 힌트박스의 스타일이 변경되었습니다.
 *		  이제 constraint 크기를 표시하는 힌트박스가 다른 힌트박스와 동일하게 배치됩니다.
 * 		  폼레이아웃의 row-shade-color,column-shade-color 가 표시됩니다.
 * 		 useStyleInfoMode 사용자 속성으로 통제하는 스타일 상세에 대한 힌트는 아직 구상중에 있습니다.
 * @author HANS
 ************************************************/

cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	var control = e.control;
	if(control instanceof cpr.core.AppInstance) {

		if(control.app.id.indexOf("DesignGuide") != -1) {
	var util = createNewHintKit();
	var vcHintCheckBox = new cpr.controls.Container();
	var vLayout = new cpr.controls.layouts.VerticalLayout();

	vcHintCheckBox.setLayout(vLayout);
	vcHintCheckBox.style.css({
		"background-color" : "#ffffff",
		"opacity" : 0.9
	});

	var vcClassCheck = new cpr.controls.CheckBox();
	vcClassCheck.text = "클래스 정보확인"
	vcClassCheck.addEventListener("value-change", function(e){
		util.configClassInfoHints(control, e.newValue);
	});
	var vcConstraintCheck = new cpr.controls.CheckBox();
	vcConstraintCheck.text = "Layouts";
	vcConstraintCheck.addEventListener("value-change", function(e){
		util.configConstriantInfoHints(control, e.newValue);
	});
	var vcGridCheck = new cpr.controls.CheckBox();
	vcGridCheck.text = "그리드 정보확인";
	vcGridCheck.addEventListener("value-change", function(e){
		util.configGridInfoHints(control, e.newValue);
	});

	var vcFormDivisionCheck = new cpr.controls.CheckBox();
	vcFormDivisionCheck.text = "FormDivision";
	vcFormDivisionCheck.addEventListener("value-change", function(e){
		util.showFormDivision(control, e.newValue);
	});

	vcHintCheckBox.addChild(vcClassCheck, {
		"width" : "100px",
		"height" : "30px",
		"autoSize" : "none"
	});
	vcHintCheckBox.addChild(vcConstraintCheck, {
		"width" : "100px",
		"height" : "30px",
		"autoSize" : "none"
	});
	vcHintCheckBox.addChild(vcGridCheck, {
		"width" : "100px",
		"height" : "30px",
		"autoSize" : "none"
	});
	vcHintCheckBox.addChild(vcFormDivisionCheck, {
		"width" : "100px",
		"height" : "30px",
		"autoSize" : "none"
	});

	control.floatControl(vcHintCheckBox,{
		"top" : "calc(50% - 50px)",
		"right" : "20px",
		"width" : "150px"
	});


	var vcSnippet = new cpr.controls.HTMLSnippet();
		vcSnippet.style.css("background-color","red");
		vcSnippet.value =
		"<style type='text/css'>"+
		".cl-output.hintman {"+
  		"background-color: #4D5052;"+
  		"opacity: 0.5;"+
		"border-radius: 5px;"+
  		"color: white;"+
  		"padding-left: 10px;"+
		"}"+
		".cl-output.hintman:not(.cl-selected):hover {"+
  		"opacity: 1;"+
		"}"+
		".importan {"
//		 + "border : solid 2px red !important}"+
		+"box-shadow: 0px 0px 0px 2px rgba(255,0,0,1)"+
		"</style>"

		control.floatControl(vcSnippet,{
			"width":"1px",
			"height":"1px",
			"top":"0px",
			"left":"0px"
		});
		vcSnippet.visible = false;
		}
	}
});

/**
 * 1.useClassHintMode : ("true" or anyting) 컨트롤이 가지고 있는 클래스에 대한 정보를 힌트로 제공할지의 여부를 체크합니다. 모든 컨트롤이 사용할 수 있는 사용자속성
 * 2.useGridHintMode : ("true" or anything) 그리드가 가지고있는 크기 들에 대한 정보를 힌트로 제공할지의 여부를 체크합니다. 그리드만
 * 3.useStyleInfoMode : ("true" or anything) 컨트롤이 가지고있는  스타일 상세에 대한 대체적으로 크기와 관련된 정보를 힌트로 제공할지의 여부를 체크합니다. 그리드를 제외한 모든 컨트롤, 검토중
 * 4.useConstraintHintMode : ("true" or anything) 컨트롤이 배치되어있는 컨테이너(그룹)내에서 배치된 컨트롤간의 간격과 여백에 대한 크기 정보를 힌트로 제공할지의 여부를 체크합니다.
 */

var vaClassInfoHints = [];
var vaGridInfoHints = [];
var vaConstraintInfoHints = [];
var vaStyleInfoHint = [];

//var vcSnippet;
function HintKit(){

}

/**
 * 현재 보여지고 있는 화면에 대해서 컨트롤이 가지고 있는 스타일 클래스 명을 표기해주는  함수입니다. 토글형식의 컨트롤이나 체크박스와 함께 사용할 수 있습니다.
 * @param {cpr.core.AppInstance} _app
 * @param {Boolean} bools
 */
HintKit.prototype.configClassInfoHints =  function(_app, bools) {

	if (bools) {

		var vcContainer = _app.getContainer();
		var voViewPortRect = vcContainer.getViewPortRect();

		vcContainer.getAllRecursiveChildren().forEach(function(/** cpr.controls.UIControl*/ each) {

//			if (each.userAttr("useClassHintMode") == "true") {

				var classes = each.style.getClasses();
				var voActualRect = each.getActualRect().bottomLeft;

			if(classes != "" && each.getVisualParentControl().type !="grid") {

				var vcOptHint = new cpr.controls.Output();
				vcOptHint.value = "class : " + classes;
				vcOptHint.unselectable = false;
				vcOptHint.style.setClasses("hintman");

				vcContainer.floatControl(vcOptHint, {
					"left": voActualRect.x + 20 + "px",
					"top": voActualRect.y + voViewPortRect.top - 10 + "px"
				});
				vaClassInfoHints.push(vcOptHint);
				vcOptHint.addEventListener("mouseenter", function(e) {
					vcOptHint.style.css("z-index", "5");
					each.style.addClass("importan");
				});
				vcOptHint.addEventListener("mouseleave", function(e) {
					vcOptHint.style.removeStyle("z-index");
					each.style.removeClass("importan");
				});
			}
//			}

		});

	} else {

		vaClassInfoHints.forEach(function(each) {
			each.dispose();
		});

	}
}

/**
 *
 * @param {cpr.core.AppInstance} _app
 * @param {Boolean} bools
 */
HintKit.prototype.configGridInfoHints = function(_app, bools) {
	if (bools) {

		var vcContainer = _app.getContainer();
		var voViewPortRect = vcContainer.getViewPortRect();
		vcContainer.getAllRecursiveChildren().forEach(function( /** cpr.controls.UIControl*/ each, idx) {

			if (each instanceof cpr.controls.Grid) {

//				if(each.userAttr("useGridHintMode") == "true") {
				var vaRowHeights = each.header.getRowHeights();
				var vaDetailHeights = each.detail.getRowHeights();
				var gridAR = each.getActualRect();

				var topRight = gridAR.topLeft;
				var trY = topRight.y;
//				var trX = topRight.x;
				var topLeft = gridAR.topLeft;

				var totalHeights = vaRowHeights.concat(vaDetailHeights);

				var width = 40;
				var height = 40;

				totalHeights.forEach(function(eachs) {
					if (eachs.height) {

						var horizontal = _createHorizontal();

						vcContainer.floatControl(horizontal, {
							"width": width + "px",
							"height": eachs.height + "px",
							"left": topRight.x + "px",
							"top": trY + voViewPortRect.top + "px"
						});
						var hints = _createHintBox(vcContainer, eachs.height+"px",{
							"left" : topRight.x + "px",
							"top" : trY + voViewPortRect.top + 20 +"px"
						});

						trY += eachs.height;
					}
					vaGridInfoHints.push(horizontal);
					vaGridInfoHints.push(hints);
				});
				//푸터 높이 구하는 스크립트
				var vaFootrerHeights = each.footer.getRowHeights();
				if (vaFootrerHeights.length > 0) {
					var voFooterDiv = document.querySelector(".cl-grid-footer");
					var footerRect = voFooterDiv.getBoundingClientRect();

					vaFootrerHeights.forEach(function(eachF) {
						if (eachF.height) {

							var horizontal = _createHorizontal();
							vcContainer.floatControl(horizontal, {
								"width": width + "px",
								"height": eachF.height + "px",
								"left": topRight.x  + "px",
								"top":footerRect.y+"px"
							});
							var hints = _createHintBox(vcContainer, eachF.height+"px", {
								"left" : topRight.x  +"px",
								"top" : footerRect.y + voViewPortRect.top + 20 +"px"
							})
						}
						vaGridInfoHints.push(horizontal);
						vaGridInfoHints.push(hints);
					});
				}

			}
		});
	} else {

		vaGridInfoHints.forEach(function(each) {
			each.dispose();
		});
	}

};

/**
 * 컨트롤이 가지고있는 스타일 상세를 알고싶을 때 사용할 예정
 * @param {cpr.core.AppInstance} _app
 * @param {Boolean} bools
 */
HintKit.prototype.configStyleInfoHint = function(_app, bools) {


}

/**
 * 컨테이너 위주의 단위를 보여줄때 Container내부 컨트롤 간의 spacing, margin 등등
 * @param {cpr.core.AppInstance} _app
 * @param {Boolean} bools
 */
HintKit.prototype.configConstriantInfoHints = function(_app, bools) {
	if (bools) {

		var vcContainer = _app.getContainer();
		var voViewPortRect = vcContainer.getViewPortRect();

		var vaContainerChild = vcContainer.getChildren().filter(function(each){
			return each instanceof cpr.controls.Container;
		});
		vaContainerChild.forEach(function( /** cpr.controls.Container*/ each) {

				var voLayout = each.getLayout();
				if(voLayout instanceof cpr.controls.layouts.XYLayout) {

					var children = each.getChildren();
					var child = children[0];
					var verticalSpacing = 0;
					var horizontalSpacing = 0;

					for (var idx = 1 ; idx < each.getChildrenCount() ; idx++) {

						if(children[idx].getOffsetRect().left - child.getOffsetRect().right > 0) {

							if(verticalSpacing != children[idx].getOffsetRect().left - child.getOffsetRect().right) {

								verticalSpacing = children[idx].getOffsetRect().left - child.getOffsetRect().right;

								var spacing = _createVertical();
//								spacing.optValue = verticalSpacing;
								each.floatControl(spacing,{
									"width" : verticalSpacing+"px",
									"height" : "20px",
									"top" : child.getOffsetRect().top + "px",
									"left": child.getOffsetRect().right + "px"
								});
									spacing.addEventListener("mouseenter", function(e) {

										each.style.addClass("importan");
									});
									spacing.addEventListener("mouseleave", function(e) {
										each.style.removeClass("importan");
									});
								var hintSpacing = _createHintBox(vcContainer, verticalSpacing+"px",{
									"top" : child.getOffsetRect().top+ 20 +"px",
									"left" : child.getOffsetRect().right + "px"
								});

								vaConstraintInfoHints.push(hintSpacing);
								vaConstraintInfoHints.push(spacing);
							}
						}

						if(children[idx].getOffsetRect().top - child.getOffsetRect().top  > 0) {

							if(horizontalSpacing != children[idx].getOffsetRect().top - child.getOffsetRect().top) {

								horizontalSpacing = children[idx].getOffsetRect().top - child.getOffsetRect().bottom;

								var spacing = _createHorizontal();
								each.floatControl(spacing,{
									"width" : "20px",
									"height" : horizontalSpacing + "px",
									"top" : children[idx].getOffsetRect().top-horizontalSpacing+"px",
									"left" : children[idx].getOffsetRect().left+ "px"
								});
								spacing.addEventListener("mouseenter", function(e) {

									each.style.addClass("importan");
								});
								spacing.addEventListener("mouseleave", function(e) {
									each.style.removeClass("importan");
								});
								var hintSpacing2 = _createHintBox(vcContainer, verticalSpacing+"px",{
									"top" : children[idx].getOffsetRect().top-horizontalSpacing + 20 +"px",
									"left" : children[idx].getOffsetRect().left + "px"
								});

								vaConstraintInfoHints.push(hintSpacing2);
								vaConstraintInfoHints.push(spacing);
							}
						}

						child = children[idx];

					}
				}
				else if(voLayout instanceof cpr.controls.layouts.FormLayout) {
					var horizontalSpacing = voLayout.horizontalSpacing;
					var horizontalMargin = voLayout.horizontalMargin;
					var verticalSpacing = voLayout.verticalSpacing;
					var verticalMargin = voLayout.verticalMargin;

					var marginHorizontal = _createHorizontal();
					each.floatControl(marginHorizontal, {
						"width" :  "40px",
						"height" : horizontalMargin,
						"left" : "calc(50%)",
						"top" : "0px"
					});
					marginHorizontal.addEventListener("mouseenter", function(e){

						each.style.addClass("importan");
					});
					marginHorizontal.addEventListener("mouseleave", function(e){
						each.style.removeClass("importan");
					});
					var hintMH = _createHintBox(each, horizontalMargin,{
						"top" : "10px",
						"left" : "calc(50%)"
					});
					vaConstraintInfoHints.push(hintMH);
					vaConstraintInfoHints.push(marginHorizontal);

					var spacingHorizontal = _createHorizontal();
					each.floatControl(spacingHorizontal, {
						"width" : "30px",
						"height" : horizontalSpacing,
						"left" : "calc(30%)",
						"top" : each.getChildren()[0].getOffsetRect().bottom +"px"
					});
					spacingHorizontal.addEventListener("mouseenter", function(e){
						each.style.addClass("importan");
					});
					spacingHorizontal.addEventListener("mouseleave", function(e){
						each.style.removeClass("importan");
					});
					var hintSH = _createHintBox(each, horizontalSpacing,{
						"top" : each.getChildren()[0].getOffsetRect().bottom +10+"px",
						"left" : "calc(30%)"
					});
					vaConstraintInfoHints.push(hintSH);
					vaConstraintInfoHints.push(spacingHorizontal);

					var marginVertical = _createVertical();
					each.floatControl(marginVertical,{
						"width" : verticalMargin,
						"height" : "30px",
						"left" : "0px",
						"top" : horizontalMargin
					});
					marginVertical.addEventListener("mouseenter", function(e){

						each.style.addClass("importan");
					});
					marginVertical.addEventListener("mouseleave", function(e){
						each.style.removeClass("importan");
					});
					var hintMV = _createHintBox(each, verticalMargin,{
						"top" : "0px",
						"left" : horizontalMargin
					});
					vaConstraintInfoHints.push(hintMV);
					vaConstraintInfoHints.push(marginVertical);
					var spacingVertical = _createVertical();
					each.floatControl(spacingVertical,{
						"width" : verticalSpacing,
						"height" : "30px",
						"left" : each.getChildren()[0].getOffsetRect().right+"px",
						"top" : "10px"
					});
					spacingVertical.addEventListener("mouseenter", function(e){

						each.style.addClass("importan");
					});
					spacingVertical.addEventListener("mouseleave", function(e){
						each.style.removeClass("importan");
					});
					var hintSV = _createHintBox(each, verticalSpacing,{
						"top" : "20px",
						"left" : each.getChildren()[0].getOffsetRect().right+"px"
					});
					vaConstraintInfoHints.push(hintSV);
					vaConstraintInfoHints.push(spacingVertical);

					voLayout.getRows().some(function(eachs,idx){
						if(voLayout.isUseRowShade(idx)) {
							var vsClass = "";
							each.style.getClasses().forEach(function(clas){
								vsClass +="." + clas
							});
							var rowShade = getComputedStyle(document.querySelector(vsClass+" .cl-formlayout-row-shade")).backgroundColor;
							var vsRowShadeColor = rgbToHex(rowShade);
//
							var hintRSC =_createHintBox(each, vsRowShadeColor,{
								"top" : eachs,
								"left" : "calc(10%)"
							});
							vaConstraintInfoHints.push(hintRSC);
							return each;
						}
					});

					voLayout.getColumns().some(function(eachs,idx){
						if(voLayout.isUseColumnShade(idx)) {
							var vsClass = "";
							each.style.getClasses().forEach(function(clas){
								vsClass += "." + clas;
							});
							var columnShade = getComputedStyle(document.querySelector(vsClass+" .cl-formlayout-column-shade")).backgroundColor;
							var vsColumnShadeColor = rgbToHex(columnShade);

							var hintCSC = _createHintBox(each,vsColumnShadeColor,{
								"bottom" : "calc(5%)",
								"left" : eachs
							});
							vaConstraintInfoHints.push(hintCSC);
							return each;
						}
					});

				}
				else if(voLayout instanceof cpr.controls.layouts.VerticalLayout) {

					var topHorizontal = _createHorizontal();
					each.floatControl(topHorizontal, {
						"width" : "40px",
						"height" : voLayout.topMargin+"px",
						"top" : "0px",
						"left" : "calc(50%)"
					});
					topHorizontal.addEventListener("mouseenter", function(e) {

						each.style.addClass("importan");
					});
					topHorizontal.addEventListener("mouseleave", function(e) {
						each.style.removeClass("importan");
					});
					var hintTH = _createHintBox(each, voLayout.topMargin+"px",{
						"top" : "0px",
						"left" : "calc(50%)"
					});
					vaConstraintInfoHints.push(hintTH);
					vaConstraintInfoHints.push(topHorizontal);

					var bottomHorizontal = _createHorizontal();
					each.floatControl(bottomHorizontal, {
						"width" : "40px",
						"height" : voLayout.bottomMargin+"px",
						"bottom" : "0px",
						"left" : "calc(50%)"
					});
					bottomHorizontal.addEventListener("mouseenter", function(e) {

						each.style.addClass("importan");
					});
					bottomHorizontal.addEventListener("mouseleave", function(e) {
						each.style.removeClass("importan");
					});
					var hintBH = _createHintBox(each, voLayout.bottomMargin+"px",{
						"left" : "calc(50%)",
						"bottom" : "0px"
					});
					vaConstraintInfoHints.push(hintBH);
					vaConstraintInfoHints.push(bottomHorizontal);

					var spacingHorizontal = _createHorizontal();
					each.floatControl(spacingHorizontal, {
						"width" : "40px",
						"height" : voLayout.spacing+"px",
						"top" : each.getFirstChild().getActualRect().bottom + "px",
						"left" : "calc(50%)"
					});
					spacingHorizontal.addEventListener("mouseenter", function(e) {

						each.style.addClass("importan");
					});
					spacingHorizontal.addEventListener("mouseleave", function(e) {
						each.style.removeClass("importan");
					});
					var hintSH = _createHintBox(each, voLayout.spacing+"px",{
						"top" : each.getFirstChild().getActualRect().bottom + 10 + "px",
						"left" : "calc(50%)"
					});
					vaConstraintInfoHints.push(hintSH);
					vaConstraintInfoHints.push(spacingHorizontal);

					var leftVertical = _createVertical();
					each.floatControl(leftVertical, {
						"width" : voLayout.leftMargin+"px",
						"height" : "30px",
						"left" : "0px",
						"top" : "calc(50%)"
					});
					leftVertical.addEventListener("mouseenter", function(e) {

						each.style.addClass("importan");
					});
					leftVertical.addEventListener("mouseleave", function(e) {
						each.style.removeClass("importan");
					});
					var hintLV = _createHintBox(each, voLayout.leftMargin+"px",{
						"top" : "calc(50%)",
						"left" : "0px"
					});
					vaConstraintInfoHints.push(hintLV);
					vaConstraintInfoHints.push(leftVertical);

					var rightVertical = _createVertical();
					each.floatControl(rightVertical,{
						"width" : voLayout.rightMargin +"px",
						"height": "30px",
						"right" : "0px",
						"top" : "calc(50%)"
					});
					rightVertical.addEventListener("mouseenter", function(e) {

						each.style.addClass("importan");
					});
					rightVertical.addEventListener("mouseleave", function(e) {
						each.style.removeClass("importan");
					});
					var hintRV = _createHintBox(each, voLayout.rightMargin+"px",{
						"top" : "calc(50%)",
						"right" : "0px"
					});
					vaConstraintInfoHints.push(hintRV);
					vaConstraintInfoHints.push(rightVertical);

				}
				else if(voLayout instanceof cpr.controls.layouts.FlowLayout) {

					var spacingHorizontal = _createHorizontal();
					var firstChild = each.getFirstChild();
					each.floatControl(spacingHorizontal,{
						"width" : "40px",
						"height" : voLayout.spacing +"px",
						"top" : firstChild.getActualRect().bottom + "px",
						"left" : firstChild.getActualRect().bottomCenter.x +"px"
					});

					vaConstraintInfoHints.push(spacingHorizontal);
					var spacingVertical = _createVertical();

					each.floatControl(spacingVertical,{
						"width" : voLayout.spacing + "px",
						"height" : "40px",
						"top" : firstChild.getActualRect().top +"px",
						"left" : firstChild.getActualRect().right +"px"
					});
					vaConstraintInfoHints.push(spacingVertical);
				}
//			}

		});
	} else {
		vaConstraintInfoHints.forEach(function(each){
			each.dispose();
		});
	}

}

function rgbToHex(rgbType) {
	  var rgb = rgbType.replace( /[^%,.\d]/g, "" );
        // 쉼표(,)를 기준으로 분리해서, 배열에 담기.
        rgb = rgb.split( "," );

  return "#" + Number(rgb[0]).toString(16) + Number(rgb[1]).toString(16) + Number(rgb[2]).toString(16);
}


/**
 *
 * @param {cpr.controls.Container} vcContainer
 * @param {String} values
 * @param {cpr.controls.layouts.Constraint} Constraint
 */
function _createHintBox(vcContainer,values,Constraint){
	var vcOptHint = new cpr.controls.Output();
				vcOptHint.value = values;
				vcOptHint.unselectable = false;
//				vcOptHint.style.setClasses("hint-box");
				vcContainer.floatControl(vcOptHint,Constraint);
//				vaClassInfoHints.push(vcOptHint);

				vcOptHint.addEventListener("mouseenter", function(e) {
					vcOptHint.style.css("z-index", "5");
				});
				vcOptHint.addEventListener("mouseleave", function(e) {
					vcOptHint.style.removeStyle("z-index");
				});
		return vcOptHint;
}

function _createHorizontal() {

	var group_1 = new cpr.controls.Container();
	group_1.style.css({
		"border-top-width": "1px",
		"border-bottom-color": "red",
		"border-bottom-width": "1px",
		"border-top-color": "red",
		"border-bottom-style": "solid",
		"border-top-style": "solid"
	});
	// Layout
	var formLayout_1 = new cpr.controls.layouts.FormLayout();
	formLayout_1.topMargin = "0px";
	formLayout_1.rightMargin = "0px";
	formLayout_1.bottomMargin = "0px";
	formLayout_1.leftMargin = "0px";
	formLayout_1.horizontalSpacing = "0px";
	formLayout_1.verticalSpacing = "0px";
	formLayout_1.verticalSeparatorWidth = 1;
	formLayout_1.verticalSeparatorColor = "red";
	formLayout_1.setColumns(["1fr", "1fr"]);
	formLayout_1.setRows(["1fr"]);
	group_1.setLayout(formLayout_1);
	(function(container) {})(group_1);

	return group_1;
}

function _createVertical() {

	var group_2 = new cpr.controls.Container();
	group_2.style.css({
		"border-right-style": "solid",
		"border-right-width": "1px",
		"border-left-style": "solid",
		"border-left-color": "red",
		"border-right-color": "red",
		"border-left-width": "1px"
	});
	// Layout
	var formLayout_2 = new cpr.controls.layouts.FormLayout();
	formLayout_2.topMargin = "0px";
	formLayout_2.rightMargin = "0px";
	formLayout_2.bottomMargin = "0px";
	formLayout_2.leftMargin = "0px";
	formLayout_2.horizontalSpacing = "0px";
	formLayout_2.verticalSpacing = "0px";
	formLayout_2.horizontalSeparatorWidth = 1;
	formLayout_2.horizontalSeparatorColor = "red";
	formLayout_2.setColumns(["1fr"]);
	formLayout_2.setRows(["1fr", "1fr"]);
	group_2.setLayout(formLayout_2);
	(function(container) {})(group_2);

	return group_2;
}
/**
 *
 * @param {cpr.core.AppInstance} _app
 * @param {Boolean} bools
 */
HintKit.prototype.showFormDivision = function(_app,bools){

	var voAppIns = _app;

	voAppIns.getContainer().getAllRecursiveChildren().forEach(function(/*cpr.controls.Control*/each){

		if(each instanceof cpr.controls.Container) {

			if(each.getLayout() instanceof cpr.controls.layouts.FormLayout) {

				drawHorizontalPlan(each,bools);
				drawVerticalPlan(each,bools);
			}
		}
	});
}
/**
 *
 * @param {cpr.controls.layouts.FormLayout} layout
 */
function calcWidthFr(layout){

	var lay = layout;


	var cols = lay.getColumns();//컬럼 구획 크기 가져오기
	var colSp = lay.horizontalSpacing;//가로 간격
	var leftM = lay.leftMargin;//좌 여백
	var rightM = lay.rightMargin;//우 여백

	var corFr = cols.filter(function(each){
		return each.indexOf("fr") >=0;
	});
	corFr = corFr.map(function(each){
		return parseInt(each.replace("fr", ""));
	});
	var res = 0 ;
	corFr.forEach(function(each){
		res+= each;
	});
			//컬럼 구획 fr인 애들 전부 더하기

	if(leftM.indexOf("fr") >=0) {

		res += parseInt(leftM.replace("fr", ""));
	}//좌 마진이 fr이면 더하기
	if(rightM.indexOf("fr") >= 0) {

		res += parseInt(rightM.replace("fr",""));
	}//우 마진이 fr이면 더하기

	if(colSp.indexOf("fr") >= 0) {

		res += parseInt(colSp.replace("fr", "")) * (cols.length -1)
	}//간격이 fr이면 간격만큼 더하기

	return res;
}

/**
 *
 * @param {cpr.controls.layouts.FormLayout} layout
 */
function calcHeightFr(layout) {

	var lay = layout;

	var rows = lay.getRows();
	var rowSp = lay.verticalSpacing;
	var topM = lay.topMargin;
	var botM = lay.bottomMargin;

	var rowFr = rows.filter(function(each){
		return each.indexOf("fr") >=0;
	});

	rowFr = rowFr.map(function(each){
		return parseInt(each.replace("fr", ""));
	});

	var res = 0;
	rowFr.forEach(function(each){
		res += each;
	});
	if(topM.indexOf("fr") >=0) {

		res += parseInt(topM.replace("fr", ""));
	}//좌 마진이 fr이면 더하기
	if(botM.indexOf("fr") >= 0) {

		res += parseInt(botM.replace("fr",""));
	}//우 마진이 fr이면 더하기

	if(rowSp.indexOf("fr") >= 0) {

		res += parseInt(rowSp.replace("fr", "")) * (rows.length -1)
	}//간격이 fr이면 간격만큼 더하기

	return res;
}

var horizontals = [];

/**
 *
 * @param {cpr.controls.Container} pcContainer
 * @param {Boolean} pb
 */
function drawHorizontalPlan(pcContainer,pb){
	if(pb) {

	var grp = pcContainer;
/** @type cpr.controls.layouts.FormLayout */
	var layouts = grp.getLayout();
	var allFr = calcWidthFr(layouts);
	var cols = layouts.getColumns();

	var width = grp.getActualRect().width;

	var colPx = cols.filter(function(each){
		return each.indexOf("px") >= 0;
	});
	var survivedWidth = width;

	colPx.forEach(function(each){
		var pxWidth = parseInt(each.replace("px",""));

		survivedWidth -= pxWidth;
	});

	if(layouts.rightMargin.indexOf("px") >= 0){
		survivedWidth -= parseInt(layouts.rightMargin.replace("px", ""));
	}

	var startMan = grp.getActualRect().left;
	var margin = 0;
	if(layouts.leftMargin.indexOf("fr") >= 0 ) {
		margin = survivedWidth * parseInt(layouts.leftMargin.replace("fr","")) / allFr;
		startMan += margin
	} else {
		survivedWidth -= parseInt(layouts.leftMargin.replace("px",""));
		margin = parseInt(layouts.leftMargin.replace("px", ""));
		startMan += margin;
	}

	var spacing = 0;
	if(layouts.horizontalSpacing.indexOf("fr") >= 0 ) {
		spacing = survivedWidth * parseInt(layouts.horizontalSpacing.replace("fr","")) / allFr;
	} else {
		spacing = parseInt(layouts.horizontalSpacing.replace("px", ""));
		survivedWidth -= parseInt(layouts.horizontalSpacing.replace("px",""))*(cols.length-1);
	}

	cols.forEach(function(each){
		var button = new cpr.controls.Button();
		button.value = each;
		button.style.addClass("btn-outline-light");
		var constraint = {
			"left" : startMan+"px",
			"top" : grp.getActualRect().bottom+"px",
			"width" : "",
			"height" : "25px"
		}
		if(each.indexOf("fr") >= 0) {

			constraint.width = survivedWidth * parseInt(each.replace("fr", "")) / allFr +"px";
		} else {

			constraint.width = each;
		}

		pcContainer.getAppInstance().getContainer().floatControl(button, constraint);
		horizontals.push(button);
		startMan += parseInt(constraint.width.replace("px", "")) + spacing
 	});
 	} else {

 		horizontals.forEach(function(each){
 			each.dispose();
 		})
 	}
}


var verticals = [];
/**
 *
 * @param {cpr.controls.Container} pcContainer
 * @param {Boolean} pb
 */
function drawVerticalPlan(pcContainer,pb) {
	if(pb){

	var grp = pcContainer;
/** @type cpr.controls.layouts.FormLayout */
	var layouts = grp.getLayout();
	var allFr = calcHeightFr(layouts);
	var rows = layouts.getRows();
	var height = grp.getActualRect().height;

	var rowPx = rows.filter(function(each){
		return each.indexOf("px") >= 0;
	});
	var survivedHeight = height;

	rowPx.forEach(function(each){
		var psHeight = parseInt(each.replace("px",""));

		survivedHeight -= psHeight;
	});

	if(layouts.bottomMargin.indexOf("px") >= 0){
		survivedHeight -= parseInt(layouts.bottomMargin.replace("px", ""));
	}

	var startMan = grp.getActualRect().top;
	var margin = 0;
	if(layouts.topMargin.indexOf("fr") >= 0 ) {
		margin = survivedHeight * parseInt(layouts.topMargin.replace("fr","")) / allFr;
		startMan += margin
	} else {
		survivedHeight -= parseInt(layouts.topMargin.replace("px",""));
		margin = parseInt(layouts.topMargin.replace("px", ""));
		startMan += margin;
	}

	var spacing = 0;
	if(layouts.verticalSpacing.indexOf("fr") >= 0 ) {
		spacing = survivedHeight * parseInt(layouts.verticalSpacing.replace("fr","")) / allFr;
	} else {
		spacing = parseInt(layouts.verticalSpacing.replace("px", ""));
		survivedHeight -= parseInt(layouts.verticalSpacing.replace("px",""))*(rows.length-1);
	}

	rows.forEach(function(each){
		var button = new cpr.controls.Button();
		button.value = each;
		button.style.addClass("btn-outline-light");
		var constraint = {
			"left" : grp.getActualRect().right+"px",
			"top" : startMan+"px",
			"width" : "100px",
			"height" : ""
		}
		if(each.indexOf("fr") >= 0) {

			constraint.height = survivedHeight * parseInt(each.replace("fr", "")) / allFr +"px";
		} else {

			constraint.height = each;
		}

		pcContainer.getAppInstance().getContainer().floatControl(button, constraint);
		verticals.push(button);
		startMan += parseInt(constraint.height.replace("px", "")) + spacing
 	});
 	} else {

 		verticals.forEach(function(each){

 			each.dispose();
 		});
 	}
}

function createNewHintKit() {
	return new HintKit();
}
globals.createNewHintKit = createNewHintKit;
