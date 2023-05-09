/************************************************
 * dataTest.js
 * Created at 2023. 4. 21. 오후 3:45:31.
 *
 * @author HANS
 ************************************************/

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd1SelectionChange(e){
	var grd1 = e.control;
	
	var vnIndex = e.newSelection[0];
	var voParentRow = grd1.dataSet.getRow(vnIndex);
	app.lookup("ds2").bindParentRow(voParentRow);
}

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	app.lookup("msm1").send();
}
