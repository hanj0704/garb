/************************************************
 * flow.js
 * Created at 2020. 12. 8. 오전 10:03:22.
 * 해당 UDC는 플로우 차트를 그리기 위해 작성된 UDC 입니다.
 * 해당 UDC를 동작 시키기 위해서는 UDC를 사용하는 화면에서 drawProcess 함수를 실행시켜야 하며, 
 * 필수적으로 dsChart, columnConfig에 대한 값을 집어넣어야 합니다.
 * dsChart는 플로우 차트의 데이터를 구성하는 데이터셋객체이며,
 * columnConfig는 차트를 구성하는데 필요한 데이터들을 가진 컬럼 명을 지정해야 합니다.
 * @author HANS
 ************************************************/

var voDsColNms = {
	textCol : "processNm",//업무명이 담긴 컬럼명
	valueCol : "value", //업무별 파트를 구분할 컬럼입니다. 이 값이 동일한 업무들을 하나의 파트로 묶어서 화살표로 연걸하게 만듭니다.
	sortCol : "sortNum",//같은 파트의 업무에서 업무별 순서를 지정할 수 있는 컬럼입니다.
	arrowTargetCol :"arrowValue", //파트의 각 업무들은 다음 파트의 첫번째 업무에 화살표가 연결되나, 
	progressCol : "progress" //진행상태를 표시하는 컬럼명
}

var vnProcessWidth = 150;		//업무 컴포넌트의 가로크기
var vnProcessHeight = "40px";	//업무 컴포넌트의 세로크기
var vnPartHeight = "50px";		//파트 최소크기 (스크립트를 통해 자동 크기를 사용합니다)

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/**
 * 플로우차트에서 업무별로 직선 화살표 객체를 생성하여 이어주는 함수입니다.
 */
function drawArrow(){
	
	var vaProcessCont = app.getContainer().getChildren();
	var voActualRect = app.getHost().getActualRect();
	
	for(var i =0 ; i < vaProcessCont.length-1 ; i++){
		
		/** @type cpr.controls.Container */
		var prev = vaProcessCont[i];
		/** @type cpr.controls.Container */
		var next = vaProcessCont[i+1];
		prev.getAllRecursiveChildren().forEach(function(each){
			
			next.getAllRecursiveChildren().forEach(function(eachs){
				
				var nextChild = eachs.getActualRect().centerLeft;
				var prevChild = each.getActualRect().centerRight;
				var vnLeft = prevChild.x;
				var vnTop = prevChild.y - 10;
				var voDifference = nextChild.getDifference(prevChild);
				var vnHeight = voDifference.height;
				if (voDifference.width > 0) {
					
					var arrow = new udc.saveme.hitman();
					if (vnHeight == 0) {
						vnHeight = 22;
					} else if (vnHeight < 0) {
						vnTop += vnHeight;
						vnHeight -= 20;
					} else {
						vnHeight += 20;
					}
					arrow.arrowBuild(vnHeight);
					
					app.getContainer().floatControl(arrow, {
						"left": vnLeft-voActualRect.left + "px",
						"top": vnTop-voActualRect.top + "px",
						"width": voDifference.width + 5 + "px",
						"height": Math.abs(vnHeight) + "px"
					});
				}
				
				
			});
		});
	}
}	

/**
 * 플로우차트에서 업무별로 대각선 화살표 객체를 생성하여 이어주는 함수입니다.
 */
