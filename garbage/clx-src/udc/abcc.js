/************************************************
 * abcc.js
 * Created at 2020. 4. 16. 오후 4:23:58.
 *
 * @author HANS
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};



/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	
//	app.lookup("ipb1").value = app.getAppProperty("value");
	console.log("PROPERTY-CHANGE가 발생했습니다");
	console.log(e.property);
	console.log(e.newValue);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	/** @type Object */
	var voApps = app.getAllAppProperties();
	console.log(voApps);
	
	var voHost = app.getHost();
	var vaPropNms = Object.keys(voApps);
	vaPropNms.forEach(function(each){
		var vbIsBindable = voHost.isBindable(each);
		console.log(vbIsBindable);
		if(!vbIsBindable) {
			return;
		}
		var voBindInfo = voHost.getBindInfo(each);
		if(ValueUtil.fixNull(voBindInfo) == "") {
			return;
		}
		console.log(voBindInfo);
		var vsType = voBindInfo.type;
		if(vsType == "datamap") {
			app.getHostAppInstance().lookup(voBindInfo.srcId).addEventListener("update", function(ev){
				console.log("UDC내에 선언한 개별 업데이트 리스너 캐치");
				app.getContainer().redraw();
				var q= app.getAppProperty("value");
				console.log(q);
				app.dispatchEvent(new cpr.events.CPropertyChangeEvent(each, "", q));
			});
		}
		
	});
}
