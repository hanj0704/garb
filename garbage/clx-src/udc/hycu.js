/************************************************
 * hycu.js
 * Created at 2019. 9. 30. 오후 2:38:00.
 *
 * @author HANS
 ************************************************/
 var vnContainerNumber = 1;
 
/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/**
 * 
 * @param {cpr.controls.Container} container
 */
function getRemainHeight(container){
	
	var height = container.getActualRect().height;
	
	/** @type cpr.controls.layouts.VerticalLayout */
	var layout = container.getLayout();
	
	var realHeight = height - layout.topMargin - layout.bottomMargin;
	
	container.getAllRecursiveChildren().forEach(function(each){
		
//		if(realHeight < 0 ) {
		console.log("빼버리는 컨트롤 :" +each.value);
		console.log("현재 크기 : " + realHeight);
		console.log("빼는 크기 : "+ each.getActualRect().height);
		console.log("간격 : "+ layout.spacing);
//			return realHeight;

//		}
		
		realHeight = realHeight - each.getActualRect().height - layout.spacing;

	});
	
	return realHeight;
}


/**
 * 
 * @param {Array} paramLabelArray
 * @param {Array} paramValueArray
 */
 function setMenuContent(paramLabelArray,paramValueArray) {
/** @type cpr.data.DataSet */
	var vcDataSet = app.getAppProperty("dataS");
		var MainGrp = app.lookup("grpContent");
	paramValueArray.forEach(function(each){
		
		var childrenValues = vcDataSet.findAllRow("parentValue =='"+each+"'").map(function(each){
			return each.getValue("label");		
			});
		var parentLabel = vcDataSet.findFirstRow("value =='"+each+"'").getValue("label");
//			console.log(childrenValues);
//		var udcs = new udc.hycuMenu();
//		udcs.configMenu(each,childrenValues);
//		insertIntoMenu(udcs);


//		vnContainerNumber++;
		
		var opt = new cpr.controls.Output("opt"+parentLabel);
		opt.style.addClass("menu-title");
		opt.value = parentLabel;
		
		/** @type cpr.controls.Container */
		var container = app.lookup("grp"+vnContainerNumber);

		console.log("아니 뭔데 : " + container.id);
//		if(getRemainHeight(container) > 0) {
			container.addChild(opt, {
				"width" : "100px",
				"height": "35px",
			});	
//		} else {
//			vnContainerNumber++;
//			var container = new cpr.controls.Container("grp"+vnContainerNumber);
//			console.log(container.id);
//			var vLayout = new cpr.controls.layouts.VerticalLayout();
//			vLayout.bottomMargin = 10;
//			vLayout.topMargin = 10;
//			vLayout.leftMargin = 10;
//			vLayout.rightMargin = 10;
//			
//			container.setLayout(vLayout);
//			
//				MainGrp.addChild(container, {
//				"width" : "142px",
//				"height" : "330px",
//				"autoSize" : "none"
//			});
//			
//			container.addChild(opt, {
//				"width" : "100px",
//				"height": "35px",
//			});	
//		}
		
		
	childrenValues.forEach(function(eacha){
		
	var miniOpt = new cpr.controls.Output();
		miniOpt.value = eacha;
		
		var insContainer = app.lookup("grp"+vnContainerNumber);
		insContainer.addChild(miniOpt, {
			"width" : "100px",
			"height": "20px",
			"autoSize":"height"
		});
		
		insContainer.redraw();
		cpr.core.DeferredUpdateManager.INSTANCE.update();
		console.log("현재 비교중인 컨테이너 : "+insContainer.id);
		if(getRemainHeight(insContainer) < 0) {

			insContainer.removeChild(miniOpt);
			
			vnContainerNumber++;
			
			var instantContainer = new cpr.controls.Container("grp"+vnContainerNumber);
			console.log("자리가 모질라서 생성되는 컨테이너 :" +instantContainer.id);
			var vLayout = new cpr.controls.layouts.VerticalLayout();
			vLayout.bottomMargin = 10;
			vLayout.topMargin = 10;
			vLayout.leftMargin = 10;
			vLayout.rightMargin = 10;
			
			instantContainer.setLayout(vLayout);
			
			var instOpt = new cpr.controls.Output();
				instOpt.style.addClass("menu-title");
				instOpt.value = parentLabel;
			instantContainer.addChild(instOpt, {
			"width" : "100px",
			"height": "35px",
			});
			
			MainGrp.addChild(instantContainer, {
				"width" : "142px",
				"height" : "330px",
				"autoSize" : "none"
			});
			miniOpt = new cpr.controls.Output();
			miniOpt.value = eacha;
			
			instantContainer.addChild(miniOpt, {
				"width" : "100px",
				"height": "20px",
				"autoSize":"height"
			});
		}
		
		
	});
		
	});
	
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	/** @type cpr.data.DataSet */
	var vcDataSet = app.getAppProperty("dataS");
	
	
	var parentRowValue = vcDataSet.findAllRow("parentValue == ''").map(function(each){
		return each.getValue("value");
	});
	var parentRowLabel = vcDataSet.findAllRow("parentValue == ''").map(function(each){
		return each.getValue("label");
	});
	setMenuContent(parentRowLabel,parentRowValue);
	
}

