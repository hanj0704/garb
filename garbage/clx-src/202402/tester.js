/************************************************
 * tester.js
 * Created at 2024. 2. 7. 오후 5:06:17.
 *
 * @author HANS
 ************************************************/

/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	app.lookup("sms1").send();
	console.log(app.lookup("sms1").responseType);
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSms1SubmitSuccess(e){
	var sms1 = e.control;
	
	console.log(sms1.responseType);
}

let jsons = {
   "posts": [
      {
         "ID": "49",
         "Last_Call": "2023-11-09 12:23:26",
         "Voltage": 25.408,
         "Current": 0.246,
         "Power": 6.25,
         "sub1": [
            {
               "ID": "1",
               "Last_Call": "2023-11-09 12:23:26",
               "Voltage": 25.408,
               "Current": 0.246,
               "Power": 6.25,
               "sub2": [
                  {
                     "ID": "2",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 25.408,
                     "Current": 0.246,
                     "Power": 6.25,
                     "sub3": [
                        {
                           "ID": "3",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25,
                           "sub4": [
                              {
                                 "ID": "4",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 25.408,
                                 "Current": 0.246,
                                 "Power": 6.25,
                                 "sub5": [
                                    {
                                       "ID": "5",
                                       "Last_Call": "2023-11-09 12:23:26",
                                       "Voltage": 25.408,
                                       "Current": 0.246,
                                       "Power": 6.25
                                    }
                                 ]
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "ID": "6",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 25.408,
                     "Current": 0.246,
                     "Power": 6.25,
                     "sub3": [
                        {
                           "ID": "7",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25,
                           "sub4": [
                              {
                                 "ID": "8",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 25.408,
                                 "Current": 0.246,
                                 "Power": 6.25
                              }
                           ]
                        }
                     ]
                  }
               ]
            },
            {
               "ID": "9",
               "Last_Call": "2023-11-09 12:23:26",
               "Voltage": 25.408,
               "Current": 0.246,
               "Power": 6.25,
               "sub2": [
                  {
                     "ID": "10",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 25.408,
                     "Current": 0.246,
                     "Power": 6.25,
                     "sub3": [
                        {
                           "ID": "11",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25,
                           "sub4": [
                              {
                                 "ID": "12",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 25.408,
                                 "Current": 0.246,
                                 "Power": 6.25
                              }
                           ]
                        },
                        {
                           "ID": "13",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25,
                           "sub4": [
                              {
                                 "ID": "14",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 25.408,
                                 "Current": 0.246,
                                 "Power": 6.25
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "ID": "15",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 25.408,
                     "Current": 0.246,
                     "Power": 6.25,
                     "sub3": [
                        {
                           "ID": "16",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25
                        }
                     ]
                  }
               ]
            }
         ]
      },
      {
         "ID": "50",
         "Last_Call": "2023-11-09 12:23:26",
         "Voltage": 24.197,
         "Current": 1.341,
         "Power": 26.084,
         "sub1": [
            {
               "ID": "17",
               "Last_Call": "2023-11-09 12:23:26",
               "Voltage": 25.408,
               "Current": 0.246,
               "Power": 6.25,
               "sub2": [
                  {
                     "ID": "18",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 25.408,
                     "Current": 0.246,
                     "Power": 6.25,
                     "sub3": [
                        {
                           "ID": "19",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25,
                           "sub4": [
                              {
                                 "ID": "20",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 25.408,
                                 "Current": 0.246,
                                 "Power": 6.25
                              }
                           ]
                        },
                        {
                           "ID": "21",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25
                        }
                     ]
                  },
                  {
                     "ID": "22",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 25.408,
                     "Current": 0.246,
                     "Power": 6.25,
                     "sub3": [
                        {
                           "ID": "23",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25
                        },
                        {
                           "ID": "24",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25
                        }
                     ]
                  }
               ]
            },
            {
               "ID": "25",
               "Last_Call": "2023-11-09 12:23:26",
               "Voltage": 25.408,
               "Current": 0.246,
               "Power": 6.25,
               "sub2": [
                  {
                     "ID": "26",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 25.408,
                     "Current": 0.246,
                     "Power": 6.25,
                     "sub3": [
                        {
                           "ID": "27",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25,
                           "sub4": [
                              {
                                 "ID": "28",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 25.408,
                                 "Current": 0.246,
                                 "Power": 6.25
                              }
                           ]
                        },
                        {
                           "ID": "29",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 25.408,
                           "Current": 0.246,
                           "Power": 6.25,
                           "sub4": [
                              {
                                 "ID": "30",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 25.408,
                                 "Current": 0.246,
                                 "Power": 6.25
                              },
                              {
                                 "ID": "31",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 25.408,
                                 "Current": 0.246,
                                 "Power": 6.25,
                                 "sub5": [
                                    {
                                       "ID": "32",
                                       "Last_Call": "2023-11-09 12:23:26",
                                       "Voltage": 25.408,
                                       "Current": 0.246,
                                       "Power": 6.25
                                    }
                                 ]
                              }
                           ]
                        }
                     ]
                  }
               ]
            }
         ]
      },
      {
         "ID": "51",
         "Last_Call": "2023-11-09 12:23:26",
         "Voltage": 27.097,
         "Current": 1.241,
         "Power": 26.084,
         "sub1": [
            {
               "ID": "33",
               "Last_Call": "2023-11-09 12:23:26",
               "Voltage": 27.097,
               "Current": 1.241,
               "Power": 26.084,
               "sub2": [
                  {
                     "ID": "34",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 27.097,
                     "Current": 1.241,
                     "Power": 26.084,
                     "sub3": [
                        {
                           "ID": "35",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 27.097,
                           "Current": 1.241,
                           "Power": 26.084,
                           "sub4": [
                              {
                                 "ID": "36",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 27.097,
                                 "Current": 1.241,
                                 "Power": 26.084,
                                 "sub5": [
                                    {
                                       "ID": "37",
                                       "Last_Call": "2023-11-09 12:23:26",
                                       "Voltage": 27.097,
                                       "Current": 1.241,
                                       "Power": 26.084
                                    }
                                 ]
                              },
                              {
                                 "ID": "38",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 27.097,
                                 "Current": 1.241,
                                 "Power": 26.084,
                                 "sub5": [
                                    {
                                       "ID": "39",
                                       "Last_Call": "2023-11-09 12:23:26",
                                       "Voltage": 27.097,
                                       "Current": 1.241,
                                       "Power": 26.084,
                                       "sub6": [
                                          {
                                             "ID": "40",
                                             "Last_Call": "2023-11-09 12:23:26",
                                             "Voltage": 27.097,
                                             "Current": 1.241,
                                             "Power": 26.084
                                          }
                                       ]
                                    }
                                 ]
                              }
                           ]
                        }
                     ]
                  }
               ]
            },
            {
               "ID": "41",
               "Last_Call": "2023-11-09 12:23:26",
               "Voltage": 27.097,
               "Current": 1.241,
               "Power": 26.084,
               "sub2": [
                  {
                     "ID": "42",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 27.097,
                     "Current": 1.241,
                     "Power": 26.084,
                     "sub3": [
                        {
                           "ID": "43",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 27.097,
                           "Current": 1.241,
                           "Power": 26.084
                        }
                     ]
                  },
                  {
                     "ID": "44",
                     "Last_Call": "2023-11-09 12:23:26",
                     "Voltage": 27.097,
                     "Current": 1.241,
                     "Power": 26.084,
                     "sub3": [
                        {
                           "ID": "45",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 27.097,
                           "Current": 1.241,
                           "Power": 26.084
                        },
                        {
                           "ID": "46",
                           "Last_Call": "2023-11-09 12:23:26",
                           "Voltage": 27.097,
                           "Current": 1.241,
                           "Power": 26.084,
                           "sub4": [
                              {
                                 "ID": "47",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 27.097,
                                 "Current": 1.241,
                                 "Power": 26.084
                              },
                              {
                                 "ID": "48",
                                 "Last_Call": "2023-11-09 12:23:26",
                                 "Voltage": 27.097,
                                 "Current": 1.241,
                                 "Power": 26.084
                              }
                           ]
                        }
                     ]
                  }
               ]
            }
         ]
      }
   ]
}

/**
 * 
 * @param {Array} arr
 * @param {String} keyId
 */
function findIndex(arr,keyId) {	
	
	
	let result = null;
	
	let finder = function(arr,keyId){
		for(var i = 0; i < arr.length; i++) {
		var obj = arr[i];
		
		if(obj["ID"] == keyId) {
			result = obj;
			return result;
		} else {
			/** @type Array */
			let arrs = Object.keys(obj);
		let target =arrs.find(function(ele){
			let expr = /(sub)(\d)/g;
			return expr.test(ele)
		});
		if(target){
			
		  finder(obj[target],keyId);
		}
		}
	}
	}
	finder(arr,keyId);
	
	return result;
}
Array.prototype.toString = function() {
	return JSON.stringify(this);
}
/*
 * "Button" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	
	var q = findIndex(jsons.posts, app.lookup("ipb1").value);
	console.log(JSON.stringify(q));
	q.Voltage = "123";
	
	console.log(jsons);
	
//	let r=  [1,2,3,4];
//	
//	let q= r.some(function(each){
//		return each > 3;
//	});
//	console.log(q);
}
