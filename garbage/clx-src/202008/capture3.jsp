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
  <base href="/" />
  <meta charset="utf-8"/>
  <meta name="viewport" content="user-scalable=1, initial-scale=1.0, width=device-width" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>202008/tester</title>
  <link rel="stylesheet" media="all" href="resource/css/cleopatra.css"/>
  <link rel="stylesheet" media="all" href="theme/cleopatra-theme.css"/>
  <script src="resource/cleopatra.js" defer ></script>
  <script src="resource/conf/defaults.js" defer ></script>
  <script src="cpr-lib/language.js" defer ></script>
  <script src="cpr-lib/user-modules.js" defer ></script>
  <script src="cpr-lib/udc.js" defer ></script>
  <script src="thirdparty/echarts.min.js" defer ></script>
  <script src="thirdparty/jquery-3.3.1.min.js" defer ></script>
  <script src="data/MOCK_DATA.json" defer ></script>
  <script src="202008/tester.clx.js" defer ></script>
  <script>
  function doload() 
  cpr.core.Platform.INSTANCE.lookup("202008/tester").createNewInstance().run();}
</script>
</head>
<body>
</body>
</html>