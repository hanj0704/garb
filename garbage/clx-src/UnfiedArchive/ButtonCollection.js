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
	 * 2022/12/27 추가
	 * 서비스쪽 파라미터에서 List<VO>와 같은 형태로 받고싶으면 위에 작성한것 처럼 encoder를 지정해줘야 하는데,array데이터를 보낼 떄 해당 데이터를 
	 * 감싸고있는 키값도 존재해서는 안된다. 롬복에서 json 정보를 읽어들일때 타입에 선언된 정보를 토대로 jsonarray 정보를 읽어들이려 할 텐데 앞에 별도의 키값이
	 * 선언되어 있으면 해당 정보를 읽으면서 jsonarrar가 아니게 되어서 이상한 타입의 데이터가 들어왔다고 에러를 발생시키게 됨.
	 * 결과적으로 리스트데이터를 그대로 reqbody로 받고싶으면 데이터셋에서는 하나의 데이터셋에 대한 정보만 올리고, 인코더에서는 데이터를 제외한 모든 키값을 지워야함
	 * 키값을 유지한채로 읽어야 한다면 해당 키를 자신의 프로퍼티로 가지는 vo로 한번 더 감싸서 vo를 2개 만들면 됨.
	 * requestBody는 post로 넘어온 formdata requestParam은 get으로 넘어온 querystring에서 정보를 가져오게됨.
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

/*
 * "dto와 entity" 버튼(btn14)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn14Click(e){
	var btn14 = e.control;
	/**
	 * Entity클래스란 JPA(JAVA Persistence API)에서 실제 db테이블과 매칭되는 클래스임. JPA를 사용하면서 Entity클래스를 작성했고, 이걸로 
	 * Repository뿐만아닌 Service, Controller 영역까지 사용하는게 가능했음.
	 * 근데 Entity를 화면에 띄우는데까지 사용하다보니 양방향으로 연결된 엔테테는 순환 참조 문제가 발생했고, 다른 Entity를 참조하고 있는 경우 현재 Entity뿐만
	 * 아니라 다른 Entity에도 원치 않는 변경이 일어나거나, 무거운 양의 데이터를 들고 여러 영역을 오가는 것이 성능상에도 좋지 않을것으로 생각됨.
	 * 따라서 DB Layer에는 Entity, View Layer에는 DTO를 사용하여 역할을 분리해 Entity와 DTO가 각자만의 역할을 충실히 수행할 수 있게 했음. 
	 * client controller service간에는 dto, service repository db간에는 Entity
	 * 원격 응용 프로그램에서 가장 비용이 많이 드는 작업중 하나는 클라이언트와 서버간의 왕복시간이므로, 모든것을 요약한 DTO를 반환하는게 성능을 크게 향상시킬 수 있음.
	 * 
	 */
}

/*
 * "브라우저와 autofill" 버튼(btn15)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn15Click(e){
	var btn15 = e.control;
	/**
	 * 브라우저에서는 미리 입력해놓은 사용자 개인 정보가 있을 경우, aria-label 혹은 placeholder, 자신과 가장 가까운 <label>의 value,name 혹은
	 *  <div>여기 텍스트</div> 값을 가져와서 브라우저에서 개인 데이터 자동 채우기에 사용되는 필드 이름 양식을 충족할 경우, 자동으로 값이 완성되서 들어가게 됩니다.
	 * html 속성을 통해서 이 동작을 막거나 제어할 수 없는 것으로 테스트 되었고,자동완성 발동 조건은 div 내에 이름, 성, 이메일과 같은 자동입력 필드 양식을 만족하는 아이템이
	 * 3개 이상 존재할 때 부터 자동완성이 제안되는것으로 관찰되었음.
	 * 해결 방법은 브라우저에서 옵션을 꺼버리는게 가장 좋다고 생각되나, 개발자가 아닌 사용자에게는 해당 내용이 익숙치 않기 때문에, 개발 시점에서도 자동완성을 끄는 방법이
	 * 필요할 수 있음. 방안은 autocomplete 속성에 new-password 를 집어넣거나, 자동완성 필드중에 포함되지 않는 값을 집어넣는 것인데, 예를들어 nope 같은 값은
	 * 어느 필드로도 유추되지 않는 값이기 때문에, nope라는 이름으로 데이터가 저장되어있지 않는한 자동완성 제안을 받을 일이 없다는것
	 * 
	 */
}

