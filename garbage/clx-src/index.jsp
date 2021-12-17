<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="No-Cache">
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<script type="text/javascript" src="./resource/cleopatra.js"></script>
		<script type="text/javascript" src="./cpr-lib/language.js"></script>
		<script type="text/javascript" src="./cpr-lib/user-modules.js"></script>
		<script type="text/javascript" src="./cpr-lib/udc.js"></script>
		<script type="text/javascript" src="./thirdparty/echarts.min.js"></script>
<!-- 		<script type="text/javascript" src="202001/test2.clx.js"></script> -->
		<script type="text/javascript" id="dynamicScpt"></script>
		<link rel="stylesheet" type="text/css" href="./resource/css/cleopatra.css">
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
		
	<script>
	function callPageTransition (){
			if(_pageNm) {
				alert("쿄쿄쿄~");
				console.log(_pageNm);
				var scpt = document.getElementById("dynamicScpt");
				scpt.src = _pageNm+".clx.js";
				
				scpt.onload= function(){
					var realPageNm = _pageNm.split("/");
					var real = realPageNm[realPageNm.length -1];
					console.log(real);
					var app = cpr.core.Platform.INSTANCE.lookup(real);
					app.createNewInstance().run();
					}
				}
		}
	</script>
	</head>
	<body>
		<script type="text/javascript">
		</script>
	</body>
</html>
