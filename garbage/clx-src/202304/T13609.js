
var isAllSelected = false;
/*
 * 콤보 박스에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onCmb1ItemClick(e){
	var cmb1 = e.control;
	
	if(e.item.value == "all"){
		if(isAllSelected){
			cmb1.style.item.unbindClass();
			isAllSelected = false;
		}else{
			cmb1.style.item.bindClass().toExpression("\"cl-checked\"");
			isAllSelected = true;
			cmb1.selectItems([]);
			cmb1.selectItem(e.item);
		}
	}else{
		if(isAllSelected){
			cmb1.style.item.unbindClass();
			isAllSelected = false;
			cmb1.selectItems([]);
			cmb1.selectItems(cmb1.getItems().filter(function(item){
				return item.value != e.item.value && item.value != "all";
			}));
		}
	}
}
