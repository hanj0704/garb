/************************************************
 * tester.js
 * Created at 2024. 11. 6. 오전 9:12:35.
 *
 * @author HAN
 ************************************************/

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
//	app.lookup("sms1").send().then(function(input){
//		console.log(input);
	var detail = getScreenDetails();
	
	detail.then(function(res){
		
		console.log(res);
		/** @type Array */
		var vaScreens = res.screens;
//		var availLeft = 0;
//		var availTop = 0;
		var x = window.screenX;
		var y = window.screenY;
		var windowFeatures = "";
		if(vaScreens.length < 2) {
			//긴 스크린
			windowFeatures = "left="+window.outerWidth+10+",width=1000,top=0,height="+window.outerHeight+";";
			window.open("about:blank","",windowFeatures);
			return;
		}
		var targetScr = null;
		var openTarget = null;
		vaScreens.some(function(each,idx){
			if(idx == vaScreens.length-1) {
				targetScr = vaScreens[idx];
				return true;
			}
			if(each.availLeft <= x && vaScreens[idx+1].availLeft > x) {
				targetScr = each;
				return true;
			}
		});
		
		vaScreens.some(function(each){
			if(each != targetScr) {
				openTarget = each;
				return true;
			}
		});
		
		windowFeatures = "left="+openTarget.availLeft+",top="+openTarget.availTop+",width="+openTarget.availWidth+",height="+openTarget.availHeight+";";
		window.open("about:blank", "", windowFeatures);
		
	})
//	});
	
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	/** @type Promise */
	var prom = getScreenDetails();
//	prom.catch(function(error){
//		localStorage.removeItem("popupScreen");
//		alert("창 관리에 대한 권한을 허용해주세요! 를 안내할 수 있는 팝업을 열기");
//	});
}

var openTarget = null;
/*
 * "설정하고 열기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var popupScreen = localStorage.getItem("popupScreen");
	if(popupScreen == null) {
		alert("팝업 대상 모니터를 선택해주세요!");
		setPopupTargetScreen();
	} else {
		openDialog();
	}
}

function openDialog(){
	
	var detail = getScreenDetails();
	detail.then(function(res) {
		var vaScreen = res.screens;
		var windowFeatures = "";
		if(vaScreen.length < 2) {
			windowFeatures = "left="+window.outerWidth+10+",width=1000,top=0,height="+window.outerHeight+";";
			window.open("about:blank","",windowFeatures);
			return;
		}
		var screenTarget =JSON.parse(localStorage.getItem("popupScreen"));
		var isScreenChanged = vaScreen.some(function(each){
			if(each.left == screenTarget.left && each.top == screenTarget.top) {
				return true;
			}
		});
		if(!isScreenChanged) {
			alert("디스플레이 변경이 감지되었습니다!");
			setPopupTargetScreen();
			return;
		}
		windowFeatures = "left="+screenTarget.availLeft+",top="+screenTarget.availTop+",width="+screenTarget.availWidth+",height="+screenTarget.availHeight+";";
		window.open("about:blank", "", windowFeatures);
	})
}

function setPopupTargetScreen(){
	
	var vcOverlay = new cpr.controls.Container();
	vcOverlay.style.addClass("cl-overlay");
	vcOverlay.addEventListener("click",function(e){
		e.control.dispose();
	});
	app.floatControl(vcOverlay,{
		left:"0px",
		top:"0px",
		right:"0px",
		bottom:"0px"
	});
	getScreenDetails().then(function(res){
		console.log(res);
		/** @type Array */
		var vaScreens = res.screens;
		
		if(vaScreens.length < 2) {
			localStorage.setItem("popupScreen", JSON.stringify(_.clone(vaScreens[0])));
			alert("디스플레이가 1개이므로 자동으로 대상 디스플레이가 설정되었습니다");
			openDialog();
			return;
		}
		var minX = 0;
		var minY = 0;
		var maxX = 0;
		var maxY = 0;
		var percent = 15;
		var spacing = 20;
		var vcContainer = new cpr.controls.Container();
//		vcContainer.style.setClasses([);
		vcContainer.addEventListener("click", function(e){
			e.stopPropagation();
		});
		
		vaScreens.forEach(function(each){
			if(minX > each.availLeft) {
				minX = each.availLeft;
			}
			if(maxX < each.availLeft + each.availWidth) {
				maxX = each.availLeft + each.availWidth;
			}
			if(minY > each.availTop) {
				minY = each.availTop;
			}
			if(maxY < each.availTop + each.availHeight) {
				maxY = each.availTop + each.availHeight;
			}
		});
		
		var basicLeft = spacing;
		var basicTop = spacing;
		if(minX < 0) {
			basicLeft = Math.abs(minX) / percent;
		}
		if(minY < 0) {
			basicTop = Math.abs(minY) / percent;
		}
		
		var vcBtnConfirm = new cpr.controls.Button();
		vcBtnConfirm.value = "선택";
		vcBtnConfirm._originValue = vcBtnConfirm.value;
		vcBtnConfirm.enabled = false;
		vcBtnConfirm.addEventListener("click",function(e){
			vcOverlay.dispose();
		});
		vcContainer.addChild(vcBtnConfirm,{
			right:spacing+"px",
			bottom:spacing+"px",
			width:"100px",
			height:"20px"
		})
		
		vaScreens.forEach(function(each){
			var btn = new cpr.controls.Button();
			
			btn.value = each.label;
			if(each == res.currentScreen) {
				btn.value = btn.value + "\n (최근)";
			}
			btn._originValue = btn.value;
			btn.addEventListener("click", function(e){
				localStorage.setItem("popupScreen",JSON.stringify(_.clone(each)));
				vcContainer.getChildren().forEach(function(each1){
					each1.value = each1._originValue;
				});
				e.control.value = e.control.value + "(선택됨)";
				vcBtnConfirm.enabled = true;
			});
			vcContainer.addChild(btn,{
				left: basicLeft + each.availLeft / percent + "px",
				top : basicTop + each.availTop / percent + "px",
				width : each.availWidth / percent + "px",
				height: each.availHeight/ percent + "px"
			});
		});
		var containerWidth = maxX/percent + spacing*2;
		var containerHeight = maxY/percent + spacing*2 + 40;
		vcOverlay.floatControl(vcContainer,{
			width: containerWidth + "px",
			height: containerHeight +"px",
			left:"calc(50% - "+containerWidth/2+"px)",
			top:"calc(50% - "+containerHeight/2+"px)"
		})
	})
}