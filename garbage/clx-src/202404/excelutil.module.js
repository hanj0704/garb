/************************************************
 * excelutil.module.js
 * Created at 2024. 4. 3. 오후 5:12:11.
 *
 * @author HANS
 ************************************************/

var ExcelUtil = {
	
	/**
	 * 
	 * @param {cpr.controls.Grid} pcGrid
	 * @param {File} poFile
	 * @param {Object} poOption
	 */
	uploadExcel : function(pcGrid,poFile,poOption) {
		
		var vcGrid = pcGrid;
		var vcDataSet = pcGrid.dataSet;
		if(!(vcGrid instanceof cpr.controls.Grid) || !vcDataSet) {
			return;
		}
		
		return new Promise(function(resolve,reject) {
			var vcSubUpload = new cpr.protocols.Submission("_subExcelUpload_");
			vcSubUpload.method = "post";
			vcSubUpload.mediaType = "moutlpart/form-data";
			vcSubUpload.async = true;
			vcSubUpload.action = "";
			var util = createCommonUtil();
			var voApp = vcDataSet.getAppInstance();
			voApp.register(vcSubUpload);
			util.Submit.addFileParameter(app, "_subExcelUpload_",poFile);
			util.Submit.send(voApp, "+subExcelUpload_", null, function(pbSuccess){
				var vsRes = sub.xhr.responseText;
				var vaData = JSON.parse(vsRes)["data"];
				vcDataSet.build(vaData);
				voApp.unregister(vcSubUpload);
				resolve(pbSuccess);
			});
		})
	},
	
	_s2ab : function(s){
		
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for(var i = 0 ; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	},
	
	getExcelColumnName : function(pnColIndex){
		var ordA = "A".charCodeAt(0);
		var ordZ = "Z".charCodeAt(0);
		var len = ordZ - ordA +1;
		var vnIndex = pnColIndex;
		var vsExcelColumnName = "";
		while(vnIndex >= 0) {
			vsExcelColumnName =  String.fromCharCode(vnIndex % len + ordA) + vsExcelColumnName;
			vnIndex = Math.floor(vnIndex / len) -1;
			
		}
		return vsExcelColumnName;	
	},
	
	setCellStyle : function(cell,styles,pbBold) {
		var vbBold = true;
		if(!ValueUtil.fixBoolean(pbBold)) vbBold = false;
		
		var bgColor = this.EXCEL_HEADER_BG_COLOR;
		var color = this.EXCEL_HEADER_COLOR;
		
		var vsTextAlign = "left";
		if(styles && styles['background-color']) {
			bgColor = styles["background-color"].replace("#",'');
		}
		if(styles && styles['color']) {
			color = styles["color"].replace("#",'');
		}
		if(styles && styles['text-align']) {
			vsTextAlign = styles["text-align"];
		}
		cell.font = {
			color : {
				argb: color
			},
			bold: vbBold,
			align : vsTextAlign
		}
		
		cell.fill = {
			type : "pattern",
			pattern : "solid",
			fgColor : {
				argb : bgColor
			}
		}
		cell.border = {
			top : {
				style : "thin",
				color : {
					argb: "black"
				}
			},
			left : {
				style : "thin",
				color : {
					argb: "black"
				}
			},
			bottom : {
				style : "thin",
				color : {
					argb: "black"
				}
			},
			right : {
				style : "thin",
				color : {
					argb: "black"
				}
			}
		}
	},
	setDetailStyle: function(worksheet, pnHeaderRowIndex, pnFooterRowIndex, vnDetailRowsIndex, paGroupRowIndices) {
		var vaGrounRowIndices = paGroupRowIndices;
		if (!(vaGrounRowIndices instanceof Array)) {
			vaGrounRowIndices = [];
		}
		worksheet.eachRow({
			includeEmpty: true
		}, function(row, rowNumber) {
			row.eachCell({
				includeEmpty: true
			}, function(cell, colNumber) {
				if (rowNumber > pnHeaderRowIndex && rowNumber < pnFooterRowIndex && vaGrounRowIndices.indexOf(rowNumber) < 0) {
					var bgColor = this.EXCEL_DATA_ODD_BG_COLOR;
					if (rowNumber != pnHeaderRowIndex && Math.floor((rowNumber - pnHeaderRowIndex) / (vnDetailRowsIndex + 1)) % 2 == 0) {
						bgColor: this.EXCEL_DATA_EVEN_BG_COLOR;
					}
					cell.font = {
						color: {
							argb: "black"
						},
					}
					cell.fill = {
						type: "pattern",
						pattern: "solid",
						fgColor: {
							argb: bgColor
						}
					}
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
				}
			})
		})
	},
	_addSheet : function(workbook,sheetName,exportData,vcGrid,vaExcludeCols,vbUseEngColNmRow,vsDownloadMode) {
		var that = this;
		/** @type Array */
		var vaWidth = exportData.cols;
		var vaHeaderCols = [];
		for(var idx of vcGrid.header.getCellIndices()) {
			var header = vcGrid.header.getColumn(idx);
			if(vaExcludeCols.length == 0 || vaExcludeCols.indexOf(header.colIndex) == -1 || (vaExcludeCols.indexOf(header.colIndex) != -1 && header.colSpan != 1)) {
				vaHeaderCols.push(header);
				if(header.colSpan !=1) {
					var vnHeaderLength = header.colSpan -1;
					for(var vnHeaderIdx = 0; vnHeaderIdx < vnHeaderLength ; vnHeaderIdx++){
						vaHeaderCols.push(header);
					}
				}
			}
		}
		
		var header = exportData.rowgroups[0];
		var headerStyle = header.style;
		
		var d= exportData.rowgouprs[1].data;
		d.forEach(function(eac){
			eac.forEach(function(each,idx){
				if(ValueUtil.fixNull(each["value"]) == "") {
					var style = exportData.rowgroups[1].style[idx];
					var ctrl = vcGrid.detail.getControl(style.cellIndex);
					if(ctrl instanceof cpr.controls.Output) {
						if(ctrl.dataType == "number" && ctrl.format.substr(-1) =="0") {
							each["value"] = "0";
						}
					}
				}
			})
		});
		
		headerStyle.forEach(function(each,idx) {
			each["classes"] = vaHeaderCols[idx].style.getClasses();
			each["text"] = header.data[0][idx].value;
		});
		var rowgroups = exportData.rowgroups;
		var detailInfos = [];
		var detailDatas = [];
		detailInfos = rowgroups.filter(function(each){
			return each.region != "header" && each.regin != "footer";
		});
		var footerDatas = [];
		footerDatas = rowgroups.filter(function(each){
			return each.region == "footer";
		});
		
		var columns = [];
		for(var i = 0; i < vaWidth.length; i++) {
			var vnWidth = 20;
			if(vaWidth[i].width.indexOf("px")) {
				vnWidth = Math.round(Number(vaWidth[i].width.replace("px",""))/9 * 1.2);
			}
			if(!vaHeaderCols[i].visible && vaExcludeCols.length !=0) {
				vnWidth = 0;
			}
			columns.push({
				'key' : "column" +i,
				"header" : "",
				"width":vnWidth
			});
		
		}
		var headerDatas = [];
		var arrHeader = [];
		var vnHeaderIdx = 0;
		var vnColspan = 1;
		var befRowIndex, curRowIndex;
		
		var vnHeaderRowHeight = vcGrid.header.getRowHeights().length;
		
		headerStyle.forEach(function(each,idx){
			var headerInfo = {
				header : each.text,
				key : "column"+each.colindex,
				cellInfo : each
			};
			
			curRowIndex = headerStyle[vnHeaderIdx].rowindex;
			
			if(vnHeaderRowHeight > curRowIndex) {
				arrHeader.push(headerInfo);
			}
			if(headerStyle[vnHeaderIdx].colSpan > 1 && vnColspan == 1) {
				vnColspan = headerStyle[vnHeaderIdx].colspan;
			} else if(vnColspan > 2) {
				vnColspan--;
			} else {
				if(befRowIndex != null && befRowIndex != curRowIndex && curRowIndex != headerStyle[headerStyle.length - 1].rowindex) {
					headerDatas.push(arrHeader);
					befRowIndex = curRowIndex;
					arrHeader = [];
				}
				vnHeaderIdx++;
			}
		});
		
		if(headerStyle[headerStyle.length -1].rowindex != (headerDatas.length -1) && vnHeaderRowHeight > headerDatas.length) {
			headerDatas.push(arrHeader);
		}
		
		var vnCellCnt = vcGrid.detail.cellCount;
		var detailPreRowIndex, detailCurRowIndex, detailDataType;
		detailInfos.forEach(function(each){
			/** @type Array */
			var detailData = each.data;
			/** @type Array */
			var detailStyles=  each.style;
			var detailRegion = each.region;
			detailData.forEach(function(eachDetail,dataIndex){
				var detailCell = {};
				var detailStyle = [];
				detailStyles.forEach(function(each){
					detailStyle.push(_.clone(each));
				});
				for(var idx = 0; idx < detailStyle.length; idx++) {
//					detailCell = {};
					detailCurRowIndex = detailStyle[idx].rowindex;
					if(detailPreRowIndex == null) {
						detailPreRowIndex = detailCurRowIndex;
					}
					
					if(detailPreRowIndex != detailCurRowIndex) {
						if(Object.keys(detailCell).length > 0) {
							for(var i = 0; i < columns.length; i++){
								detailCell["column"+i] = ValueUtil.fixNull(detailCell["column" + i]);
							}
							detailCell["cellInfo"] = detailStyle.filter(function(eachDetail){
								return eachDetail.rowindex == detailPreRowIndex;
							});
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
						if(detailStyle[idx]["format"] == "HH:mm:ss") {
							detailCell["column" + detailStyle[idx].colindex] = ValueUtil.fixNull(eachDetail[idx].value) == "" ? "" : eachDetail[idx].value;
						} else {
							detailCell["column" + detailStyle[idx].colindex] = ValueUtil.fixNull(eachDetail[idx].value) == "" ? "" :
							moment(eachDetail[idx].value).format(detailStyle[idx]["format"]) == "Invalid date" ? eachDetail[idx].value : moment(eachDetail[idx].value).format(detailStyle[idx]["format"]);
						}
					} else {
						detailCell["column" + detailStyle[idx].colindex] = eachDetail[idx].value;
					}
					detailDataType = null;
				}
				detailCell["region"] = detailRegion;
				detailCell["cellInfo"] = detailStyle.filter(function(eachs){
					return eachs.rowindex == detailPreRowIndex;
				});
				detailCell["cellInfo"].forEach(function(eachs,idxxx){
					var voTempDetailStyles = eachDetail[idxxx].hasOwnProperty("style") ? eachDetail[idxxx].style : {};
					var vaKeys = Object.keys(voTempDetailStyles);
					if(vaKeys.length > 0) {
						vaKeys.forEach(function(eachKey){
							eachs["style"][eachKey] = voTempDetailStyles[eachKey];
						});
					}
					if(vsDownloadMode == "display") {
						if(eachDetail["idxxx"].hasOwnProperty("rowspan")) {
							eachs["rowspan"] = _.clone(eachDetail[idxxx]["rowspan"]);
						}
					}
				});
				detailPreRowIndex = null;
				detailDataType = null;
				detailDatas.push(detailCell);
			});
		});
		
		var footer = footerDatas;
		
		footerDatas = [];
		if(footer && footer.length > 0) {
			
			var footerStyle = footer[0].style;
			var arrfooter = [];
			var vnfooterIdx = 0;
			var vnColspan = 1;
			var befIndex, curIndex;
			var footerInfo = {};
			footerStyle.forEach(function(each,idx){
				var footerInfo = {
					footer : footer[0].data[0][idx].value,
					key : each.colindex,
					cellInfo:each
				};
				if(footerDatas[each.rowindex] == undefined) {
					footerDatas[each.rowindex] = [];
				}
				footerDatas[each.rowindex].push(footerInfo);
			});
		}
		var cellInfos = {
			"header" : headerDatas,
			"detail" : detailDatas,
			"footer" : footerDatas
		}
		
		var worksheet = workbook.addWorksheet(sheetName);
		worksheet.columns = columns;
		
		var headerInfos = cellInfos.header;
		var vnHeaderRow = headerInfos.length;
		
		var headerinfo, cellInfo, sheetColNm;
		var mergeInfos = [];
		
		for(var i = 0; i < headerInfos.length; i++){
				headerinfo = headerInfos[i] ; 
				for(var idx = 0; idx < headerinfo.length; idx++){
					cellInfo = headerinfo[idx].cellInfo;
					if(cellInfo && (cellInfo.colspan > 1 || cellInfo.rowspan > 1)) {
						// 핼과 열을 함께 병합시에 문제가 발생
						var endRow = cellInfo.rowspan == 1 ? cellInfo.rowindex  + 1 : cellInfo.rowindex + cellInfo.rowspan ; 
						var endCol = cellInfo.colspan == 1 ? cellInfo.colindex  + 1 : cellInfo.colindex + cellInfo.colspan ; 
						var mergeInfo = {"stRowNumber" :cellInfo.rowindex + 1 
										, "stColNumber"  : cellInfo.colindex + 1
										, "edRowNumber" : endRow
										, "edColNumber" : endCol };
						if( JSON.stringify(mergeInfos).indexOf(JSON.stringify(mergeInfo)) < 0 ) {
							mergeInfos.push(mergeInfo);
						}
					}
					
					if(vnHeaderRow < (headerInfos[i][idx].cellInfo.rowindex + 1)) {
						vnHeaderRow = headerInfos[i][idx].cellInfo.rowindex + 1
					}
					sheetColNm = that.getExcelColumnName(headerInfos[i][idx].cellInfo.colindex) + (headerInfos[i][idx].cellInfo.rowindex + 1);
					var cell = worksheet.getCell(sheetColNm);
					//헤더 텍스트 표시 
					cell.value =  headerInfos[i][idx].header;
					cell.alignment = {horizontal : ValueUtil.nvl( headerInfos[i][idx].cellInfo.style["text-align"], "center")  
									, vertical : "middle" } 
									
					if(headerInfos[i][idx].cellInfo.style) {
						var bgColor =  headerInfos[i][idx].cellInfo.style["background-color"] ;
						if( bgColor == null || bgColor == "inherit" ){
							headerInfos[i][idx].cellInfo.style["background-color"] = that.EXCEL_HEADER_BG_COLOR;
						} 
					}else {	
						headerInfos[i][idx].cellInfo.style = {"background-color" : that.EXCEL_HEADER_BG_COLOR  , "text-align" : "center"} ;
					}		
					
					that.setCellStyle(cell, headerInfos[i][idx].cellInfo.style , true)
					
				}// end for 
			}
			mergeInfos.forEach(function(each) {
				worksheet.mergeCells(each.stRowNumber, each.stColNumber, each.edRowNumber, each.edColNumber);
			});
			mergeInfos = [];
			
			var detailData = cellInfos.detail;
			worksheet.addRows(detailData);
			
			var vnStartDetailIndex = vnHeaderRow + 1;
			var detailinfo;
			var detaolInfos = cellInfos.detail;
			var vnDetailRowsIndex = 0;
			var vaGroupRowIndices = [];
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
						voStyles["background-color"] = ValueUtil.nvl(voStyles["background-color"], that.EXCEL_GROUP_HEADER_BG_COLOR);
					} else if (detailInfos[i].region == "gfooter") {
						vaGroupRowIndices.push(vnStartDetailIndex);
						voStyles["background-color"] = ValueUtil.nvl(voStyles["background-color"], that.EXCEL_GROUP_FOOTER_BG_COLOR);
					}
					// default 폰트 색상 정의 
					voStyles["color"] = ValueUtil.nvl(voStyles["color"], "000000");
					cell.alignment = {
						horizontal: ValueUtil.nvl(voStyles["text-align"], "center"),
						vertical: "middle"
					};
					
					if (vbUseEngColNmRow) {
						if (i == 0) {
							voStyles["background-color"] = that.EXCEL_Header_BG_COLOR;
							voStyles["text-align"] = "center";
						}
					}
					
					if (Object.keys(voStyles).length > 0) {
						that.setCellStyle(cell, voStyles);
					}
				}
				vnStartDetailIndex++;
			}
			
			var vnStartFooterIndex = vnHeaderRow + detailData.length + 1;
			if (vbUseEngColNmRow) {
				
				that.setDetailStyle(worksheet, vnHeaderRow + 1, vnStartFooterIndex, vnDetailRowsIndex, vaGroupRowIndices);
			} else {
				
				that.setDetailStyle(worksheet, vnHeaderRow, vnStartFooterIndex, vnDetailRowsIndex, vaGroupRowIndices);
			}
			
			
			var footerinfo;
			var footerInfos = cellInfos.footer;
			for(var i = 0; i < footerInfos.length; i++){
				footerinfo = footerInfos[i] ; 
				for(var idx = 0; idx < footerinfo.length; idx++){
					cellInfo = footerinfo[idx].cellInfo;
					if(cellInfo && (cellInfo.colspan > 1 || cellInfo.rowspan > 1)) {
						// 핼과 열을 함께 병합시에 문제가 발생
						var endRow = cellInfo.rowspan == 1 ? cellInfo.rowindex  + 1 : cellInfo.rowindex + cellInfo.rowspan ; 
						var endCol = cellInfo.colspan == 1 ? cellInfo.colindex  + 1 : cellInfo.colindex + cellInfo.colspan ; 
						var mergeInfo = {"stRowNumber" : vnStartFooterIndex + cellInfo.rowindex
										, "stColNumber"  : cellInfo.colindex + 1
										, "edRowNumber" : endRow  + (vnStartFooterIndex - 1) 
										, "edColNumber" : endCol };
																							
						if( JSON.stringify(mergeInfos).indexOf(JSON.stringify(mergeInfo)) < 0 ) {
							mergeInfos.push(mergeInfo);
						}
					}
					
					 
					sheetColNm = that.getExcelColumnName(footerInfos[i][idx].cellInfo.colindex) + (footerInfos[i][idx].cellInfo.rowindex + vnStartFooterIndex);
					var cell = worksheet.getCell(sheetColNm);
					//푸터 텍스트 표시
					cell.value =  footerInfos[i][idx].footer;
					if(cellInfo.type == "number"){
						cell.numFmt = "#,##"; 
					}
					cell.alignment = {horizontal : ValueUtil.nvl(cellInfo.style["text-align"], "center") }
					//푸터 스타일 적용 
					that.setCellStyle(cell,{"background-color" : that.EXCEL_FOOTER_BG_COLOR , "color" : that.EXCEL_FOOTER_COLOR} );
				}
			}
			
			mergeInfos.forEach(function(each){	
				worksheet.mergeCells(each.stRowNumber , each.stColNumber, each.edRowNumber, each.edColNumber );
			});
	},
	
	_addSheetToDataSet : function(datasetCtrl, sheetName, workbook) {
		
		var that = this;
		return null;
	},
	
	
	exportEacelJsToJSON : function(gridCtrl,poOption) {
		
		var voOption = ValueUtil.fixNull(poOption) == "" ? {} : poOption;
		
		var that = this;
		var util = createCommonUtil();
		/** @type cpr.controls.Grid[] */
		var vaGrids = gridCtrl;
		var voOptions = poOption;
		
		if(!(vaGrids instanceof Array)){
			vaGrids = [vaGrids];
		}
		
		if(ValueUtil.fixNull(voOptions) == "") {
			voOptions = [];
		}
		if(!(voOptions instanceof Array)) {
			voOptions = [voOptions];
		}
		
		var voApp = vaGrids[0].getAppInstance();
		var voDownloadPromise = function(){
			
			return Loader.ExcelLoader.checkLibLoaded().then(function(input){
				
				var workbook = new ExcelJS.Workbook();
				
				var fileName = voOptions.length > 0 ? ValueUtil.fixNull(voOptions[0].fileName) == "" ? ValueUtil.fixNull(vaGrids[0].fieldLabel) != "" ? vaGrids[0].fieldLabel : "excel" : voOptions[0].fileName : "excel";
				 for(var idxsn = 0; idxsn < vaGrids.length; idxsn++) {
				 	var voOption = voOptions[idxsn] == null ? {} : voOptions[idxsn];
				 	/** @type cpr.controls.Grid */
				 	var vcGrid = vaGrids[idxsn];
				 	var vaExcludeCols = [];
				 	var vaIncludeCols = [];
				 	if(voOption.paExcludeCols != null) {
				 		if(!(voOption.paExcludeCols instanceof Array)) {
				 			voOption.paExcludeCols = [voOption.paExcludeCols];
				 		}
				 		vaExcludeCols = voOption.paExcludeCols;
				 	}
				 	var vsDownloadMode = ValueUtil.fixNull (voOption) != "" && voOption["downloadMode"] ? voOption["downloadMode"] : "display";
				 	var vbUseEngColNmRow = ValueUtil.fixNull(voOption) != "" && voOption["useEngColNmRow"] ? !!voOption["useEngColNmRow"] : false;
				 	var sheetName = ValueUtil.fixNull(voOption.sheetName) == "" ? "sheet"+idxsn : voOption.sheetName;
				 	var vnRowCnt = vcGrod.getRowCount();
				 	if(vnRowCnt >= 30000){
				 		
				 	}
				 	
				 	if (vsDownloadMode != "dataset") {
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
				 		} else {
				 			
				 			for(var i of vaCellIndices) {
				 				var voTempHeader = vcGrid.header.getColumn(i);
				 				if(!voTempHeader.visible) {
				 					if(vaExcludeCols.indexOf(voTempHeader.colIndex) == -1) {
				 						vaExcludeCols.push(voTempHeader.colIndex);
				 					}
				 				} else {
				 					if(vaExcludeCols.indexof(voTempHeader.colIndex) == -1 && poOption.acceptcellVisible === true) {
				 						vaIncludeCols.push(voTempHeader.colIndex);
				 					}
				 				}
				 			}
				 		}
				 	}
				 	
				 	util.showLoadMask(vcGrid.getAppInstance());
				 	
				 	var exportData = null;
				 	if(vsDownloadMode == "dataset") {
				 		var voDataComponent = vcGrid;
				 		if(vcGrid.type == "grid") {
				 			voDataComponent = vcGrid.dataSet;
				 		}
				 		
				 		that._addSheetToDataSet(voDataComponent, sheetName, workbook);
				 		continue;
				 	}
				 	else if(vsDownloadMode == "display") {
				 		var voTempExportOption = {
				 			exceptStyle : false,
				 			applyFormat : true,
				 			useFormat : false,
				 			excludeColIndex : vaExcludeCols,
				 			applySuppress : true
				 		}
				 		if(poOption.acceptCellVisible === true) {
				 			var vnHeaderIndex = vcGrid.header.getRowHeights().length;
				 			voTempExportOption["rowDataHandler"] = function(datas, rowIndex) {
				 				if(rowIndex > vnHeaderIndex) {
				 					
				 					for(let temp in datas) {
				 						let data = datas[temp];
				 						let visibility = gridCtrl.detail.getControlAttr(rowIndex -1,vaIncludeCols[temp],"visible");
				 						if(visibility === false) {
				 							data.value = null;
				 						}
				 					}
				 				}
				 			}
				 		}
				 		
				 		exportData = vcGrid.getExportData(voTempExportOption);
				 		if(vbUseEngColNmRow) {
				 			var vaDetailStyle = exportData.rowgroups[1].style;
				 			var vaColList = vaDetailStyle.map(function(each,idx){
				 				return {
				 					value : each.columnName ? each.columnName : "",
				 					style : {}
				 				};
				 			});
				 			exportData.rowgroups[1].data.unshift(vaColList);
				 		}
				 	} else if(vsDownloadMode == "upload") {
				 		
				 		exportData = vcGrid.getExportData({
				 			exceptStyle : false,
				 			applyFormat : false,
				 			useFormat : true,
				 			excludeColIndex : vaExcludeCols,
				 			applySuppress : false,
				 		});
				 		
				 		if(vbUseEngColNmRow) {
				 			var vaDetailStyle = exportData.rowgroups[1].style;
				 			var vaColList = vaDetailStyle.map(function(each,idx){
				 				return {
				 					value : each.columnName ? each.columnName : "",
				 					style : {}
				 				};
				 			});
				 			exportData.rowgroups[1].data.unshift(vaColList);
				 		}
				 	}
				 	
				 	that._addSheet(workbook, sheetName, exportData, vcGrid, vaExcludeCols, vbUseEngColNmRow, vsDownloadMode);
				 	
				 }//end for
				 
				 return new Promise(function(resolve,reject){
				 	
				 	var buff = workbook.xlsx.writeBuffer().then(function(data){
				 		var blob = new Blob([data],{
				 			type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				 		});
				 		
				 		var a = saveAs(blob, fileName+".xlsx");
				 		var isIE = ['ie',"edge"].indexOf(cpr.utils.Util.detectBrowser().name) !== -1;
				 		if(!isIE) {
				 			a.onwriteend = function(){
				 				util.hideLoadMask(voApp);
				 				reslove();
				 			}
				 		}else {
				 			if(a){}
				 		}
				 	});
				 });
			});
		}
		
		
		return voDownloadPromise();
	}
	
	
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
Loader = {
	
	 ExcelLoader : {
		checkLibLoaded : function(){
			return true;
		}
	}
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	