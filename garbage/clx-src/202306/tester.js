/************************************************
 * tester.js
 * Created at 2023. 6. 1. 오후 2:08:18.
 *
 * @author HANS
 ************************************************/

exports.testt = function(param) {
	
	console.log(param);
	return param == null ? "red" : ""
}
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var json = {"Category":[{"CategoryID": 1,"CategoryName":"음료","Description": "청량음료, 커피, 홍차, 맥주"},{"CategoryID":2,"CategoryName":"조미료","Description":"감미료, 향신료, 양념, 스프레드"}], "Product":[{"ProductID":75,"ProductName":"알파인 맥주","CategoryID":1,"QuantityPerUnit":"24 - 0.5 l bottles","UnitPrice":24000.0000,"UnitsInStock":125},{"ProductID":39,"ProductName":"OK 바닐라 셰이크","CategoryID":1,"QuantityPerUnit":"750 cc per bottle","UnitPrice":28000.0000,"UnitsInStock":69},{"ProductID":34,"ProductName":"태일 라이트 맥주","CategoryID":1,"QuantityPerUnit": "24 - 12 oz bottles","UnitPrice":34000.0000,"UnitsInStock":111},{"ProductID":65,"ProductName":"루이지애나 특산 후추","CategoryID":2,"QuantityPerUnit":"32 - 8 oz bottles","UnitPrice":21000.0000,"UnitsInStock":76},{"ProductID":61,"ProductName":"사계절 핫 소스","CategoryID":2,"QuantityPerUnit":"24 - 500 ml bottles","UnitPrice":28000.0000,"UnitsInStock":92},{"ProductID":6,"ProductName":"대양 특선 블루베리 잼","CategoryID":2,"QuantityPerUnit": "12 - 8 oz jars","UnitPrice":25000.0000,"UnitsInStock":120}]};
	
	app.lookup("oz").drawReport({
		reportname: "/jsonsample.ozr",
		jsondata :json,
		displayname : "gg"
	});
}

/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	app.lookup("msm1").addRequestData("qq", [1,2,3,4,5,6,7]);
	app.lookup("msm1").send();
}
