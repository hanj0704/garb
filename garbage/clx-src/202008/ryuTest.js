/************************************************
 * ryuTest.js
 * Created at 2020. 8. 14. 오후 3:51:28.
 *
 * @author han
 ************************************************/

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
	
//	console.log(res);
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
	
	console.log(res);
	return res;
}


/**
 * 
 * @param {Container} pcContainer
 */
function drawHorizontalPlan(pcContainer){
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
		
		app.getContainer().floatControl(button, constraint);
		
		startMan += parseInt(constraint.width.replace("px", "")) + spacing
 	});
}


/**
 * 
 * @param {cpr.controls.Container} pcContainer
 */
function drawVerticalPlan(pcContainer) {
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
		
		app.getContainer().floatControl(button, constraint);
		
		startMan += parseInt(constraint.height.replace("px", "")) + spacing
 	});
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var control = e.control;	
		
		control.getContainer().getAllRecursiveChildren().forEach(function(/*cpr.controls.Control*/each){
			
			if(each instanceof cpr.controls.Container) {
				
				if(each.getLayout() instanceof cpr.controls.layouts.FormLayout) {
					
					drawHorizontalPlan(each);
					drawVerticalPlan(each);
					
						var hint = new cpr.controls.Button();
						hint.value = "?";
						
						app.getContainer().addChild(hint, {
							"left" : each.getActualRect().right - 25+"px",
							"top" : each.getActualRect().bottom - 25+"px",
							"width":"25px",
							"height":"25px"
						});
						var layout = each.getLayout();
							var output = new cpr.controls.Output();
							
							output.value = " topMargin : "+layout.topMargin
										 + "\n bottomMargin : "+layout.bottomMargin
										 + "\n leftMargin : " +layout.leftMargin
										 + "\n rightMargin : " +layout.rightMargin
										 + "\n horizontalSpacing : " + layout.horizontalSpacing
										 + "\n verticalSpacing : " + layout.verticalSpacing
										 
							output.visible = false;
						hint.addEventListener("click", function(e){
							if(!output.visible){
								output.visible = true;
							app.getContainer().floatControl(output, {
								"left" : e.control.getActualRect().right +"px",
								"top" : e.control.getActualRect().top + "px",
								"width":"300px",
								"height":"auto"
							});
							} else {
								output.visible = false;
							}
						});
						
				}
			}
			
			if(each.userAttr("hints") != "") {
				var huntsMan = new cpr.controls.Button();
				huntsMan.value = "?"
				app.getContainer().addChild(huntsMan, {
							"left" : each.getActualRect().right - 25+"px",
							"top" : each.getActualRect().bottom - 25+"px",
							"width":"25px",
							"height":"25px"
						});
							var output = new cpr.controls.Output();
							
							output.value = each.userAttr("hints")
										 
							output.visible = false;
						huntsMan.addEventListener("click", function(e){
							if(!output.visible){
								output.visible = true;
							app.getContainer().floatControl(output, {
								"left" : e.control.getActualRect().right +"px",
								"top" : e.control.getActualRect().top + "px",
								"width":"300px",
								"height":"auto"
							});
							} else {
								output.visible = false;
							}
						});
			}
		});
}
