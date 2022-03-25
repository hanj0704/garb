importScripts("../thirdparty/exceljs/chrome/exceljs_4.2.min.js");
importScripts("../thirdparty/FileSaver.min.js");

onmessage = function(event){
	
	
	console.log("이벤트 그게 뭔데");
	console.log(event);
	exportExcelJSWithInlineStyle(event.data);
}


function exportExcelJSWithInlineStyle(datas){
	
	var voExportOption = datas;
	
	//멀티헤더의 경우에 대한 스크립트로 진화시켜야함
		/** @type Array */
		var vaHeader = voExportOption.rowgroups[0].data[0];
		
		var vaHeaderData = vaHeader.map(function(each) {
			return each.value;
		});
		
		var vaHeaderStyle = voExportOption.rowgroups[0].style;
		/** @type Array */
		var vaDetailData = voExportOption.rowgroups[1].data;
		var vaDetailStyle = voExportOption.rowgroups[1].style;
		
		var wb = new ExcelJS.Workbook();
		var ws = wb.addWorksheet("sample");
		var headerRow = ws.addRow(vaHeaderData);
		headerRow.eachCell(function(cell, number) {
			var fils = styleTransfer(vaHeaderStyle[number - 1].style);
			cell.fill = fils.fill;
			cell.border = fils.border;
			cell.font = fils.font;
			
			if (vaHeaderStyle[number - 1]["text-align"] != undefined) {
				cell.alignment = {
					"horizontal": vaHeaderStyle[number - 1]["text-align"]
				};
			} else {
				cell.alignment = {
					"horizontal" : "center"
				};
			}
		})

		vaDetailData.forEach(function( /*Array*/ each, idx) {
			
			var vaDetailDataValue = each.map(function(each) {
				return each.value;
			});
			var vaDetailDataStyle = each.map(function(each) {
				return each.style;
			});
			var row = ws.addRow(vaDetailDataValue);
			row.eachCell(function(cell, number) {
				var fils = styleTransfer(vaDetailStyle[number - 1].style);
				var bgColor = 	vaDetailDataStyle[number-1]["background-color"] != undefined ? "FF"+vaDetailDataStyle[number-1]["background-color"].toString().substring(1) : "FFFFFFFF";
			cell.fill = {
				"type": "pattern",
				"pattern": "solid",
				"fgColor": {
					"argb": bgColor
				}
			}
				cell.border = fils.border;
				cell.font = fils.font;
				
				var voCellInfo = vaDetailStyle[number - 1];
				if (voCellInfo.style["text-align"] != undefined) {
					cell.alignment = {
						"horizontal": voCellInfo.style["text-align"]
					};
				}
				
				if (voCellInfo.type == "number") {
					
					if (voCellInfo.format != undefined) {
						var vsNumFormat = voCellInfo.format;
						if (vsNumFormat.indexOf("s") != -1) {
							vsNumFormat = vsNumFormat.replace("s", "");
						}
						cell.numFmt = vsNumFormat;
					}
				}
			})
		});
		
		var vaCols = voExportOption.cols;
		var vaNumCols = vaCols.map(function(each){
			/** @type String */
			var width = each.width;
			width = Number(width.replace("px",""));
			return width;
		});
		
		var wholeWidth = vaNumCols.reduce(function add(sum, current){
			return sum + current;
		}, 0);
		
		var vnWidthAvg = wholeWidth/vaCols.length;
		
		/** @type Array */
		var vaWsCols = ws.columns;
		vaWsCols.forEach(function(each,idx){
			each.width = 14 * vaNumCols[idx]/vnWidthAvg;
		});
		console.log("스탑 거기까지");
		wb.xlsx.writeBuffer().then(function(data) {
			var blob = new Blob([data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			postMessage(blob);
		});
		
}

/**
	 * 
	 * @param {Object} poStyleObj
	 */
	function styleTransfer(poStyleObj) {
		
		var results = {
			"border": {},
			"fill": {},
			"font":{},
			"alignment":{}
		};
		
		var vaKeys = Object.keys(poStyleObj);
		
		var border = ["border-top-width",
			"border-top-color",
			"border-right-width",
			"border-right-color",
			"border-bottom-width",
			"border-bottom-color",
			"border-left-width",
			"border-left-color"
		];
		var fill = ["color",
			"background-color"
		]
		
		for (var i = 0; i <= border.length - 2; i += 2) {
			
			if (poStyleObj[border[i]] != undefined) {
				var direction = border[i].split("-")[1];
				var colors = poStyleObj[border[i + 1]].toString().substring(1);
				results.border[direction] = {
					"style": 'thin',
					color: {
						argb: "FF" + colors
					}
				}
			}
		}
		
		var bgColor = 	poStyleObj["background-color"] != undefined ? "FF"+poStyleObj["background-color"].toString().substring(1) : "FFFFFFFF";
			results.fill = {
				"type": "pattern",
				"pattern": "solid",
				"fgColor": {
					"argb": bgColor
				}
			}
			results.font = {
				name : "sans-serif",
				color: {
					argb: "FF"+poStyleObj["color"].toString().substring(1)
				}
			};
		
		
		return results;
	}