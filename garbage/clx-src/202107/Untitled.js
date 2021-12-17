/************************************************
 * Untitled.js
 * Created at 2021. 7. 16. 오후 2:42:52.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
//	app.lookup("sms1").setRequestEncoder(requestEncoder);
	app.lookup("sms1").send();
}


function requestEncoder(psub,reqData) {
	
	var sub = psub;
	/** @type String */
	var vsReq = reqData;
	console.log(vsReq);
	var vaReq = vsReq.split("&");
	
	vaReq.forEach(function(each,idx){
		
		var keys = each.split("=");
		
	});
	
//	var q =[];
//	for(var keys  in voJsonType){
//		q.push(voJsonType[keys]);
//	}
	
	return {"content" : reqData};
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
		
		app.dialogManager.openDialog("202107/POP_Tit", "nm1", {width : 400,height:0,left : -400, top : -300},
		 function(dialog){
			dialog.ready(function(/*cpr.controls.Dialog*/aps){
				
				aps.addEventListener("load", function(e){
					console.log(e.control.getEmbeddedAppInstance().getContainer().getContentPaneRect());
					app.dialogManager.replaceConstraintByName("nm1", {
						width : 400,
						height : e.control.getEmbeddedAppInstance().getContainer().getContentPaneRect().height+45
					})					
				});
			})
		})
}
