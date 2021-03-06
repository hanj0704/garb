/*
 * App URI: 202003/fileUploadSample
 * Source Location: 202003/fileUploadSample.clx
 *
 * This file was generated by eXbuilder6 compiler, Don't edit manually.
 */
(function(){
	var app = new cpr.core.App("202003/fileUploadSample", {
		onPrepare: function(loader){
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports){
			var linker = {};
			// Start - User Script
			/************************************************
			 * fileUploadExample.js
			 * Created at 2020. 3. 20. 오후 3:08:37.
			 *
			 * @author HANS
			 ************************************************/
			
			
			
			/*
			 * 파일 업로드에서 sendbutton-click 이벤트 발생 시 호출.
			 * 파일을 전송하는 button을 클릭 시 발생하는 이벤트. 서브미션을 통해 전송 버튼에 대한 구현이 필요합니다.
			 */
			function onFud1SendbuttonClick(/* cpr.events.CEvent */ e){
				/** 
				 * @type cpr.controls.FileUpload
				 */
				var fud1 = e.control;
				
				var vaFiles = fud1.getFiles();
				
				var vcSubUpload = app.lookup("subUpload");
				
				vaFiles.forEach(function(each,idx){
				
					vcSubUpload.addFileParameter("file_"+idx, each);
				});
				
				vcSubUpload.send();
				
			}
			
			
			/*
			 * "전송" 버튼(btn1)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtn1Click(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btn1 = e.control;
				
				var vcFileIp1 = app.lookup("fi1");
				
				var vaFiles = vcFileIp1.files;
				
				var vcSubUpload = app.lookup("subUpload");
				
				vaFiles.forEach(function(each, idx){
					
					vcSubUpload.addFileParameter("file_"+idx, each);
					
				});
				
				vcSubUpload.send();
			};
			// End - User Script
			
			// Header
			var submission_1 = new cpr.protocols.Submission("subUpload");
			submission_1.mediaType = "multipart/form-data;encoding=json";
			app.register(submission_1);
			
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var fileUpload_1 = new cpr.controls.FileUpload("fud1");
			if(typeof onFud1SendbuttonClick == "function") {
				fileUpload_1.addEventListener("sendbutton-click", onFud1SendbuttonClick);
			}
			container.addChild(fileUpload_1, {
				"top": "20px",
				"left": "20px",
				"width": "450px",
				"height": "100px"
			});
			
			var fileInput_1 = new cpr.controls.FileInput("fi1");
			container.addChild(fileInput_1, {
				"top": "189px",
				"left": "20px",
				"width": "100px",
				"height": "20px"
			});
			
			var button_1 = new cpr.controls.Button("btn1");
			button_1.value = "전송";
			if(typeof onBtn1Click == "function") {
				button_1.addEventListener("click", onBtn1Click);
			}
			container.addChild(button_1, {
				"top": "189px",
				"left": "130px",
				"width": "100px",
				"height": "20px"
			});
		}
	});
	app.title = "fileUploadSample";
	cpr.core.Platform.INSTANCE.register(app);
})();
