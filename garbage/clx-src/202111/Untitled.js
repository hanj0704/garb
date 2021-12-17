/************************************************
 * Untitled.js
 * Created at 2021. 11. 19. 오전 8:52:13.
 *
 * @author HANS
 ************************************************/

/*
 * 루트 컨테이너에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onBodyKeydown(/* cpr.events.CKeyboardEvent */ e){
	
	if(e.keyCode == cpr.events.KeyCode.TAB){
		
		app.getContainer().addEventListenerOnce("focusin", function(ev){
			console.log(ev);
			console.log("ㅋㅋ");
			
		})
	}
}

function ab(a,b,c){
	
	setTimeout(function(){
		
		var res = 0;
		try{
			res =a/b;
			c(null,res); 
		} catch(error) {
			c(error,null);
		}
	}, 1000)
	
}


//ab(1,2,function(str){
//	alert(str);
//})
function abc(){
	console.log("zz");
}

function bb (){
	abc()
//	_.throttle(abc, 300);
}
var b = _.throttle(function(){
	console.log("ㅋㅋㅋ");
}, 2000);
/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	
	
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
//	b();
//	bb();

	var abc = app.lookup("cbg1");
	debugger;
	if(abc.focusable && abc.tabIndex != -1) {
		console.log("zz");
	} else if(abc instanceof cpr.controls.EmbeddedApp || abc instanceof cpr.controls.EmbeddedPage) {
		console.log("ㅎㅎ");
	} else if(abc instanceof cpr.controls.CheckBoxGroup || abc instanceof cpr.controls.RadioButton) {
		console.log("ztz");
	} else {
		console.log(",,");
	}
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var a = _.debounce(bb, 300);
	
	app.lookup("grp1").addEventListenerOnce("scroll", a);
}



/*
 * 체크 박스 그룹에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onCbg1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.CheckBoxGroup
	 */
	var cbg1 = e.control;
	console.log("ITEM CLICK");
}


/*
 * 체크 박스 그룹에서 focus 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 획득한 후 발생하는 이벤트.
 */
function onCbg1Focus(/* cpr.events.CFocusEvent */ e){
	/** 
	 * @type cpr.controls.CheckBoxGroup
	 */
	var cbg1 = e.control;
	console.log("FOCUS");
}
/**
 * 
 * @param {cpr.controls.UIControl} pcCtrl
 */
function checkIsFocusable (pcCtrl){
	debugger;
	
	if(pcCtrl instanceof cpr.controls.EmbeddedApp || pcCtrl instanceof cpr.controls.EmbeddedPage||
	pcCtrl instanceof cpr.controls.CheckBoxGroup || pcCtrl instanceof cpr.controls.RadioButton){
		console.log("zz");
		return true;
	} else if(pcCtrl.focusable && pcCtrl.tabIndex != -1) {
		return true;
	} 
	else {
		return false;
	}
}
/*
 * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn4 = e.control;
	
	var ep = app.lookup("ep1");
	
	var a = document.getElementsByName(ep.frameName).item(0).contentWindow;
	
	var bc = a.app.getInstances()[0].getContainer();
	console.log(bc);
/** @type cpr.controls.UIControl[]*/
	var va = bc.getAllRecursiveChildren()
	console.log(va);
	va.forEach(function(each){
		
		checkIsFocusable(each)
	});

	var a = [app.lookup("cbg1"),app.lookup("btn1"),app.lookup("rdb1")];
	
	
	a.forEach(function(each){
		checkIsFocusable(each);
	});
}