function drawSvg(){
	
	var vaProcessCont = app.getContainer().getChildren();
	var aqqq = app.getHost().getActualRect();
	for(var i =0 ; i < vaProcessCont.length-1 ; i++){
		
		/** @type cpr.controls.Container */
		var prev = vaProcessCont[i];
		/** @type cpr.controls.Container */
		var next = vaProcessCont[i+1];
		prev.getAllRecursiveChildren().forEach(function(each){
			
			next.getAllRecursiveChildren().forEach(function(eachs){
				
				var nextChild = eachs.getActualRect().centerLeft;
				var prevChild = each.getActualRect().centerRight;
				var left = prevChild.x;
				var top = prevChild.y;
				var differ = nextChild.getDifference(prevChild);
				var heights = differ.height;
				var arrow = new cpr.controls.HTMLSnippet();
				if(heights == 0) {
					var vnSvgWidth = differ.width-5;
					arrow.value = '<svg width="100%" height="100%">' +
						'<defs>' +
						'<marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"' +
						'markerWidth="3" markerHeight="6"' +
						'orient="auto-start-reverse">' +
						'<path d="M 0 0 L 10 5 L 0 10 z" fill="#000000"/>' +
						'</defs>' +
						'<line x1="0" y1="5" x2="'+vnSvgWidth+'" y2="5" fill="none" stroke="#000000" stroke-width="2" marker-end="url(#arrow)" />' +
						'</svg>';
						
						heights = 15;
				}
				else if (heights > 0) {
					heights += 10;
					var vnSvgEndX  = differ.width-5;
					var vnSvgEndY = heights-5;
					arrow.value = '<svg width="100%" height="100%">' +
						"<defs>" +
						'<marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"' +
						'markerWidth="3" markerHeight="6"' +
						'orient="auto-start-reverse">' +
						'<path d="M 0 0 L 10 5 L 0 10 z" fill="#000000"/>' +
						'</defs>' +
						'<line x1="0" y1="5" x2="'+vnSvgEndX+'" y2="'+vnSvgEndY+'" fill="none" stroke="#000000" stroke-width="2" marker-end="url(#arrow)" />' +
						'</svg>';
						
				} else {
					
					var vnSvgStartY = Math.abs(heights);
					heights +=5;
					var vnSvgEndX = differ.width-5;
					arrow.value = '<svg width="100%" height="100%">' +
						"<defs>" +
						'<marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"' +
						'markerWidth="3" markerHeight="6"' +
						'orient="auto-start-reverse">' +
						'<path d="M 0 0 L 10 5 L 0 10 z" fill="#000000"/>' +
						'</defs>' +
						'<line x1="0" y1="'+vnSvgStartY+'" x2="'+vnSvgEndX+'" y2="5" fill="none" stroke="#000000" stroke-width="2" marker-end="url(#arrow)" />' +
						'</svg>';
					top += heights;
				}
				
				app.getContainer().floatControl(arrow,{
					"left" : left-aqqq.left+"px",
					"top" : top-5 - aqqq.top+"px",
					"width":differ.width+"px",
					"height":Math.abs(heights)+10+"px"
				});
				
			});
		});
	}
}

/**
 * 플로우차트에서 파트별 업무 객체를 생성하여 배치하는 함수입니다.해당함수를 사용하여 차트를 그릴 때, 차트를 그리기 위해 보낸 데이터셋과,
 * udc 내의 데이터셋의 컬럼명, 그리고 udc의 스크립트의 최상단에 위치한 udc내 전역변수 voDsColNms의 컬럼명을 일치시켜야, 정상적으로 차트가 그려질 수 있습니다.
 * progressCol:진행상태를 표시하는 컬럼, arrowTargetCol:다음 파트의 특정 sortCol업무를 찾아 이동, sortCol :같은 파트의 업무에서 업무별 순서를 지정, textCol : 업무명이 담긴 컬럼
 * @param {cpr.data.DataSet} pcDataSet
 * @param {Number} widths
 * @param {{textCol : String, valueCol:String, sortCol:String,arrowTargetCol:String, progressCol:String}} poColumnConfig
 */
