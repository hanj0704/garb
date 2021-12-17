/************************************************
 * constraint.js
 * Created at 2021. 11. 3. 오전 9:09:45.
 *
 * @author HANS
 ************************************************/



/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var a = app.lookup("btn2");
	
	var b = a.getActualRect();
	
	a.getParent().updateConstraint(a, {
		width : b.width+30+"px"
	});
}


/*
 * "Button" 버튼(btn2)에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onBtn2MeasureSize(/* cpr.events.CMeasureSizeEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	console.log("MEASURE_SIZE~");
	
}


/*
 * 라디오 버튼에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onRdb1MeasureSize(/* cpr.events.CMeasureSizeEvent */ e){
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdb1 = e.control;
	e.height = rdb1.getItemCount() * 30;
	console.log("MEASURE");
}


/*
 * 그룹에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onGrp3MeasureSize(/* cpr.events.CMeasureSizeEvent */ e){
	/** 
	 * @type cpr.controls.Container
	 */
	var grp3 = e.control;
	console.log("MEA");
}


/*
 * 루트 컨테이너에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onBodyMeasureSize(/* cpr.events.CMeasureSizeEvent */ e){
	console.log("..")
}


/*
 * 라디오 버튼에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onRdb3MeasureSize(/* cpr.events.CMeasureSizeEvent */ e){
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdb3 = e.control;
	
	console.log("MEASURE");
}


/*
 * 라디오 버튼에서 measure-size 이벤트 발생 시 호출.
 * 컨트롤의 크기를 계산할 때 발생하는 이벤트
 */
function onRdb2MeasureSize(/* cpr.events.CMeasureSizeEvent */ e){
	/** 
	 * @type cpr.controls.RadioButton
	 */
	var rdb2 = e.control;
	console.log("AAAA");
//	e.preventDefault();
//	e.stopPropagation();
}
