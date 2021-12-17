/************************************************
 * testMan.js
 * Created at 2020. 10. 15. 오전 10:08:09.
 *
 * @author HANS
 ************************************************/
//var util

/**
 * 
 * @param {cpr.controls.FileInput} file
 */
function importExcel(file){
	sendData = moment().valueOf();	
//			util.showLoadMask(app);
	var reader = new FileReader();	
	
	reader.onload = function(e){
//		util.showLoadMask(app);
		var data = e.target.result;
		
		var workbook = XLSX.read(data , {type : 'binary'});
		
		workbook.SheetNames.forEach(function(item, index){
			ws = workbook.Sheets[item];
			var range = XLSX.utils.decode_range(workbook.Sheets[item]['!ref']); 
			
			range.s.r = 1;
			//2. 데이터셋에서 컬럼이름 가져오는거
			var _header = app.lookup("dsList").getColumnNames();
			var EXCEL_JSON ; 
				EXCEL_JSON = XLSX.utils.sheet_to_json(ws, {range : range, header: _header });
			
			_data = EXCEL_JSON;
			
		});
	};
	
	reader.onloadend = function(e){		
		app.lookup("grdMst").dataSet.build(_data,false);
		app.lookup("grdMst").redraw();
		responseData = moment().valueOf() - sendData;
		console.log("걸린시간 :" + (moment.duration(responseData) / 1000));
//		util.hideLoadMask(app);
	};
		
	reader.readAsBinaryString(file.file);		
}	
/**
 * 
 * @param {cpr.protocols.Submission} submission
 * @param {String} resData
 */
