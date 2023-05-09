/************************************************
 * menuModMaker.js
 * Created at 2023. 4. 19. 오전 11:03:50.
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
	"입금" : "dep",
	"VOC" : "voc"
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var time=  moment().format("MMDD");
	var idx = 0;
	
	var vaResult = [];
	app.lookup("ds1").getRowDataRanged().forEach(function(each){
	var target =objs[each.column1.toLowerCase()] != undefined ? objs[each.column1.toLowerCase()] :  each.column1.toLowerCase();
		var vsStr = "vaMenus.push(addMenu('"+each.column3+"','"+(target+time+idx)+"','"+target+"','app/"+target+"/"+each.column2+"','','1200','"+target+"'));"
		vaResult.push(vsStr);
		idx++;
	});
	
	console.log(vaResult.join("\n"));
	
}
