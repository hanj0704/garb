/************************************************
 * Animation2.js
 * Created at 2020. 10. 27. 오전 8:58:02.
 *
 * @author HANS
 ************************************************/

var vaAreaItem  = [];


function openAreaInfo(/* cpr.events.CMouseEvent*/e) {
	/** @type cpr.controls.UIControl */
	var vcTarget = e.control;
	
	vcTarget.addEventListener("mouseleave", removeUnitInfo);
	
	var vcAreaInfo = new udc.scr.AreaDetail("area");
	vcAreaInfo.style.css({
		"background-color" : "white",
		"border" : "1px solid gray",
		"border-radius" : "4px",
		"opacity" : "0.9"
	});
	
	vcAreaInfo.areaName = vcTarget.userAttr("areaName");
	vcAreaInfo.statusConverter = vcTarget.userAttr("statusConverter");
	vcAreaInfo.statusScouring = vcTarget.userAttr("statusScouring");
	vcAreaInfo.statusMold = vcTarget.userAttr("statusMold");
	vcAreaInfo.statusRolling = vcTarget.userAttr("statusRolling");
	
	var voTargetActualRect = vcTarget.getActualRect();
	
	var vnTop = 0;
	var vnLeft = 0;
	var vnWidth = 180;
	var vnHeight = 145;
	
	vnLeft = voTargetActualRect.bottomRight.x + vnWidth > window.innerWidth ?
		voTargetActualRect.topLeft.x - vnWidth : voTargetActualRect.bottomRight.x;
		
	vnTop = voTargetActualRect.bottomRight.y + vnHeight > window.innerHeight ?
		voTargetActualRect.topLeft.y : voTargetActualRect.bottomRight.y;
		
		app.getRootAppInstance().floatControl(vcAreaInfo,{
			"top" : vnTop +"px",
			"left" : vnLeft +"px",
			"width" :vnWidth +"px",
			"height" : vnHeight +"px"
		});
}

function removeUnitInfo(){
	
	app.getRootAppInstance().removeFloatingControl(app.getRootAppInstance().lookup("area"),true);
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	vaAreaItem = app.getContainer().getAllRecursiveChildren().filter(function(each){
		
		return each.userAttr("areaitem") == "Y";
	});
	
}


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGroupClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var group = e.control;
	app.lookup("imgSub").src = group.userAttr("image");
	
	vaAreaItem.forEach(function(each){
		
		if(each.userAttr("filter")== group.userAttr("filtOption")) {
			each.visible = true;
		}else {
			each.visible = false;
		}
	});
}


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGroupClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var vcGrpTarget = e.control;
	
	var vsAppId = vcGrpTarget.userAttr("appID");
	
	new cpr.core.App.load(vsAppId, function(loadedApp){
		var hostAppInstance = app.getHostAppInstance();
		if (hostAppInstance){
			/** @type cpr.controls.EmbeddedApp */
			var vcHostEa = app.getHost();
			/** @type cpr.controls.MDIFolder */
			var vcMdiCn = vcHostEa.getParent();
			
			vcHostEa.app = loadedApp;
			var vcTabItem = vcMdiCn.getItemForContent(vcHostEa);
			
			/* MDI 텍스트와 툴팁 변경 */
			if (!ValueUtil.isNull(vcTabItem)){
				vcHostEa.ready(function(ea){
					var vsAppTitle = ea.app.title;
					
					vcTabItem.text = vsAppTitle;
					vcTabItem.tooltip = vsAppTitle;
				});
			}
		} else {
			loadedApp.createNewInstance().run();
			app.dispose();
		}
	});
}




/*
 * 그룹에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onGroupMouseenter(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var group = e.control;
	
	openAreaInfo(e);
}


/*
 * 그룹에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onGroupClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var group = e.control;
	
	alert(group.userAttr("tooltip"));
}
