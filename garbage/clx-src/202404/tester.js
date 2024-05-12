/************************************************
 * tester.js
 * Created at 2024. 4. 23. 오후 1:51:38.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
async function onBtn1Click(e){
	var btn1 = e.control;
	
	let q = app.openDialog("202404/asyncTester", {width : 400, height : 300}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
		});
	}).then(function(returnValue){
	
	});
	await q;
	
	console.log("호롤롤로");
	q.then(function(input){
		console.log(input);
	}).finally(function(){
		console.log(arguments);
	})
}
/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
//	openCenteredWindow("http://localhost:8080", 1000, 500);
opens("http://localhost:8080");
//	window.open("http://localhost:8080","qq","width=1000,height=600,left=-400");
//	function popOpen()
//
//{
//
// var nWidth = "700";
//
// var nHeight = "500";   
//
// var xPos = (document.body.clientWidth / 2) - (nWidth / 2); 
//
// xPos += window.screenLeft;  //듀얼 모니터
//
// var yPos = (screen.availHeight / 2) - (nHeight / 2);
//
// window.open("new.html","popOpen","width="+nWidth+",height="+nHeight+", left="+xPos+", top="+yPos+", toolbars=no, resizable=no, scrollbars=no");
//
//};
//popOpen();
}
function qq(a,b,c){
	
	console.log(arguments);
}
function opens(url){
	        var sd = window.getScreenDetails();
		        sd.then(function(res) {
		            var voNewWindowPop = window.open(url, "", "width=1400,height=800");
		            var mainLeft = window.screenX;
		            var availWidth = window.screen.availWidth;
		            var scrrenInfo = res.screens;
		            var isMainMonitorLeft = true;
		            scrrenInfo.forEach(function(each) {
		            	console.log(each.isPrimary);
		                if (each.left < 0) {
		                    isMainMonitorLeft = false;
		                }
		            });
		            
		            //주모니터가 왼쪽인 경우
		            if (isMainMonitorLeft) {
		                
		                //메인화면 위치 계산
		                var mainPosition = "left";
		                //메인화면이 왼쪽일 때
		                if (window.screenX < window.screen.availWidth) {
		                    mainPosition = "left";
		                    voNewWindowPop.moveTo(res.screens[1].left, 0);
		                }
		                //메인화면이 오른쪽일 때
		                else {
		                    mainPosition = "right"
		                    voNewWindowPop.moveTo(res.screens[0].left, 0);
		                }
		            }
		            //주모니터가 오른쪽인 경우
		            else {
		                //메인화면 위치 계산
		                var mainPosition = "right";
		                //메인화면이 왼쪽일 때
		                if (window.screenX < 0) {
		                    mainPosition = "left";
		                    voNewWindowPop.moveTo(res.screens[1].left, 0);
		                }
		                //메인화면이 오른쪽일 때
		                else {
		                    mainPosition = "right"
		                    voNewWindowPop.moveTo(res.screens[0].left, 0);
		                }
		            }
		            
		            return voNewWindowPop;
		            
		        });
	
}
function openCenteredWindow(url, width, height) {
    const pos = {
        x: (screen.width / 2) - (width / 2),
        y: (screen.height/2) - (height / 2)
    };

    const features = `width=${width} height=${height} left=${pos.x} top=${pos.y}`;

    return window.open(url, '_blank', features);
    }