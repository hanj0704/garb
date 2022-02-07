/************************************************
 * treeModule.module.js
 * Created at 2022. 1. 20. 오후 1:18:03.
 * eXBuilder6의 트리 컨트롤에서 보여지는 노트의 깊이, 순서들을 보여지는 그대로를
 * 그리드 내 트리셀에서 사용하고 싶을 떄 활용할 수 있는 모듈입니다.
 * 해당 모듈을 사용하기 위해선, 그리드에 데이터를 전달하는 데이터셋의 컬럼중, 노드 깊이를 표현하는 LEVEL값(String | Number)을 담을 컬럼과,
 * 트리상 보여지는 순서대로 데이터를 정렬할 수 있도록 SORT_IDX(Number)를 담을 컬럼이 존재해야합니다.
 * 해당 기능을 사용하여 트리와 동일한 구조의 트리셀을 활용할 경우,
 * 데이터셋에 기존에 정의되어있던 Sort Condition은 삭제처리되고, SORT_IDX를 기준으로 오름차순으로 정렬됩니다.
 * 이에 따라 해당 기능에서 데이터에 대한 정렬 조건은 데이터를 최초 불러올 때, 쿼리를 통해 ORDER BY를 지정하거나, 데이터가 내려온 직후에 존재하던
 * Sort Condition에 대해서만 최초 1회 데이터가 정렬되며 , 이후 사용자는 Sort Condition을 임의로 변경하거나 그리드 헤더 클릭을 통해 
 * 헤더 소팅 정보를 수정하는 행위를 해선 안되며, 이를 변경할 경우  트리 레벨 구조가 전부 꺠질 수 있음을 인지해야합니다.
 * 
 * @author HANS
 ************************************************/


/**
 * 
 * @param {cpr.data.DataSet} pcDataSet 데이터셋
 * @param {String} psLabelCol 라벨 컬럼명
 * @param {String} psValueCol 값 컬럼명
 * @param {String} psParentCol 부모값 컬럼명
 * @param {String} psLevelCol 트리의 아이템별 depth(level)를 저장할 컬럼명
 * @param {String} psSortCol 트리의 아이템별 시각적 아이템 인덱스를 저장할 컬럼명
 */
function GridTreeCellTuner(pcDataSet,psLabelCol,psValueCol,psParentCol,psLevelCol,psSortCol){
	
	this._vnSortIndex = 0;
	
	this._ds = pcDataSet;
	this._label = psLabelCol;
	this._value = psValueCol;
	this._parent = psParentCol;
	this._level = psLevelCol;
	this._sort = psSortCol;
}

GridTreeCellTuner.prototype.getTreeData = function(){
	var start = moment();
	console.log(start.format("YYYY-MM-DD HH:mm:ss"));
	var vcTree = new cpr.controls.Tree();
	vcTree.setItemSet(this._ds, {
		label: this._label,
		value: this._value,
		parentValue: this._parent
	});
	
	vcTree.redraw();
	
	var that = this;
	var vaRootItem = vcTree.findItems({depth : 0});
	var a = this.getDepthNLevel(vaRootItem);
	a.then(function(input){
			
		var vcDs = that._ds;
		vcDs.clearSort();
		vcDs.setSort(that._sort +" asc");
		vcDs.getAppInstance().getContainer().redraw();
		var end = moment();
		console.log(end.format("YYYY-MM-DD HH:mm:ss"));
		console.log(moment.duration(end.valueOf()-start.valueOf()).asSeconds());
		vcTree.dispose();
	});
}

GridTreeCellTuner.prototype.getDepthNLevel = function(/*cpr.controls.TreeItem[]*/paTreeItems){
	var that = this;
	var voPromise = new Promise(function(resolve, reject) {
		
	paTreeItems.forEach(function(each,idx){
		var eachRow = each.row;
		eachRow.putValue(that._level, each.depth+1);
		eachRow.putValue(that._sort, that._vnSortIndex);
		that._vnSortIndex = that._vnSortIndex + 1;
		var vaChildren = each.children;
		
		if(vaChildren.length > 0) {
			that.getDepthNLevel(vaChildren);
		}
		if(idx == paTreeItems.length-1) {
			resolve();
		}
	});
	});
	return voPromise;
};



/**
 * 
 * @param {cpr.data.DataSet} pcDataSet 데이터셋
 * @param {String} psLabelCol 라벨 컬럼명
 * @param {String} psValueCol 값 컬럼명
 * @param {String} psParentCol 부모값 컬럼명
 * @param {String} psLevelCol 트리의 아이템별 depth(level)를 저장할 컬럼명
 * @param {String} psSortCol 트리의 아이템별 시각적 아이템 인덱스를 저장할 컬럼명
 */
globals.createTreecellTuner = function(pcDataSet,psLabelCol,psValueCol,psParentCol,psLevelCol,psSortCol){
	
	var tuner =  new GridTreeCellTuner(pcDataSet, psLabelCol, psValueCol, psParentCol,psLevelCol,psSortCol); 
	tuner.getTreeData();
}