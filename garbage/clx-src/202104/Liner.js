/************************************************
 * Liner.js
 * Created at 2021. 4. 8. 오후 2:34:42.
 *
 * @author HANS
 ************************************************/
Array.prototype.division = function (n) {
        var arr = this;
        var len = arr.length;
        var cnt = Math.floor(len / n);
        console.log(cnt);
        var tmp = [];

        for (var i = 0; i < cnt; i++) {
            tmp.push(arr.splice(0, n));
        }

        return tmp;
}

function getClosest(){
	
	var line = app.lookup("img1").getItems()[0].coords.split(",").map(function(each){
		return Number(each);
	});
	
	var x = line[0];
	var y = line[1];
	
	var short = Number.MAX_VALUE;
	var closer = null;
/** @type cpr.controls.Container */
	var a = app.lookup("btnEnd").getParent();
	app.getContainer().getAllRecursiveChildren().filter(function(each){
		if(!(each instanceof cpr.controls.Image)){
			return true;
		}
	}).forEach(function(each){
		console.log(each.id);
		var distance = each.getActualRect().center;
		var width = Math.abs(x-distance.x),
			height = Math.abs(y-distance.y),
			lineLength = Math.sqrt(Math.pow(width,2)+Math.pow(height, 2));
			
			if(lineLength < short) {
				short = lineLength;
				closer = each;
			}
	});
	
	console.log(short);
	console.log(closer.id);
	app.lookup("img1").getItems()[0].aqq = "1323";
	
	console.log(app.lookup("img1").getItems()[0]);
}

/**
 * 
 * @param {String} startControl
 * @param {String} endControl
 * @param {String} coordi
 */
function whatsthebest(startControl,endControl,coordi){
	
	/** @type cpr.controls.UIControl */
	var vcStart = app.lookup(startControl);
	/** @type cpr.controls.UIControl */
	var vcEnd = app.lookup(endControl);
	
	var startRect = vcStart.getActualRect();
	var endRect =  vcEnd.getActualRect();
	
	
	var arrs = coordi.split(",").map(function(eachs){
				return Number(eachs);
			});;
	var divi = arrs.division(2);
	
	var vaStart = divi[0];
	var vaEnd = divi[1];
	
	var left1 = vaStart[0];
	var top1 = vaStart[1];
	
	var left2 = vaEnd[0];
	var top2 = vaEnd[1];
	
	//시작의 3단계: left거나, bottom이거나, right이거나
	//끝의 3단계: left거나, top이거나, right거나
	var leftt = [];
	leftt.push(Math.abs(startRect.left - left1));
	leftt.push(Math.abs(startRect.center.x - left1));
	leftt.push(Math.abs(startRect.right - left1));
	console.log(startRect.left - left1);
	console.log(leftt);
	
	var rightt = [];
	rightt.push(Math.abs(endRect.left - left2));
	rightt.push(Math.abs(endRect.center.x - left2));
	rightt.push(Math.abs(endRect.right - left2));
	console.log(rightt);
	
	return {
		start : leftt.indexOf(Math.min.apply(null, leftt)),
		end : rightt.indexOf(Math.min.apply(null, rightt))
	};

}

