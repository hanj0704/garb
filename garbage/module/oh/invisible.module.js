/************************************************
 * invisible.module.js
 * Created at 2020. 6. 2. 오후 4:05:51.
 *
 * @author ryu
 ************************************************/

/**
 * @constructor
 */
function InvisibleKit() {
	var unit = cpr.core.Module.require("module/unit");
	var unit2 = cpr.core.Module.require("module/createAppAndLayout");
	
	this.DataSet = new unit.DataSetKit(this);
	this.DataMap = new unit.DataMapKit(this);
	this.Submit = new unit.SubmissionKit(this);
	this.DataView = new unit.DataViewKit(this);
	this.Info = new unit.InfoKit(this);
	this.CreateAppLayout = new unit2.createAppAndLayout(this);
}

exports.InvisibleKit = InvisibleKit;

globals.createInvisibleUnit = function(){
	return new InvisibleKit();
}