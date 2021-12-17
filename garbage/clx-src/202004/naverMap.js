/************************************************
 * naverMap.js
 * Created at 2020. 4. 3. 오후 1:59:41.
 *
 * @author HANS
 ************************************************/


// 쉘 컨트롤의 컨텐트
var content = null;
var map = null;

function initMap(){
	// 맵을 담을 DIV를 생성합니다.
	var mapDiv = createMapDiv(content);
	
	// 지도의 옵션을 지정합니다.
	// 옵션에서 컨트롤을 추가 및 제거할 수 있습니다.
	var mapOptions = {
	    center: new naver.maps.LatLng(app.getAppProperty("lat"), app.getAppProperty("lng")),
	    zoom: 12
	};
	
	// 맵을 로드합니다.
	map = new naver.maps.Map(content, mapOptions);
	
	// HTML5 Geolocation API를 활용하여 현재 위치로 지도를 세팅합니다.
	 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
    }
	
	//맵이 로드된 후 이벤트를 전달합니다.
	var event = new cpr.events.CUIEvent("map-load", {
		"content" : {
			"map" : map
		}
	});
	app.dispatchEvent(event);
}

function createMapDiv(content){
	// 맵을 담을 DIV를 생성합니다.
	var mapDiv = document.createElement("div");
	mapDiv.style.height = "100%";
	mapDiv.style.width = "100%";
	mapDiv.setAttribute("id", "map");
	
	// 쉘 컨텐트에 맵 DIV를  append 합니다.
	content.appendChild(mapDiv);
	
	return mapDiv;
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	var scriptElement = document.createElement("script");
	
	scriptElement.type = "text/javascript";
	scriptElement.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ibxk6920gq&submodules=geocoder";	
	
	// 헤더에 해당 스크립트 추가
	document.head.appendChild(scriptElement);
	
	scriptElement.addEventListener("load", function(){
		
//		var mapOptions = {
//	    zoom: 12
//	};
//	
//	var map = new naver.maps.Map(e.content, mapOptions);
	var map = new naver.maps.Map(e.content, {
    useStyleMap: true,
    zoom: 16,
    center: new naver.maps.LatLng(37.5666103, 126.9783882)
});
			
			});
	
}




/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	

	content = e.content;
}
