/************************************************
 * google.js
 * Created at 2021. 2. 18. 오후 5:19:59.
 *
 * @author HANS
 ************************************************/

var initContent = null;

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	initContent = e.content;
	
}


/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	
	navigator.geolocation.getCurrentPosition(success, error);
	
	function success(pos){
		
		var coord = pos.coords;
		
		var lat = coord.latitude;
		var longi = coord.longitude;
		 var myLatlng = new google.maps.LatLng(lat, longi);
            var mapOptions = {
                zoom: 4,
                center: myLatlng
            }
            var map = new google.maps.Map(initContent, mapOptions);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map
            });

        google.maps.event.addDomListener(window, 'load', function(){});
	
	}
	
	function error(err){
		console.log(err);
	}
}
