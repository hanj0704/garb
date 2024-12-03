/************************************************
 * SolarSystem.js
 * Created at 2024. 12. 3. 오전 9:15:32.
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
	.addScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/MotionPathPlugin.min.js")
//	.addScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Observer.min.js")
//	.addScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js")
//	.addScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/SplitText3.min.js")
	.load(function(error) {
		
	});
}

function getTransformOrigin(btnId){
	
	var btnEarth = app.lookup("btnEarth");
	/** @type cpr.controls.UIControl */
	var btnTarget = app.lookup("btn"+btnId);
	var result = "";
	var q = btnTarget.getActualRect().center.getDifference(btnEarth.getActualRect().center);
	console.log(q);
	if(q.width == 0) {
		result = "center ";
	} else {
		result += (Math.abs(q.width)+btnTarget.getActualRect().width/2)+"px ";
	}
	
	result += (Math.abs(q.height)+btnTarget.getActualRect().height/2) + "px";
	console.log(result);
	return result;
}


function getPath(btnId){
	var result = "M 0 t m 0, 0 a t,t 0 1,0 t2,0 a t,t 0 1,0 -t2,0";
	
	var btnEarth = app.lookup("btnEarth");
	var btnTarget = app.lookup("btn"+btnId);
	
}

function generateCirclePath(cx, cy) {
//	debugger;
	var r = app.lookup("btnEarth").getActualRect().center.getDistance(app.lookup("btnVenus").getActualRect().center);
	console.log(r);
	return `M ${cx - r}, ${cy} ` + `a ${r},${r} 0 1,0 ${2 * r},0 ` + `a ${r},${r} 0 1,0 ${-2 * r},0`;
	
	}
	
	function generateCirclePathAroundPoint() {
		var btnEarth = app.lookup("btnEarth");
		var rect = btnEarth.getActualRect().center;
		var cx = rect.x;
		var cy = rect.y;
		
		var btnTarget = app.lookup("btnVenus");
		var rect2 = btnTarget.getActualRect().center;
		var bx = rect2.x;
		var rectX = btnTarget.getActualRect().width/4;
		var by = rect2.y;
		// 반지름 계산
		const r = Math.sqrt(Math.pow(cx - bx, 2) + Math.pow(cy - by, 2));
		// SVG 경로 생성
//		return `M 0,${cy-by} ` + `a ${r},${r} 0 1,0 ${2 * r},0 ` + `a ${r},${r} 0 1,0 ${-2 * r},0`;
		return `M 0,0 ` + `a ${r},${r} 0 1,0 ${2 * r},0 ` + `a ${r},${r} 0 1,0 ${-2 * r},0`;
	}
	
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
//	getTransformOrigin("Moon");
	gsap.registerPlugin(MotionPathPlugin)
	gsap.to(".moon", {
		duration: 5, rotation: 360, repeat: -1, transformOrigin: getTransformOrigin("Moon"), ease:"linear"
	});
//	gsap.to(".venus",{
//		duration: 7, rotation: 360, repeat: -1, transformOrigin: getTransformOrigin("Venus"), ease:"linear"
//	})
//	var paths = generateCirclePath(app.lookup("btnEarth").getActualRect().center.x, app.lookup("btnEarth").getActualRect().center.y);
//	console.log(paths);
	gsap.to(".venus", {
            duration: 5,
            repeat: -1,
            ease: "linear",
            motionPath: {
                path: generateCirclePathAroundPoint(),
                autoRotate: false
            }
        });
}
