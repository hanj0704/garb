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
 * @param {Number} paramHeight
 */
function isScrolled(paramHeight) {
/** @type cpr.controls.Container */
var container = app.lookup("grp"+vnContainerNumber);

var vnHeight = container.getActualRect().height;
	
	if(vnHeight > paramHeight) {
		
		return true;
	} else {
		return false;
	}
}

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
		console.log(each.getActualRect().height);
		realHeight = realHeight - each.getActualRect().height - layout.spacing;
	});
	
	console.log(realHeight);
	return realHeight;
}
/**
 * 
 * @param {String} paramMasterString
 * @param {Array} paramSlaveArray
 */
 function setMenuContent(paramMasterString,paramSlaveArray) {
/** @type cpr.data.DataSet */
	var vcDataSet = app.getAppProperty("dataS");
	
	
	var opt = new cpr.controls.Output();
	
	opt.style.addClass("instantClass");
	opt.value = paramMasterString;

	var container = app.lookup("grp1");
		container.insertChild(0,opt, {
			"width" : "100px",
			"height": "35px",
		});
		
		
	paramSlaveArray.forEach(function(each){
		
	var miniOpt = new cpr.controls.Output();
		miniOpt.value = each;
		
		/** @type cpr.controls.Container */
		var insContainer = app.lookup("grp"+vnContainerNumber);
		
		insContainer.addChild(miniOpt, {
			"width" : "100px",
			"height": "20px",
			"autoSize":"height"
		});
		
		insContainer.redraw();
		cpr.core.DeferredUpdateManager.INSTANCE.update();
		
		if(getRemainHeight(insContainer) < 0) {
			
			insContainer.removeChild(miniOpt);
			
			vnContainerNumber++;
			
			var instantContainer = new cpr.controls.Container();
			
			var vLayout = new cpr.controls.layouts.VerticalLayout();
			vLayout.bottomMargin = 10;
			vLayout.topMargin = 10;
			instantContainer.setLayout(vLayout);
			
			instantContainer.addChild(opt, {
			"width" : "100px",
			"height": "35px",
			});
			
			var MainGrp = app.lookup("grpContent");
			MainGrp.addChild(instantContainer, {
				"width" : "117px",
				"height" : "328px",
				"autoSize" : "none"
			});
			
			instantContainer.addChild(miniOpt, {
				"width" : "100px",
				"height": "20px",
				"autoSize":"height"
			});
		}
		
		
	});
}

/*
 * "교과" 아웃풋(opt3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOpt3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var opt3 = e.control;
	
	/** @type cpr.data.DataSet */
	var vcDataSet = app.getAppProperty("dataS");
	
	var rootRow = vcDataSet.findFirstRow("label == '"+opt3.value+"'");
	
	var rootValue = rootRow.getValue("value");
	
	var slaveRows = vcDataSet.findAllRow("parentValue == '"+rootValue+"'").map(function(each){
		return each.getValue("label");
	});;
	
	setMenuContent(rootValue, slaveRows);
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
	
	var container = app.lookup("grp1");
	
//	console.log(container.getActualRect());
//	
//	console.log(container.getViewPortRect());

	getRemainHeight(app.lookup("grp1"));
}
