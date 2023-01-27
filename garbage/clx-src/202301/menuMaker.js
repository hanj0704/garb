/************************************************
 * menuMaker.js
 * Created at 2023. 1. 5. 오후 4:25:54.
 *
 * @author HANS
 ************************************************/
var util = createCommonUtil();
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
	"소" : 480,
	"L" : 1600,
	"XL" : 1920
}
/**
 * 
 * @param {String} str
 */
function rev(str){
	return str.replace(/[\s\)\(\[\]\/\,\_]/g, "");
}
var index =0;
//검진일/스캔일기준조회	nbs40	nbs	app/nbs/검진일스캔일기준조회	20220104	1200
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var result = [];
	var v2result = [];
	var data = app.lookup("ipb1").value;
	var time = moment().format("DD");
	var dsMn = app.lookup("dsMn");
	console.log(time);
	app.lookup("ds1").getRowDataRanged().forEach(function(each){
		if(each.PAGE.indexOf("_V2") == -1) {
			//일반 페이지
			var no = each.NO;
			if(no == ""){
				no = ++index;
			}
			result.push(each.PAGE+"	"+objs[each.KIND]+time+no+"	"+objs[each.KIND]+"	"+"app/"+objs[each.KIND]+"/"+rev(each.PAGE)+"	"+data+"	"+hasKeys(each.SIZE)+"	"+objs[each.KIND]);
		} else {
			console.log(each.PAGE);
			var vsPage = each.PAGE.replace("_V2", "");
			var row = dsMn.findFirstRow("label =='"+vsPage+"'");
			if(ValueUtil.fixNull(row)==""){
				console.log("문제 발생");
			} else {
				
				v2result.push("(V2)"+vsPage+"	"+row.getValue("value") +"	"+objs[each.KIND]+"	"+row.getValue("appId")+"_V2"+"	"+data + "	"+hasKeys(each.SIZE)+"	"+ " "+"	"+row.getValue("value")+"	"+ "1");
				v2result.push("(V1)"+vsPage+"	"+row.getValue("value") +"	"+objs[each.KIND]+"	"+row.getValue("appId")+"	"+data + "	"+hasKeys(each.SIZE)+"	"+ " "+"	"+row.getValue("value")+"	"+ "2");
			}
		}
	});
	
	console.log(result.join("\n"));
	console.log("\n");
	console.log(v2result.join("\n"));
	function hasKeys (psParam){
		var vaKeys = Object.keys(sizes);
		if(vaKeys.indexOf(psParam) != -1){
			return sizes[psParam]
		} else {
			return 1200;
		}
	}
}
