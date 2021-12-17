<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    	request.setCharacterEncoding("UTF-8");
    
    	String head = request.getParameter("head");
    	String body = request.getParameter("body");
    	
    	System.out.println(body);
    %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="No-Cache">
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<script type="text/javascript" src="runtime/cleopatra.js"></script>
		<script type="text/javascript" src="./cpr-lib/language.js"></script>
		<script type="text/javascript" src="./cpr-lib/user-modules.js"></script>
		<script type="text/javascript" src="Untitled.clx.js"></script>
		<link rel="stylesheet" type="text/css" href="runtime/css/cleopatra.css">
		<link rel="stylesheet" type="text/css" href="./theme/cleopatra-theme.css">
		<style>
			/* for HTML5 */
			html, body {
				margin: 0px;
				padding: 0px;
				height: 100%;
			}
			body{
				box-sizing: content-box;
				min-height: 100%;
			}
		</style>
</head>
<body>
		<%=body%>
		<input value="<%=body%>"/>
</body>
</html>