/*
 * "voDataSend2" 버튼(btn16)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn16Click(e){
	var btn16 = e.control;
	app.lookup("sms2").send();
}

function _requestEncoder(sub,data){
	var res= {};
	var voData = data;
	
	for(var item in voData) {
		res = voData[item];
	}
	console.log(res);
	return {
		"content" : res
	}
}
function _requestEncoder2(sub,data){
	var res= {};
	var voData = data;
	
	for(var item in voData) {
		res = voData[item];
	}
	console.log(res);
	res = res["list"];
	console.log(res);
	
	return {
		"content" : res
	}
}

/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSms2BeforeSubmit(e){
	var sms2 = e.control;
	
	app.lookup("sms2").setRequestEncoder(_requestEncoder);
}

/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSms1BeforeSubmit(e){
	var sms1 = e.control;
	app.lookup("sms1").setRequestEncoder(_requestEncoder2);
}

cpr.data.IDataRow.prototype.toJSON = function(){
	return this.getRowData();
}
/*
 * "JSON, stringify, toJSON에 대해" 버튼(btn17)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn17Click(e){
	var btn17 = e.control;
	/**
	 * 커스텀 toJSON이라는 기능이 있는데, 이건 toString을 사용해 객체르 문자열로 바꾸는거 처럼
	 * 객제에 toJSON이라는 이름으로 메서드가 구현되어있으면 객체를 JSON으로 바꿀 수 있음.
	 * JSON.stringify는 이런 경우를 감지하고 toJSON을 자동으로 호출해줌
	 * 어디까지나 편의성에 대한 영역이기 때문에 뭐가 더 좋고 나쁘다는 없으나, 아직 생각을 다 못하긴 했는데 이 내용으로
	 * 객체 복사에 대한 작업을 해볼수도 있겠다 싶음.
	 * 
	 * JSON.parse에는 reviver이라는 두 번쨰 인수가 있는데, 이건 parse 시키는 문자열 안에 특정 키의 데이터가
	 * 날짜형식의 데이터다 근데 이게 날짜가 아니라 문자열로 들어가서 사용에 불편이 있다 싶으면 형변환같은걸 시켜줄 수 있는 코드임
	 */
	var ds = app.lookup("dsList");
	var a = {
		"A" : 1,
		"B" : 2,
		"rows" : ds.getRow(0)
	};
	console.log(JSON.stringify(a));
	
	
	var schedule = {
		"meeting" : [
			{"title" : "A", "date" : "2017-11-30T12:00:00.000Z"},
			{"title" : "B", "date" : "2018-11-30T12:00:00.000Z"}
		]
	};
	var str = JSON.stringify(schedule);
//	var jsonMan = JSON.parse(str);
	var jsonMan  = JSON.parse(str,function(key,value){
		if(key == "date") return new Date(value);
		return value;
	});
	console.log(jsonMan["meeting"][0].date.getDate());
	
}

/*
 * "객체복사" 버튼(btn18)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn18Click(e){
	var btn18 = e.control;
	/*
	 * 객체를 다른 변수에 할당하는것은 해당 객체를 복사하여 별도로 저장하는게 아니라 객체가 저장되어있는 메모리 주소인 객체에 대한 참조값을 저장하게됨.
	 * 객체와 원시타입의 근본적인 차이는 참조에 의해 저장되고 복사되는것임.
	 */
	var objMap = new cpr.utils.ObjectMap();
	var data = {};
	objMap.put({"column1" : "광","column2":"공"}, data);
	
	var parents = data; // parents == data 객체 복사가 아닌 참조가 일어나서, 한쪽에서 값을 바꾸면 다른곳에 영향을 미침
	parents["영업1팀"] = "가가";
	
	console.log(objMap);
	/*
	 * 객체 복사를 하고싶으면  assign을 하거나 새 빈 객체를 만들고 프로퍼티를 전부 복사하는 방식으로 해야함 
	 */
	//객체에 대한 참조를 통해 컨트롤을 복사하는 방법은 없을런지?
}

/*
 * "타입체크" 버튼(btn19)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn19Click(e){
	var btn19 = e.control;
	/*
	 * 자바스크립트에서 타입을 체크하는 방법은 여러가지 있는데, typeof 혹은 instanceof 를 주로 사용한다고 볼 수 있다.
	 * instanceof : 이 연사자는 보통 프로토타입 체인을 거슬러 올라가며 인스턴스 여부나 상속 여부를 체크한다. 계층 구조를 가진 클래스를 다룰떄, 클래스의 상속여부등을 따질때 효과가 좋음
	 * obj1.isPrototypeOf(obj2) : obj1이 obj2의 프로토타입 체인 상 어딘가에 존재하면 true를 반환
	 * Object.prototype.toString.call() : [object 타입] 을 반환받기 떄문에 직관적인 타입을 반환받고 싶을떄 좋은 내용으로 보임.
	 */
}

/*
 * "임베디드페이지와 form 태그" 버튼(btn20)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn20Click(e){
	var btn20 = e.control;
	/*
	 * 임베디드 페이지에서 사용하는 getHostMethod나 new protocols.httppostmethod는 내부적으로 form 태그를 사용하여 메서드를 호출하는데,
	 * form태그는 encType속성에 대해 application/x-form-urlencoded, multipart/form, text/plain만 지원하기 때문인데 
	 */
}
