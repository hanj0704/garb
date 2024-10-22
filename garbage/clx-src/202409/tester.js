/************************************************
 * tester.js
 * Created at 2024. 9. 23. 오전 10:11:46.
 *
 * @author HAN
 ************************************************/
var slide = null;
/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	slide = createSlope(app.lookup("grp1"));
	slide.isInfinite = false;
	slide.moveItemCount = 1;
	slide.showCount = 3;
	
	slide.ride();
	onButtonClick3();
	onButtonClick3();
}

/*
 * ">" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	slide.showNext();
}

/*
 * "<" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	slide.showPrev();
}

/*
 * ">" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
//	var button = e.control;
	
	app.lookup("grd1").insertColumn({
		columnLayout: [{
			width: "30px"
		}],
		header: [{
			constraint: {
				rowIndex: 0,
				colIndex: 0,
				colSpan: 1,
				rowSpan: 1
			},
			configurator: function(configurator) {
				configurator.text = "qq";
			}
		}],
		detail: [{
			constraint: {
				rowIndex: 0,
				colIndex: 0,
				colSpan: 1,
				rowSpan: 1
			},
			configurator: function(cell) {
				cell.control = (function() {
					var btnDetail = new cpr.controls.Button("btnDetail"+moment().valueOf() );
					btnDetail.tooltip = "상세 데이터 팝업 버튼";
					btnDetail.fieldLabel = "상세 데이터 팝업 버튼";
					btnDetail.icon = "theme/images/controls/button/ic_btn_40.svg";
					btnDetail.style.css({
						"padding": "0px",
						"border" : "1px solid #2b9097",
						"border-radius" : "4px"
					});
					btnDetail.userAttr("__responseButton__", "true");
					btnDetail.addEventListener("click", function(e) {
//						/** @type cpr.controls.Grid */
//						var grid = e.control.getParent();
//						var rowIndex = grid.getSelectedRowIndex();
//						var _app = grid.getAppInstance();
//						var grpBindForm = _app.lookup(grid.userAttr("bind-form-id"));
//						
//						_app.getRootAppInstance().openDialog("app/com/comPGridCellViewType1", {
//							top: 0,
//							bottom: 0,
//							left: 0,
//							right: 0,
//							headerMovable: false
//						}, function(dialog) {
//							dialog.userAttr({
//								"_originWidth" : 500,
//								"_originHeight" : 600
//							});
//							dialog.headerTitle = grid.fieldLabel;
//							dialog.style.addClass("m_grid_pop");
//							dialog.initValue = {
//								"grid": grid,
//								"grpBindForm": grpBindForm,
//								"rowIdx": rowIndex
//							};
//							
//							dialog.addEventListenerOnce("close", function(e){
//								var voRowData = e.control.returnValue;
//								if(voRowData) {
//									grid.getRow(rowIndex).setRowData(voRowData);
//									if (grpBindForm) grpBindForm.redraw();
//								}
//							})
//						})
					});					
					return btnDetail;
				})();
				cell.controlConstraint = {};
			}
		}]
	}, 0, false);
}

/*
 * ">" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(e){
	var button = e.control;
	
//	app.getContainer().style.css
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(e){
	var button = e.control;
	console.log("ㅋㅋ");
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(e){
	var grd1 = e.control;
	
}
