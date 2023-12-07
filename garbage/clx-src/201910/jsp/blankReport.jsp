<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% 
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
response.setHeader("Access-Control-Allow-Origin", "*");
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>

</head>
<body>
</body>
</html>