function drawFirst(){
	app.lookup("img1").getItems().forEach(function(dataRow){
		
	
//	vcDs.forEachOfUnfilteredRows(function(dataRow){
		
//		if(dataRow.getValue("shape")=="poly") {
		if(dataRow.shape=="poly"){
//			var coord = dataRow.getValue("coords");
			var coord = dataRow.coords;
//			var way = whatsthebest(dataRow.getValue("to"),dataRow.getValue("from"),dataRow.getValue("coords"));
			var splits = dataRow.label.split(",");
			console.log(dataRow.label);
			var way = whatsthebest(splits[1], splits[0], dataRow.coords);
			console.log(way);
			var arrs = coord.split(",").map(function(eachs){
				return Number(eachs);
			});;
			var q = arrs.division(2);
			var start = q[0];
			var end = q[1];
			
			var diffx =end[0] - start[0];
			var diffy =end[1] - start[1];
			
			var ceny = Math.round(diffy/2);
			var cenx = Math.round(diffx/3);
			
			var res = [q[0]];
			if(way.start != 1) {
				res.push([start[0]+cenx,start[1]]);
				res.push([start[0]+cenx,start[1]+ceny]);
				res.push([end[0],end[1]-ceny]);
				res.push(q[1]);
				for(var i=res.length-2;i >=0 ; i--) {
					res.push(res[i]);
				}
			} else if(way.start == 1) {
				if(way.end == 1) {
					
					res.push([start[0], start[1]+ceny]);
					res.push([start[0]+cenx,start[1]+ceny]);
					res.push([end[0],end[1]-ceny])
					res.push(q[1]);
					for(var i=res.length-2;i >=0 ; i--) {
						res.push(res[i]);
					}
				} else {
					res.push([start[0],end[1]]);
					res.push([end[0]-cenx , end[1]]);
					res.push(q[1]);
					for(var i = res.length-2; i>=0; i--) {
						res.push(res[i]);
					}
				}
			}
			
			var a = res.join(",");
			console.log(a);
			
//			dataRow.setValue("coords", a);
			dataRow.coords = a;
		}
	});
	
	
	app.lookup("img1").redraw();
}

/**
 * 
 * @param {cpr.controls.UIControl} pcStartControl
 * @param {cpr.controls.UIControl} pcEndControl
 */
function gwansang(pcStartControl,pcEndControl){
	
	var stC = pcStartControl;
	var edC = pcEndControl;
	
	var ac1 = stC.getActualRect();
	var ac2 = edC.getActualRect();
	
	if(ac1.center.x < ac1.center.x) {
		
	}
}

function drawSecond(){
	var htmlSni = new cpr.controls.HTMLSnippet();
	var btnStart = app.lookup("btnStart");
	var btnEnd = app.lookup("btnEnd");
	var ac1 = btnStart.getActualRect();
	var ac2 = btnEnd.getActualRect();
	var x = ac2.topCenter.x - ac1.centerRight.x;
	var y =  ac2.topCenter.y - ac1.centerRight.y;
	console.log(x);
	console.log(y);
	var arrs = [];
	arrs.push([ac1.centerRight.x-ac1.centerRight.x,ac1.centerRight.y-ac1.centerRight.y]);
	console.log(arrs);
	arrs.push([ac1.centerRight.x+x/3-ac1.centerRight.x,ac1.centerRight.y-ac1.centerRight.y]);
	arrs.push([ac1.centerRight.x+x/3-ac1.centerRight.x,ac2.topCenter.y-y/2-ac1.centerRight.y]);
	arrs.push([ac2.topCenter.x-ac1.centerRight.x,ac2.topCenter.y-y/2-ac1.centerRight.y]);
	arrs.push([ac2.topCenter.x-ac1.centerRight.x,ac2.topCenter.y-ac1.centerRight.y]);
	console.log(arrs.join(" "));
	htmlSni.value ='<svg height="'+y+'" width="'+x+'">'
	 + '<polyline points="'+arrs.join(" ")+'" style="fill:white;stroke:red;stroke-width:2"/>'
	  + '</svg>';
	  
	
	
	app.getContainer().addChild(htmlSni, {
		left : ac1.centerRight.x+"px",
		top : ac1.centerRight.y+"px",
		width : x+"px",
		height:y +"px"
	});
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
//	app.lookup("img1").getItems().forEach(function(each){
//		
//		var coord = each.coords;
//		console.log(coord);
//		coord = coord.split(",").map(function(eachq){
//			return Number(eachq);
//		});
//		var q = coord.division(2);
//		console.log(q);
//	});
	
getClosest();
}

