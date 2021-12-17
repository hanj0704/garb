

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String strServerUrl = "localhost:8080";
	String strReportServerUrl = "";
	String strDataServerUrl = "";
	
	strReportServerUrl = strServerUrl + "/ReportingServer7";
	strDataServerUrl = strServerUrl + "/DataServer7";
	
%>
<html style="margin: 0; height: 100%"> 
<head>   
	<meta charset="utf-8">   
	<script src="<%=strReportServerUrl%>/html5/js/jquery-1.11.0.min.js"></script>
	<script src="<%=strReportServerUrl%>/html5/js/crownix-viewer.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=strReportServerUrl%>/html5/css/crownix-viewer.min.css"> 
	
    <script>      

  function html2cml(divPath){
	try {
			
		    var viewer = new m2soft.crownix.Viewer("<%=strReportServerUrl%>/service", 'crownix-viewer');
		} catch(err) {
			console.log("reportViewer call error: " + err);
		}
		
  }   
   </script>
</head> 
<body style="margin: 0; height: 100%">   
<div id="crownix-viewer" style="position:absolute; width:100%; height:100%;" ></div>
  <script>
  	window.onload = html2cml();
  </script>
</body> 
</html>