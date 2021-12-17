/************************************************
 * flow.js
 * Created at 2020. 12. 8. 오전 10:03:22.
 *
 * @author HANS
 ************************************************/

var voDsColNms = {
	textCol : "processNm",
	valueCol : "value",
	sortCol : "sortNum",
	parent :"parentValues",
	progress : "progress"
}


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
					
					app.getRootAppInstance().getContainer().floatControl(arrow, {
						"left": vnLeft + "px",
						"top": vnTop + "px",
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
				
				app.getRootAppInstance().getContainer().floatControl(arrow,{
					"left" : left+"px",
					"top" : top-5+"px",
					"width":differ.width+"px",
					"height":Math.abs(heights)+10+"px"
				});
				
			});
		});
	}
}

/**
 * 플로우차트에서 업무 객체를 생성하여 배치하는 함수입니다.
 */
function drawProcess() {
	/** @type cpr.data.DataSet */
	var vcDSet = app.getAppProperty("dsChart");
	var vcDs = app.lookup("ds1");
	
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
	
	
	vaUnfilteredCol.forEach(function(each) {
		
		var allRow = vcDs.findAllRow(voDsColNms.valueCol+" =='" + each + "'");
		if (allRow.length > 0) {
			
			var vertical = new cpr.controls.Container();
			var vLayout = new cpr.controls.layouts.VerticalLayout();
			vLayout.spacing = 20;
			vertical.setLayout(vLayout);
			
			allRow.forEach(function(eachRow) {
//				var buttons = new cpr.controls.Button();
				
//				buttons.value = eachRow.getValue(voDsColNms.textCol);
				var buttons = new udc.saveme.process();
				buttons.textNm = eachRow.getValue(voDsColNms.textCol);
				buttons.progress = eachRow.getValue(voDsColNms.progress);
				vertical.addChild(buttons, {
					"width": "100px",
					"height": "60px",
					"autoSize": "none"
				});
			});
			
			app.getContainer().addChild(vertical, {
				width: "150px",
				height: "280px",
				autoSize: "none"
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

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	drawProcess();
}

