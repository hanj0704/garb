/************************************************
 * customMod.module.js
 * Created at 2020. 7. 13. 오후 5:49:15.
 * 해당 모듈은 이후에 추가될 모듈에 대해서, 선행적으로 추가하여 기능에 대한 가이드를 돕기 위해 작성되었습니다.
 * 해당 모듈 내에 작성되어있는 함수는 이후에 다른 모듈로 이동하여 선언될 수 있습니다.
 * @author han
 ************************************************/
/** @type cpr.data.DataSet */
var dsMan;

/**
 * 
 */
//globals.createComboModule = function(){
//	
//	var submission = new cpr.protocols.Submission();
//	submission.action = "data/scrnComCd.json";
//	submission.async = true;
//	
//	submission.send();
//	
//	submission.addEventListener("submit-done", function(e){
//		
//		var sub = e.control;
//	
//		var response = sub.xhr.responseText;
//		var jsonObj = JSON.parse(response);
//		var vaScrnComCd = jsonObj["scrnComCd"];
//		var vaNames = [];
//		Object.keys(vaScrnComCd[0]).forEach(function(each){
//			
//			vaNames.push({"name" : each});
//		});
//		
//		var newDs = new cpr.data.DataSet();
//		
//		newDs.parseData({
//			"columns" : vaNames,
//			"rows" : vaScrnComCd
//		});
//		
//		 dsMan = newDs;
//		console.log(newDs.getRowCount());
//		console.log(newDs.getRowDataRanged());
//		
//	});
//}

//cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
//	var control = e.control;
//	
//	if(control instanceof cpr.core.AppInstance){
//		
//		control.getContainer().getAllRecursiveChildren().forEach(function(each){
//			
//			if(each.type =="combobox") {
//				/** @type cpr.controls.ComboBox */
//				var vcCombo = each;
//				
//				var vsFilter = vcCombo.userAttr("filt");
//				if(vsFilter != ""){
//					
//					var dataView = new cpr.data.DataView(vcCombo.uuid, dsMan);
//					dataView.setFilter(vsFilter);
//					vcCombo.setItemSet(dataView, {
//						"label" : "SCRN_PRN_CD_CTT",
//						"value" : "SCRN_PRN_CD"
//					});
//				}				
//			}
//		});
//	}
//});

//cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
//	var control = e.control;
//	
//	if(control instanceof cpr.core.AppInstance) {
//		
//		var vaCombos = control.getContainer().getAllRecursiveChildren().filter(function(each){
//			
//			if(each.type == "combobox") {
//				return each;
//			}
//		});
//		
//		if(vaCombos.length > 0) {
//			
//	
//		var vcInputDataSet = new cpr.data.DataSet();
//			
//			vcInputDataSet.parseData({
//				"columns" : [{"name": "filter"}]
//			});
//			
//		var vcOutputDataSet = new cpr.data.DataSet();
//			
//			vcOutputDataSet.parseData({
//				"columns" : [
//					{"name": "filter"},
//					{"name": "value"},
//					{"name": "name"}
//				]
//			});
//			
//		vaCombos.forEach(function(/*cpr.controls.ComboBox*/each){
//			
//			var vsFiltOpts = each.userAttr("filtOpts");
//			
//			if(vsFiltOpts) {
//				vcInputDataSet.insertRow(vcInputDataSet.getRowCount(), vsFiltOpts);
//				
//			}
//			});
//			var submission = new cpr.protocols.Submission();
//			
//			submission.action = "/COMBOBOX.SVC";
//			submission.async = true;
//			submission.mediaType = "application/json"
//			submission.addRequestData(vcInputDataSet,"cmbInpGrid");
//			submission.addResponseData(vcOutputDataSet, false, "cmbOutgrid");
//			submission.send();
//			
//			submission.addEventListener("submit-done", function(e){
//				/** @type cpr.protocols.Submission */
//				var vcSub = e.control;
//				if(vcSub.isSuccess()) {
////					/** @type JSON */
////					var voJSON = JSON.parse(vcSub.xhr.responseText);
////					
////					var vaResponse = Object.keys(voJSON).map(function(each){
////						return voJSON[each];
////					});
//					vaCombos.forEach(function(/*cpr.controls.ComboBox*/each){
//						
//						var dataView = new cpr.data.DataView(each.uuid,vcOutputDataSet);
//						dataView.setFilter("filter =='"+each.userAttr("filtOpts")+"'");
//						each.setItemSet(dataView, {
//							"label" : "label",
//							"value" : "value"
//						});
//					});
//				}
//			});
//			}
//	}
//});

/** @type cpr.data.DataMap */
var dms;

/**
 * 미리 정의된 파일을 읽어서 
 */
globals.configDataMap = function(){
/** @type {dataMapId:String,dataMapColumn:Array,dataMapDatas:{},optionalProperties:{}} */	
	var voDmConfig = dmConfig;
	
	var dataMap = new cpr.data.DataMap(voDmConfig.dataMapId);
		
	var vsAlterColumnLayout = "client";
	
	var voDataMapConfigObj = {
		alterColumnLayout : vsAlterColumnLayout,
		columns : voDmConfig.dataMapColumn,
		data : voDmConfig.dataMapDatas
		
	}

	var voOptionalProp = voDmConfig.optionalProperties;

	if(voOptionalProp) {
		var vaKeys = Object.keys(voOptionalProp);
		vaKeys.forEach(function(each){
			
			voDataMapConfigObj[each] = voOptionalProp[each];
		});
	}
	dataMap.parseData(voDataMapConfigObj);
	
	dms = dataMap;
}


globals.configDataMap2 = function(){
//	/** @type {dataMapId:String,dataMapColumn:Array,dataMapDatas:{},optionalProperties:{}} */	
//	var voDmConfig = dmConfig;
	
	var submission = new cpr.protocols.Submission();
	
	submission.action = "data/FXFIG2.json";
	submission.async = true;
	submission.send();
	
	submission.addEventListener("submit-done", function(e){
		/** @type cpr.protocols.Submission */
		var vcSub = e.control;
		
		var voJSON = JSON.parse(vcSub.xhr.responseText);
		
		var vaKeys = Object.keys(voJSON);
		
		var dataMap = new cpr.data.DataMap("FxFig");
		vaKeys.forEach(function(each){
			
			/** @type {Array} */
			var vaDatas = voJSON[each];
			
			vaDatas.forEach(function(/**{key:String,value:any}*/colms){
				dataMap.addColumn(new cpr.data.header.Header(colms.key, typeof colms.value), colms.value);
			});
		});
		
		dms = dataMap;
		console.log(dms.getDatas());
	});
	
}
globals.getFxfig = function(){
	return dms;
}
