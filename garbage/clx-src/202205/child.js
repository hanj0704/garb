/************************************************
 * Untitled.js
 * Created at 2022. 5. 6. 오전 11:23:49.
 *
 * @author HANS
 ************************************************/

var util = createCommonUtil();


var datas = [
    {
        "column1": "1",
        "column2": "ab"
    },
    {
        "column1": "2",
        "column2": "ab"
    },
    {
        "column1": "3",
        "column2": "ab"
    },
    {
        "column1": "4",
        "column2": "ab"
    },
    {
        "column1": "5",
        "column2": "ab"
    },
    {
        "column1": "6",
        "column2": "ab"
    },
    {
        "column1": "7",
        "column2": "ab"
    },
    {
        "column1": "8",
        "column2": "ab"
    },
    {
        "column1": "9",
        "column2": "ab"
    },
    {
        "column1": "10",
        "column2": "ab"
    },
    {
        "column1": "11",
        "column2": "ab"
    },
    {
        "column1": "12",
        "column2": "ab"
    },
    {
        "column1": "13",
        "column2": "ab"
    },
    {
        "column1": "14",
        "column2": "ab"
    },
    {
        "column1": "15",
        "column2": "ab"
    },
    {
        "column1": "16",
        "column2": "ab"
    }
];

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad3(e){

}

/*
 * "data build" 버튼(btn7)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn7Click(e){
	var btn7 = e.control;
	app.lookup("dsList").build(datas);
}
