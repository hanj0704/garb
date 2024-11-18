/************************************************
 * cbgTester.js
 * Created at 2024. 10. 24. 오전 11:10:31.
 *
 * @author HAN
 ************************************************/

/*
 * 체크 박스 그룹에서 selection-change 이벤트 발생 시 호출.
 * 체크박스 그룹의 아이템을 선택하여 변경한 값이 저장된 후에 발생하는 이벤트.
 */
function onCbg1SelectionChange(e){
	var cbg1 = e.control;
	
	console.log(e.newSelection.map(function(each){
		return each.value;
	}));
	console.log(e.oldSelection.map(function(each){
		return each.value;
	}));
}

/*
 * 체크 박스 그룹에서 selection-change 이벤트 발생 시 호출.
 * 체크박스 그룹의 아이템을 선택하여 변경한 값이 저장된 후에 발생하는 이벤트.
 */
function onCbg2SelectionChange(e){
	var cbg2 = e.control;
	
	console.log(e.newSelection.map(function(each){
		return each.value;
	}));
	console.log(e.oldSelection.map(function(each){
		return each.value;
	}));
}

/*
 * "Button" 버튼(b1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onB1Click(e){
	var b1 = e.control;
	
}
