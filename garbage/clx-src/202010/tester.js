/************************************************
 * tester.js
 * Created at 2020. 10. 5. 오후 2:59:59.
 *
 * @author HANS
 ************************************************/


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	var fi1 = app.lookup("fi1");
	
	var files = fi1.file;
	
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", files, false);
	
//	var cont = new cpr.controls.Container("abc");
//	
//	
//	var output = new cpr.controls.Output();
//	
//	output.value = "뮻ㅇㅁ";
//	
//	var xyLayout = new cpr.controls.layouts.XYLayout();
//	cont.setLayout(xyLayout);
//	
//	cont.addChild(output, {
//		"left" : "0px",
//		"top" : "0px",
//		"width" : "100px",
//		"height" : "20px"
//	});
//	
//	app.getContainer().floatControl(cont,{
//		"left" : "100px",
//		"top" : "100px",
//		"width" : "100px",
//		"height" : "20px"
//	});
//	var tre = app.lookup("tre1");
//	tre.setSubTreeChecked(tre.getItemByValue("1"), true);
//	app.lookup("tre1").setCheckedChildren(app.lookup("tre1").getItemByValue("1"), true);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var tre = app.lookup("tre1");	
	
//	var item = tre.getItemByValue("1");
	
	
//	var childrens = tre.getChildren(item);
	
//	tre.setCheckedChildren(item, state);

//	console.log(tre.getCheckedItems());
//	console.log(tre.getSelectedDataSetIndices());
	console.log(tre.getCheckedItems());
	tre.setSubTreeChecked(tre.getItemByValue("1"), false);
}




/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	var vcTrees = new cpr.controls.Tree();
//		vcTrees.showItemCheckbox = true;
//		vcTrees.setItemSet( app.lookup("ds1"), {
//			"label" : "label",
//			"value" : "value",
//			"parentValue" :"parentV"
//		});		
//			
//			var vsRootValue = "1";
//			
//			vcTrees.setSubTreeChecked(vcTrees.getItemByValue("1"), true);
//			
//			console.log(vcTrees.getCheckedItems())

	app.lookup("tre1").getCheckedItems().forEach(function(each){
		
		vcTrees.addItem(new cpr.controls.TreeItem(each.label, each.value, each.parentValue));
	});
	
	app.getContainer().addChild(vcTrees, {
		"top" : "500px",
		"left" :"500px",
		"width":"200px",
		"height":"500px"
	});
}


/*
 * "Button" 버튼에서 mouseenter 이벤트 발생 시 호출.
 * 마우스 포인터가 컨트롤 위에 진입할 때 발생하는 이벤트.
 */
function onButtonMouseenter(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.getContainer().floatControl(button,{
		"left" : "0px",
		"top" :"0px",
		"bottom":"0px",
		"width":"400px"
	});
}


/*
 * "Button" 버튼에서 mouseleave 이벤트 발생 시 호출.
 * 사용자가 컨트롤 및 컨트롤의 자식 영역 바깥으로 마우스 포인터를 이동할 때 발생하는 이벤트.
 */
function onButtonMouseleave(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	app.lookup("grp1").addChild(button, {
		"left" : "0px",
		"top" :"0px",
		"bottom":"0px",
		"width":"45px"
	});
	
}


/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTre1ItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	var mdi = app.lookup("mdi1");	
		
	
}


/*
 * 루트 컨테이너에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	
	var grd = app.lookup("grd1");
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	var grd = app.lookup("grd1");
	
	console.log(grd.leftSplitWidth);
	console.log(grd.rightSplitWidth);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick6(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var tf1 = app.lookup("tf1");
	
	console.log(tf1.getItemByName("tab1"));
	
	var a ={
		a : 1,
		b : 2,
		c : 3
	}
	
	var ab = JSON.stringify(a);	
	
	console.log(JSON.parse('"'+ab+'"'));
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick7(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var tf = app.lookup("tf1");
	
	var items = tf.getTabItems()[0];
	
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick8(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	var grd = app.lookup("grd1");
	
	console.log(grd.header);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick9(/* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	
	var grid = app.lookup("grd1");
	
	console.log(grid.getColumnLayout().header);
		
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick10(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
//	app.lookup("si1").putValue(value);
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick11(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
	console.log(app.lookup("tre1").getChildren(app.lookup("tre1").getItems()[0]));
}


/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick12(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
}
