/************************************************
 * DebuggingMod.module.js
 * Created at 2021. 7. 1. 오전 10:21:04.
 * 디버깅용 콘솔을 출력하기 위해서 만들어진 모듈입니다.
 * 기본적으로  화면별 데이터 컴포넌트의 컬럼명들을 파악하거나,
 * 서로 데이터 컴포넌트 측면에서 연관이 있는 화면들에 대해서 데이터 컴포넌트들의 싱크로를 확인하여
 * 컬럼명이 일치하지 않거나, 새로 추가되어 반영되지 않은 컬럼이 있을경우등을 파악할 수 있도록 작성되었습니다.
 * 기본적으로 디버깅모드로 콘솔을 찍으려면 각 변수를 true로 설정해야 합니다.
 * 
 * 1. useColumnfirmColumnNm
 * 각 화면에 대해서 isParamData 사용자속성값이 Y을 만족하여 서버로 파라미터를 보내는 데이터 컴포넌트들에 대하여
 * 각 데이터 컴포넌트들의 컬럼명들을 출력합니다.
 * 또한 컬럼명에 .(dot)을 포함시키지 않기 때문에, .이 포함되어있는 컬럼명이 있는지 확인하는 기능을 포함하고있습니다.
 * 
 * 2. useCompareColumnNm
 * 일반 화면에서 선언했던 데이터 컴포넌트를 복사해서 udc안에 집어넣어 사용하는 케이스 MonitorWafers화면등에 존재할 수 있습니다.
 * 이때, udc상에 존재하는 데이터 컴포넌트들에 대해서 본 화면에 존재하는 동일한 이름의 데이터컴포넌트와 비교하여, 새로 추가되거나,
 * 불일치하는 컬럼이 있을 경우 이러한 컬럼들을 모아서 콘솔에 출력합니다.
 * 컬럼비교의 기준이 되는 곳은 udc같은 복제대상을 기준으로 비교됩니다.
 * @author HANS
 ************************************************/
cpr.events.EventBus.INSTANCE.addFilter("before-unload", function(/* cpr.events.CEvent */e){
	var control = e.control;
	if(control instanceof cpr.core.AppInstance) {
		
		if(control.app.id.indexOf("udc") == -1) {
			
			control.getContainer().getAllRecursiveChildren().filter(function(each){
				
			});
		}
	}
});

cpr.events.EventBus.INSTANCE.addFilter("selection-change", function(/* cpr.events.CSelectionEvent */e){
	var control = e.control;
	
	if(control instanceof cpr.controls.MDIFolder) {
		
		var mdi = control;
		console.log("ㅋㅋ 걸렸죠?");
		/** @type cpr.controls.TabItem */
		var newSel = e.newSelection;
		
		var apps = cpr.core.Platform.INSTANCE.getAllRunningAppInstances().filter(function(each){
			return each.app.id.indexOf("udc") == -1;
		
		}).filter(function(each){
			return each.getContainer().getActualRect().width != 0;
		});
		
		console.log(apps);
		

	}
});

var useConfirmColumnNm = false;
var useCompareColumnNm = false;


if(useConfirmColumnNm)cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	var control = e.control;
	
		if(control instanceof cpr.core.AppInstance) {
			
			if(control.app.id.indexOf("udc") == -1) {
				
				var vaAllDataCtrls = control.getAllDataControls();
				
				vaAllDataCtrls = vaAllDataCtrls.filter(function(each){
					return each.userAttr("isParamData") == "Y";
				});
				if(vaAllDataCtrls.length > 0) {
				
					console.log("=============================================");
					console.log("\t "+control.app.title +" 프로토콜명 정의");
					
					var voResult = {};
					var voColNms = {};
					var voFault = {};
					vaAllDataCtrls.forEach(function(each){
						
						if(each instanceof cpr.data.DataSet || each instanceof cpr.data.DataMap ) {
							/** @type cpr.data.DataCollection */
							var vcDataComponent = each;
							
							var vaColNms = vcDataComponent.getColumnNames();
							var temp = {};
							vaColNms.forEach(function(eachColNm){
								if(eachColNm.indexOf(".") != -1) {
									voFault[each.id][eachColNm] = ""; 
								}
								temp[eachColNm] = "";
							});
							voColNms[each.id] = temp;
						}
					});
					
					voResult["컬럼명집합"] = voColNms;
					voResult["확인필요"] = voFault;
					console.log(voResult);
					console.log("=============================================");
				}
				
				
			}
		}
});

if(useCompareColumnNm)cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	var control = e.control;
	
		if(control instanceof cpr.core.AppInstance) {
			
			if(control.app.id.indexOf("udc") == -1) {
				/** @type cpr.data.DataCollection[] */
				var vaDataCtrls = control.getAllDataControls().filter(function(each){
					return each.userAttr("isParamData") == "Y";
				});
				
				/** @type cpr.controls.UDCBase[]*/
				var vaChilds =  control.getContainer().getAllRecursiveChildren().filter(function(each){
					if(each.userAttr("debugging") == "Y") {
						return each;
					}
				});
				if(vaChilds.length > 0) {
					console.log("=======================================");
					console.log("복제하여 사용하는  데이터 컴포넌트 컬럼 확인");
					var voResult = {};
					var voColNms = {};
					var voFault = {};
					vaChilds.forEach(function(each){
						var vcUDC = each.getEmbeddedAppInstance();
						/** @type cpr.data.DataCollection[] */
						var vaUdcDc = vcUDC.getAllDataControls();
						
						vaUdcDc.forEach(function(eachDc){
							
							var vcDc = eachDc;
							var vcOriginDc = vaDataCtrls.find(function(ele){
								if(ele.id == vcDc.id) {
									return ele;
								}
							});
							if(vcOriginDc) {
								
								var vaOriginColNms = vcOriginDc.getColumnNames();
								var vaColNms = vcDc.getColumnNames();
								var d = [];
								
								vaColNms.forEach(function(eachColNm){
									
									var vnColExist = vaOriginColNms.indexOf(eachColNm);
									
									if(vnColExist != -1) {
										
										vaOriginColNms.splice(vnColExist,1);
									} else {
										
										d.push(eachColNm);
									}
								});
								
								if(vaOriginColNms.length > 0) {
									//메인화면거같은데?
									voColNms[vcDc.id] = vaOriginColNms;
								}
								if(d.length > 0) {
									voFault[vcDc.id] = d;
								}
							}
						});
					});
					
					voResult["메인화면에있는데복제가안됨"] = voColNms;
					voResult["복제에있는컬럼인데 메인에는없음"] = voFault;
					
					console.log(voResult);
					
					console.log("=======================================");
				}
			}
		}
});


