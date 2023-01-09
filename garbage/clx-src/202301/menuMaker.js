/************************************************
 * menuMaker.js
 * Created at 2023. 1. 5. 오후 4:25:54.
 *
 * @author HANS
 ************************************************/

var objs ={
	"공통" : "cmn",
	"변액" : "var",
	"클레임" : "clm",
	"신계약" : "nbs",
	"계약변경" : "pos",
	"제지급" : "pay"
}
//검진일/스캔일기준조회	nbs40	nbs	app/nbs/검진일스캔일기준조회	20220104	1200
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var result = [];
	var data = app.lookup("ipb1").value;
	app.lookup("ds1").getRowDataRanged().forEach(function(each){
		result.push(each.PAGE+"	"+objs[each.KIND]+each.NO+"	"+objs[each.KIND]+"	"+"app/"+objs[each.KIND]+"/"+each.PAGE+"	"+data+"	1200");
	});
	
	console.log(result.join("\n"));
}
