/************************************************
 * maker.js
 * Created at 2023. 1. 12. 오후 5:53:06.
 *
 * @author HANS
 ************************************************/
var datas = [];
exports.test = function(q,w){
	
	if(datas.indexOf(rev(q)) == -1 && ValueUtil.fixNull(w) == "") {
		return true;
	} else {
		return false
	}
}
/**
 * 
 * @param {String} str
 */
function rev(str){
	return str.replace(/[ \)\(\[\]\/]/g, "");
}
/*
 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(e){
	var btn1 = e.control;
	//ux일정에 퍼블완료일정이 없거나, 퍼블이 완료되었는데 안되었다고 찍혀있는애.
	//column2가 빈값이거나, column1의 값이 column3에 포함되어있지 않고 컬럼2가 비어있는애
	datas = app.lookup("ds2").getColumnData("column3").map(function(each){
		return rev(each);
	});
	
	var ds = app.lookup("ds1");
	
	var allRow1 = ds.findAllRow("column2 == '' || @test(column1,column2)");
	var allRow2 = ds.findAllRow("column2==''").map(function(each){
		return each.getRowData();
	});
	var allRow3 = ds.findAllRow("@test(column1,column2)").map(function(each){
		return each.getRowData();
	});;
	var allRow4 = ds.findAllRow("column2 == '' && @test(column1,column2)");
	console.log(allRow1);
	console.log(allRow2);
	console.log(allRow3);
	console.log(allRow4);
	var finder = allRow4.map(function(each){
		return each.getValue("column1");
	});
	var result = [];
	allRow1.forEach(function(each){
		var q = finder.indexOf(each.getValue("column1"));
		if(q == -1) {
			result.push(each.getValue("column1"));
		}
	});
	console.log(result);
}

/*
 * "length" 버튼(btn2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn2Click(e){
	var btn2 = e.control;
	console.log(app.lookup("ds1").getRowCount());
	console.log(app.lookup("ds2").getRowCount());
	console.log(rev("가가 가 가가()[]/"));
}

/*
 * "Button" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e){
	var btn3 = e.control;
	var q = ['계약변경 관리대장', '계약변경 사용자별 처리현황', '계약변경내역조회', '납입면제계약 갱신여부 처리', '보증옵션', '부활계약처리현황', '실손중지청약서발행', '재발행증권내역조회', '증권재발행 신청', '채권형펀드및일반계정전환 조회', '처리 및 결재현황 모니터링', '특별입금', '기준가조회', '기준가업로드', '증권번호별신청및이체내역조회', '일자별이체정보조회', '대체보험료검증', '적립금변동내역', '매입좌수추이', '기간별수익률', '연도별수익률', '상위보유종목', '변액요금오더검증', '변액대상오더일별명세', '변액오더자동이체외일별명세', '변액오더자동이체외수금마감소급명세', '변액오더자동이체일별명세', '변액오더청약철회경과일별명세', '이미납입보험료히스토리', '변동보험금조회', 'ELS편입내역리포트', 'ELS편입내역', '쿠폰수익금수령내역', 'OrderReport예측조회', '변액이체대상조회', '기준가관리', 'CommonReport', 'FAX전송로그조회', 'FAX전자신청수신리스트', 'LP이미지검색', 'MAIL및SMS전송로그조회', 'NewForm', '메모전달', '메타코드관리', '문서코드관리', '미결아이템이동', '법인대용서류', '보안로그조회', '부재설정', '부재자관리', '시스템로그정보조회', '심사정보', '의견쓰기', '이미지수정(팝업)', '전자청약심사결재', '조회화면', '첨부문서', '프로세스관리']
	var w = q.join("\n");
	console.log(w);
}
