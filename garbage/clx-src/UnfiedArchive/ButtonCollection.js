/************************************************
 * ButtonCollection.js
 * Created at 2021. 12. 14. 오후 1:25:08.
 *
 * @author HANS
 ************************************************/
function setCookie(cName, cValue, cDay){
var expire = new Date();
expire.setDate(expire.getDate() + cDay);
cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
document.cookie = cookies;
}


/*
 * "시간 문자열인지 체크하는로직" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var vsDateRegExp = /[^0-9\s\-]/g;
	var vsTimeStr = "2021-12-14 13:26/22";
	
	console.log(vsTimeStr.match(vsDateRegExp));
}


/*
 * "withCredential send" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	/**
	 * CORS와 인증정보를 넘기는 withCredentials를 같이 사용할 경우가 발생할때는
	 * Access-Control-Allow-Origin에 wildcard *를 사용하면 preflight에서 실패가 내려오게된다.
	 * Access-Control-Allow-Origin에 특정 오리진에 대한 정보를 작성하는거보단, servletrequest에 인증정보와 관련된 쿠키 헤더가 있으면 그부분에서
	 * 분기를 나눠주는게 좋아보임
	 * 
	 * CORS에 대한 preflight는 http method가 options으로 넘어간다.
	 * 이를 메서드타입을 분리하여 필터를 작성할 수도 있는것같아보이며 서버가 허용할 response header정보를 내려서 사용할 수 있을듯함.
	 * 
	 * withCredentials는 인증정보등을 담은 cookie 헤더를 request에 함께 보내야할때 사용하는 옵션으로
	 * 자신 도메인으로 선언되어있는 쿠키 정보를 다 넘기는것으로 보임,아마 로그인했을때, 서버에서 유저세션을 만들면서 내리는 세션 혹은 쿠기를 브라우저에 담아뒀다가,
	 * 다른 도메인의 화면을 열 때, withCredentials를 보내서 그 도메인상에서도 로그인정보를 활용해야할 경우에 대해서 사용할 수 있음.
	 * response헤더에서도Access-Control-Allow-Credentials 에 true값을 집어넣어줘야 쿠키헤더를 담을 수 있다.
	 * 
	 * 
	 */
	var sub = new cpr.protocols.Submission();
	
	sub.action  = "http://localhost:8090/test/testVo.do";
	sub.withCredentials = true;
	
	sub.send();
}


/*
 * "voDataSend" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	/**
	 * vo로 데이터를 관리하기 위해서는, jackson을 messageConverter로 설정해야하며,
	 * ResponseBody에서 vo로 파라미터를 받게 설정할 수 있다.
	 * vo로 받는 값들은 동일한 key를 가지고있는 json 혹은 jsonArray이어야 하기 때문에, 클라이언트 쪽에서
	 * requestEncoder를 사용하여, data 혹은 데이터셋맵 아이디의 alias를 필요에 따라 벗겨내서 사용해야 한다.
	 * response도 마찬가지로 설정해야 할듯하며, mediaType이 application/json인 경우에 대해서만 jackson이 인식할 수 있기 떄문에
	 * 이를 잘 확인해야함
	 * List로 데이터를 받기 위해서는 ResposneBody에 List<VO>를 사용하면 되며
	 * garbage-webs에서 vo를 설정할때는 lombok의 getter,setter annotation을 사용하여 함수를 따로 선언해서 사용하지 않아도 된다.
	 * jackson버전을 맞추는것에 대해서 에러가 발생할 수 있으며, 동일한 라이브러리가 충돌할때도 에러가 발생할 수 있음.
	 * 서브미션에서 addParameter로 파라미터를 추가시키는 경우는 json데이터가 array로 한번 감싸져서 데이터가 보내짐
	 */
	app.lookup("sms1").send();
}


/*
 * "embeddedPage src" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	/**
	 * 임베디드 페이지의 src를 바꾸는것도 히스토리에 관리된다.
	 */
}


