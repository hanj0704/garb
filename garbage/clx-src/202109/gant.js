/************************************************
 * gant.js
 * Created at 2021. 9. 24. 오후 2:45:58.
 *
 * @author HANS
 ************************************************/



/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	var g = new JSGantt.GanttChart(e.content, 'day');

g.setOptions({
  vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,     
  vQuarterColWidth: 36,
  vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
  vDayMajorDateDisplayFormat: 'mon yyyy - Week ww',// Set format to dates in the "Major" header of the "Day" view
  vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
  vLang: 'en',
  vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
  vShowEndWeekDate: 0,  // Show/Hide the date for the last day of the week in header for daily
  vAdditionalHeaders: { // Add data columns to your table
      category: {
        title: 'Category'
      },
      sector: {
        title: 'Sector'
      }
    },
  vUseSingleCell: 10000, // Set the threshold cell per table row (Helps performance for large data.
  vFormatArr: ['Day', 'Week', 'Month', 'Quarter'], // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers,
  
});

// Load from a Json url
JSGantt.parseJSON('./202109/data.json', g);

// Or Adding  Manually
//g.AddTaskItemObject({
//  pID: 1,
//  pName: "Define Chart <strong>API</strong>",
//  pStart: "2017-02-25",
//  pEnd: "2017-03-17",
//  pPlanStart: "2017-04-01",
//  pPlanEnd: "2017-04-15 12:00",
//  pClass: "ggroupblack",
//  pLink: "",
//  pMile: 0,
//  pRes: "Brian",
//  pComp: 0,
//  pGroup: 0,
//  pParent: 0,
//  pOpen: 1,
//  pDepend: "",
//  pCaption: "",
//  pCost: 1000,
//  pNotes: "Some Notes text",
//  category: "My Category",
//  sector: "Finance"
//});

g.Draw();
}
