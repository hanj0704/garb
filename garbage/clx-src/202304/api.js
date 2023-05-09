/************************************************
 * api.js
 * Created at 2022. 8. 31. 오전 10:05:01.
 ************************************************/

var apiDocs = null;

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	onButtonClick(e);
}

/*
 * "서비스조회" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var sms = app.lookup("list");
	sms.send();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onListSubmitDone(e){
	var list = e.control;
	var resText = list.xhr.responseText;
	
	apiDocs = JSON.parse(resText);
	
	/**
	 * @type
	 * Object
	 */
	var paths = apiDocs["paths"];
	var dsPath = app.lookup("dsPath");
	dsPath.clear(false);
	var servicePaths = Object.keys(paths);
	
	servicePaths.forEach(function(each){
		var service = paths[each];
		
		var serviceMethods = Object.keys(service);
		
		serviceMethods.forEach(function(methodName){
			var serviceMethod = service[methodName];
			
			var dataRow = dsPath.pushRowSilently();
			dataRow.putValue("path", each);
			dataRow.putValue("method", methodName)
			dataRow.putValue("operationId", serviceMethod["operationId"]);
		});
	});
	dsPath.refresh();
	
	var dsReq = app.lookup("dsReq");
	dsReq.clear(false);
	var dsRes = app.lookup("dsRes");
	dsRes.clear(false);
	
	app.lookup("grdSvc").redraw();
	app.lookup("grdReq").redraw();
	app.lookup("grdRes").redraw();
	app.lookup("txaMatrix").value = "";
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(e){
	var grd = e.control;
	var selectedIndex = e.newSelection[0];
	
	var row = grd.getRow(selectedIndex);
	var path = row.getValue("path");
	var method = row.getValue("method");
	
	var path = apiDocs["paths"][path][method];
	
	var dsReq = app.lookup("dsReq");
	dsReq.clear(false);
	var dsRes = app.lookup("dsRes");
	dsRes.clear(false);
	
	var reqBody = path["requestBody"];
	if(reqBody) {
		var reqContent = reqBody["content"];
		if(reqContent) {
			var required = reqBody["required"];
			var reqMedias = Object.keys(reqContent);
			
			reqMedias.forEach(function(mediaType) {
				var mediaContent = reqContent[mediaType];
				var reqRow = dsReq.pushRowSilently();
				reqRow.putValue("required", required); //-- 서비스 수준으로 올림
				reqRow.putValue("mediaType", mediaType);
				
				schemaToRow(mediaContent["schema"], reqRow);
			});
		}
	}
	dsReq.refresh();

	var res = path["responses"];
	if(res) {
		var httpCodes = Object.keys(res);
		httpCodes.forEach(function(httpCode) {
			var codeContent = res[httpCode];
			var resContent = codeContent["content"];
			if(resContent) {
				var desc = codeContent["description"];
				var resMedias = Object.keys(resContent);
				
				resMedias.forEach(function(mediaType) {
					var mediaContent = resContent[mediaType];
					var resRow = dsRes.pushRowSilently();
					resRow.putValue("httpCode", httpCode);
					resRow.putValue("desc", desc);
					resRow.putValue("mediaType", mediaType);
					
					schemaToRow(mediaContent["schema"], resRow);
				});
			}
		});
	}
	dsRes.refresh();
	
	app.lookup("grdReq").redraw();
	app.lookup("grdRes").redraw();
	app.lookup("txaMatrix").value = "";
}

function schemaToRow(schema, row) {
	if(schema == null) {
		return;
	}
	var schemaType = schema["type"];
	row.putValue("schemaType", schemaType == null ? "object" : schemaType);
	if(schemaType == "array") {
		var reqItems = schema["items"];
		if(reqItems) {
			row.putValue("schemaRef", reqItems["$ref"]);
		}
	} else {
		row.putValue("schemaRef", schema["$ref"]);
	}

}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrdReqCellClick(e){
	var grd = e.control;
	var dataSetId = grd.dataSet.id;
	
	var columnName = e.columnName;
	if(columnName != null) {
		return;
	}
	var dataRow = e.row;
	var schemaType = dataRow.getValue("schemaType");
	var schemaRef = dataRow.getValue("schemaRef");
	
	var xmlString = (dataSetId == "dsReq" ? "<root xmlns:cl=\"http://tomatosystem.co.kr/cleopatra\"><cl:request></cl:request></root>" :
		"<root xmlns:cl=\"http://tomatosystem.co.kr/cleopatra\"><cl:response></cl:response></root>");
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString, "text/xml");
	var rootNode = xmlDoc.documentElement.firstElementChild;
	
	if(schemaType === "array") {
		rootNode.setAttribute("type", "array");
	} else {
		rootNode.setAttribute("type", "object");
	}
	
	createMatrixNode(schemaRef, xmlDoc, rootNode);
	
	var serializer = new XMLSerializer();
	app.lookup("txaMatrix").text = formatXml(serializer.serializeToString(xmlDoc));
}

function createMatrixNode(schemaRef, xmlDoc, parentNode) {
	schemaRef = schemaRef.substring(2);
	var paths = schemaRef.split("/");
	var schema = apiDocs;
	paths.forEach(function(path) {
		schema = schema[path];
	});
	
	var schemaProps = schema["properties"];
	var propKeys = Object.keys(schemaProps);
	propKeys.forEach(function(propKey) {
		var prop = schemaProps[propKey];
		var propType = prop["type"];
		propType = (propType == null ? "object" : propType);
		
		var dataNode = xmlDoc.createElement("cl:data");
		dataNode.setAttribute("key", propKey);
		parentNode.appendChild(dataNode);
		
		switch(propType) {
			case "object" : 
			case "array" : {
				var childNode = xmlDoc.createElement("cl:complex");
				childNode.setAttribute("type", propType);
				dataNode.appendChild(childNode);
				
				var childSchemaRef = null;
				if(propType == "array") {
					var items = prop["items"];
					childSchemaRef = items["$ref"]
				} else {
					childSchemaRef = prop["$ref"];
				}
				// digging
				createMatrixNode(childSchemaRef, xmlDoc, childNode);
				break;
			}
			default : {
				var childNode = xmlDoc.createElement("cl:pathref");
				childNode.setAttribute("columnName", propKey);
				dataNode.appendChild(childNode);
			}
		}
		
	});
}

function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    xml.split('\r\n').forEach(function(node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '    ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}
