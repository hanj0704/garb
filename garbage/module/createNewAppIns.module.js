/************************************************
 * createNewAppIns.module.js
 * Created at 2019. 11. 15. 오전 9:46:36.
 *
 * @author daye
 ************************************************/


var appInstance = null;
var pcControl = null;
var vsAppId = null;
var voEmbedded = null;
var vsRowHeight = "28px";
var isPopup = false;

// true일 경우에만 데이터 컴포넌트를 확인할 수 있는 앱 생성 및 단축키를 지원합니다.
var isCreateApp = true; 

// 단축키의 마지막 키를 설정합니다.(Ctrl + Alt + *)
var dynamicKey = cpr.events.KeyCode.A;


if(isCreateApp) cpr.events.EventBus.INSTANCE.addFilter("load", fn_load);

function fn_load (e) {

	var control = e.control;
	
	if (control instanceof cpr.core.AppInstance) {

		if(control.id.indexOf("Dialog") == -1 ) {
			
			if(control.isRootAppInstance()) {

				var voChild = control.getContainer().getAllRecursiveChildren().map(function(each){
					if(each.type == "embeddedapp" || each.type == "mdifolder") return each;
				});
				if(!voChild || voChild.length == 0) return;
			}
				
			var voEmbAppInstance = control;

			// 앱인스턴스 저장
			if(control.getHost()) {
				
				if(control.getHost().type == "dialog" && control.id.indexOf("udc") == -1) {
					
					// Dialog 띄웠을 경우 rootAppInstance 저장
					var voMainApp = voEmbAppInstance.getHostAppInstance();
					
					/** @type cpr.controls.EmbeddedApp */
					var emb = voMainApp.getContainer().getAllRecursiveChildren().filter(function(each){
						if(each.type == "embeddedapp") return each;
					})[0];
					
					if(emb) voEmbedded = emb.getEmbeddedAppInstance();
					
				} else if(control.id.indexOf("udc") != -1) {
					
					// 다일로그에서 조회할 경우
					if(control.getHost().type == "dialog") return;
					
					// 반환된 control이 udc(loadmsk)일 경우
					var voMainApp = voEmbAppInstance.getRootAppInstance();
					
					/** @type cpr.controls.EmbeddedApp */
					var emb = voMainApp.getContainer().getAllRecursiveChildren().filter(function(each){
						if(each.type == "embeddedapp") return each;
					})[0];
					
					if(emb) voEmbAppInstance = emb.getEmbeddedAppInstance();
				}
			}
			appInstance = voEmbAppInstance;
			
			// DataSource를 확인 할 앱 생성
			createApp(appInstance);
		
			// 단축키 사용
			setAccessKey();
		}
	}
}


/**
 * MDI, TAB 일 경우, 선택한 탭의 앱인스턴스를 반환합니다.
 * @param {Event} e
 */
cpr.events.EventBus.INSTANCE.addFilter("selection-change",function(/** @type cpr.events.CSelectionEvent */e){
	var vcSelectionControl = e.control;

	if(vcSelectionControl instanceof cpr.controls.MDIFolder) {

		if(e.newSelection.content) {

			if(e.newSelection.content.app) {

				// MDI 하위 콘텐츠의 앱인스턴스가 로드되었을 때
				appInstance = e.newSelection.content.app.getInstances()[0];
			}

		}
	} else if (vcSelectionControl instanceof cpr.controls.TabFolder) {

		if(e.newSelection.content) {

			appInstance = e.newSelection.content.getAllRecursiveChildren().filter(function(each) {

				if(each.type == "embeddedapp") return each.getEmbeddedAppInstance();
			})[0];

		}
	}
	
	// DataSource를 확인 할 앱 생성
	createApp(appInstance); 

	// 단축키 사용
	setAccessKey(); 

	return;
});


/**
 * 팝업을 띄웁니다.
 */
function openDialog() {	
	
	isPopup = true;

	// 특정 다일로그를 닫았을 경우, rootAppInstance를 앱인스턴스로 저장합니다.
	if(appInstance.disposed) appInstance = voEmbedded;
		
	appInstance.getRootAppInstance().openDialog(vsAppId, {width : 500, height : 400}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialog.headerTitle = "데이터 컴포넌트";
			dialog.addEventListener("close", function(){

				isPopup = false;
			})
		});
	}).then(function(returnValue){

	});
}


/**
 * 팝업을 열기위한 단축키를 지정합니다.<br>
 * 단축키 : Ctrl + Alt + A (default)
 */

function setAccessKey() {
	
	if(appInstance) {

		var container = appInstance.getContainer();
		
		if(container) {

			container.addEventListener("keydown", function(/** @type cpr.events.KeyboardEvent */e) {
				
				if(e.ctrlKey && e.altKey && e.keyCode == dynamicKey) {
				
					if(!isPopup) openDialog();
	
				}
			});
		}
	}
}


