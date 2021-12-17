/************************************************
 * tester.js
 * Created at 2020. 3. 2. 오후 4:31:38.
 *
 * @author HANS
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
}

/*
 * 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click2( /* cpr.events.CMouseEvent */ e) {
//	/** 
//	 * @type cpr.controls.Button
//	 */
//	var btn1 = e.control;
	var vcGrid = app.lookup("grd1");
	var dsList1 = app.lookup("dsList");

	var size = Object.keys(objs).length - 1;

	var vaCtrls = app.getContainer().getAllRecursiveChildren().filter(function(each) {
		return each.getBindInfo("value") === undefined ;
	})
	vaCtrls.forEach(function(each, idx) {
		var voObj = langJs.dsList.filter(function(obj) {
			if (obj.key == Number(each.value)) {
				each.value = obj.value;
			};
		});

	});

	var vaHeaderText = [];

	var vnColCount = vcGrid.columnCount;

	for (var i = 0; i < vnColCount; i++) {

		var voObj2 = langJs.dsList.filter(function(obj) {
			var voColumn = vcGrid.header.getColumn(i)
			if (obj.key == Number(voColumn.getText())) {
				voColumn.setText(obj.value);
			}
		})
	}
//	app.getContainer().redraw();
}
function ChangeChangeChange(){
	
	var vcGrid = app.lookup("grd1");
	var size = Object.keys(objs).length - 1;

	var vaCtrls = app.getContainer().getAllRecursiveChildren().filter(function(each) {
		return each.getBindInfo("value") === undefined ;
	});
	
	vaCtrls.forEach(function(each, idx) {

		each.value = cpr.I18N.INSTANCE.message(each.value);		
		
	});

	var vaHeaderText = [];
	var vnColCount = vcGrid.columnCount;

	for (var i = 0; i < vnColCount; i++) {

			var voColumn = vcGrid.header.getColumn(i);
			voColumn.setText(cpr.I18N.INSTANCE.message(voColumn.getText()));
	}
}

function localeChangeWithObj(){
	
	var vcGrid = app.lookup("grd1");
	var size = Object.keys(objs).length - 1;

	var vaCtrls = app.getContainer().getAllRecursiveChildren().filter(function(each) {
		return each.getBindInfo("value") === undefined ;
	});
	var localeData = cpr.I18N.INSTANCE.getLocaleData();
	
	vaCtrls.forEach(function(each, idx) {

		each.value = localeData[each.value];		
		
	});

	var vnColCount = vcGrid.columnCount;

	for (var i = 0; i < vnColCount; i++) {

			var voColumn = vcGrid.header.getColumn(i);
			voColumn.setText(localeData[voColumn.getText()]);
	}
}
/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms4SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sms4 = e.control;
	console.log("이게먼저이길바라");
//	onBtn1Click2();
}


/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit2(/* cpr.events.CEvent */ e){
//	app.lookup("sms4").send();
//onBtn1Click2();
//ChangeChangeChange();
//localeChangeWithObj();
}

