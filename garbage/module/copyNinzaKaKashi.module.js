/************************************************
 * copyNinzaKaKashi.module.js
 * Created at 2020. 7. 21. 오후 5:59:52.
 * 해당 모듈은 웹소켓을 사용하여 화면에 대한 데이터를 저장하여 
 * @author han
 ************************************************/

var moCopyData = {"control" :[]
				 ,"dataComponent":[]
				 ,"embedded":[]};

var controlKind = ["combobox","inputbox","numbereditor","dateinput","radiobutton","listbox","maskeditor","checkbox"];


function copyKit(){
	
}

/**
 * 임베디드앱, udc내부에 있는 데이터를 추출하기 위해 만들어진 함수입니다.
 * @private
 * @param {cpr.core.AppInstance} _app
 */
function _copyData(_app) {
	var smallCopyData ={"control":[]
				,"dataComponent":[]};
	var _app = _app;
	
	var vcContainer = _app.getContainer();
	
	vcContainer.getAllRecursiveChildren().forEach(function(each){
		
		if(controlKind.indexOf(each.type) >= 0){

				var isBinded = false;
				if(each.getBindInfo("value") != undefined && each.getBindInfo("value").type == "datacolumn") {
						
						isBinded = true;
					}
				smallCopyData.control.push({"id" 	 	: each.id
										   ,"value" 	: each.value
										   ,"isBinded"  : isBinded
									 });
		}
	});
	
	_app.getAllDataControls().forEach(function(each){

		if(each.type == "dataset") {
			smallCopyData.dataComponent.push({"id" : each.id
										,"value": each.getRowDataRanged()
			});
		}
		else if(each.type == "datamap") {
			smallCopyData.dataComponent.push({"id" : each.id
										,"value": each.getDatas()
			});
		}
	});
	return smallCopyData;
}
/**
 * 
 * @param {cpr.core.AppInstance} _app
 */
copyKit.prototype.copyPage = function(_app){
	moCopyData ={"control":[]
				,"dataComponent":[]
				,"embedded":[]};
	var _app = _app;
	
	var vcContainer = _app.getContainer();
	
	vcContainer.getAllRecursiveChildren().forEach(function(each){
		
		if(controlKind.indexOf(each.type) >= 0){
				var isBinded = false;
					if(each.getBindInfo("value") != undefined && each.getBindInfo("value").type == "datacolumn") {
						
						isBinded = true;
					}
				moCopyData.control.push({"id" 	 	: each.id
										,"value" 	: each.value
									 	,"isBinded" : isBinded
									 });
		}
		 else if (each instanceof cpr.controls.EmbeddedApp) {
		 	
		 var voEmbData = _copyData(each.getEmbeddedAppInstance());
		 	
		 	moCopyData.embedded.push({"id" : each.id
		 							 ,"value" :voEmbData});
		 }
	});
	
	_app.getAllDataControls().forEach(function(each){

		if(each.type == "dataset") {
			moCopyData.dataComponent.push({"id" : each.id
										,"value": each.getRowDataRanged()
			});
		}
		else if(each.type == "datamap") {
			moCopyData.dataComponent.push({"id" : each.id
										,"value": each.getDatas()
			});
		}
	});
	
	_app.getRootAppInstance().dialogManager.openDialog("202008/draftMan", "202008/draftMan", {width:400,height:300}, function(dialog) {
		dialog.ready(function(dialogApp){
			
		});
		dialog.initValue = {
			"pageParam" : _app.app.id,
			"copyData" : moCopyData
		}
		
	});
}


/**
 * 
 * @param {cpr.core.AppInstance} _app
 * @param {Object} pasteData
 */
copyKit.prototype.copyCat3 = function(_app,pasteData) {
	var voNewAppIns = _app;
	var voPasteData = pasteData;
	console.log(voPasteData);
	voNewAppIns.removeAllEventListeners();
			voNewAppIns.getContainer().getAllRecursiveChildren().forEach(function(each) {
				each.removeAllEventListeners();
			});
				voPasteData.dataComponent.forEach(function(each) {
					
					var dataComponent = voNewAppIns.lookup(each.id);
					dataComponent.build(each.value);
				});
				
				voPasteData.control.forEach(function(each) {
					
					var iterCtrls = voNewAppIns.lookup(each.id);
					if(each.isBinded) {
						iterCtrls.unbind("value");
					}
					iterCtrls.putValue(each.value);
				});
//	});
}


globals.createCopyKit = function(){
	
	return new copyKit();
}