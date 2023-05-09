/************************************************
 * tester.js
 * Created at 2023. 4. 12. 오전 11:00:45.
 *
 * @author HANS
 ************************************************/
exports.test = function(a,b) {
	console.log(a);
	console.log(b);
	return "";
}
/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	let json = 
		     [
		        {
					"MyID": "A1",
					"MySOC": "40",
					"CHs": "2",
		            "CH_info":[
						{
							"CH_Number": "1",
							"OP_ID": "A17_1",
							"Role": "M",
							"OP_SOC": "30",
							"ER_ON": "T",
							"Voltage": "26",
							"Current": "2",
							"Power": "52"
						},
						{
							"CH_Number": "2",
							"OP_ID": "A3_1",
							"Role": "S",
							"OP_SOC": "90",
							"ER_ON": "F",
							"Voltage": "0",
							"Current": "0",
							"Power": "0"
						}
					]
		        },
		        {
		            "MyID": "A17",
					"MySOC": "30",
					"CHs": "1",
		            "CH_info":[
						{
							"CH_Number": "1",
							"OP_ID": "A1_1",
							"Role": "S",
							"OP_SOC": "40",
							"ER_ON": "F",
							"Voltage": "0",
							"Current": "0",
							"Power": "0"
						}
					]
		        },
		        {
		            "MyID": "A3",
					"MySOC": "90",
					"CHs": "1",
		            "CH_info":[
						{
							"CH_Number": "1",
							"OP_ID": "A1_2",
							"Role": "M",
							"OP_SOC": "40",
							"ER_ON": "T",
							"Voltage": "26",
							"Current": "3",
							"Power": "78"
						}
					]
		        }
		    ];
		    
		    json.forEach(function(each){
		    	if(each["MyID"] == "A1") {
		    		each["mySOC"] = "39";
		    	}
		    });
}
