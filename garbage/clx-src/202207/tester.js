/************************************************
 * tester.js
 * Created at 2022. 7. 14. 오후 2:47:07.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var script = document.createElement("script");
	script.type = "text/javascript";
//	script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=c76aa2d7841fc6da581fb51bb3e6b40e&libraries=services&autoload=false";
	script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c76aa2d7841fc6da581fb51bb3e6b40e";
	document.head.appendChild(script);
	script.addEventListener("load", function(){
		var geocoder = new kakao.map.services.Geocoder();
		geocoder.addressSearch("제주특별자치도 제주시 첨단로 242",function(result,status){
			console.log(result);
		});
	});
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(e){
	var shl1 = e.control;
	var voContent = e.content;
	shl1.registerComponent("div", e.content);
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c76aa2d7841fc6da581fb51bb3e6b40e&libraries=services";
	document.head.appendChild(script);
	console.log("zz");
	script.addEventListener("load", function(){
		// 지도 API 로드
		kakao.maps.load(function(){
			
//		var geocoder = new kakao.maps.services.Geocoder();
//		geocoder.addressSearch("제주특별자치도 제주시 첨단로 242",function(result,status){
//			console.log(result);
//		});
			// 컨텐츠를 가져옵니다.
			var content = voContent;
			
			// 지도를 생성합니다.
			var options = {
				center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
				level: 3 
			};
			var map =  new kakao.maps.Map(content, options);
		});
//		var div = app.lookup("shl1").getComponent("div");
//		var mapOption = {
//			center : new kakao.maps.LatLng(33.450701,126.570667),
//			level : 3
//		}	
//		var map = new kakao.maps.Map(div,mapOption);
//		var geocoder = new kakao.map.services.Geocoder();
//		geocoder.addressSearch("제주특별자치도 제주시 첨단로 242",function(result,status){
//			console.log(result);
//		});
	});
//	var voContent = e.content;
//	
//	var script = document.createElement("script");
//	
//	// 카카오 지도 API 사용
//	// 자세한 사항은 카카오 지도 API 가이드 참조
//	// 1) autoload : API를 가져온 후 자동으로 Map을 로드하지 못하도록 설정 (false)
//	// 2) appkey : API를 사용하기 위해 필요한 키
//	// 3) libraries : 카카오 지도 API의 라이브러리를 사용하기 위해 파라미터 추가 (services, clusterer, drawing 라이브러리 사용 가능)
//	script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c76aa2d7841fc6da581fb51bb3e6b40e";
//	script.type = "text/javascript";
//	
//	// 헤더에 해당 스크립트 추가
//	document.head.appendChild(script);
//	
//	// API가 로드된 후 이벤트 실행
//	script.addEventListener("load", function(){
//		// 지도 API 로드
//		daum.maps.load(function(){
//			// 컨텐츠를 가져옵니다.
//			var content = voContent;
//			
//			// 지도를 생성합니다.
//			var options = {
//				center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//				level: 3 
//			};
//			var map =  new kakao.maps.Map(content, options);
//		});
//	});
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	
	app.lookup("opt1").value = navigator.userAgent;
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	app.lookup("sms1").send();	
}

/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSms1BeforeSubmit(e){
	var sms1 = e.control;
	sms1.setDataRowHandler(function(rowdata){
		var result = {};
		console.log(rowdata);
		debugger;
		return result;
	},true);
}

/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(e){
	var btn4 = e.control;
	var scriptTag = document.createElement("script");
	scriptTag.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.0.0/kakao.min.js";
	scriptTag.setAttribute("integrity", "sha384-PFHeU/4gvSH8kpvhrigAPfZGBDPs372JceJq3jAXce11bVA6rMvGWzvP4fMQuBGL");
	scriptTag.setAttribute("crossorigin", "anonynmous");
//	scriptTag.integrity = "sha384-PFHeU/4gvSH8kpvhrigAPfZGBDPs372JceJq3jAXce11bVA6rMvGWzvP4fMQuBGL";
//	scriptTag.crossorigin = "anonymous";
	scriptTag.addEventListener("load", function(ev){
		Kakao.init("c76aa2d7841fc6da581fb51bb3e6b40e");
		
	
	
//	<script src="https://t1.kakaocdn.net/kakao_js_sdk/2.0.0/kakao.min.js"
//  integrity="sha384-PFHeU/4gvSH8kpvhrigAPfZGBDPs372JceJq3jAXce11bVA6rMvGWzvP4fMQuBGL" crossorigin="anonymous"></script>
//<script>
//  Kakao.init('c089c8172def97eb00c07217cae17495'); // 사용하려는 앱의 JavaScript 키 입력
//</script>
//
//<a id="kakaotalk-sharing-btn" href="javascript:;">
//  <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
//    alt="카카오톡 공유 보내기 버튼" />
//</a>
//
  Kakao.Share.createDefaultButton({
    container: '#kakaotalk-sharing-btn',
    objectType: 'feed',
    content: {
      title: '딸기 치즈 케익',
      description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
      imageUrl:
        'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com',
      },
    },
    social: {
      likeCount: 286,
      commentCount: 45,
      sharedCount: 845,
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      {
        title: '앱으로 보기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
    ],
  });
  console.log("힝힝");
});
document.head.appendChild(scriptTag);
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl2Load(e){
	var shl2 = e.control;
	
	var content = e.content;
//<a id="kakaotalk-sharing-btn" href="javascript:;">
//  <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
//    alt="카카오톡 공유 보내기 버튼" />
//</a>
	var aTag = document.createElement("a");
	aTag.id = "kakaotalk-sharing-btn";
	aTag.href = "javascript:;";
	var img = document.createElement("img");
	img.src  = "https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png";
	aTag.appendChild(img);
	content.appendChild(aTag);
}
