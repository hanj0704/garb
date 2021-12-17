/************************************************
 * Embedded.js
 * Created at 2020. 5. 19. 오후 5:47:19.
 *
 * @author LHS_0212
 ************************************************/



/*
 * 데이터셋에서 insert 이벤트 발생 시 호출.
 * row가 추가되는 경우 발생하는 이벤트. 발생 메소드 : addRow, addRowData, insertRow, insertRowData
 */
function onDs1Insert(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	console.log("데이터 셋 Insert 이벤트 발생!");
}


/*
 * 데이터셋에서 delete 이벤트 발생 시 호출.
 * 로우가 삭제되는 경우 발생하는 이벤트. 발생 메소드 : deleteRow
 */
function onDs1Delete(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	console.log("데이터 셋 Delete 이벤트 발생!");
}


/*
 * 데이터셋에서 update 이벤트 발생 시 호출.
 * 데이터가 수정되는 경우 발생하는 이벤트. 발생 메소드 : setValue, updateRow
 */
function onDs1Update(/* cpr.events.CDataEvent */ e){
	/** 
	 * @type cpr.data.DataSet
	 */
	var ds1 = e.control;
	
	console.log("데이터 셋 Update 이벤트 발생!");
}
