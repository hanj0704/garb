/************************************************
 * customMod.module.js
 * Created at 2020. 7. 13. 오후 5:49:15.
 * 해당 모듈은 이후에 추가될 모듈에 대해서, 선행적으로 추가하여 기능에 대한 가이드를 돕기 위해 작성되었습니다.
 * 해당 모듈 내에 작성되어있는 함수는 이후에 다른 모듈로 이동하여 선언될 수 있습니다.
 * @author han
 ************************************************/
/** @type cpr.data.DataSet */
var dsMan;

///**
// * 콤보박스 만드는 첫번째 방법 큰 json파일 하나 두고 처음에 읽어서 콤보박스 아이템 가지는 데이터셋 저장하고 로드때마다
// * 데이터셋의 데이터뷰 만들어서 쓰는 구조 , 밑에 load까지
// */
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
//		vaCombos.forEach(function(/*cpr.controls.ComboBox*/each){
//			
//			var vcDataMap = new cpr.data.DataMap();
//			if(each.userAttr("dvCd")) {
//				
//				vcDataMap.addColumn(each.id, each.userAttr("dvCd"));
//			}
//			
//			var submission = new cpr.protocols.Submission();
//			
//			submission.action = "/서브미션 가져올 action";
//			submission.async = true;
//			submission.addRequestData(vcDataMap,"input");
//			
//			submission.send();
//			
//			submission.addEventListener("submit-done", function(e){
//				/** @type cpr.protocols.Submission */
//				var vcSub = e.control;
//				if(vcSub.isSuccess()) {
//					/** @type JSON */
//					var voJSON = JSON.parse(vcSub.xhr.responseText);
//					
//				}
//			});
//		});
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
	/** @type {dataMapId:String,dataMapColumn:Array,dataMapDatas:{},optionalProperties:{}} */	
	var voDmConfig = dmConfig;

	var submission = new cpr.protocols.Submission();
	submission.action = "data/FXFIG2.json";
	submission.async = true;
	
	submission.send();
	
	submission.addEventListener("submit-done", function(e){
		/** @type cpr.protocols.Submission */
		var vcSub = e.control;
		
		var voJSON = vcSub.xhr.responseText;
		console.log(voJSON);
	});
	
}
globals.getDm = function(){
	return dms;
}

cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
	/** @type cpr.core.AppInstance */
	var aps = e.control;
	var newDs = new cpr.data.DataSet();
	
	newDs.parseData({
				"columns": [
					{"name": "filter"},
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"filter": "BR_CD:0000", "label": "Heade OFFICE", "value": "0888"},
					{"filter": "BR_CD:0000", "label": "ROXY", "value": "1101"},
					{"filter": "BR_CD:0000", "label": "TANGERANG", "value": "2101"},
					{"filter": "BR_CD:0000", "label": "BEKASI", "value": "2201"},
					{"filter": "BR_CD:0000", "label": "DEPOK", "value": "2301"},
					{"filter": "BR_CD:0000", "label": "BOGOR", "value": "2401"},
					{"filter": "BR_CD:0000", "label": "SEMARANG", "value": "3101"},
					{"filter": "BR_CD:0000", "label": "SURAKARTA", "value": "3201"},
					{"filter": "BR_CD:0000", "label": "SURABAYA", "value": "3301"},
					{"filter": "BR_CD:0000", "label": "BANDUNG", "value": "4101"}
				]
			});
	
	var dataView = new cpr.data.DataView(aps.lookup("cmb1").uuid, newDs);
							dataView.setFilter("filter =='" + aps.lookup("cmb1").userAttr("dvCd") + "'");
							aps.lookup("cmb1").setItemSet(dataView, {
								"label": "label",
								"value": "value"
							});
});
