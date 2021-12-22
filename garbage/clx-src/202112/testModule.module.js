/************************************************
 * testModule.module.js
 * Created at 2021. 12. 22. 오후 4:18:56.
 *
 * @author HANS
 ************************************************/
// XML정보를 읽어야하는 서브미션을 필터링하는 사용자속성명
var msSubUserPropNm = "useXmlRead";

//실제 responseData를 감싸고있는 태그명. responseData 규격에 맞는 태그명으로 수정되어야합니다.
var msDataTagName = "body";
//columnName을 태그명으로 사용한 태그들을 하나로 묶는 행 단위 태그명. responseData 규격에 맞는 태그명으로 수정되어야합니다.
var msRowTagName = "item";


cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
//	/** @type cpr.core.AppInstance */
	var control = e.control;
	
	if(control instanceof cpr.core.AppInstance && !control.isUDCInstance()){
		
		var vaSubmissions = control.getAllDataControls().filter(function(each){
			if(each instanceof cpr.protocols.Submission && each.userAttr(msSubUserPropNm) != "") {
				
				return each;
			}
		});
		
		vaSubmissions.forEach(function(/*cpr.protocols.Submission*/each){
			each.setResponseDecoder(responseDecoder);
		});
	}
	
});

function responseDecoder(submission,resData){
	if (!resData) {
			return null;
		}
		
		var state = null;
		var dataComp = null;
		var dataRow = null;
		var columnName = null;
		
		cpr.core.XMLParser.parse(resData, {
			startDocument: function() {},
			startElement: function(tagName, attrs) {
				if (tagName === msDataTagName) {
					state = msDataTagName;
					return;
				} else if (tagName === msRowTagName) {
					state = "datarow";
					dataRow = null;
					if (dataComp instanceof cpr.data.DataSet) {
						dataRow = dataComp.pushRow();
					}
					return;
				}
				if (state === msDataTagName) {
					dataComp = null;
					var resData = submission.getResponseData(tagName);
					if (resData) {
						dataComp = resData.data;
					}
					if (dataComp) {
						if (dataComp instanceof cpr.data.DataSet) {
							state = "datacollection";
							
							if (resData.isadd === false) {
								dataComp.clear();
							}
						} else if (dataComp instanceof cpr.data.DataMap) {
							state = "datacollection";
						} else {
							// skip notation
						}
					}
				} else if (state === "datarow" || state === "datacolumn") {
					state = "datacolumn";
					columnName = tagName;
				}
			},
			endElement: function(tagName) {
				switch (state) {
					case "datacolumn": {
						state = "datarow";
						return;
					}
					case "datarow": {
						state = "datacollection";
						return;
					}
					case "datacollection": {
						state = msDataTagName;
						return;
					}
				}
			},
			text: function(content) {
				if (state === "datacolumn") {
					if (dataComp) {
						if (dataComp instanceof cpr.data.DataSet) {
							dataRow.putValue(columnName, content);
						} else if (dataComp instanceof cpr.data.DataMap) {
							dataComp.setValue(columnName, content);
						}
					}
				}
			},
			endDocument: function() {
				dataComp = null;
				dataRow = null;
				columnName = null;
			}
		});
		
		return null;
}