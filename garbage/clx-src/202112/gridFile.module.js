/************************************************
 * gridFile.module.js
 * Created at 2021. 12. 20. 오전 11:46:25.
 *
 * @author HANS
 ************************************************/

cpr.events.EventBus.INSTANCE.addFilter("load", function(e){
	/** @type cpr.core.AppInstance */
	var control = e.control;
	
	if(control instanceof cpr.core.AppInstance && !control.isUDCInstance()){
		
		var vaFiles = control.getContainer().getAllRecursiveChildren().filter(function(each){
			return each instanceof cpr.controls.FileInput;
		});
		
		vaFiles.forEach(function(each){
			var vcParent = each.getParent();
			if(vcParent instanceof cpr.controls.Grid) {
				vcParent.dataSet.addEventListener("load", function(ev){
					vcParent.userData("files", {});
					vcParent.userData("idx",1);
				});
				vcParent.userData("files", {});
				vcParent.userData("idx",1);
				each.addEventListener("value-change", function(ev){
					/** @type cpr.controls.Grid */
					var vcGrid = each.getParent();
					/** @type cpr.controls.FileInput */
					var vcCtrl  =ev.control;
					var voSelectedRowIdx = vcGrid.getSelectedRow();
					var vnIndex = vcParent.userData("idx");
					var vsAttr = voSelectedRowIdx.getAttr("index");
					if(vsAttr == null) {
						voSelectedRowIdx.setAttr("index", vnIndex);//한 그리드에 대해서 파일인풋이 n개 있을때, 파일인풋정보 + 인덱스등으로 추가정보를 입력해야함
						var voFiles = vcParent.userData("files");
						voFiles[vnIndex] = vcCtrl.files;
						vcParent.userData("files",voFiles);
						vnIndex = vnIndex +1
						vcParent.userData("idx", vnIndex);
					}
				});
			}
		});
	}
});
