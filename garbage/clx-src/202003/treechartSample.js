/************************************************
 * treechartSample.js
 * Created at 2020. 2. 21. 오전 10:18:48.
 *
 * @author HANS
 ************************************************/
var treeChart = null;
/**
 * 전달받은 데이터로 echart의 option을 생성하여 차트를 그리는 함수입니다.
 * @param {Object} poData 데이터객체
 */
function drawChart(poData){
	var option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series:[
        {
            type: 'tree',

            name: 'tree1',

            data: [poData],

            top: '5%',
            left: '7%',
            bottom: '2%',
            right: '60%',

            symbolSize: 7,

            label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
            },

            leaves: {
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            },

            expandAndCollapse: true,

            animationDuration: 550,
            animationDurationUpdate: 750

        }
    ]
};


	treeChart.setOption(option);
};


function resizeChart(){
	if(treeChart){
		treeChart.resize();
	}
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	var shellDiv = e.content;
	if(shellDiv){
		var instance = echarts.getInstanceByDom(shellDiv);
		if(instance){
			instance.dispose();
		}
	}
	if(!e.content){
		window.addEventListener("resize",function(){resizeChart()});
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	treeChart = echarts.init(e.content);
}

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("matrixsubmission1").send();
}


/*
 * 매트릭스 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onMatrixsubmission1SubmitSuccess(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.MatrixSubmission
	 */
	var matrixsubmission1 = e.control;
	
	var vsResponseText = matrixsubmission1.xhr.responseText;
	var voResponseJSON = JSON.parse(vsResponseText);

	drawChart(voResponseJSON);	
}
