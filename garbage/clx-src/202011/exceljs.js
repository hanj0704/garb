/************************************************
 * exceljs.js
 * Created at 2020. 11. 25. 오후 2:58:51.
 *
 * @author HANS
 ************************************************/

function abcq(){
	var title = 'Car Sell Report';
var header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
var data = [
  [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
  [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
  [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
  [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
  [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
];
	var workbook = new ExcelJS.Workbook();
var worksheet = workbook.addWorksheet('Car Data');
var titleRow = worksheet.addRow([title]);
// Set font, size and style in title row.
titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
var headerRow = worksheet.addRow(header);

// Cell Style : Fill and Border
headerRow.eachCell(function(cell,number){
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { argb: 'FF0000FF' }
  }
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
});

data.forEach(function(each){
	var row = worksheet.addRow(each);
	var qty = row.getCell(5);
	var color = "FF99FF99";
	if(+qty.value < 500) {
		color = "FF9999";
	}
	qty.fill = {
		"type":"pattern",
		"pattern":'solid',
		"fgColor":{"argb":color}
	};
});
//);
workbook.xlsx.writeBuffer().then(function(data){
	var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'CarData.xlsx');
});
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	abcq();
}
