/************************************************
 * verticalSlider.js
 * Created at 2020. 11. 20. 오전 9:29:32.
 *
 * @author HANS
 ************************************************/

var vnIntervalTime = 3000;
var vnOutputHeight = 35;
var vaColumnDatas;
/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};
var voIntervalObj;
var vnIndex = 0;
function intervalFunc(){

	app.getContainer().adjustScroll(0,vnOutputHeight+5,0.3);
	
	if(vnIndex !=0){
		
	setTimeout(function(){
		
		app.getContainer().reorderChild(app.getContainer().getChildren()[0], 20);
	}, 300);
	}
	vnIndex++;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	/** @type cpr.data.DataSet */
	var vcDs = app.getAppProperty("dataSet");
	
	var vsTargetColNm = app.getAppProperty("targetColNm");
	
		vaColumnDatas = vcDs.getColumnData(vsTargetColNm);		

		vaColumnDatas.forEach(function(each,idx){
			
			var vcNewOutput = new cpr.controls.Output();
			vcNewOutput.value = each;
			var voContainer = app.getContainer();
			
			voContainer.addChild(vcNewOutput, {
				width : "100px",
				height : vnOutputHeight+"px",
				autoSize : "width"
			});
		});
	
	voIntervalObj = setInterval(intervalFunc, vnIntervalTime);
}


/*
 * 루트 컨테이너에서 unload 이벤트 발생 시 호출.
 * 앱이 언로드된 후 발생하는 이벤트입니다.
 */
function onBodyUnload(/* cpr.events.CEvent */ e){
	clearInterval(voIntervalObj);
}


/*
 * 루트 컨테이너에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onBodyMouseenter(/* cpr.events.CMouseEvent */ e){
	clearInterval(voIntervalObj);
}


/*
 * 루트 컨테이너에서 mouseleave 이벤트 발생 시 호출.
 * 사용자가 컨트롤 및 컨트롤의 자식 영역 바깥으로 마우스 포인터를 이동할 때 발생하는 이벤트.
 */
function onBodyMouseleave(/* cpr.events.CMouseEvent */ e){
	
	voIntervalObj = setInterval(intervalFunc, vnIntervalTime);
}
