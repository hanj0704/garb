<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="java.io.File"%><%
    String strServerName = request.getServerName();
    int serverPort = request.getServerPort();
    
    //보고서 서버 URL
    String strReportServerUrl = "http://";
    if(request.isSecure()){
    	strReportServerUrl = "https://";
    }
    strReportServerUrl += strServerName + ":" + serverPort ;
 
    
    strReportServerUrl += "/ClipReport4";
    
    String strContextPath = "/ClipReport4";  
    
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script language='javascript'>

	function openReport() {// 리포트 로드.
		var voObj;
		try {
			voObj = window.opener ? window.opener.returnValue : window.parent.returnValue;
			
			if(voObj == undefined || voObj == null){
                alert("Report Call invalid!");
                return;
            } else {
                var forms = document.getElementById("clipReport");
                //보고서 파일정보
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "crfFilePath" );
                inputField.setAttribute("value", voObj.filePath);
                forms.appendChild(inputField);
                //Export 파일명
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "exportFileNm" );
                inputField.setAttribute("value", voObj.exportFileNm);
                forms.appendChild(inputField);
                //툴바 Visible 여부
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "toolbarVisible" );
                inputField.setAttribute("value", voObj.toolbarVisible );
                forms.appendChild(inputField);
                //뷰어 Scale
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "viewScale" );
                inputField.setAttribute("value", voObj.vsScaleRatio );
                forms.appendChild(inputField);
                
                //파일저장 DISABLE
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "saveFileTypes" );
                inputField.setAttribute("value", voObj.saveFileTypes );
                forms.appendChild(inputField);
                
                //파일저장 버튼 Visible
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "saveButtonDisable" );
                inputField.setAttribute("value", voObj.saveButtonDisable );
                forms.appendChild(inputField);
                
                //dbName
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "dbName" );
                inputField.setAttribute("value", voObj.dbName );
                forms.appendChild(inputField);
                
                
        		
              //jsonValue
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "jsonValue" );
                inputField.setAttribute("value", voObj.jsonValue );
                forms.appendChild(inputField);
                
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "conMemo" );
                inputField.setAttribute("value", voObj.conMemo );
                forms.appendChild(inputField);
                
                var inputField = document.createElement("input");
                inputField.setAttribute("type", "hidden" );
                inputField.setAttribute("name", "dataSetNm" );
                inputField.setAttribute("value", voObj.dataSetNm );
                forms.appendChild(inputField);
 
                //보고서 파라메터(구분자- :=)
                for(var param in voObj.params){
                    var inputField = document.createElement("input");
                    inputField.setAttribute("type", "hidden" );
                    inputField.setAttribute("name", "viewerParameter" );
                    inputField.setAttribute("value", param+":="+voObj.params[param] );
                    forms.appendChild(inputField);
                }
                
                forms.submit();
            }
		} catch(err) {
			console.log("reportviewer call error: " + err);
		}
		
		var forms = document.getElementById("clipReport");
		forms.submit();
	}

</script>
</head>
<BODY bgColor=white leftMargin=0 topMargin=0 marginwidth="0" marginheight="0">
	<form name="clipReport" id="clipReport" method="post" action="<%=strReportServerUrl %>/reportFx.jsp" style="width: 0px; height: 0px; margin: 0">
	</form>
	<script>openReport();</script>
</BODY>
</html>