/**
 * 새로운 앱을 생성합니다.
 */
function createApp() {

	if(appInstance) {

		vsAppId = appInstance.id + "Dialog" + (Math.floor(Math.random()*100)+1);

		var voAppInstance = appInstance;
		
		var newApp = new cpr.core.App(vsAppId, {
			onPrepare: function(loader){
			},
			onCreate: function(/* cpr.core.AppInstance */ newApp, exports){
				var container = newApp.getContainer();
				var vcCombo = new cpr.controls.ComboBox();
				var vcDataset = new cpr.data.DataSet();
				vcCombo.setItemSet(vcDataset, {
					label: "label",
					value: "value" 
				});
				
				// script start
				newApp.addEventListener("load", function(e){
					// 특정 다일로그를 닫았을 경우, rootAppInstance를 앱인스턴스로 저장합니다.

					if(voAppInstance.disposed) voAppInstance = voEmbedded;

					// 콤보박스 생성 및 데이터셋을 바인딩 합니다.
					var vaDatasetId = voAppInstance.getAllDataControls().map(function(each){

						if(each.type.indexOf("submission") == -1) return each.id;
					});
					
					vcDataset.parseData({
						"columns" : [
							{dataType:"string", name:"label"},
							{dataType:"string", name:"value"}
						],
						"rows" : setComboData(vaDatasetId)
					});
					
					container.addChild(vcCombo, {
						top : "20px",
						left : "20px",
						width : "120px",
						height : vsRowHeight
					});
					vcCombo.selectItem(0);
				});
				
				vcCombo.addEventListener("selection-change", function(e){
					// 1. 기존 그리드 또는 폼레이아웃이 그려져 있는 경우 삭제합니다.
					var grid = container.getChildren().filter(function(each) {
						if (each.type == "grid" || each.type == "container") return each;
					})[0];
					container.removeChild(grid);
					
					// 2. 콤보박스에서 선택한 데이터 컨트롤의 정보를 호출합니다.
					/** @type cpr.data.DataSet */
					var dataControl = voAppInstance.getAllDataControls().filter(function(each){
						if(each.id == vcCombo.value) return each;
					})[0];
					
					if(dataControl.type == "dataset" || dataControl.type == "dataview") {
						// 데이터셋일 경우
						// 데이터셋의 status 컬럼을 추가합니다.
						var voColumns = dataControl.getColumnNames();
						voColumns.splice(0, 0, "status");
						var data = setDatasetData(voColumns, dataControl);
	
						var newDataset = new cpr.data.DataSet();
						newDataset.parseData({
							columns : data["column"],
							rows : data["row"]
						});
						
						// 그리드 생성
						createGrid(newDataset);
					} else if(dataControl.type == "datamap"){

						// 데이터맵일 경우
						// 폼레이아웃 생성

						createFormLayout(dataControl);
					}
					
					// 컨테이너에 생성한 그리드를 추가합니다.
					container.addChild(pcControl, {
						top : "58px",
						left : "20px",
						right : "20px",
						bottom : "20px"
					});
				});
			}
		});
		cpr.core.Platform.INSTANCE.register(newApp);

	}
}


/**
 * 그리드를 생성하고 초기정보를 설정합니다.
 * @param {cpr.controls.UIControl} vcDataControl
 */
function createGrid(vcDataControl) {

	pcControl = new cpr.controls.Grid();
	
	pcControl.init({
		"dataSet" : vcDataControl,
		"columnMovable": true,
		"columnResizable": true,
		"columns": getColumns(vcDataControl),
		"header": {
			"rows": [{"height": vsRowHeight}],
			"cells": getCells(vcDataControl),
		},
		"detail": {
			"rows": [{"height": vsRowHeight}],
			"cells": getCells(vcDataControl)
		}
	});
}


/**
 * 폼레이아웃을 생성합니다.
 * @param {cpr.controls.UIControl} vcDataControl
 * @param {any} vsStyleClass?
 */
function createFormLayout(vcDataControl, vsStyleClass) {
	pcControl = new cpr.controls.Container();

	var formLayout = new cpr.controls.layouts.FormLayout;
	formLayout.horizontalSeparatorWidth = 1;
	formLayout.verticalSeparatorWidth = 1;
	formLayout.setColumns(["1fr", "1fr"]);
	formLayout.setRows(setFormRows(vcDataControl));
	formLayout.setUseRowShade(0, true);

	pcControl.setLayout(formLayout);
	
	// TODO 스타일클래스 적용
	pcControl.style.css("border", "1px solid black");
//	vcControl.style.addClass(vsStyleClass);
	
	setControlToForm(pcControl, vcDataControl);
}