/*
 * "데이터셋 export" 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn5 = e.control;
	
	var ds = app.lookup("dsList");
	
	var grd = new cpr.controls.Grid();
/** @type cpr.controls.gridpart.GridConfig */
	var voInitConfig = {
		columns : [],
		header : {
			rows : [{"height" : "24px"}]
		},
		detail : {
			rows : [{"height" : "24px"}]
		},
		dataSet : ds
	}
	var columns = [];
	var headcells = [];
	var detailcells = [];
	ds.getHeaders().forEach(function(each,idx){
		
		voInitConfig.columns.push({"width": "100px"});
		
		headcells.push({
			
			"constraint" : {"rowIndex" : 0,"colIndex" : idx},
			"configurator" : function(cell) {
				cell.filterable = false;
				cell.sortable = false;
				cell.sortable = false;
				cell.text = ValueUtil.fixNull(each.getInfo()) != "" ? each.getInfo() : each.getName();
			}
		});
		
		detailcells.push({
			"constraint": {"rowIndex": 0, "colIndex": idx},
			"configurator": function(cell){
				cell.columnName = each.getName();
			}
		});
	});
	
	voInitConfig.detail.cells = detailcells;
	voInitConfig.header.cells = headcells;
	
	console.log(voInitConfig);
	grd.init(voInitConfig);
	console.log(grd.getExportData());
	
	console.log(cpr.utils.ExportUtil.getExportData(ds));
}


/*
 * "fragment 프로젝트에 관하여" 버튼(btn6)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn6Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn6 = e.control;
	/**
	 * 프래그먼트 프로젝트는 하나의 프로젝트에 너무 많은 (부서별?업무별?) 기능이 들어가서
	 * 기능 분류별로 프로젝트를 나누어 하나의 프로젝트의 크기부담등을 줄이기 위해 사용하기 좋은 기법으로
	 * 호스트가 되는 프로젝트 하나를 생성하고, 그곳에서 공통적으로 사용하는 모듈, udc등을  선언하고, 
	 * 새eXbuilder6 프래그먼트 프로젝트를 생성하여 호스트 프로젝트를 지정하면, 해당 프로젝트명으로  패키지가 생성되면서,
	 * 호스트가 가지고있는 리소스들을 모두 활용할 수 있게 됩니다.
	 * 호스트에게 연결되어있는 다른 프로젝트의 리소스도 활용하고 싶은 경우는 프로젝트 프래그먼트 설정에서 다른 프로젝트도 체크하고 
	 * 호스트 리소스 갱신을 누르면 다른 프로젝트에있는 리소스들도 활용할 수 있게 됩니다.
	 * 비슷한 동작에서, 호스트를 연결했는데, 코드가 자동완성되지않거나 하는 경우에는 호스트 리소스 갱신 버튼을 한번 눌러보면 유효할 수 있습니다.
	 */
	
}


/*
 * "escape,unescape,encodeUri" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn7 = e.control;
	/**
	 * escape는 아스키문자에 해당하지 않는 문자들을 모두 유니코드 형식(16진수 형태)으로 변환하는 함수이고
	 * 1바이트는 %XX, 2바이트는%uXXXX로 생긴게 다릅니다.
	 * 그리고 이를 디코딩 하는것이 unescape입니다.
	 * encodeURI는 escape와 비슷하지만, url에  쓰는 특수문자들은 인코딩하지않습니다.:;/=?&등
	 * 보통은 파라미터를 전달하는 인터넷주소 전체를 인코딩 할떄 사용합니다.
	 * encodeURIComponent는 특문을 포함하여 인코딩하게됩니다.
	 */
	var vsTemp = "안녕친구!";
	var vsTemp16 = escape(vsTemp);
	console.log(vsTemp16);
	console.log(unescape(vsTemp16));
	var vsEncode = "안녕친구http:!qqewe";
	var vsEncoded = encodeURI(vsEncode);
	console.log(vsEncoded);
}


/*
 * "프래그먼트 프로젝트와 젠킨스빌드" 버튼(btn8)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn8Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn8 = e.control;
	/**
	 * 호스트 프로젝트와 프래그먼트 프로젝트는 설정정보를 .settings폴더내 xml,xmi파일과 루트 경로의 .project파일에 저장하며
	 * CI컴파일시에는 이클립스에서 빌드하는 방식 그대로 빌드하는 라이브러리를 제공하기 때문에, .project파일과 xmli 파일들이 그대로 형상관리 되어야 한다
	 * 호스트 프로젝트와 프래그먼트 프로젝트로 분리한 파일들은 빌드시에 동일한 디렉토리에 존재해여 정상적으로 빌드처리될 수 있으며, 프래그먼트 프로젝트의 경우에도 
	 * 단독으로 빌드하여 결과물을 만들 수 있다. 
	 * <?xml version="1.0" encoding="UTF-8"?>
	 * <project name="include-example" default="deploy" basedir="./">
  	 * <property name="build-lib.dir" location="./"></property>
	 * <taskdef name="clxcompile" classname="kr.co.tomatosystem.exbuilder.cikit.build.ant.Compile" classpath="${build-lib.dir}/e6-compiler.jar" />
	 * <target name="deploy">
   	 * <clxcompile src="./hanwha-p1" out="./ui"/>
	 * <clxcompile src="./hanwha-base" out="./ui2"/>
 	 * </target>
	 * </project>
	 * 빌드 스크립트는 대강 이렇게만 써도 돌아가며 두번쨰 clxcompile은 프래그먼트 프로젝트를 단독빌드를 하는 요청으로 딱히 필요없는 코드이다.
	 * 
	 */
}


