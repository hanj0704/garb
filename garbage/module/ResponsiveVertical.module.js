/************************************************
 * ResponsiveVertical.module.js
 * Created at 2019. 3. 27. 오후 2:36:09.
 *
 * @author jeeeyul
 ************************************************/

var ATTR_MOBILE_H_MARGIN = "mobile-horizontal-margin";
var ATTR_MOBILE_V_MARGIN = "mobile-vertical-margin";
var ATTR_TABLET_H_MARGIN = "tablet-horizontal-margin";
var ATTR_TABLET_V_MARGIN = "tablet-vertical-margin";
var ATTR_MOBILE_FIT = "mobile-fit";
var ATTR_TABLET_FIT = "tablet-fit";

/**
 * 
 * @param {cpr.controls.Container} container
 */
function RVertical(container) {
	this._container = container;
	this._appInstance = container.getAppInstance();
	this._started = false;
	this._onScreenChange = this._onScreenChange.bind(this);
}

RVertical.prototype._backup = function() {
	this._originalLayout = this._container.getLayout();
}

/** @type cpr.controls.layouts.VerticalLayout */
RVertical.prototype._originalLayout = null;

RVertical.prototype._transform = function() {
	var originalLayout = this._originalLayout;
	var layout = new cpr.controls.layouts.VerticalLayout();
	this._container.setLayout(layout);

	layout.verticalMargin = originalLayout.verticalMargin;
	layout.horizontalMargin = originalLayout.horizontalMargin;
	layout.spacing = originalLayout.spacing;
	layout.scrollable = originalLayout.scrollable;

	/** @type String */
	var hMargin;

	/** @type String */
	var vMargin;

	switch (this._container.getAppInstance().targetScreen.name) {
		case "mobile":
			hMargin = parseInt(this._container.userAttr(ATTR_MOBILE_H_MARGIN) || "0");
			vMargin = parseInt(this._container.userAttr(ATTR_MOBILE_V_MARGIN) || "0");
			break;

		case "tablet":
			hMargin = parseInt(this._container.userAttr(ATTR_TABLET_H_MARGIN) || "0");
			vMargin = parseInt(this._container.userAttr(ATTR_TABLET_V_MARGIN) || "0");
			break;

	}

	layout.horizontalMargin = hMargin;
	layout.verticalMargin = vMargin;
	layout.distribution = "fill";

};

RVertical.prototype._restore = function() {
	this._container.setLayout(this._originalLayout);
};

RVertical.prototype.start = function() {
	if (this._started) {
		return;
	}
	this._backup();

	this._appInstance.addEventListener("screen-change", this._onScreenChange);
};

/**
 * @param {cpr.events.CScreenChangeEvent} e
 */
RVertical.prototype._onScreenChange = function(e) {
	var screenName = e.screen.name;
	switch (screenName) {
		case "default":
			{
				this._restore();
				break;
			}

		case "mobile":
			{
				if (this._container.userAttr("mobile-fit") == "true") {
					this._transform();
				} else {
					this._restore();
				}
				break;
			}

		case "tablet":
			{
				if (this._container.userAttr("tablet-fit") == "true") {
					this._transform();
				} else {
					this._restore();
				}
				break;
			}
	}
};

cpr.events.EventBus.INSTANCE.addFilter("init", function(e) {
	if (e.control instanceof cpr.core.AppInstance) {
		/** @type cpr.core.AppInstance */
		var appInstance = e.control;
		var targetGroups = appInstance.getContainer().getAllRecursiveChildren(true).filter(function( /* cpr.controls.UIControl */ each) {
			if (each instanceof cpr.controls.Container) {
				if (each.getLayout() instanceof cpr.controls.layouts.VerticalLayout && (each.userAttr("mobile-fit") || each.userAttr("tablet-fit"))) {
					return true;
				}
			}
			return false;
		});

		targetGroups.forEach(function( /* cpr.controls.Container */ each) {
			var rVertical = new RVertical(each);
			rVertical.start();
		});
	}
});