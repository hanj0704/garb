/************************************************
 * moduleName.module.js
 * Created at 2022. 11. 29. 오후 2:02:45.
 *
 * @author HANS
 ************************************************/
function abc(){
	alert("안녕하세요");
	return true;
}
cpr.core.AppConfig.INSTANCE.setEnvValue("appcache", true);


//case1. exports 예약어 사용하기, -> 화면에서 require 예약어를 통해 모듈을 읽고, 해당 모듈 내에 exports로 선언된 함수들을 호출할 수 있음.
//장점 : 화면에 종속적인 정보나, 함수를 제어하기 쉬움.
//단점 : 모듈을읽어와야함
exports.funcName = abc;

exports.funcName2 = function(){
	return "HELLO";
}


//case2. globals 예약어 사용하기, -> 화면에서 별도로 모듈을 읽어오지 않더라고 호출할 수 있는 함수 선언 방법
//장점 : window객체에 정의되기 때문에 어디서든 제약없이 사용 가능
//단점 : 어느곳에서든 호출할 수 있기 때문에, 특정 데이터를 담거나 화면에 종속적인 기능을 사용하면 안됨.
globals.globFuncName = abc;


//case3. 객체의 prototype 속성을 사용하여 해당 함수를 생성자로 활용하여 객체를 생성했을 때 할당받는 속성 몇 함수 지정

function testFunc(param1) {
	
	this._innerProp = param1;
}

testFunc.prototype.propName = "1";


testFunc.prototype.innerFunc = function(){
	
};

var newMans = new testFunc();

newMans.propName;
newMans.innerFunc();

globals.createTestFunc = function(param1){
	return new testFunc(param1);
}