/**
 * 데이터셋의 row 정보를 반환합니다.
 * @param {any} poColumns
 */
function setComboData(poColumns) {
	var voRows = [];
	
	poColumns.forEach(function( /* String */ each) {

		if(each) {

			var eachRow = {};
			eachRow["label"] = each;
			eachRow["value"] = each;
			voRows.push(eachRow);

		}
	});
	
	return voRows;
}


/**
 * 폼레이아웃의 row를 설정합니다.
 * @param {cpr.data.DataMap} datamap
 */
function setFormRows(datamap) {
	var voRows = [];
	for(var idx = 0; idx < datamap.getColumnCount()+1; idx++){
		voRows.push(vsRowHeight);
	}
	return voRows;
}


/**
 * 데이터맵의 컬럼 수 만큼 폼레이아웃에 자식컨트롤을 추가합니다.
 * @param {any} pcContainer
 * @param {cpr.data.DataMap} datamap
 */
function setControlToForm(pcContainer, datamap) {
	addFormChild(pcContainer, "KEY", 0, 0);
	addFormChild(pcContainer, "VALUE", 1, 0);
	
	for(var idx = 0; idx < datamap.getColumnCount(); idx++){
		var vsKey = datamap.getColumnNames()[idx];
		addFormChild(pcContainer, vsKey, 0, idx+1);
		addFormChild(pcContainer, datamap.getValue(vsKey), 1, idx+1);
	}
}


/**
 * 폼레이아웃 안에 아웃풋을 추가합니다.
 * @param {any} pcContainer
 * @param {any} psValue
 * @param {any} colIndex
 * @param {any} rowIndex
 * @param {any} vsStyleClass?
 */
function addFormChild(pcContainer, psValue, colIndex, rowIndex, vsStyleClass) {
	var vcOutput = new cpr.controls.Output();
	vcOutput.value = psValue;
	
	// 스타일 클래스 추가
//	vcOutput.style.addClass(vsStyleClass);
	vcOutput.style.css("text-align", "center");
	
	pcContainer.addChild(vcOutput, {
		"colIndex" : colIndex, 
		"rowIndex" : rowIndex
	});
	
	pcContainer.redraw();
}


/**
 * 그리드 헤더의 컬럼 수를 저장합니다.
 * @param {cpr.data.DataSet} dataset
 */
function getColumns(dataset) {
	var vaColumns = [];
	for(var idx = 0; idx < dataset.getHeaders().length; idx++){
		if(idx == 0) {

			vaColumns.push({"width": "50px"}); // status column 너비
		} else {
			vaColumns.push({"width": "100px"});
		}
	}
	return vaColumns;
}


/**
 * 그리드 header, detail의 cells에 들어갈 데이터를 저장합니다.
 * @param {cpr.data.DataSet} dataset
 */
function getCells(dataset) {
	var vaHeaderCell = [];

	for(var idx = 0; idx < dataset.getHeaders().length; idx++){
		vaHeaderCell.push(setGridConfigurator(idx, dataset.getColumnNames()[idx]));
	}
	
	return vaHeaderCell;
}


/**
 * cell의 configurator를 반환합니다.
 * @param {Number} colIndex
 * @param {any} vsColumn
 */
function setGridConfigurator(colIndex, vsColumn) {
	var configurator = {
		"constraint" : {
			"rowIndex" : 0,
			"colIndex" : colIndex
		},
		"configurator": function(cell) {
			cell.targetColumnName = vsColumn; // header
			cell.text = vsColumn; // header
			cell.targetColumnName = vsColumn; // detail
			cell.columnName = vsColumn; // detail
		}
	}
	return configurator;
}


/**
 * 데이터셋의 row 정보를 반환합니다.
 * @param {any} poColumns
 * @param {cpr.data.DataSet} dataset
 */
function setDatasetData(poColumns, dataset) {
	var voColumns = [];
	var voRows = [];
	
	// column
	poColumns.forEach(function( /* String */ each) {
		var eachColumn = {dataType: "string"};
		eachColumn["name"] = each;
		voColumns.push(eachColumn);
	});
		
	// row
	for (var idx = 0; idx < dataset.getRowCount(); idx++) {
		var eachRow = {};
		poColumns.forEach(function( /* String */ each) {
			if(each == "status") {

				eachRow[each] = dataset.getRowStateString(idx);
			} else {
				eachRow[each] = dataset.getColumnData(each)[idx];
			}
		});
		voRows.push(eachRow);
	}
	
	return {
		"column" : voColumns,
		"row" : voRows
	};
}
