/************************************************
 * kakaoMap.js
 * Created at 2022. 1. 10. 오후 4:05:14.
 *
 * @author HANS
 ************************************************/



/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	var voContent = e.content;
	
	var script = document.createElement("script");
	
	// 카카오 지도 API 사용
	// 자세한 사항은 카카오 지도 API 가이드 참조
	// 1) autoload : API를 가져온 후 자동으로 Map을 로드하지 못하도록 설정 (false)
	// 2) appkey : API를 사용하기 위해 필요한 키
	// 3) libraries : 카카오 지도 API의 라이브러리를 사용하기 위해 파라미터 추가 (services, clusterer, drawing 라이브러리 사용 가능)
	script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c76aa2d7841fc6da581fb51bb3e6b40e";
	script.type = "text/javascript";
	
	// 헤더에 해당 스크립트 추가
	document.head.appendChild(script);
	
	// API가 로드된 후 이벤트 실행
	script.addEventListener("load", function(){
		// 지도 API 로드
		daum.maps.load(function(){
			// 컨텐츠를 가져옵니다.
			var content = voContent;
			
			// 지도를 생성합니다.
			var options = {
				center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
				level: 3 
			};
			var map =  new kakao.maps.Map(content, options);
		});
	});
}
