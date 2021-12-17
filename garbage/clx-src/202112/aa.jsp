<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="./tmt.filedownload.js"></script>
<script type="text/javascript">
	
function doFileDown(){
	
	var voParam = {
			"strFileSubPath" : "stdCmnCTemplateFile",
			"strFileNm" : "CMN_MENU.xls",
			"strOriFileNm" : "CMN_MENU.xls",
			"strCommand" : "fileDownLoad"
	}
	TmtFile.download("", "", "", "http://localhost:8080/std.cmn.StdCmnFileTransUtil.ex",voParam);
}


</script>

</head>
<body>
	<div id="file_content"></div>
	 <input type="button" id="test" value="FileDown" onclick="doFileDown()">
  	 </input>
  	 
  	 <script type="text/javascript">
		</script>
</body>
</html>