function _responseDecoder(submission,resData) {
	
	var extensions = submission.action.split(".");
	var resMan = {};
	var ex = extensions[extensions.length-1];
	if(ex == "txt") {
		var str = resData;
		var res = [];
		var abc = str.split("\n");
		var header = abc.shift();
	
		var vaHeader = header.split("\t");
		
		vaHeader = vaHeader.map(function(each){
			return each.trim();
		});
		
		abc.forEach(function(each){
			
			var vaCols=  each.split("\t");
			if(vaCols.length > 1) {
				var temp = {};
				vaHeader.forEach(function(eachH,idx){
					
					temp[eachH] = vaCols[idx];
				});
				res.push(temp);
			}
		});	
		console.log(res);
		var vsDsNm = submission.userAttr("txtResponse");
		
		resMan[vsDsNm] = res;
		console.log(resMan);
	}
	else if(ex == "xml") {
		
		var str = resData;
		
		var removeJsonTextAttribute = function(value, parentElement) {
			try {
				var parentOfParent = parentElement._parent;
				var pOpKeys = Object.keys(parentElement._parent);
				var keyNo = pOpKeys.length;
				var keyName = pOpKeys[keyNo - 1];
				var arrOfKey = parentElement._parent[keyName];
				var arrOfKeyLen = arrOfKey.length;
				if (arrOfKeyLen > 0) {
					var arr = arrOfKey;
					var arrIndex = arrOfKey.length - 1;
					arr[arrIndex] = value;
				} else {
					parentElement._parent[keyName] = value;
				}
			} catch (e) {}
		};
		
		var a = xml2json(str, {
			compact: true,
			textFn: removeJsonTextAttribute
		});
		
		var jsona = JSON.parse(a);
		
		/** @type Object */
		var datas = jsona.data;
		
		var keys = Object.keys(datas);
		keys.forEach(function(each){
			resMan[each] = datas[each];
		})
	} else if(ex == "csv") {
		var str = resData;
		var res = [];
		var abc = str.split("\n");
		var header = abc.shift();
	
		var vaHeader = header.split(",");
		
		vaHeader = vaHeader.map(function(each){
			return each.trim();
		});
		
		abc.forEach(function(each){
			
			var vaCols=  each.split(",");
			if(vaCols.length > 1) {
				var temp = {};
				vaHeader.forEach(function(eachH,idx){
					
					temp[eachH] = vaCols[idx];
				});
				res.push(temp);
			}
		});	
		var vsDsNm = submission.userAttr("txtResponse");
		
		resMan[vsDsNm] = res;
	}
	
	if(Object.keys(resMan).length > 0) {
		return {
			contentType: "application/json",
			content: resMan
		};
	} else {
		console.log("어서오고");
		return {
				contentType: "application/json",
				content: resData
			};
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	var vAs = app.lookup("grp1").getAllRecursiveChildren();
//	
//	
//	for(var i = 0 ; i < vAs.length-1 ; i++) {
//		
//		drawSlash(app, vAs[i], vAs[i+1]);
//	}
//	app.lookup("sms1").setResponseDecoder(_responseDecoder);
//	app.lookup("sms1").send();

//	createPopper(app.lookup("img1"), app.lookup("opt1"), {
//  placement: 'left-start',
//});

	var ds = app.lookup("ds1");
	
}


/**
 * svg요소의 line요소를 사용해서 대각선을 HTMLSnippe에 집어넣고 리턴하는 메서드입니다.
 * @param {Number} x 전체 요소의 가로크기
 * @param {Number} y 전체 요소의 세로크기
 */
function _createSlash(x,y) {
	var snippet = new cpr.controls.HTMLSnippet();
	snippet.style.addClass("slash");
	snippet.value ='<svg height="'+y+'" width="'+x+'">'
	 + '<line x1="0" y1="0" x2="'+x+'" y2="'+y+'" style="stroke:rgb(255,0,0);stroke-width:1"/>'
	  + '</svg>';
	  
	  return snippet;
}



/**
 * HTMLSnippet 객체를 추가하여 아이템 간의 slash를 붙여주는 메서드입니다.
 * @param {cpr.core.AppInstance} _app
 * @param {cpr.controls.UIControl} pcCtrl1
 * @param {cpr.controls.UIControl} pcCtrl2
 */
function drawSlash (_app, pcCtrl1,pcCtrl2){
	/** @type cpr.controls.Container */
	var vcGrpCn = _app.lookup("grp1"); // 컨텐츠 내부 컨테이너 객체
	
	var voGrpCnRect = vcGrpCn.getActualRect(); // 컨텐츠 내부 컨테이너 크기
	var voCtrl1Rect = pcCtrl1.getActualRect(); // 컨트롤1의 크기
	var voCtrl2Rect = pcCtrl2.getActualRect(); // 컨트롤2의 크기
	
	var vnWidth = voCtrl2Rect.topCenter.x - voCtrl1Rect.bottomCenter.x; // 너비
	var vnHeight = voCtrl2Rect.topCenter.y - voCtrl1Rect.bottomCenter.y; // 높이
	
	var x = 0; // x 좌표
	var y = 0; // y 좌표
	
	/* 차트의 위치에 의해 과거일 때는 선을 긋지 않도록 방지 */
	if (vnWidth < 0 || vnHeight < 0){
		return;
	}
	
	/* 선 동적 생성 */
	var vcOpt = _createSlash(vnWidth,vnHeight);
	
	x = voCtrl1Rect.bottomCenter.x - voGrpCnRect.left; // x 좌표 계산
	y = voCtrl1Rect.bottomCenter.y - voGrpCnRect.top; // y 좌표 계산
	
	/* 컨텐츠 내부 영역에 선을 띄움 */
	vcGrpCn.floatControl(vcOpt, {
		"width" : vnWidth+"px",
		"height" : vnHeight+"px",
		"left" : x +"px",
		"top" : y +"px"
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
	
	app.lookup("grd1").filter("column1 < 4");
	

	console.log(app.lookup("ds1").getRowDataRanged());
}




/*
 * "엑셀가져오기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("fi1").openFileChooser();
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fi1 = e.control;
	
	importExcel(fi1.file);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
}


/*
 * "filter" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("grd1").filter("column1 > 3");
}


/*
 * "sort" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("grd1").sort("column1 desc");
}


/*
 * "console" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(app.lookup("dv1").getSort());
	console.log(app.lookup("dv1").getFilter());
}


/*
 * 그리드에서 row-dblclick 이벤트 발생 시 호출.
 * detail이 row를 더블클릭 한 경우 발생하는 이벤트.
 */
function onGrd1RowDblclick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
}


/*
 * 슬라이더에서 value-change 이벤트 발생 시 호출.
 * 값이 변경된 후 발생하는 이벤트
 */
function onSld1ValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.Slider
	 */
	var sld1 = e.control;
	a();
//_.debounce(function(){
//	console.log("무무");
//}, 2000)()
}

var a = _.debounce(function(){
	console.log("무무");
}, 2000)
/*
 * 슬라이더에서 animationend 이벤트 발생 시 호출.
 * 애니메이션 종료 후 발생하는 이벤트.
 */
function onSld1Animationend(/* cpr.events.CAnimationEvent */ e){
	/** 
	 * @type cpr.controls.Slider
	 */
	var sld1 = e.control;
	console.log("animation-end");
}


/*
 * 슬라이더에서 transitionend 이벤트 발생 시 호출.
 * CSS 속성 트랜지션 종료 후 발생하는 이벤트.
 */
function onSld1Transitionend(/* cpr.events.CTransitionEvent */ e){
	/** 
	 * @type cpr.controls.Slider
	 */
	var sld1 = e.control;
	console.log("transitionend");
}


/*
 * 슬라이더에서 dragleave 이벤트 발생 시 호출.
 * 드래그 중 마우스 포인터가 컨트롤에 포함된 요소들에서 나갔을 경우 발생하는 이벤트.
 */
function onSld1Dragleave(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Slider
	 */
	var sld1 = e.control;
	console.log("drag-leave");
}


/*
 * 슬라이더에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onSld1Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Slider
	 */
	var sld1 = e.control;
	console.log("drop");
}


/*
 * 슬라이더에서 blur 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
 */
function onSld1Blur(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.Slider
	 */
	var sld1 = e.control;
	console.log("blur");
}


/*
 * 슬라이더에서 mouseleave 이벤트 발생 시 호출.
 * 사용자가 컨트롤 및 컨트롤의 자식 영역 바깥으로 마우스 포인터를 이동할 때 발생하는 이벤트.
 */
function onSld1Mouseleave(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Slider
	 */
	var sld1 = e.control;
	console.log("mouse-leave");
}


/*
 * 그리드에서 row-check 이벤트 발생 시 호출.
 * Grid의 RowCheckbox가 체크 되었을 때 발생하는 이벤트. (columnType=checkbox)
 */
function onGrd2RowCheck(/* cpr.events.CGridEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd2 = e.control;
	
	e.preventDefault();
}
