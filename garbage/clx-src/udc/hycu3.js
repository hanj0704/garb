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
	
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	/** @type cpr.data.DataSet */
	var vcDataSet = app.getAppProperty("dataS");
	
	var voMenuTitle = vcDataSet.findAllRow("parentValue == ''");
	var vcContentContainer = app.lookup("grpContent");
	
	
	voMenuTitle.forEach(function(each){
		
		
//		vcDataSet.findAllRow("")

		var lbxs = new cpr.controls.ListBox("lbx"+vnContainerNumber);
				
	});	
		
	

	 var vcDsView = new cpr.data.DataView("", vcDataSet);
	 vcDsView.parseData({"filterCondition": "idx < 14"});
	 
	 var lbx = app.lookup("lbx1");
	 
	 lbx.setItemSet(vcDsView,{
	 	label : "label",
	 	value : "value",
	 	icon : null,
	 	tooltip : null
	 });
	 
	
}



/*
 * 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var listBox = app.lookup("lbx1");
	
}
