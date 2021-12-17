/************************************************
 * multiSheetExcelExportSample.js
 * Created at 2020. 5. 8. 오후 2:49:41.
 *
 * @author GEB
 ************************************************/


/*
 * "Export" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	//1.
	//export할 그리드
	var vcGrdMain = app.lookup("grd_main"); 
	var vcGrdSub1 = app.lookup("grd_sub1");
	//export할 데이터셋
	var voDsSub2 = app.lookup("dsGrid3");
	var voDsSub3 = app.lookup("dsGrid4");
	
	//2. 데이터를 json 형식으로 전환
	var data1 = vcGrdMain.getExportData(false);
	var data2 = vcGrdSub1.getExportData(false);
	var data3 = cpr.utils.ExportUtil.getExportData(voDsSub2);
	var data4 = cpr.utils.ExportUtil.getExportData(voDsSub3);
	
	//3. 시트 명 지정
	data1.name = "main";
	data2.name = "sub1";
	data3.name = "sub2";
	data4.name = "sub3";
	
	//4. 추출한 데이터 JSON 데이터로 머징
	var exportData = cpr.utils.ExportUtil.merge([data1, data2, data3, data4]);
	
	var subExport = app.lookup("smsExport");
	
	//5. 전환된 데이터를 submission request data로 설정
	subExport.setRequestObject(exportData);
	subExport.send();
}
