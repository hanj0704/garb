var ExcelUtils = {
	/**
	 * 엑셀을 읽습니다. 서비스를
	 * @param {cpr.controls.Grid} pcGrid 그리드 객체, 데이터셋이 연결되어있어야 합니다.
	 * @param {File} poFile 파일객체
	 * @param {any} poOptions? 옵션 파라미터
	 */
	uploadExcel: function(pcGrid, poFile, poOptions) {
		var vcGrid = pcGrid;
		var vcDataSet = pcGrid.dataSet;
		if (!(vcGrid instanceof cpr.controls.Grid) || !vcDataSet) {
			return;
		}
		return new Promise(function(resolve, reject) {
			
			var vcSubUpload = new cpr.protocols.Submission("_subExcelUplaod_");
			vcSubUpload.method = "post";
			vcSubUpload.mediaType = "multipart/form-data";
			vcSubUpload.async = true;
			vcSubUpload.action = "/cbh-cmn/cmn/uicommon/excel/load-drm-data";
			var util = createCommonUtil();
			var voApp = vcDataSet.getAppInstance();
			voApp.register(vcSubUpload);
			util.Submit.addFileParameter(voApp, "_subExcelUplaod_", poFile);
			util.Submit.send(voApp, "_subExcelUplaod_", function(pbSuccess, sub, poRes) {
				if (pbSuccess) {
					var vsRes = sub.xhr.responseText;
					var vaData = JSON.parse(vsRes)["data"];
					util.DataSet.build(voApp, vcDataSet.id, vaData);
				}
				voApp.unregister(vcSubUpload);
				resolve(pbSuccess);
			});
		});
	},
	
	_s2ab: function(s) {
		
		var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
		var view = new Uint8Array(buf); //create uint8array as viewer
		for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
		return buf;
	},
	/** 엑셀 다운로드에서 사용  **/
	EXCEL_HEADER_BG_COLOR: "f5f6fa",
	EXCEL_HEADER_COLOR: "364a63",
	EXCEL_DATA_ODD_BG_COLOR: "FFFFFF",
	EXCEL_DATA_EVEN_BG_COLOR: "FFFFFF", // "F4F0EB",       
	EXCEL_GROUP_HEADER_BG_COLOR: "F8F8F8",
	EXCEL_GROUP_FOOTER_BG_COLOR: "dbdfea",
	EXCEL_FOOTER_BG_COLOR: "cde2fe",
	EXCEL_FOOTER_COLOR: "000000",
	getExcelColumnName: function(pnColIndex) {
		var ordA = 'A'.charCodeAt(0);
		var ordZ = 'Z'.charCodeAt(0);
		var len = ordZ - ordA + 1;
		
		var vnIndex = pnColIndex;
		
		var vsExcelColumnName = "";
		while (vnIndex >= 0) {
			vsExcelColumnName = String.fromCharCode(vnIndex % len + ordA) + vsExcelColumnName;
			vnIndex = Math.floor(vnIndex / len) - 1;
		}
		
		return vsExcelColumnName;
	},
	setCellStyle: function(cell, styles, pbBold) {
		var vbBold = true;
		if (!ValueUtil.fixBoolean(pbBold)) vbBold = false;
		
		var bgColor = this.EXCEL_HEADER_BG_COLOR;
		var color = this.EXCEL_HEADER_COLOR;
		var vsTextAlign = "left";
		if (styles && styles["background-color"]) {
			bgColor = styles["background-color"].replace("#", "");
		}
		if (styles && styles["color"]) {
			color = styles["color"].replace("#", "");
		}
		if (styles && styles["text-align"]) {
			vsTextAlign = styles["text-align"];
		}
		cell.font = {
			color: {
				argb: color
			},
			bold: vbBold,
			align: vsTextAlign
		}
		
		cell.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: {
				argb: bgColor
			}
		};
		
		//푸터셀에   보더주기 
		cell.border = {
			top: {
				style: "thin",
				color: {
					argb: "black"
				}
			},
			left: {
				style: "thin",
				color: {
					argb: "black"
				}
			},
			bottom: {
				style: "thin",
				color: {
					argb: "black"
				}
			},
			right: {
				style: "thin",
				color: {
					argb: "black"
				}
			}
		};
	},
	setDetailStyle: function(worksheet, pnHeadeRowIndex, pnFooterRowIndex, vnDetailRowsIndex, paGroupRowIndices) {
		
		var vaGroupRowIndices = paGroupRowIndices;
		if (!(vaGroupRowIndices instanceof Array)) {
			vaGroupRowIndices = [];
		}
		
		worksheet.eachRow({
			includeEmpty: true
		}, function(row, rowNumber) {
			row.eachCell({
				includeEmpty: true
			}, function(cell, colNumber) {
				// 데이터 짝 홀 배경 스타일  및 테두리 
				if (rowNumber > pnHeadeRowIndex && rowNumber < pnFooterRowIndex && vaGroupRowIndices.indexOf(rowNumber) < 0) {
					var bgColor = this.EXCEL_DATA_ODD_BG_COLOR;
					if (rowNumber != pnHeadeRowIndex && Math.floor((rowNumber - pnHeadeRowIndex) / (vnDetailRowsIndex + 1)) % 2 == 0) {
						bgColor = this.EXCEL_DATA_EVEN_BG_COLOR;
					}
					
					cell.font = {
						color: {
							argb: "black"
						}
					}
					cell.fill = {
						type: 'pattern',
						pattern: 'solid',
						fgColor: {
							argb: bgColor
						}
					};
				}
				//데이터셀  전체에 보더주기 
				cell.border = {
					top: {
						style: "thin",
						color: {
							argb: "black"
						}
					},
					left: {
						style: "thin",
						color: {
							argb: "black"
						}
					},
					bottom: {
						style: "thin",
						color: {
							argb: "black"
						}
					},
					right: {
						style: "thin",
						color: {
							argb: "black"
						}
					}
				}
			});
		});
	},
	/**
	 * 
	 * @param {Object} workbook xlsx 엑셀객체
	 * @param {String} sheetName 시트명
	 * @param {Object} exportData getExportData에서 받아온 다운로드 데이터 객체 
	 * @param {cpr.controls.Grid} vcGrid 그리드객체
	 * @param {Number[]} vaExcludeCols 미포함 컬럼 인덱스
	 * @param {Boolean} vbUseEngColNmRow 영문컬럼명 사용여부
	 * @param {String} vsDownloadMode 다운로드타입
	 */
	_addSheet: function(workbook, sheetName, exportData, vcGrid, vaExcludeCols, vbUseEngColNmRow, vsDownloadMode) {
		var that = this;
		/** @type Array */
		var vaWidth = exportData.cols;
		var vaHeaderCols = [];
		for (var idx of vcGrid.header.getCellIndices()) {
			// 제외할 컬럼
			//                if (vaExcludeCols == null || vaExcludeCols.indexOf(idx) < 0) {
			//                    vaHeaderCols.push(vcGrid.header.getColumn(idx));
			var header = vcGrid.header.getColumn(idx);
			if (vaExcludeCols.length == 0 || vaExcludeCols.indexOf(header.colIndex) == -1 || (vaExcludeCols.indexOf(header.colIndex) != -1 && header.colSpan != 1)) {
				vaHeaderCols.push(header);
				//2023-11-23 수정 헤더에서 colSpan을 늘린 
				if (header.colSpan != 1) {
					var vnHeaderLength = header.colSpan - 1;
					for (var vnHeaderIdx = 0; vnHeaderIdx < vnHeaderLength; vnHeaderIdx++) {
						vaHeaderCols.push(header);
						
					}
				}
			}
			//                }
		}
		var header = exportData.rowgroups[0];
		var headerStyle = header.style;
		//실제 value가 입력되지 않은 셀에 대한 displayed Text로 값을 변경하는 코드
		//
		/** @type Array */
		var d = exportData.rowgroups[1].data;
		d.forEach(function(eac) {
			eac.forEach(function(each, idx) {
				if (ValueUtil.fixNull(each["value"]) == "") {
					var style = exportData.rowgroups[1].style[idx];
					var ctrl = vcGrid.detail.getControl(style.cellIndex);
					if (ctrl instanceof cpr.controls.Output) {
						if (ctrl.dataType == "number" && ctrl.format.substr(-1) == "0") {
							each["value"] = "0";
						}
					}
				}
			})
		});
		headerStyle.forEach(function(each, idx) {
			each["classes"] = vaHeaderCols[idx].style.getClasses();
			each["text"] = header.data[0][idx].value; // vaHeaderCols[idx].getText(); (헤더셀이 아닌  텍스트 정보로 표시하도록 )
		});
		
		/** @type Array */
		var rowgroups = exportData.rowgroups;
		var detailInfos = [];
		var detailDatas = [];
		detailInfos = rowgroups.filter(function(each) {
			return each.region != "header" && each.region != "footer";
		});
		var footerDatas = [];
		footerDatas = rowgroups.filter(function(each) {
			return each.region == "footer";
		});
		
		//엑셀에서의 데이터를 표시하기 위한 컬럼 정보정리  
		var columns = []; //            
		//컬럼의 이름을 임의의 값으로 설정하여 colindex 로 쉽게 셀의 위치를 지정할 수 있도록 설정 
		for (var i = 0; i < vaWidth.length; i++) {
			var vnWidth = 20;
			if (vaWidth[i].width.indexOf("px")) {
				vnWidth = Math.round(Number(vaWidth[i].width.replace("px", "")) / 9 * 1.2);
			}
			if (!vaHeaderCols[i].visible && vaExcludeCols.length != 0) {
				vnWidth = 0;
			}
			columns.push({
				"key": "column" + i,
				"header": "",
				"width": vnWidth
			});
		}
		
		var headerDatas = [];
		var arrHeader = [];
		var vnHeaderIdx = 0;
		var vnColspan = 1;
		var befRowIndex, curRowIndex;
		
		var vnHeaderRowHeight = vcGrid.header.getRowHeights().length;
		
		headerStyle.forEach(function(each, idx) {
			var headerInfo = {
				header: each.text,
				key: "column" + each.colindex,
				cellInfo: each
			};
			
			curRowIndex = headerStyle[vnHeaderIdx].rowindex;
			
			if (vnHeaderRowHeight > curRowIndex) {
				arrHeader.push(headerInfo);
			}
			
			if (headerStyle[vnHeaderIdx].colspan > 1 && vnColspan == 1) {
				vnColspan = headerStyle[vnHeaderIdx].colspan;
			} else if (vnColspan > 2) {
				vnColspan--;
			} else {
				if (befRowIndex != null && befRowIndex != curRowIndex && curRowIndex != headerStyle[headerStyle.length - 1].rowindex) {
					headerDatas.push(arrHeader);
					befRowIndex = curRowIndex;
					arrHeader = [];
				}
				vnHeaderIdx++;
			}
		});
		
		if (headerStyle[headerStyle.length - 1].rowindex != (headerDatas.length - 1) && vnHeaderRowHeight > headerDatas.length) {
			headerDatas.push(arrHeader);
		}
		
		var vnCellCnt = vcGrid.detail.cellCount;
		
		var detailPreRowIndex, detailCurRowIndex, detailDataType;
		detailInfos.forEach(function(each) {
			/** @type Array */
			var detailData = each.data;
			/** @type Array */
			var detailStyles = each.style;
			var detailRegion = each.region;
			detailData.forEach(function(eachDetail, dataIndex) {
				var detailCell = {};
				var detailStyle = [];
				detailStyles.forEach(function(each) {
					detailStyle.push(_.clone(each));
				});
				for (var idx = 0; idx < detailStyle.length; idx++) {
					//                        detailCell = {};
					detailCurRowIndex = detailStyle[idx].rowindex;
					if (detailPreRowIndex == null) {
						detailPreRowIndex = detailCurRowIndex;
					}
					
					if (detailPreRowIndex != detailCurRowIndex) {
						if (Object.keys(detailCell).length > 0) {
							for (var i = 0; i < columns.length; i++) {
								detailCell["column" + i] = ValueUtil.fixNull(detailCell["column" + i]);
							}
							detailCell["cellInfo"] = detailStyle.filter(function(eachDetail) {
								return eachDetail.rowindex == detailPreRowIndex;
							});;
							detailCell["region"] = detailRegion;
							detailDatas.push(detailCell);
						}
						detailCell = {};
						detailPreRowIndex = null;
						detailDataType = null;
						detailPreRowIndex = detailCurRowIndex;
					}
					
					if (vcGrid.detail.getControl(detailStyle[idx].cellIndex) instanceof cpr.controls.Output) {
						detailDataType = vcGrid.detail.getControl(detailStyle[idx].cellIndex).dataType;
						detailStyle[idx]["format"] = vcGrid.detail.getControl(detailStyle[idx].cellIndex).format;
					}
					if (vcGrid.detail.getControl(detailStyle[idx].cellIndex) instanceof cpr.controls.NumberEditor) {
						detailDataType = "number";
						detailStyle[idx]["format"] = vcGrid.detail.getControl(detailStyle[idx].cellIndex).format;
					}
					if (vcGrid.detail.getControl(detailStyle[idx].cellIndex) instanceof cpr.controls.DateInput) {
						detailDataType = "date";
						detailStyle[idx]["format"] = vcGrid.detail.getControl(detailStyle[idx].cellIndex).mask;
					}
					if (detailDataType == "date") {
						if (detailStyle[idx]["format"] == "HH:mm:ss") {
							
							detailCell["column" + detailStyle[idx].colindex] = ValueUtil.fixNull(eachDetail[idx].value) == "" ? "" : eachDetail[idx].value;
						} else {
							
							detailCell["column" + detailStyle[idx].colindex] = ValueUtil.fixNull(eachDetail[idx].value) == "" ? "" :
								moment(eachDetail[idx].value).format(detailStyle[idx]["format"]) == "Invalid date" ? eachDetail[idx].value : moment(eachDetail[idx].value).format(detailStyle[idx]["format"]);
						}
					} else {
						detailCell["column" + detailStyle[idx].colindex] = eachDetail[idx].value;
					}
					detailDataType = null;
				} // end for 
				detailCell["region"] = detailRegion;
				detailCell["cellInfo"] = detailStyle.filter(function(eachs) {
					return eachs.rowindex == detailPreRowIndex;
				});
				detailCell["cellInfo"].forEach(function(eachs, idxxx) {
					var voTempDetailStyles = eachDetail[idxxx].hasOwnProperty("style") ? eachDetail[idxxx].style : {};
					var vaKeys = Object.keys(voTempDetailStyles);
					if (vaKeys.length > 0) {
						vaKeys.forEach(function(eachKey) {
							eachs["style"][eachKey] = voTempDetailStyles[eachKey];
						});
					}
					if (vsDownloadMode == "display") {
						
						if (eachDetail[idxxx].hasOwnProperty("rowspan")) {
							eachs["rowspan"] = _.clone(eachDetail[idxxx]["rowspan"]);
						}
					}
				});
				detailPreRowIndex == null;
				detailDataType = null;
				detailDatas.push(detailCell);
			});
		});
		var footer = footerDatas;
		
		footerDatas = [];
		
		if (footer && footer.length > 0) {
			
			var footerStyle = footer[0].style;
			var arrfooter = [];
			var vnfooterIdx = 0;
			var vnColspan = 1;
			var befIndex, curIndex;
			var footerInfo = {};
			
			footerStyle.forEach(function(each, idx) {
				var footerInfo = {
					footer: footer[0].data[0][idx].value,
					key: each.colindex // columns[each.colindex].columnName                                  
						,
					cellInfo: each
				};
				
				if (footerDatas[each.rowindex] == undefined) {
					footerDatas[each.rowindex] = [];
				}
				
				footerDatas[each.rowindex].push(footerInfo);
				
			});
			
		}
		//이전로직
		//            if (footer && footer.length > 0) {
		//                
		//                var footerStyle = footer[0].style;
		//                var arrfooter = [];
		//                var vnfooterIdx = 0;
		//                var vnColspan = 1;
		//                var befIndex, curIndex;
		//                var footerInfo = {};
		//                
		//                footerStyle.forEach(function(each, idx) {
		//                    var footerInfo = {
		//                        footer: footer[0].data[0][idx].value,
		//                        key: each.colindex // columns[each.colindex].columnName                                  
		//                            ,
		//                        cellInfo: each
		//                    };
		//                    arrfooter.push(footerInfo);
		//                    curRowIndex = footerStyle[vnfooterIdx].rowindex;
		//                    
		//                    if (footerStyle[vnfooterIdx].colspan > 1 && vnColspan == 1) {
		//                        vnColspan = footerStyle[vnfooterIdx].colspan;
		//                    } else if (vnColspan > 2) {
		//                        vnColspan--;
		//                    } else {
		//                        if (befIndex != curRowIndex && curRowIndex != footerStyle[footerStyle.length - 1].rowindex) {
		//                            footerDatas.push(arrfooter);
		//                            befIndex = curRowIndex;
		//                            arrfooter = [];
		//                        }
		//                        vnfooterIdx++;
		//                    }
		//                });
		//                
		//                if (footerStyle && footerStyle.length > 0) {
		//                    if (footerStyle[footerStyle.length - 1].rowindex != (footerDatas.length - 1)) {
		//                        footerDatas.push(arrfooter);
		//                    }
		//                }
		//            }
		var cellInfos = {
			"header": headerDatas,
			"detail": detailDatas,
			"footer": footerDatas
		}
		
		//        var workbook = new ExcelJS.Workbook();
		var worksheet = workbook.addWorksheet(sheetName);
		worksheet.columns = columns;
		
		//헤더에 대한 정보를 처리( 열병합 정보 조합)
		var headerInfos = cellInfos.header;
		var vnHeaderRow = headerInfos.length;
		
		var headerinfo, cellInfo, sheetColNm;
		var mergeInfos = [];
		
		for (var i = 0; i < headerInfos.length; i++) {
			headerinfo = headerInfos[i];
			for (var idx = 0; idx < headerinfo.length; idx++) {
				cellInfo = headerinfo[idx].cellInfo;
				if (cellInfo && (cellInfo.colspan > 1 || cellInfo.rowspan > 1)) {
					// 핼과 열을 함께 병합시에 문제가 발생
					var endRow = cellInfo.rowspan == 1 ? cellInfo.rowindex + 1 : cellInfo.rowindex + cellInfo.rowspan;
					var endCol = cellInfo.colspan == 1 ? cellInfo.colindex + 1 : cellInfo.colindex + cellInfo.colspan;
					var mergeInfo = {
						"stRowNumber": cellInfo.rowindex + 1,
						"stColNumber": cellInfo.colindex + 1,
						"edRowNumber": endRow,
						"edColNumber": endCol
					};
					if (JSON.stringify(mergeInfos).indexOf(JSON.stringify(mergeInfo)) < 0) {
						mergeInfos.push(mergeInfo);
					}
				}
				
				if (vnHeaderRow < (headerInfos[i][idx].cellInfo.rowindex + 1)) {
					vnHeaderRow = headerInfos[i][idx].cellInfo.rowindex + 1
				}
				if (vnHeaderRow < (headerInfos[i][idx].cellInfo.rowspan)) {
					vnHeaderRow = headerInfos[i][idx].cellInfo.rowspan;
				}
				sheetColNm = that.getExcelColumnName(headerInfos[i][idx].cellInfo.colindex) + (headerInfos[i][idx].cellInfo.rowindex + 1);
				var cell = worksheet.getCell(sheetColNm);
				//헤더 텍스트 표시 
				cell.value = headerInfos[i][idx].header;
				cell.alignment = {
					horizontal: "center",
					vertical: "middle"
				}
				
				if (headerInfos[i][idx].cellInfo.style) {
					var bgColor = headerInfos[i][idx].cellInfo.style["background-color"];
					if (bgColor == null || bgColor == "inherit") {
						headerInfos[i][idx].cellInfo.style["background-color"] = that.EXCEL_HEADER_BG_COLOR;
					}
				} else {
					headerInfos[i][idx].cellInfo.style = {
						"background-color": that.EXCEL_HEADER_BG_COLOR,
						"text-align": "center"
					};
				}
				that.setCellStyle(cell, headerInfos[i][idx].cellInfo.style, true)
				
			} // end for 
			
		} //end for 
		
		mergeInfos.forEach(function(each) {
			worksheet.mergeCells(each.stRowNumber, each.stColNumber, each.edRowNumber, each.edColNumber);
		});
		mergeInfos = [];
		// (헤더,푸터정보를 제외한 ) 디테일데이터 추가
		var detailData = cellInfos.detail;
		worksheet.addRows(detailData);
		// 소계 및 디테일의 셀병합(열병합,행병합 ) 처리 
		var vnStartDetailIndex = vnHeaderRow + 1;
		var detailinfo;
		var detailInfos = cellInfos.detail;
		var vnDetailRowsIndex = 0;
		var vaGroupRowIndices = []; // 엑셀용으로 1붙여 내보기
		var voStyles = {};
		for (var i = 0; i < detailInfos.length; i++) {
			detailinfo = detailInfos[i].cellInfo;
			for (var idx = 0; idx < detailinfo.length; idx++) {
				cellInfo = detailinfo[idx];
				voStyles = cellInfo.style;
				if (detailInfos[i].region == "detail" && vnDetailRowsIndex < cellInfo.rowindex) {
					vnDetailRowsIndex = cellInfo.rowindex;
				}
				if (cellInfo && (cellInfo.colspan > 1 || cellInfo.rowspan > 1)) {
					// 핼과 열을 함께 병합시에 문제가 발생
					var endRow = cellInfo.rowspan == 1 ? 1 : cellInfo.rowindex + cellInfo.rowspan;
					var endCol = cellInfo.colspan == 1 ? cellInfo.colindex + 1 : cellInfo.colindex + cellInfo.colspan;
					var mergeInfo = {
						"stRowNumber": vnStartDetailIndex,
						"stColNumber": cellInfo.colindex + 1,
						"edRowNumber": endRow + (vnStartDetailIndex - 1),
						"edColNumber": endCol
					};
					
					if (JSON.stringify(mergeInfos).indexOf(JSON.stringify(mergeInfo)) < 0) {
						mergeInfos.push(mergeInfo);
					}
				}
				sheetColNm = that.getExcelColumnName(cellInfo.colindex) + (vnStartDetailIndex);
				var cell = worksheet.getCell(sheetColNm);
				if (cellInfo.type == "number") {
					cell.numFmt = "#,##";
					if (cellInfo.format && cellInfo.format.indexOf(".") > -1) {
						cell.numFmt = "#,#0" + cellInfo.format.substring(cellInfo.format.indexOf("."));
					}
				}
				//소계 스타일 적용                 
				if (detailInfos[i].region == "gheader") {
					vaGroupRowIndices.push(vnStartDetailIndex);
					voStyles["background-color"] =  that.EXCEL_GROUP_HEADER_BG_COLOR;
				} else if (detailInfos[i].region == "gfooter") {
					vaGroupRowIndices.push(vnStartDetailIndex);
					voStyles["background-color"] =  that.EXCEL_GROUP_FOOTER_BG_COLOR;
				}
				// default 폰트 색상 정의 
				voStyles["color"] =  "000000"
				cell.alignment = {
					horizontal: "center",
					vertical: "middle"
				}
				if (vbUseEngColNmRow) {
					if (i == 0) {
						voStyles["background-color"] = that.EXCEL_HEADER_BG_COLOR;
						voStyles["text-align"] = 'center';
					}
				}
				if (Object.keys(voStyles).length > 0) {
					that.setCellStyle(cell, voStyles);
				}
			}
			vnStartDetailIndex++;
		}
		
		var vnStartFooterIndex = vnHeaderRow + detailData.length + 1;
		// 추가된 디테일 데이터의 스타일 추가 , 푸터 포함 ) 
		if (vbUseEngColNmRow) {
			
			that.setDetailStyle(worksheet, vnHeaderRow + 1, vnStartFooterIndex, vnDetailRowsIndex, vaGroupRowIndices);
		} else {
			
			that.setDetailStyle(worksheet, vnHeaderRow, vnStartFooterIndex, vnDetailRowsIndex, vaGroupRowIndices);
		}
		
		//푸터 대한 정보를 처리( 열병합 정보 조합)  
		var footerinfo;
		var footerInfos = cellInfos.footer;
		for (var i = 0; i < footerInfos.length; i++) {
			footerinfo = footerInfos[i];
			for (var idx = 0; idx < footerinfo.length; idx++) {
				cellInfo = footerinfo[idx].cellInfo;
				if (cellInfo && (cellInfo.colspan > 1 || cellInfo.rowspan > 1)) {
					// 핼과 열을 함께 병합시에 문제가 발생
					var endRow = cellInfo.rowspan == 1 ? cellInfo.rowindex + 1 : cellInfo.rowindex + cellInfo.rowspan;
					var endCol = cellInfo.colspan == 1 ? cellInfo.colindex + 1 : cellInfo.colindex + cellInfo.colspan;
					var mergeInfo = {
						"stRowNumber": vnStartFooterIndex + cellInfo.rowindex,
						"stColNumber": cellInfo.colindex + 1,
						"edRowNumber": endRow + (vnStartFooterIndex - 1),
						"edColNumber": endCol
					};
					
					if (JSON.stringify(mergeInfos).indexOf(JSON.stringify(mergeInfo)) < 0) {
						mergeInfos.push(mergeInfo);
					}
				}
				
				sheetColNm = that.getExcelColumnName(footerInfos[i][idx].cellInfo.colindex) + (footerInfos[i][idx].cellInfo.rowindex + vnStartFooterIndex);
				var cell = worksheet.getCell(sheetColNm);
				//푸터 텍스트 표시
				cell.value = footerInfos[i][idx].footer;
				if (cellInfo.type == "number") {
					cell.numFmt = "#,##";
				}
				cell.alignment = {
					horizontal:  "center"
				}
				//푸터 스타일 적용 
				that.setCellStyle(cell, {
					"background-color": that.EXCEL_FOOTER_BG_COLOR,
					"color": that.EXCEL_FOOTER_COLOR
				});
			}
		}
		//병합하는  정보 (헤더, 디테일, 푸터)
		mergeInfos.forEach(function(each) {
			worksheet.mergeCells(each.stRowNumber, each.stColNumber, each.edRowNumber, each.edColNumber);
		});
	},
	_addSheetToDataSet: function(datasetCtrl, sheetName, workbook) {
		
		var that = this;
		/** @type cpr.data.DataSet */
		var vcDs = datasetCtrl;
		var vaExcludeColumnIndex = [];
		var voData = cpr.utils.ExportUtil.getExportData(vcDs, {
			rowDataHandler: function(datas, rowIndex) {
				if (rowIndex == 0) {
					/** @type Array */
					var vaData = datas;
					vaData.forEach(function(each, idx) {
						var voHeader = vcDs.getHeader(each);
						if (voHeader.getDataType() == "expression") {
							vaExcludeColumnIndex.push(idx);
						}
					});
					if (vaExcludeColumnIndex.length > 0) {
						vaExcludeColumnIndex.reverse().forEach(function(each) {
							vaData.splice(each, 1);
						});
					}
				} else {
					
					if (vaExcludeColumnIndex.length > 0) {
						vaExcludeColumnIndex.forEach(function(each) {
							datas.splice(each, 1);
						});
					}
				}
			}
		});
		vaExcludeColumnIndex.forEach(function(each) {
			voData.cols.splice(each, 1);
		});
		/** @type Array */
		var vaHeader = voData.rowgroups[0].data[0];
		var vaHeaderData = vaHeader;
		/** @type Array */
		var vaDetailData = voData.rowgroups[1].data;
		var ws = workbook.addWorksheet("sample");
		
		var headerRow = ws.addRow(vaHeaderData);
		headerRow.eachCell(function(cell, number) {
			cell.font = {
				color: {
					argb: that.EXCEL_HEADER_COLOR
				},
				bold: false,
				align: "left"
			}
			
			cell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: {
					argb: that.EXCEL_HEADER_BG_COLOR
				}
			};
			
			//푸터셀에   보더주기 
			cell.border = {
				top: {
					style: "thin",
					color: {
						argb: "black"
					}
				},
				left: {
					style: "thin",
					color: {
						argb: "black"
					}
				},
				bottom: {
					style: "thin",
					color: {
						argb: "black"
					}
				},
				right: {
					style: "thin",
					color: {
						argb: "black"
					}
				}
			};
		});
		
		vaDetailData.forEach(function( /*Array */ each, idx) {
			var vaDetailDataValue = each;
			//          var vaDetailDataStyle = each.map(function(each){
			//              return each.style;
			//          });
			var row = ws.addRow(vaDetailDataValue);
			row.eachCell(function(cell, number) {
				cell.font = {
					color: {
						argb: that.EXCEL_HEADER_COLOR
					},
					bold: false,
					align: "left"
				}
				
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: {
						argb: "FFFFFF"
					}
				};
				
				//푸터셀에   보더주기 
				cell.border = {
					top: {
						style: "thin",
						color: {
							argb: "black"
						}
					},
					left: {
						style: "thin",
						color: {
							argb: "black"
						}
					},
					bottom: {
						style: "thin",
						color: {
							argb: "black"
						}
					},
					right: {
						style: "thin",
						color: {
							argb: "black"
						}
					}
				};
			})
		});
		var vaCols = voData.cols;
		var vaNumCols = vaCols.map(function(each) {
			return 100;
		});
		var whileWidth = vaNumCols.reduce(function(a, b) {
			return a + b;
		}, 0);
		var vnWidthAvg = whileWidth / vaCols.length;
		/** @type Array */
		
		var vaWsCols = ws.columns;
		
		vaWsCols.forEach(function(each, idx) {
			each.width = 14;
		});
	},
	/**
	 * @deprecated
	 * @private
	 * 엑셀 다중시트 데이터를 다운로드합니다.
	 * @param {{grid:cpr.controls.Grid,option :{fileName? : String <!-- 파일명, 확장자는 xlsx로 고정하기 때문에 별도로 입력하지 않음. 값을 입력하지 않는 경우 그리드의 fieldLabel 속성값을 사용하며, fieldLabel이 빈 값인 경우 excel.xlsx로 내려받습니다. -->,
	 * sheetName?:String<!-- 시트명 -->,paExcludeCols?:Number[]|"none"<!-- 엑셀 다운로드를 제외할 컬럼 인덱스.보이지 않는 컬럼은 자동으로 다운로드에서 제외됩니다. -->,
	 * downloadMode?:("display"|"dataset"|"upload")<!-- 다운로드하는 엑셀 타입(기본값:dispaly)<br>display: 그리드에 보여지는 데이터 기준<br>dataset: 데이터셋에있는 데이터 기준<br>upload:헤더 밑에 영문 컬럼명이 추가됩니다. -->}}[]} paExportOption 옵션 파라미터
	 * @return {Promise}
	 */
	exportExcelJsMultiSheet: function(paExportOption) {
		var vaGrid = [];
		var vaOptions = [];
		paExportOption.forEach(function(each) {
			vaGrid.push(each.grid);
			var voOption = each.option ? each.option : {};
			vaOptions.push(voOption);
		});
		
		return this.exportExcelJsToJSON(vaGrid, vaOptions);
	},
	/**
	 * 엑셀을 다운로드합니다.
	 * @param {cpr.controls.Grid} gridCtrl 그리드 컨트롤. 그리트 컨트롤 아이디가 아닌 app.lookup()으로 가져온 그리드 객체입니다.
	 * @param {{fileName? : String <!-- 파일명, 확장자는 xlsx로 고정하기 때문에 별도로 입력하지 않음. 값을 입력하지 않는 경우 그리드의 fieldLabel 속성값을 사용하며, fieldLabel이 빈 값인 경우 excel.xlsx로 내려받습니다. -->,
	 * sheetName?:String<!-- 시트명 -->,paExcludeCols?:Number[]|"none"<!-- 엑셀 다운로드를 제외할 컬럼 인덱스.보이지 않는 컬럼은 자동으로 다운로드에서 제외됩니다. -->,
	 * downloadMode?:("display"|"dataset"|"upload")<!-- 다운로드하는 엑셀 타입(기본값:dispaly)<br>display: 그리드에 보여지는 데이터 기준<br>dataset: 데이터셋에있는 데이터 기준<br>upload:헤더 밑에 영문 컬럼명이 추가됩니다.-->
	 * ,useEngColNmRow?: Boolean<!-- 영문컬럼명 추가 여부(기본값:false)<br>엑셀업로드용으로 다운로드 하는 경우, 해당 속성을 true로 지정해야합니다.-->
	 * ,acceptCellVisible? : Boolean<!-- 기본값:false, 셀 내 컴포넌트를 배치하여 visible을 행별로 제어하는 경우 해당 visible 구분에 대한 엑셀 데이터 표시 여부를 설정합니다. 해당 속성을 true로 지정하면 반복분이 더 길게
	 * 수행되어 퍼포먼스에 차이가 발생할 수 있습니다.downloadMode가 display 인 경우에만 동작합니다-->}} poOption 옵션 파라미터
	 * @return {Promise}
	 */
	exportExcelJsToJSON: function(gridCtrl, poOption) {
		//        var hasOption = function(psParamName) {
		//            if (ValueUtil.fixNull(poOption) != "" && poOption[psParamName]) {
		//                return true;
		//            } else {
		//                return false;
		//            }
		//        }
		var voOption = ValueUtil.fixNull(poOption) == "" ? {} : poOption;
		var that = this;
		var util = createCommonUtil();
		/** @type Array */
		var vaGrids = gridCtrl;
		var voOptions = poOption;
		
		if (!(vaGrids instanceof Array)) {
			vaGrids = [vaGrids];
		}
		
		if (ValueUtil.fixNull(voOptions) == "") {
			voOptions = [];
		}
		if (!(voOptions instanceof Array)) {
			
			voOptions = [voOptions];
		}
		var voApp = vaGrids[0].getAppInstance();
		var voDownloadPromise = function() {
			return Loader.ExcelLoader.checkLibLoaded().then(function(input) {
				var workbook = new ExcelJS.Workbook();
				var fileName = voOptions.length > 0 ? ValueUtil.fixNull(voOptions[0].fileName) == "" ? ValueUtil.fixNull(vaGrids[0].fieldLabel) != "" ? vaGrids[0].fieldLabel : "excel" : voOptions[0].fileName : "excel";
				for (var idxsn = 0; idxsn < vaGrids.length; idxsn++) {
					var voOption = voOptions[idxsn] == null ? {} : voOptions[idxsn];
					/** @type cpr.controls.Grid */
					var vcGrid = vaGrids[idxsn];
					var vaExcludeCols = [];
					var vaIncludeCols = [];
					if (voOption.paExcludeCols != null) {
						if (!(voOption.paExcludeCols instanceof Array)) {
							voOption.paExcludeCols = [voOption.paExcludeCols];
						}
						vaExcludeCols = voOption.paExcludeCols;
					}
					var vsDownloadMode = ValueUtil.fixNull(voOption) != "" && voOption["downloadMode"] ? voOption["downloadMode"] : "display";
					var vbUseEngColNmRow = ValueUtil.fixNull(voOption) != "" && voOption["useEngColNmRow"] ? !!voOption["useEngColNmRow"] : false;
					//            var fileName = ValueUtil.fixNull(voOption.fileName) == "" ? ValueUtil.fixNull(vcGrid.fieldLabel) != "" ? vcGrid.fieldLabel: "excel" : voOption.fileName;
					var sheetName = ValueUtil.fixNull(voOption.sheetName) == "" ? "sheet" + idxsn : voOption.sheetName;
					var vnRowCnt = vcGrid.getRowCount();
					if (vnRowCnt >= 30000) {
						
						util.Msg.openMsg(vcGrid.getAppInstance(), "3만건을 넘는 데이터는 서비스에서 구현하여 다운로드 되어야 합니다.");
						return;
					}
					if (vsDownloadMode != "dataset") {
						//                
						var vnCellCount = vcGrid.header.cellCount;
						var vaCellIndices = vcGrid.header.getCellIndices();
						if (vaExcludeCols == "none") {
							vaExcludeCols = [];
							for (var i of vaCellIndices) {
								var voTempHeader = vcGrid.header.getColumn(i);
								if (vaIncludeCols.indexOf(voTempHeader.colIndex) == -1) {
									vaIncludeCols.push(voTempHeader.colIndex);
								}
							}
							//                    vaIncludeCols = vaCellIndices;
						} else {
							
							for (var i of vaCellIndices) {
								var voTempHeader = vcGrid.header.getColumn(i);
								if (!voTempHeader.visible) {
									if (vaExcludeCols.indexOf(voTempHeader.colIndex) == -1) {
										vaExcludeCols.push(voTempHeader.colIndex);
									}
								} else {
									if (vaExcludeCols.indexOf(voTempHeader.colIndex) == -1 && poOption?.acceptCellVisible === true) {
										vaIncludeCols.push(voTempHeader.colIndex);
									}
								}
							}
						}
					}
					//            var util = createCommonUtil();
					util.showLoadMask(vcGrid.getAppInstance());
					var exportData = null;
					if (vsDownloadMode == "dataset") {
						var voDataComponent = vcGrid;
						if (vcGrid.type == "grid") {
							voDataComponent = vcGrid.dataSet;
						}
						that._addSheetToDataSet(voDataComponent, sheetName, workbook);
						continue;
					} else if (vsDownloadMode == "display") {
						var voTempExportOption = {
							exceptStyle: false,
							applyFormat: true,
							useFormat: false,
							excludeColIndex: vaExcludeCols,
							applySuppress: true
						}
						if (poOption?.acceptCellVisible === true) {
							var vnHeaderIndex = vcGrid.header.getRowHeights().length;
							voTempExportOption["rowDataHandler"] = function(datas, rowIndex) {
								if (rowIndex > vnHeaderIndex) {
									
									for (let temp in datas) {
										let data = datas[temp];
										let visibility = gridCtrl.detail.getControlAttr(rowIndex - 1, vaIncludeCols[temp], "visible");
										if (visibility === false) {
											data.value = null;
										}
									}
								}
							}
						}
						//f,t,f,t일떄 사용자 눈에 보에는 데이터를 기준으로 데이터가 뽑힘, 다만 숫자형 데이터에 대해서 엑셀에서숫자,통화로 인식할 수 없음 
						//f,f,t,t일땐 그리드의 데이터 자체를 뽑아내서 사용하는데, 엑셀에서 숫자, 통화를 일부 인식할 수 있음.
						exportData = vcGrid.getExportData(voTempExportOption);
						if (vbUseEngColNmRow) {
							var vaDetailStyle = exportData.rowgroups[1].style;
							var vaColList = vaDetailStyle.map(function(each, idx) {
								return {
									value: each.columnName ? each.columnName : "",
									style: {}
								};
							});
							exportData.rowgroups[1].data.unshift(vaColList);
						}
					} else if (vsDownloadMode == "upload") {
						//f,t,f,t일떄 사용자 눈에 보에는 데이터를 기준으로 데이터가 뽑힘, 다만 숫자형 데이터에 대해서 엑셀에서숫자,통화로 인식할 수 없음 
						//f,f,t,t일땐 그리드의 데이터 자체를 뽑아내서 사용하는데, 엑셀에서 숫자, 통화를 일부 인식할 수 있음.
						exportData = vcGrid.getExportData({
							exceptStyle: false,
							applyFormat: false,
							useFormat: true,
							excludeColIndex: vaExcludeCols,
							applySuppress: false
						});
						if (vbUseEngColNmRow) {
							
							var vaDetailStyle = exportData.rowgroups[1].style;
							var vaColList = vaDetailStyle.map(function(each, idx) {
								return {
									value: each.columnName ? each.columnName : "",
									style: {}
								};
							});
							exportData.rowgroups[1].data.unshift(vaColList);
						}
					}
					that._addSheet(workbook, sheetName, exportData, vcGrid, vaExcludeCols, vbUseEngColNmRow, vsDownloadMode);
				}
				return new Promise(function(resolve, rejects) {
					
					var buff = workbook.xlsx.writeBuffer().then(function(data) {
						var blob = new Blob([data], {
							type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
						});
						var a = saveAs(blob, fileName + ".xlsx");
						
						var isIE = ["ie", "edge"].indexOf(cpr.utils.Util.detectBrowser().name) !== -1;
						if (!isIE) {
							a.onwriteend = function() {
								util.hideLoadMask(voApp);
								resolve();
							}
						} else {
							if (a) {}
						}
					});
				});
				//            return that._exportJsExcel(fileName, sheetName, columns, cellInfos,util,vcGrid.getAppInstance());
				//          this._exportJsExcel(fileName, sheetName, result, arrHeader,gridCtrl);
			});
		}
		//메뉴 조회가 기본 동작으로 움직이는 시점에서는 getGlobIsMenuServiceSend() 내용이 사라져야합니다.
		if (false && (voApp.hasOwnProperty("psnlInfoIncldYn") && voApp["psnlInfoIncldYn"] == "1")) {
			
			return util.Dialog.open(gridCtrl.getAppInstance(), "cbhcmn/common/CMNPDownloadReasonInput", 600, 400, function(ev) {
				var vcDialog = ev.control;
				var voReturnValue = vcDialog.returnValue;
				
				if (!ValueUtil.isNull(voReturnValue)) {
					if ("1" == voReturnValue) {
						//download
						return voDownloadPromise();
					} else {
						return new Promise(function(resolve, reject) {
							reject();
						});
						//no download
					}
				}
			});
		} else {
			//개인정보포험여부컬럼정보가 0인 경우에는 그냥 다운로드 처리 가능
			return voDownloadPromise();
		}
		
	}
}

var Loader = {
	
	ExcelLoader : {
		
		checkLibLoaded: function(){
			return new Promise(function(resolve,reject){
				
				resolve();
			});
		}
	}
}

globals.ExcelUtilW = ExcelUtils;