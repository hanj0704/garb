/************************************************
 * treeTest.js
 * Created at 2021. 5. 7. 오전 9:27:17.
 *
 * @author HANS
 ************************************************/



/*
 * 트리에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onTre1Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
	var a = e.dataTransfer.getData("text");
	
	var b = e.targetObject.item;
	
	a = JSON.parse(a);
	console.log(a);
	console.log(b);
	e.preventDefault();
	/** @type cpr.controls.Tree */
	var tre = app.lookup(a.from.id);
	var item = tre.getDataSetIndexByValue(a.content[0].value);
	console.log(item);
	tre.dataSet.deleteRow(item);
}
