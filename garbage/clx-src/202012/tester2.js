/************************************************
 * tester2.js
 * Created at 2020. 12. 30. 오전 10:47:52.
 *
 * @author HANS
 ************************************************/


String.prototype.replaceAll = function(org,dest) {
	return this.split(org).join(dest);
}
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	
	var a = "가나다라마\r\n바사아자\r차카타파하\n오우ㅋㅋㅋㅋ\n\r";
	
	var b = a.replace(/(\r\n|\n\r|\r|\n)/g,"<br>");
	console.log(b);
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
	
	
	var vcGrid = app.lookup("grd1");
//	for(var i= 0;i<vcGrid.columnCount;i++){
//		
//	var a= vcGrid.header.getColumnByColIndex(i,2);
//	a.forEach(function(each){
//		console.log(each.text);
//	});
//	}
	
	var vnColCount = vcGrid.columnCount;	
 // or  vnColCount = vcGrid.detail.cellCount;
 
	for(var i = 0 ; i < vnColCount ;i++){
		
		var headC = vcGrid.getHeaderCellIndices(i);
			if(headC.length > 0){
				console.log(headC);
				headC.forEach(function(each){
					
					console.log(vcGrid.header.getColumn(each).text);
				});
			}
	}
	
}


/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn3 = e.control;
	
	app.lookup("grd1").header.getColumnByColIndex(1, 1).forEach(function(each){
		console.log(each.text);
	});;
}