function drawProcess(pcDataSet,widths,poColumnConfig) {
	
	app.getContainer().removeAllChildren();
	
	/** @type cpr.data.DataSet */
	var vcDSet = pcDataSet;
	var vcDs = app.lookup("ds1");
	if(poColumnConfig != null && poColumnConfig != undefined){
		voDsColNms = poColumnConfig;
	}
	
	if (vcDSet) {
		var voOriginColNm = vcDSet.getColumnNames();
		var voCopyColNm = vcDs.getColumnNames();
		
		try {
			if (voOriginColNm.toString() == voCopyColNm.toString()) {
				
				var voRowDatas = vcDSet.getRowDataRanged();
				vcDs.build(voRowDatas);
			} else {
				
				throw new Error("차트를 그리기 위해서 보낸 데이터셋과, udc내에서 사용하는 컬럼명이 일치하지 않아 플로우 차트를 그려지지 않읗 수 있습니다. flow udc내의 데이터셋과" +
					"상단의 전역변수인 voDsColNms에 담긴 컬럼명을 차트를 그리기 위해 보낸 데이터셋의 컬렴명과 일치시키십시오.");
			}
		} catch (err) {
			console.log(err);
		}
		
	}
	var vcDs = app.lookup("ds1");
	vcDs.setSort(voDsColNms.valueCol+" asc,"+voDsColNms.sortCol+" asc");
	
	var vnRowCnt = vcDs.getRowCount();
	var vaUnfilteredCol = vcDs.getUnfilteredDistinctValues(voDsColNms.valueCol);
	var vnLength = vaUnfilteredCol.length;
	
	
	var voLayout = app.getContainer().getLayout();
	
	voLayout.horizontalSpacing = "30px";
	voLayout.verticalSpacing = "30px";
	var vnWhile = 0;
	var vnWhile2= true;
	var vaCols = [];
	var voRows = [vnPartHeight];
	
	for(var i = 0 ; i < vaUnfilteredCol.length ; i++){
		
		
		if(vnWhile+vnProcessWidth < widths){
			vnWhile += vnProcessWidth+30;
			if(vnWhile2)
			vaCols.push(vnProcessWidth+"px");
		} else {
			voRows.push(vnPartHeight);
			vnWhile2 = false;
			vnWhile = vnProcessWidth;
			vaUnfilteredCol.splice(i,0,vaUnfilteredCol[i-1]);
			
		}
	}
	voRows.pop();
	voRows.push(vnProcessHeight);
	voLayout.setRows(voRows);
	voLayout.setColumns(vaCols);
	voRows.forEach(function(each,idx){
		
	voLayout.setRowAutoSizing(idx,true);
	});
	
	vaUnfilteredCol.forEach(function(each,idx) {
		var allRow = vcDs.findAllRow(voDsColNms.valueCol+" =='" + each + "'");
		if (allRow.length > 0) {
			
			var vertical = new cpr.controls.Container();
			var vLayout = new cpr.controls.layouts.VerticalLayout();
			vLayout.spacing = 20;
			vertical.setLayout(vLayout);
			
			allRow.forEach(function(eachRow) {
				var vcProc = new udc.saveme.process();
				vcProc.userAttr("target", eachRow.getValue(voDsColNms.arrowTargetCol));
				vcProc.textNm = eachRow.getValue(voDsColNms.textCol);
				vcProc.progress = eachRow.getValue(voDsColNms.progressCol);
				vertical.addChild(vcProc, {
					"width": "100px",
					"height": vnProcessHeight,
					"autoSize": "none"
				});
			});
			
			var vnCI = idx%vaCols.length;
			var vnRI = Math.floor(idx/vaCols.length);
			app.getContainer().addChild(vertical, {
				colIndex : vnCI,
				rowIndex : vnRI
			});
		}
		
	});
	cpr.core.DeferredUpdateManager.INSTANCE.update();
	
	if(app.getAppProperty("arrowType")=="straight") {
		
		drawArrow();
	} else if(app.getAppProperty("arrowType")=="diagonal"){
		
		drawSvg();
	}
	
}

exports.drawProcess = drawProcess;

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
}



