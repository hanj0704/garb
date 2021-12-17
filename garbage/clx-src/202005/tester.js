
////jQuery~~~
////			var aaa = $("#uuid-"+app.lookup("grd2").uuid);
////			var bbb = aaa.find(".cl-grid-row");
////			var c = bbb.toArray();
////			c.forEach(function(/*HTMLElement*/each){
////				console.log(each);	
//
///**
// * @param {Object} data
// * @return {cpr.controls.Container} group
// */
//function createDragSourceFeedback(data) {
//
//    //폼 레이아웃을 만들어놓는다.
//    var feedback = new cpr.controls.layouts.FormLayout();
//    feedback.horizontalSpacing = "5px";
//    feedback.verticalSpacing = "0px";
//    feedback.setColumns(["1fr", "1fr", "1fr", "1fr", "1fr"]);
//    feedback.setRows(["40px", "40px"]);
//    feedback.setColumnAutoSizing(1, true);
//    var group = new cpr.controls.Container();
//    group.setLayout(feedback);
//
//    group.style.css({
//        "opacity": "0.95",
//        "background": "#fff",
//        "border": "1px solid black"
//    });
//
//    //이미지
//    var vcImage = new cpr.controls.Image();
//    vcImage.src = data["Thumbnail"];
//
//    group.addChild(vcImage, {
//        "colIndex": 0,
//        "rowIndex": 0,
//        "colSpan": 1,
//        "rowSpan": 2
//    });
//
//    //콘텐츠 명
//    var vcContentsName = new cpr.controls.Output();
//    vcContentsName.value = data["mtrlNm"];
//
//    group.addChild(vcContentsName, {
//        "colIndex": 1,
//        "rowIndex": 0,
//        "colSpan": 4,
//        "rowSpan": 1
//    });
//
//    //콘텐츠ID
//    var vcContentsID = new cpr.controls.Output();
//    vcContentsID.ellipsis = true;
//    vcContentsID.value = data["mtrlId"];
//    group.addChild(vcContentsID, {
//        "colIndex": 1,
//        "rowIndex": 1
//    });
//
//    //플레이 시간
//    var vcDuration = new cpr.controls.Output();
//    vcDuration.dataType = "date";
//    vcDuration.dateValueFormat = "HHmmssSSS";
//    vcDuration.format = "HH:mm:ss:SS";
//    vcDuration.value = data["playRun"];
//    group.addChild(vcDuration, {
//        "colIndex": 2,
//        "rowIndex": 1
//    });
//
//    //제작일시
//    var vcImageQuality = new cpr.controls.Output();
//    vcImageQuality.dataType = "date";
//    vcImageQuality.dateValueFormat = "YYYYMMDD";
//    vcImageQuality.format = "YYYY-MM-DD";
//    vcImageQuality.value = data["playYmd"];
//    group.addChild(vcImageQuality, {
//        "colIndex": 3,
//        "rowIndex": 1
//    });
//
//    return group;
//}
//
///*
// * Body에서 load 이벤트 발생 시 호출.
// * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
// */
//function onBodyLoad( /* cpr.events.CEvent */ e) {
//    //	var ab= e.control;
//
//    var a = moment("20200518");
//    var b = moment("20200514");
//
//    var c = moment.duration(a.diff(b)).asDays();
//
//
//}
//
//
///*
// * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn1Click( /* cpr.events.CMouseEvent */ e) {
//    /** 
//     * @type cpr.controls.Button
//     */
//    var btn1 = e.control;
//
//
//    //	var allRow = app.lookup("grd1").findAllRow();
//    //	
//    //	var a = app.lookup("grd1").getRow(0);
//    //	
//    //	console.log(allRow);
//    ////	allRow.forEach(function(each){
//    ////		
//    ////		console.log(each.getValue("column2")-a.getValue("column2"));
//    ////		a = each;
//    ////		
//    ////	});	
//    //	console.log(app.lookup("grd1").getRow(0).getRowData().column1);
//    //	var a = [1,2,3,45];
//    //	console.log(a.shift());
//    //	var q = app.lookup("grd1").findAllRow("getStateString() =='I'");
//    //	console.log(q);
//
//    var a = app.lookup("grd1").findAllRow("getIndex() > 0");
//    console.log(a);
//}
//
//
///*
// * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn2Click( /* cpr.events.CMouseEvent */ e) {
//    /** 
//     * @type cpr.controls.Button
//     */
//    var btn2 = e.control;
//
//    //  app.lookup("grd1").insertRowData(0ee);
//}
//
//
///*
// * 데이터셋에서 update 이벤트 발생 시 호출.
// * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue, updateRow
// */
//function onDsPlanUpdate( /* cpr.events.CDataEvent */ e) {
//    /** 
//     * @type cpr.data.DataSet
//     */
//    var dsPlan = e.control;
//
//
//    e.row.setValue("sortSEQ", e.row.getIndex())
//}
//
//
///*
// * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn3Click( /* cpr.events.CMouseEvent */ e) {
//    /** 
//     * @type cpr.controls.Button
//     */
//    var btn3 = e.control;
//
//    console.log(app.lookup("dsPlan").getRowDataRanged(0, 1));
//
//}
//
//
///*
// * "Button" 버튼(btn4)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn4Click( /* cpr.events.CMouseEvent */ e) {
//    /** 
//     * @type cpr.controls.Button
//     */
//    var btn4 = e.control;
//
//    var a = 5;
//
//    if (a > 2) {
//        console.log("ㅁㅁ");
//    } else if (a > 3) {
//        console.log("ff");
//    }
//
//}
//
//
///*
// * "Button" 버튼(btn6)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn6Click( /* cpr.events.CMouseEvent */ e) {
//    /** 
//     * @type cpr.controls.Button
//     */
//    var btn6 = e.control;
//
//    //	console.log(calBroadEndTime("02", "06", "57", "10", "00", "02", "09", "29"))
//    hansTest("02090929", "00010500");
//}
//
///**
// * 
// * @param {String} ps1
// * @param {String} ps2
// */
//function hansTest(ps1, ps2) {
//    var str1 = Number(ps1.substring(0, 2));
//    var str2 = Number(ps1.substring(2, 4)) + (str1 * 60);
//    var str3 = Number(ps1.substring(4, 6));
//    var str4 = Number(ps1.substring(6, 8));
//
//    var str5 = Number(ps2.substring(0, 2));
//    var str6 = Number(ps2.substring(2, 4)) + (str5 * 60);
//    var str7 = Number(ps2.substring(4, 6));
//    var str8 = Number(ps2.substring(6, 8));
//
//    var ical1 = str2 * 1800 + str2 / 10 * 2 + str3 * 30 + str4 + 1;
//    var ical2 = str6 * 1800 + str6 / 10 * 2 + str7 * 30 + str8 + 1;
//    console.log("ical1: " + ical1);
//    console.log("ical2 : " + ical2);
//    var ical = ical1 + ical2 - 1;
//    var im = ical / 1800;
//
//    var rev = im / 10 * 2;
//    console.log(ical % 1800);
//    ical = ical % 1800 - rev - 1;
//    console.log(rev - 1);
//
//    console.log(ical.toFixed(0));
//
//    var res1 = (im / 60).toFixed(0);
//    var res2 = (im % 60).toFixed(0);
//    var res3 = (ical / 30) / 1;
//    var res4 = (ical % 30).toFixed(0);
//    res3 = res3 - res3 % 1;
//
//    console.log(han1(res1.toString()) + han1(res2.toString()) + han1(res3.toString()) + han1(res4.toString()));
//
//}
//
//function han1(ps1) {
//
//    var a = "";
//    for (var i = ps1.length; i < 2; i++) {
//
//        a += "0";
//    };
//    return a + ps1;
//}
//
//function calBroadEndTime(psBroadHour, psBroadMin, psBroadSec, psBroadFrm, psBroadRunHour, psBroadRunMin, psBroadRunSec, psBroadRunFrm) {
//    var vnBroadHour = Number(psBroadHour) + Number(psBroadRunHour); // 12:30:40:20
//    var vnBroadMin = Number(psBroadMin) + Number(psBroadRunMin); // 4:40:30:20
//    var vnBroadSec = Number(psBroadSec) + Number(psBroadRunSec); // 17:11:11:10
//    var vnBroadFrm = Number(psBroadFrm) + Number(psBroadRunFrm);
//    vnBroadHour = vnBroadHour + Math.floor(vnBroadMin / 60);
//    vnBroadMin = (vnBroadMin % 60) + Math.floor(vnBroadSec / 60);
//    vnBroadSec = (vnBroadSec % 60) + Math.floor(vnBroadFrm / 30);
//    vnBroadFrm = (vnBroadFrm % 30);
//
//    var vsResult = "";
//    if (vnBroadHour < 10) {
//        vsResult += "0" + vnBroadHour;
//    } else {
//        vsResult += String(vnBroadHour);
//    }
//    if (vnBroadMin < 10) {
//        vsResult += "0" + vnBroadMin;
//    } else {
//        vsResult += String(vnBroadMin);
//    }
//    if (vnBroadSec < 10) {
//        vsResult += "0" + vnBroadSec;
//    } else {
//        vsResult += String(vnBroadSec);
//    }
//    if (vnBroadFrm < 10) {
//        vsResult += "0" + vnBroadFrm;
//    } else {
//        vsResult += String(vnBroadFrm);
//    }
//
//    return vsResult;
//}
//
///*
// * "Button" 버튼(btn7)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn7Click( /* cpr.events.CMouseEvent */ e) {
//    /** 
//     * @type cpr.controls.Button
//     */
//    var btn7 = e.control;
//
//    app.lookup("sms2").send();
//
//    //	var buttons = new cpr.controls.Button();
//    //	
//    //	app.getContainer().floatControl(buttons,{
//    //		"top" : "100px",
//    //		"left" : "calc(50%)",
//    //		"width" :"100px",
//    //		"height" : "30px"
//    //	});
//}
//
///*
// * "Button" 버튼(btn5)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn5Click( /* cpr.events.CMouseEvent */ e) {
//    /** 
//     * @type cpr.controls.Button
//     */
//    var btn5 = e.control;
//    //	app.lookup("grd1").insert
//    //	console.log(app.lookup("cbx1").checked);
//    //	app.lookup("ipb4").putValue("asdasdadsadasd");
//    app.lookup("ipb4").value = "감a놔b라";
//
//    //	app.lookup("ipb4").
//
//}
//
//
///*
// * "Button" 버튼(btn8)에서 click 이벤트 발생 시 호출.
// * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
// */
//function onBtn8Click( /* cpr.events.CMouseEvent */ e) {
//    /** 
//     * @type cpr.controls.Button
//     */
//    var btn8 = e.control;
//
//    app.lookup("btn10").value = "asd";
//}




/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("mdi1").setSelectedTabItem(app.lookup("mdi1").getTabItems()[0]);
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	app.lookup("mdi1").hideHeader = true;
}


/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn2 = e.control;
	
	app.getContainer().updateConstraint(app.lookup("grp2"), {
		"top" : "30px"
	});
}


/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click3(/* cpr.events.CMouseEvent */ e){
	
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var a = app.lookup("grd1").getExportData({
		exceptStyle : true,
		applyFormat : true
	});
	console.log(a);
	
}
