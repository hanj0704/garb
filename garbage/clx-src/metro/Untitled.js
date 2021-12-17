 /************************************************
 * Untitled.js
 * Created at 2021. 5. 3. 오후 5:09:22.
 *
 * @author JH
 ************************************************/


/*
 * 트리에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onTre1Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre1 = e.control;
	treeDrop(e);
}


/*
 * 트리에서 drop 이벤트 발생 시 호출.
 * 마우스로 소스 컨트롤을 드래그 중 타겟 컨트롤에 소스 컨트롤을 드롭할 때 발생하는 이벤트.
 */
function onTre2Drop(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var tre2 = e.control;
	treeDrop(e);
}



function treeDrop(/* cpr.events.CMouseEvent */  e){
	
	var data = JSON.parse(e.dataTransfer.getData("text"));

	/** 
	 * @type cpr.controls.Tree
	 */
	if (e.control.id != data.from.id) {
		
		var itemData = data.content[0] ;
	
		var rowData = {}  ;
		if ( app.lookup(data.from.id).getIndexByValue(itemData.value) > -1){
			var rowIndex = app.lookup(data.from.id).getDataSetIndexByValue(itemData.value);
			rowData =  app.lookup(data.from.id).dataSet.getRowData(rowIndex);
			
			var srcItem = app.lookup(data.from.id).getItemByValue(itemData.value);
			var srcPItem = srcItem.parentItem;
			var srcPVal = srcItem.parentValue;
			var srcChildren = srcItem.children;
			
			srcChildren.forEach(function(each){
				each.parentItem = srcPItem;
				each.parentValue = srcPVal; 
			});
			
			app.lookup(data.from.id).dataSet.deleteRow(rowIndex);
			//app.lookup(data.from.id).deleteItem(item);
		}
		
		var parentColumn = e.control.itemSetConfig.parentValue ; 
		
		if (e.targetObject.item && itemData.parentValue != e.targetObject.item.value){
			rowData[parentColumn] = e.targetObject.item.value; 
		} else {
			rowData[parentColumn] = ""; 
		}
			
		var test = _isRecursive(e.targetObject.item ,  itemData.value);
		if (test){
			rowData[parentColumn] = ""; 
		}
		
		e.control.dataSet.addRowData(rowData);

		/** 별개의 두 트리간 drag over 시 초기화 안되는것 같음 
		 * e.dataTransfer.clearData(); 없음
		 * e.dataTransfer = null ; 안됨.
		 */
//		if (app.lookup(data.from.id)._dataTransfer)
//			app.lookup(data.from.id)._dataTransfer = null ;
//		if (app.lookup(data.from.id).µQP)
//			app.lookup(data.from.id).µQP = null ;
			
		app.lookup(data.from.id).redraw();
		e.control.redraw();
		
		e.preventDefault();
	} 
	
	
	
	function _isRecursive(item, value){
		
		if (item) {
			if (item.parentValue == value)
				return true ;
			if (item.parentValue == "")
				return false ; 
			var pItem = item.parentItem;
			if (pItem) {
				return _isRecursive(pItem, value);     
			}
		}
		return false ;
		
	}
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;
	
}
