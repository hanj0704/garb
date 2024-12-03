/************************************************
 * bounceBounce.js
 * Created at 2024. 12. 3. 오전 11:01:46.
 *
 * @author HAN
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var loader = new cpr.core.ResourceLoader();
	loader.addScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js")
	.load(function(error) {
		
		
		gsap.to(".item1", {
			duration: 3, repeat: -1, y:-80,yoyo:true,rotation:30
		});
		gsap.to(".item2", {
			duration: 1, repeat: -1, y:-40,yoyo:true,rotation:-30
		});
		gsap.to(".item3", {
			duration: 2, repeat: -1, y:-10,yoyo:true,rotation:10
		});
	});
}
