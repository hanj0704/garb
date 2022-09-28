/************************************************
 * parent.js
 * Created at 2022. 7. 6. 오전 10:56:50.
 *
 * @author HANS
 ************************************************/

/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */
function onSearchInputSearch(e){
	var searchInput = e.control;
	app.openDialog("202206/popup", {width : 800, height : 500},function(dialog){
		dialog.ready(function(aps){
			var voEmbedApp = dialog.getEmbeddedAppInstance();
			var vcFirstCtrl = voEmbedApp.getFirstFocusTraversableControl();
			if(vcFirstCtrl) {
				vcFirstCtrl.focus();
			} else {
				dialog.focus();
			}
			
		})
	});
}
