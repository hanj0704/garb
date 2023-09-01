/************************************************
 * testMod.module.js
 * Created at 2023. 8. 7. 오전 10:10:07.
 *
 * @author HANS
 ************************************************/

var cmn = {
	
	test1 : function(){
		
	},
	test2 : function(){
		
	}
}

globals.test1 = cmn.test1;
globals.test2 = cmn.test2;


//globals 심볼 써서 등록하려는 함수가 루트 스코프에 선언된 함수가 아닌 객체의 프로퍼티로 선언된 함수를 가져다 선언할 때에도 문제가 발생하는 것 같습니다. globals 심볼의 기여 방법이나 스코프 변경에 따라서 다음의 패턴도 동일하게 문제가 해소될 수 있는지 문의드립니다.예시 공통모듈:var cmn = {test1 : function(){
