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
	
	var ds = app.lookup("ds1");
	
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
	
}
