
<%@ page import="java.util.Enumeration" %>
<%@ page import="java.net.NetworkInterface" %>
<%@ page import="java.net.InetAddress" %>
<%@ page import="java.net.SocketException" %>
<%@page import="com.tomato.jef.profile.ServerEnvironment"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	int type =3;
	
    String hostAddr = "test";

    WebApplicationContext appCtx = WebApplicationContextUtils.getWebApplicationContext(request.getServletContext());
    ServerEnvironment serverEnv = (ServerEnvironment)appCtx.getBean(ServerEnvironment.class);

    String strProfileDiv = serverEnv.getProfileDiv(); //리포트 서버 URL(운영, 개발 환경에 따라 다름)
    
    if("local".equals(strProfileDiv)){ 
    	hostAddr = InetAddress.getLocalHost().getHostAddress(); 
    }
    else if("dev".equals(strProfileDiv)){
    	hostAddr = serverEnv.getDevServerUrl();
    }
    
	

	String strLocalAddress = "http://" + hostAddr; //로컬호스트 ip 
	
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
    
    function isEmpty(poVal){
    	return (poVal == undefined || poVal == null  || poVal == "") ? true : false;
    }

    function trim(psValue){
    	return psValue.replace(/(^\s*)|(\s*$)/g, "");
    }


  function html2cml(divPath){
	  try {
			voObj = window.opener ? window.opener.returnValue : window.parent.returnValue;
			if(voObj == undefined || voObj == null){
	            alert("Report Call invalid!");
	            return;
	        } 
			else {
				
						
			 	var viewer = new m2soft.crownix.Viewer("<%=strReportServerUrl%>/service",
	   				'crownix-viewer');
			 	
			 	var vsFilePath = voObj.filePath;
			 	var vsParam = "";
			 	
				for(var param in voObj.params){
					vsParam = vsParam + "[" + voObj.params[param] + "]";
				}
				
			 	
				//var vsServerFilePath = "<%=strReportServerUrl%>/mrd/HIIS/web/" + vsFilePath ;
			    var vsServerFilePath = "<%=strLocalAddress%>/Report/" + vsFilePath;
			    var vsServerDataPath = "["+ "<%=strDataServerUrl%>/rdagent.jsp" +"]" ; 
			    
			    //viewer.setParameterEncrypt(1);
     			viewer.openFile(vsServerFilePath, '/rf ' + vsServerDataPath + ' /rpp ' + vsParam);
				
				
				viewer.setDownloadFileName(voObj.exportFileNm);
	  			//툴바 숨기기 여부
            	if(voObj.toolbarVisible == false){
            		viewer.hideToolbar();
            	}
	  			
            	if(!isEmpty(voObj.saveFileTypes) && voObj.saveFileTypes != "ALL"){
            		
            		viewer.hideToolbarItem(["pdf", "doc", "xls", "ppt", "hwp"]);
                	viewer.showToolbarItem(voObj.saveFileTypes);
                	
            	}else{
            		//저장 버튼 비활성화 여부
                	if(!isEmpty(voObj.saveButtonDisable) && voObj.saveButtonDisable == "false"){
                		viewer.hideToolbarItem(["save"]);
                	}
            	}
            	
            	//인쇄 버튼 비활성화 여부
            	if(!isEmpty(voObj.printButtonDisable) && voObj.printButtonDisable == "false"){
            		viewer.hideToolbarItem(["print"]);
            	}
            	
            	viewer.bind("report-finished", function() { 
                	// 페이지 이동            	
                	if(!isEmpty(voObj.params.pageNo)) {
                		viewer.movePage(voObj.params.pageNo);	
                	}
            	});
				
			}
			
			
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