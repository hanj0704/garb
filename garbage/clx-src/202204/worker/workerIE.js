
console.log(navigator.appName ==="Netscape" && navigator.userAgent.search("Trident") !== -1 ||
	navigator.userAgent.toLowerCase().indexOf("msie") !== -1);
	
	if(navigator.appName ==="Netscape" && navigator.userAgent.search("Trident") !== -1 ||
	navigator.userAgent.toLowerCase().indexOf("msie") !== -1) {
		
		importScripts("corejs.min.js");
		importScripts("exceljs_3.8.min.js");
	} else {
		importScripts("exceljs_4.2.min.js");
	}

onmessage = function(event){
	
	
//	console.log(event);
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

//		var vaHeaderStyle = voExportOption.rowgroups[0].style;
		var vaNewHead = [];
		var headerDepth = datas.userIndex;
//		console.log(vaS);
		if(headerDepth >= 1) {
			for(var i = 0 ; i < headerDepth ; i++) {
				
				vaNewHead.push([]);
			}
			
			vaHeaderStyle.forEach(function(each,idx){
				if (each.colspan > 1 && each.rowspan > 1) {
					for(var i = each.colindex; i < each.colindex + each.colspan; i++){
						
						for(var j = each.rowindex; j < each.rowindex + each.rowspan; j++){
							vaNewHead[j][i] = vaHeaderData[idx];
						}
					}
				} else {
					
					if (each.colspan > 1) {
						for (var i = each.colindex; i < each.colindex + each.colspan; i++) {
							
							vaNewHead[each.rowindex][i] = vaHeaderData[idx];
						}
					}
					if (each.rowspan > 1) {
						for (var j = each.rowindex; j < each.rowindex + each.rowspan; j++) {
							vaNewHead[j][each.colindex] = vaHeaderData[idx];
						}
					}
				}
				
				vaNewHead[each.rowindex][each.colindex] = vaHeaderData[idx];
					
			});
		} else {
			//		var headerRow = ws.addRow(vaHeaderData);
		}
		vaNewHead.forEach(function(each){
		var headerRow = ws.addRow(each);
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
						"horizontal": "center"
					};
				}
			})
		});
		var a = ["A",'B','C',"D",'E','F','G','H','I','J','K',"L","M",'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		vaHeaderStyle.forEach(function(each){
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
		var vbIsSuppressed = datas.applySupp;
		if (!vbIsSuppressed) {
			
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
					var bgColor = vaDetailDataStyle[number - 1]["background-color"] != undefined ? "FF" + vaDetailDataStyle[number - 1]["background-color"].toString().substring(1) : "FFFFFFFF";
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
			
		} else {
			var vnDetailStartIndex = headerDepth +1;
			var vaMergeInfo = [];
			vaDetailData.forEach(function(/*Array*/each,idx){
				
				var vaDetailEachRow = each;
				var vaDetailRowVal = each.map(function(each){
					return each.value != undefined ? each.value : "";
				});
				var vaDetailDataStyle = each.map(function(each) {
					return each.style;
				});
				var row = ws.addRow(vaDetailRowVal);
				row.eachCell(function(cell, number) {
					var fils = styleTransfer(vaDetailStyle[number - 1].style);
					var bgColor ="FFFFFFFF";
					if(vaDetailDataStyle[number - 1] != undefined) {
						
					 bgColor = vaDetailDataStyle[number - 1]["background-color"] != undefined ? "FF" + vaDetailDataStyle[number - 1]["background-color"].toString().substring(1) : "FFFFFFFF";
					} 
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
				vaDetailEachRow.forEach(function(Deach,didx){
					var voDetailCell = Deach;
					if(Object.keys(voDetailCell).length != 0 ) {
						
						var key = Object.keys(voDetailCell);
						if(key.indexOf("rowspan") != -1  && key.indexOf("colspan") != -1) {
							var detailIndex = didx +1 ;
							var vsStartAlphabet = a[didx];
							var vnStartIndex = vnDetailStartIndex + idx;
							if(voDetailCell["rowspan"] != 1 && voDetailCell["colspan"] != 1) {
								var vnEndIndex  = vnStartIndex + voDetailCell["rowspan"] -1;
								var vsEndAlphabet = a[didx+voDetailCell["colspan"]-1];
								
								vaMergeInfo.push(vsStartAlphabet+vnStartIndex+":"+vsEndAlphabet+vnEndIndex);
							} else {
								
								if(voDetailCell["rowspan"] != 1) {
								var vnEndIndex  = vnStartIndex + voDetailCell["rowspan"] -1;
								vaMergeInfo.push(vsStartAlphabet+vnStartIndex+":"+vsStartAlphabet+vnEndIndex);
								}
								
								if(voDetailCell["colspan"] != 1) {
									
									var vsEndAlphabet = a[didx+voDetailCell["colspan"] -1];
									vaMergeInfo.push(vsStartAlphabet+vnStartIndex+":"+vsEndAlphabet+vnStartIndex);
								}
							}
						}
					}
				});
			});
			
			vaMergeInfo.forEach(function(each){
				var from = each.toString().split(":")[0];
				
				ws.mergeCells(each);
				ws.getCell(from).alignment = { horizontal:'center',vertical : "middle"};
			});
		}
		
		
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