/************************************************
 * searcher.js
 * Created at 2022. 12. 2. 오후 3:05:53.
 *
 * @author HANS
 ************************************************/


/*
 * "찾기" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	var data = [{
			"순위": 1,
			"행정구역": "서울특별시",
			"지역": "수도권",
			"행정구분": "광역단체",
			"인구": 9741383,
			"남자": 4757643,
			"여자": 4984230,
			"성비": "95.5 : 100"
		},
		{
			"순위": 2,
			"행정구역": "부산광역시",
			"지역": "영남권",
			"행정구분": "광역단체",
			"인구": 3416918,
			"남자": 1680933,
			"여자": 1735985,
			"성비": "96.8 : 100"
		}
	]
}

/*
 * "tester" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	var q=  "ㄱ";
	console.log(q.charCodeAt(0));
	
	var begin = Math.floor((ch.charCodeAt(0) - offset) / 28) * 28 + offset;
	var end = begin + 27;
	var pattern = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
}

//44032를 먼저 뺸다. 가 를 0부터 시작한다고 가정
function ch2pattern(ch) {
  var offset = 44032; /* '가'의 코드 */
  // 한국어 음절
  if (/[가-힣]/.test(ch)) {
    var chCode = ch.charCodeAt(0) - offset;//44032 뺴기
    // 종성이 있으면 문자 그대로를 찾는다.
    if (chCode % 28 > 0) {
      return ch;
    }
    var begin = Math.floor(chCode / 28) * 28 + offset;//가~갛 까지 각 첫번째 자음 모음을 가져옴 
    var end = begin + 27; //가~갛 까지 찾음
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;//16비트화
  }
  // 한글 자음
  if (/[ㄱ-ㅎ]/.test(ch)) {//자음만 넘어왔다면?
    var con2syl = {
      'ㄱ': '가'.charCodeAt(0),
      'ㄲ': '까'.charCodeAt(0),
      'ㄴ': '나'.charCodeAt(0),
      'ㄷ': '다'.charCodeAt(0),
      'ㄸ': '따'.charCodeAt(0),
      'ㄹ': '라'.charCodeAt(0),
      'ㅁ': '마'.charCodeAt(0),
      'ㅂ': '바'.charCodeAt(0),
      'ㅃ': '빠'.charCodeAt(0),
      'ㅅ': '사'.charCodeAt(0),//자음으로 올 수 있는 요소에 대한 정보만 있긴함,ㅅ 이전의 대상들은 ㅂ과 ㅅ 사이에 초성으로 올 수 있는 ㅃ 외에 ㅄ등이 존재하기 때문에 밑에서
      						//식을 돌릴 때 순서대로 나오기 힘듦
    };
    							//ch에는 ㅆ부터 ㅎ 까지 순서대로 들어가 있음. ㅆ - ㅅ = 1이 되어서 사.charCodeAt(0)에 588 * 1을 더하면 싸가 되기 때문에
								//초성으로 들어갈 수 있는 20개의 문자 중에 ㅅ 이후로부터는 유니코드에서의 순서가 일치하는데, ㅅ 이전의 것들은 유니코드 문자 순서와
								//초성으로 들어갈 수 있는 자음의 순서가 일치하지 않음.그래서 ㅅ 전의 것들은 con2syl을 통해 해당 자음으로 시작하는 첫번쨰 글자를 
								//리턴받게 했고, ||가 들어가있어서 왼쪽 오른쪽 중에 큰 값이 들어가게됨
    var begin = con2syl[ch] || ( ( ch.charCodeAt(0) - 12613 /* 'ㅅ'의 코드 */ ) * 588 + con2syl['ㅅ'] );//가 부터
    var end = begin + 587;//깋 까지 588이 자음이 바뀌는 크기의 기준인데 587이면 자음이 바뀌기 이전, 동일한 자음을 사용하는 가장 마지막 글자임
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 그 외엔 그대로 내보냄
  // escapeRegExp는 lodash에서 가져옴
  
  return _.escapeRegExp(ch);
}
function createFuzzyMatcher(input) {
	
  var pattern = input.split('').map(ch2pattern).join('.*?');
  console.log(pattern);
  return new RegExp(pattern);
}

/*
 * "test2" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	console.log("zz");
	var tester = createFuzzyMatcher("ㄱㄹㄷ");
	console.log(tester);
	console.log(tester.test("슬라이드네비게이션"));
//createFuzzyMatcher('ㅋㅁㅅ').test('크리스'); // false
//createFuzzyMatcher('고라').test('골라'); // true
//createFuzzyMatcher('고라').test('가라'); // false
//createFuzzyMatcher('군ㄱㅁ').test('군고구마'); // true
//createFuzzyMatcher('군ㄱㅁ').test('궁고구마'); // false
}