/*
 * "http caching과 통신에 관하여" 버튼(btn9)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn9Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn9 = e.control;
	/**
	 * 캐싱은 주어진 리소스의 복사본을 저장하고 있다가 요청시에 그것을 제공하는 기술로, 웹 캐시가 자신의 저장소 내에 요청된 리소스를 가지고있다면,
	 * 요청을 가로채 원래의 서버로부터 리소스를 다시 다운로드 하는 대신 리소스의 복사본을 반환한다.
	 * 이 http 캐싱은 선택적이지만 캐시된 리소스를 재사용하는것은 보통 바람직한 일이다.
	 * 다만 http 캐시들은 일반적으로 GET에 대한 응답만을 캐싱하며, 다른 메서드들은 제외된다.
	 * 그래서 서브미션을 통해서 데이터를 요청하는 경우, get method로 데이터를 요청하면, 사용자가 원치 않는 캐싱을 허용하게 될 수 있어서 
	 * 요청한 파라미터가 같아도 요청이 가로챔당해 이전에 조회한 데이터가 기존과 같은 데이터가 내려받아질 수도 있다.
	 * 그래서 데이터를 요청하는경우에는 post를 사용하는것이 바람직하다.
	 */
}


/*
 * "Button" 버튼(btn10)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn10Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn10 = e.control;
	app.lookup("msm1").send();
}


/*
 * "http method타입과 content-type" 버튼(btn11)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn11Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn11 = e.control;
	/**
	 * method type이 get인 경우에는 파라미터 내용이 텍스트이기 때문에 content-type이 날아가지 않음.
	 * post이고, response가 text인 경우에 대해서 content-type이 날아갈 수 있음.
	 * responseType이 filedownload인 경우에도 content-type이 고정되어 날아감 -> 이유는 아직 모름
	 */
}

/*
 * "window와 open" 버튼(btn12)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn12Click(e){
	var btn12 = e.control;
	
	/**
	 * 사파리에서는 ajax call 하는 동안에 window.open 하는 동작에 대해서 onchange에 대한 새창열기를 자동으로 열리는 팝업으로 인식하여 
	 * 동작을 막아버린다고한다. 
	 * 우회하는 방안으로는 ajax call을 타기 전에 팝업을 띄워두고 이 팝업에 대한 경로를 바꿔주거나 post method를 보내는 방식으로 움직여야할 것 같음
	 */
}

/*
 * "그리드내에 컨트롤의 enable" 버튼(btn13)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn13Click(e){
	var btn13 = e.control;
	/**
	 * 그리드 내에 컨트롤에 대해 enable에 바인딩을 걸어 행별로 enable 값이 다를 때, 기본적으로 enable 속성값에을 app.lookup("btn").enabled를 
	 * 찍어보면 아마 false로 나롤것임. 다만 이게 에디트 모드로 들어가면 달라지게 되는데, 이전에 선택한 행의 enable 속성이 나오게됨.
	 * false인곳에서 true의 셀을 클릭하면 false가 한번 나오고 이후로 true가 나오고, true인곳에서 false 로 바꾸면 true 한번 나오고
	 * false가 계속 나오는 형식으로 출력됨. 콘솔의 타이밍이 한박자씩 늦는 느낌으로 enabled속성이 관리됨. 
	 * 현재 선택한 셀의 컨트롤의  속성값을 체크하고싶으면 forEachOfGridCells를 돌려서 특정 행의 특정셀의 ctrl을 찾고, 그 즉시 enabled값 같은걸
	 * 리턴해야 정상적인 값을 얻을 수 있음.
	 */
}
