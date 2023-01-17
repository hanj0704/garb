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
	"제지급" : "pay",
	"입금" : "dep"
}
var sizes = {
	"대" : 1200,
	"중" : 720,
	"소" : 480
}
/**
 * 
 * @param {String} str
 */
function rev(str){
	return str.replace(/[\s\)\(\[\]\/\,\_]/g, "");
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
	var time = moment().format("DD");
	console.log(time);
	app.lookup("ds1").getRowDataRanged().forEach(function(each){
		result.push(each.PAGE+"	"+objs[each.KIND]+time+each.NO+"	"+objs[each.KIND]+"	"+"app/"+objs[each.KIND]+"/"+rev(each.PAGE)+"	"+data+"	"+hasKeys(each.SIZE)+"	"+objs[each.KIND]);
	});
	
	console.log(result.join("\n"));
	function hasKeys (psParam){
		var vaKeys = Object.keys(sizes);
		if(vaKeys.indexOf(psParam) != -1){
			return sizes[psParam]
		} else {
			return 1200;
		}
	}
}
