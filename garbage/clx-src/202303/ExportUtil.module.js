/************************************************
 * ExportUtil.module.js
 * Created at 2020. 11. 27. 오후 4:11:24.
 *
 * @author HANS
 ************************************************/

StyleUtil = {
	/**
	 * 
	 * @param {Object} poStyleObj
	 */
	_styleTransfer: function(poStyleObj) {
		
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
}
ExporterUtil = {
	/**
	 * 지정된 기본 스타일을 가진채로 엑셀을 내보내는 함수입니다.
	 * @param {cpr.controls.Grid} pcGrid 엑셀로 Export할 그리드
	 * @param {{exceptStyle : boolean, applyFormat : boolean, rowDataHandler:Function}} poOptions? 그리드의 getExportData()할때에 옵션을 지정할 수 있습니다.
	 *  입력하지 않을 경우, 모듈에 선언된 기본 옵션으로 구성합니다.
	 */
	exportExcelJS: function(pcGrid, poOptions) {
		/** @type cpr.controls.Grid */
		var vcGrid = pcGrid;
		console.log("시작");
		var voStartTime = moment().valueOf();
		var voHandleObj = {
			exceptStyle: false,
			applyFormat: true,
			rowDataHandler: function( /* {value:String,style:#css-color}[] */ datas, /* Number */ rowIndex) {
				datas.forEach(function(each) {
					
					each.style["border-top-width"] = "1px";
					each.style["border-right-width"] = "1px";
					each.style["border-bottom-width"] = "1px";
					each.style["border-left-width"] = "1px";
					each.style["border-top-style"] = "solid";
					each.style["border-right-style"] = "solid";
					each.style["border-bottom-style"] = "solid";
					each.style["border-left-style"] = "solid";
					each.style["border-top-color"] = "#000000";
					each.style["border-right-color"] = "#000000";
					each.style["border-bottom-color"] = "#000000";
					each.style["border-left-color"] = "#000000";
					each.style["color"] = "#343434";
					
					if (rowIndex == 0) { // Header
						each.style["background-color"] = "#A9A9A9";
						each.style["color"] = "#343434";
						each.style["text-align"] = "center";
					}
				});
			}
		}
		if (poOptions != undefined && Object.keys(poOptions).length != 0) {
			voHandleObj = poOptions;
		}
		
		var voExportOption = vcGrid.getExportData(voHandleObj);
		//멀티헤더의 경우에 대한 스크립트로 진화시켜야함
		/** @type Array */
		var vaHeader = voExportOption.rowgroups[0].data[0];
		
		var vaHeaderData = vaHeader.map(function(each) {
			return each.value;
		});
		var vaHeaderStyle = vaHeader.map(function(each) {
			return each.style;
		});
		
		/** @type Array */
		var vaDetailData = voExportOption.rowgroups[1].data;
		var vaDetailStyle = voExportOption.rowgroups[1].style;
		
		var wb = new ExcelJS.Workbook();
		var ws = wb.addWorksheet("sample");
		
		var headerRow = ws.addRow(vaHeaderData);
		headerRow.eachCell(function(cell, number) {
			var fils = StyleUtil._styleTransfer(vaHeaderStyle[number - 1]);
			cell.fill = fils.fill;
			cell.border = fils.border;
			cell.font = fils.font;
			if (vaHeaderStyle[number - 1]["text-align"] != undefined) {
				cell.alignment = {
					"horizontal": vaHeaderStyle[number - 1]["text-align"]
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
				var fils = StyleUtil._styleTransfer(vaDetailDataStyle[number - 1]);
				cell.fill = fils.fill;
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
		
		wb.xlsx.writeBuffer().then(function(data) {
			console.log(data);
			var blob = new Blob([data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			saveAs(blob, 'EXCEL_EXPORT_SAMPLE.xlsx');
			var end = moment().valueOf() - voStartTime;
			console.log(moment.duration(end) / 1000);
		});
		
	},
	/**
	 * 그리드에 인라인으로 스타일을 지정해놓았을 경우 엑셀 내보내기를 할 때 사용하는 함수입니다.
	 * @param {cpr.controls.Grid} pcGrid 엑셀로 Export할 그리드
	 * @param {{exceptStyle : boolean, applyFormat : boolean, rowDataHandler:Function}} poOptions? 그리드의 getExportData()할때에 옵션을 지정할 수 있습니다.
	 *  입력하지 않을 경우, 모듈에 선언된 기본 옵션으로 구성합니다.
	 */
	exportExcelJSWithInlineStyle: function(pcGrid, poOptions) {
		/** @type cpr.controls.Grid */
		var vcGrid = pcGrid;
		console.log("시작");
		var voStartTime = moment().valueOf();
		var voHandleObj = {
			exceptStyle: false,
			applyFormat: true
		}
		if (poOptions != undefined && Object.keys(poOptions).length != 0) {
			voHandleObj = poOptions;
		}
		
		var voExportOption = vcGrid.getExportData(voHandleObj);

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
			var fils = StyleUtil._styleTransfer(vaHeaderStyle[number - 1].style);
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
				var fils = StyleUtil._styleTransfer(vaDetailStyle[number - 1].style);
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
		console.log(moment.duration(moment().valueOf()-voStartTime)/1000);
		wb.xlsx.writeBuffer().then(function(data) {
			var blob = new Blob([data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			saveAs(blob, 'EXCEL_EXPORT_SAMPLE.xlsx');
			var end = moment().valueOf() - voStartTime;
			console.log(moment.duration(end) / 1000);
			vcGrid.getAppInstance().callAppMethod("hideMask");
		});
		
	},
	/**
	 * 지정된 기본 스타일을 가진채로 엑셀을 내보내는 함수입니다.
	 * @param {cpr.controls.Grid} pcGrid 엑셀로 Export할 그리드
	 * @param {{exceptStyle : boolean, applyFormat : boolean, rowDataHandler:Function}} poOptions? 그리드의 getExportData()할때에 옵션을 지정할 수 있습니다.
	 *  입력하지 않을 경우, 모듈에 선언된 기본 옵션으로 구성합니다.
	 */
	exportExcelJS2: function(pcGrid, poOptions) {
		/** @type cpr.controls.Grid */
		var vcGrid = pcGrid;
		console.log("시작");
		var voStartTime = moment().valueOf();
		var voHandleObj = {
			exceptStyle: false,
			applyFormat: true,
			rowDataHandler: function( /* {value:String,style:#css-color}[] */ datas, /* Number */ rowIndex) {
				console.log(rowIndex);
				datas.forEach(function(each) {
				
					each.style["border-top-width"] = "1px";
					each.style["border-right-width"] = "1px";
					each.style["border-bottom-width"] = "1px";
					each.style["border-left-width"] = "1px";
					each.style["border-top-style"] = "solid";
					each.style["border-right-style"] = "solid";
					each.style["border-bottom-style"] = "solid";
					each.style["border-left-style"] = "solid";
					each.style["border-top-color"] = "#000000";
					each.style["border-right-color"] = "#000000";
					each.style["border-bottom-color"] = "#000000";
					each.style["border-left-color"] = "#000000";
					each.style["color"] = "#343434";
					
					if (rowIndex == 0) { // Header
						each.style["background-color"] = "#A9A9A9";
						each.style["color"] = "#343434";
						each.style["text-align"] = "center";
					}
				});
			}
		}
		if (poOptions != undefined && Object.keys(poOptions).length != 0) {
			voHandleObj = poOptions;
		}
		
		var voExportOption = vcGrid.getExportData(voHandleObj);
		//멀티헤더의 경우에 대한 스크립트로 진화시켜야함
		
		/** @type Array */
		var vaHeader = voExportOption.rowgroups[0].data[0];
		
		var vaHeaderData = vaHeader.map(function(each) {
			return each.value;
		});
		var vaHeaderStyle = vaHeader.map(function(each) {
			return each.style;
		});
		
		
		
		/** @type Array */
		var vaDetailData = voExportOption.rowgroups[1].data;
		var vaDetailStyle = voExportOption.rowgroups[1].style;
		console.log(vaDetailStyle);
		var wb = new ExcelJS.Workbook();
		var ws = wb.addWorksheet("sample");
		
		//헤더처리하기
		var vaS = voExportOption.rowgroups[0].style;
		var leng = vaDetailData[0].length;
		var newHead = [];
		var headerDepth = vcGrid.header.getRowHeights().length;
		console.log(vaS);
		if(headerDepth > 1) {
			for(var i = 0 ; i < headerDepth ; i++) {
				
				newHead.push([]);
			}
			
			vaS.forEach(function(each,idx){
				if (each.colspan > 1 && each.rowspan > 1) {
					for(var ice = each.colindex; ice < each.colindex + each.colspan; ice++){
						
						for(var fire = each.rowindex; fire < each.rowindex + each.rowspan; fire++){
							newHead[fire][ice] = vaHeaderData[idx];
						}
					}
				} else {
					
					if (each.colspan > 1) {
						for (var ice = each.colindex; ice < each.colindex + each.colspan; ice++) {
							
							newHead[each.rowindex][ice] = vaHeaderData[idx];
						}
					}
					if (each.rowspan > 1) {
						for (var fire = each.rowindex; fire < each.rowindex + each.rowspan; fire++) {
							newHead[fire][each.colindex] = vaHeaderData[idx];
						}
					}
				}
				
				newHead[each.rowindex][each.colindex] = vaHeaderData[idx];
					
			});
		}
		newHead.forEach(function(each){
		
		var headerRow = ws.addRow(each);
			headerRow.eachCell(function(cell, number) {
				var fils = StyleUtil._styleTransfer(vaHeaderStyle[number - 1]);
				cell.fill = fils.fill;
				cell.border = fils.border;
				cell.font = fils.font;
				if (vaHeaderStyle[number - 1]["text-align"] != undefined) {
					cell.alignment = {
						"horizontal": vaHeaderStyle[number - 1]["text-align"],
						"vertical" : "middle"
					};
				}
			})
		});
		var a = ["A",'B','C',"D",'E','F','G','H','I','J','K',"L","M",'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		vaS.forEach(function(each){
			if(each.colspan > 1 && each.rowspan > 1) {
				var from = a[each.colindex]+(each.rowindex+1);
				var to = a[each.colindex+each.colspan-1]+(each.rowindex +each.rowspan);
				ws.mergeCells(from+":"+to);
				ws.getCell(from).alignment = { horizontal:'center',vertical : "middle"};
			}else {
				
				if(each.colspan > 1) {
					var from = a[each.colindex]+(each.rowindex+1);
					var to = a[each.colindex+each.colspan-1]+(each.rowindex+1);
					ws.mergeCells(from+":"+to);
				ws.getCell(from).alignment = { horizontal:'center',vertical : "middle"};
				}
				if(each.rowspan > 1) {
					var from = a[each.colindex]+(each.rowindex+1);
					var to = a[each.colindex]+(each.rowindex+each.rowspan);
					ws.mergeCells(from+":"+to);
				ws.getCell(from).alignment = { horizontal:'center',vertical : "middle"};
				}
			}
		});
		
		vaDetailData.forEach(function( /*Array*/ each, idx) {
			
			var vaDetailDataValue = each.map(function(each) {
				return each.value;
			});
			var vaDetailDataStyle = each.map(function(each) {
				return each.style;
			});
			var row = ws.addRow(vaDetailDataValue);
			row.eachCell(function(cell, number) {
				
				var fils = StyleUtil._styleTransfer(vaDetailDataStyle[number - 1]);
				cell.fill = fils.fill;
				cell.border = fils.border;
				cell.font = fils.font;
				/** @type cpr.controls.Output */
				var ctl = vcGrid.detail.getControl(number-1);
				var voCellInfo = vaDetailStyle[number - 1];
				if (voCellInfo.style["text-align"] != undefined) {
					cell.alignment = {
						"horizontal": voCellInfo.style["text-align"],
						"vertical" : "center"
					};
				}
				if(ctl.dataType =="date") {
					cell.alignment = {
						"horizontal" : "center"
					}
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
		
		wb.xlsx.writeBuffer().then(function(data) {
			var blob = new Blob([data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			saveAs(blob, 'EXCEL_EXPORT_SAMPLE.xlsx');
			var end = moment().valueOf() - voStartTime;
			console.log(moment.duration(end) / 1000);
		});
		
	}
}