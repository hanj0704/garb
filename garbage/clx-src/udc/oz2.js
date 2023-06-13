/************************************************
 * oz.js
 * Created at 2023. 6. 1. 오후 2:08:31.
 *
 * @author HANS
 ************************************************/
var moCreateOption = null;
var msElementName = "";
exports.getName = function(){
	return msElementName;
}

exports.getReport = function(){
	var voObjReport = document.getElementById(msElementName);
	if(voObjReport) {
		return voObjReport;
	}
}


/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/*
 * 루트 컨테이너에서 before-unload 이벤트 발생 시 호출.
 * 앱이 언로드되기 전에 발생하는 이벤트 입니다. 취소할 수 있습니다.
 */
function onBodyBeforeUnload(e){
	if(window.hasOwnProperty("SetOZParameter_"+msElementName)) {
		delete window["SetOZParameters_"+msElementName];
	}
	if(moCreateOption != "") {
		for(var key in moCreateOption) {
			if(_.isFunction(moCreateOption[key])) {
				delete window[key+"_"+msElementName];
			}
		}
	}
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(e){
	var shl1 = e.control;
	if(e.content){
		e.preventDefault();
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(e){
	var shl1 = e.control;
	
	if(msElementName == "") {
		msElementName = "OZViewer_"+getIndex();
	}
	
	var obj = document.createElement("div");
	obj.style.width = "100%";
	obj.style.height = "100%";
	obj.setAttribute("id", msElementName);
	obj.style.position = "absolute";
	e.content.appendChild(obj);
//	OzLoader.checkLibLoaded();
}

function draw(poReportParam,poCreateOption) {
	var div = document.getElementById(msElementName);
	div.innerHTML = "";
	moCreateOption = poCreateOption;
	if(OzLoader.loader) {
		_ozReportCall(msElementName, poReportParam, poCreateOption);
	} else {
		OzLoader.checkLibLoaded().then(function(input){
			_ozReportCall(msElementName, poReportParam, poCreateOption);
		});
	}
}


exports.drawReport = draw;