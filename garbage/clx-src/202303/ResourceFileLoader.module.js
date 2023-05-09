/************************************************
 * ResourceFileLoader.module.js
 * Created at 2022. 5. 31. 오후 2:53:59.
 *
 * @author 1441273
 ************************************************/

EditorLoader = {
	loader : false,
	isLoaded  : function(){
		return this.loader;
	},
	createCssHead  : function(){
		var cssHead = document.createElement("link");
		cssHead.href = "../lib/froala/froala_editor.pkgd.min.css";
		cssHead.rel = "stylesheet";
		cssHead.type = "text/css";
		cssHead.id = "froalaCss";
		return cssHead;
	},
	createScript : function(){

		var script = document.createElement("script");
		script.src = "../lib/froala/froala_editor.pkgd.min.js";
		script.type = "text/javascript";
		script.id = "froalaSrc";

		return script;
	},
	checkLibLoaded : function(){
			var that = this;
			var voPrms = new Promise(function(resolve,reject){

			if(that.loader) {
				resolve();
			} else {

				if(!document.getElementById("froalaSrc")){
					var cssHead = that.createCssHead();
					document.head.appendChild(cssHead);

					var scriptHead = that.createScript();
					document.head.appendChild(scriptHead);
					scriptHead.addEventListener("load", function(ev){
						that.loader = true;
						resolve();
					});
				} else {
					document.getElementById("froalaSrc").addEventListener("load", function(){
						that.loader = true;
						resolve();
					});
				}
			}
			});
			return voPrms;
	}
}

ChartLoader = {
	loader : false,
	isLoaded  : function(){
		return this.loader;
	},
	createCssHead  : function(){
		var cssHead = document.createElement("link");
		cssHead.href = "../lib/chart/rMateChartH5.css";
		cssHead.rel = "stylesheet";
		cssHead.type = "text/css";
		cssHead.id = "rMateCss";
		return cssHead;
	},
	createLicenseHead : function(){
		var licenseHead = document.createElement("script");
		licenseHead.src = "../lib/chart/rMateChartH5License.js";
		licenseHead.type = "text/javascript";
		licenseHead.id = 'rMateLicense';
		return licenseHead;
	},
	createScript : function(){

		var script = document.createElement("script");
		script.src = "../lib/chart/rMateChartH5.js";
		script.type = "text/javascript";
		script.id = "chartSrc";

		return script;
	},
	checkLibLoaded : function(){
			var that = this;
			var voPrms = new Promise(function(resolve,reject){

			if(that.loader) {
				resolve();
			} else {

				if(!document.getElementById("chartSrc")){
					var cssHead = that.createCssHead();
					document.head.appendChild(cssHead);

					var licenseHead = that.createLicenseHead();
					document.head.appendChild(licenseHead);

					var scriptHead = that.createScript();
					document.head.appendChild(scriptHead);
					scriptHead.addEventListener("load", function(ev){
						that.loader = true;
						resolve();
					});
				} else {
					document.getElementById("chartSrc").addEventListener("load", function(){
						that.loader = true;
						resolve();
					});
				}
			}
			});
			return voPrms;
	}

}


OzLoader = {
	loader : false,
	isLoaded  : function(){
		return this.loader;
	},
	_getReportActionUrl : function(){
		var vsReportActionUrl = "https://oz-report.orange.hanwhalifefs.com/oz80/";
		var vsDomain = document.domain;
		var vsMsReportActionUrl = vsReportActionUrl;
		if (vsDomain.indexOf("orange-dev") != -1 || vsDomain.indexOf("localhost") != -1) {

			vsMsReportActionUrl = vsMsReportActionUrl.replace("orange", "orange-dev");
		} else if (vsDomain.indexOf("orange-stg") != -1) {

			vsMsReportActionUrl = vsMsReportActionUrl.replace("orange", "orange-stg");
		}
		return vsMsReportActionUrl;
	},
	createJQJs  : function(){
		var jsHead = document.createElement("script");
		jsHead.src = this._getReportActionUrl()+"ozhviewer/jquery/jquery-2.0.3.min.js";
		jsHead.type = "text/javascript";
		return jsHead;
	},

	createJQUiCss : function(){
		var cssHead = document.createElement("link");
		cssHead.href = this._getReportActionUrl()+"ozhviewer/jquery/jquery-ui.css";
		cssHead.rel = "stylesheet";
		cssHead.type = "text/css";
		return cssHead;
	},
	createJQUiJs : function(){
		var jsHead = document.createElement("script");
		jsHead.src = this._getReportActionUrl()+"ozhviewer/jquery/jquery-ui.min.js";
		jsHead.type = "text/javascript";
		return jsHead;
	},
	createDynaJs : function(){
		var jsHead = document.createElement("script");
		jsHead.src = this._getReportActionUrl()+"ozhviewer/jquery.dynatree.js";
		jsHead.type = "text/javascript";
		return jsHead;
	},
	createDynaCss : function(){
		var cssHead = document.createElement("link");
		cssHead.href = this._getReportActionUrl()+"ozhviewer/ui.dynatree.css";
		cssHead.rel = "stylesheet";
		cssHead.type = "text/css";
		return cssHead;
	},
	createOzJs : function(){
		var jsHead = document.createElement("script");
		jsHead.id = "ozjs";
		jsHead.src = this._getReportActionUrl()+"ozhviewer/OZJSViewer.js";
		jsHead.type = "text/javascript";
		return jsHead;
	},
	checkLibLoaded : function(){
			var that = this;
			var voPrms = new Promise(function(resolve,reject){

			if(that.loader) {
				resolve();
			} else {

				if(!document.getElementById("ozjs")){
					var jqHead = that.createJQJs();
					document.head.appendChild(jqHead);

					jqHead.addEventListener("load", function(ev){

						var jquiCssHead = that.createJQUiCss();
						document.head.appendChild(jquiCssHead);

						var jquiHead = that.createJQUiJs();
						document.head.appendChild(jquiHead);
						jquiHead.addEventListener("load", function(){

							var dynaCssHead = that.createDynaCss();
							document.head.appendChild(dynaCssHead);

							var dynaHead = that.createDynaJs();
							document.head.appendChild(dynaHead);


							var ozJsHead = that.createOzJs();
							document.head.appendChild(ozJsHead);
							ozJsHead.addEventListener("load", function(){
								that.loader = true;
								resolve();
							});
						});

					});
				} else {
					document.getElementById("ozjs").addEventListener("load", function(){
						that.loader = true;
						resolve();
					});
				}
			}
			});
			return voPrms;
	}

}

ImageLoader = {
	loader : false,
	isLoaded  : function(){
		return this.loader;
	},
	createCoreCssHead  : function(){
		var cssHead = document.createElement("link");
		cssHead.href = "../lib/a5viewer/css/a5view_core.css";
		cssHead.rel = "stylesheet";
		cssHead.type = "text/css";
		return cssHead;
	},
//	createCommonCss : function(){
//		var cssHead = document.createElement("link");
//		cssHead.href = "../lib/a5viewer/css/common-4.x.css";
//		cssHead.rel = "stylesheet";
//		cssHead.type = "text/css";
//		return cssHead;
//	},
	createFrontCss : function(){
		var cssHead = document.createElement("link");
		cssHead.href = "../lib/a5viewer/css/style_front.css";
		cssHead.rel = "stylesheet";
		cssHead.type = "text/css";
		return cssHead;
	},
	createJqScript : function(){

		var script = document.createElement("script");
		script.src = "../lib/a5viewer/js/jquery-1.11.3.min.js";
		script.type = "text/javascript";
		return script;
	},

	createJqMinScript : function(){
		var script = document.createElement("script");
		script.src = "../lib/a5viewer/js/jquery.min.js";
		script.type = "text/javascript";
		return script;
	},
	createJqUiScript : function(){
		var script = document.createElement("script");
		script.src = "../lib/a5viewer/js/jquery-ui.js";
		script.type = "text/javascript";

		return script;
	},
	createA5IncScript : function(){
		var script = document.createElement("script");
		script.src = "../lib/a5viewer/js/a5include.js";
		script.type = "text/javascript";
		script.id = "a5Inc";

		return script;
	},
	createA5Script : function(){
		var script = document.createElement("script");
		script.src = "../lib/a5viewer/js/a5viewer.js";
		script.type = "text/javascript";

		return script;
	},
	createA5LibScript : function(){
		var script = document.createElement("script");
		script.src = "../lib/a5viewer/js/a5view_lib.js";
		script.type = "text/javascript";

		return script;
	},
	createA5CoreScript : function(){
		var script = document.createElement("script");
		script.src = "../lib/a5viewer/js/a5view_core.js";
		script.id = "a5";
		script.type = "text/javascript";

		return script;
	},
	checkLibLoaded : function(){
			var that = this;
			var voPrms = new Promise(function(resolve,reject){

			if(that.loader) {
				resolve();
			} else {

				if(!document.getElementById("a5")){
					var cssCoreHead = that.createCoreCssHead();
					document.head.appendChild(cssCoreHead);

					var cssFrontHead = that.createFrontCss();
					document.head.appendChild(cssFrontHead);

					var jqScript = that.createJqScript();
					document.head.appendChild(jqScript);
					jqScript.addEventListener("load", function() {

						var jqMinScript = that.createJqMinScript();
						document.head.appendChild(jqMinScript);

							var jquiScript = that.createJqUiScript();
							document.head.appendChild(jquiScript);
							jquiScript.addEventListener("load", function(){

								var a5IncScript = that.createA5IncScript();
								document.head.appendChild(a5IncScript);

								var a5Script = that.createA5Script();
								document.head.appendChild(a5Script);

								var a5LibScript = that.createA5LibScript();
								document.head.appendChild(a5LibScript);

								a5LibScript.addEventListener("load", function() {
									var a5CoreScript = that.createA5CoreScript();
									document.head.appendChild(a5CoreScript);

									a5CoreScript.addEventListener("load", function() {
										that.loader = true;
										resolve();
									});
								});
							});
					});
				} else {
					document.getElementById("froalaSrc").addEventListener("load", function(){
						that.loader = true;
						resolve();
					});
				}
			}
			});
			return voPrms;
	}
}


KakaoRoader = {
	loader : false,
	isLoaded  : function(){
		return this.loader;
	},
	createKakaoScript : function(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.id = "kakaos";
	script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=a85481de96ee69ba3504f7c7ca719570&libraries=services&autoload=false";
		return script;
	},
	libLoad : function(){
			var that = this;
			var voPrms = new Promise(function(resolve,reject){

			if(that.loader) {
				resolve();
			} else {

				if(!document.getElementById("kakaos")){

					var scriptHead = that.createKakaoScript();
					document.head.appendChild(scriptHead);
					scriptHead.addEventListener("load", function(ev){
						kakao.maps.load(function(){

							that.loader = true;
							resolve();
						})
					});
				} else {
					document.getElementById("kakaos").addEventListener("load", function(){
						kakao.maps.load(function(){

							that.loader = true;
							resolve();
						})
					});
				}
			}
			});
			return voPrms;
	}
}

EncLoader = {
	loader : false,
	isLoaded  : function(){
		return this.loader;
	},
	createJqScript  : function(){

		var script = document.createElement("script");
		script.src = "../../pluginfree/js/jquery-1.11.0.min.js";
		script.type = "text/javascript";
		script.id = "jquery";

		return script;
	},
	createEncScript : function(){

		var script = document.createElement("script");
		script.src = "../../pluginfree/js/nppfs-1.13.0.js";
		script.type = "text/javascript";
		script.charset = "utf-8";
		script.id = "encSrc";

		return script;
	},
	checkLibLoaded : function(){
			var that = this;
			var voPrms = new Promise(function(resolve,reject){

			if(that.loader) {
				resolve();
			} else {

				if(!document.getElementById("encSrc")){
					var jqHead = that.createJqScript();
					document.head.appendChild(jqHead);
					jqHead.addEventListener("load", function(){
						var scriptHead = that.createEncScript();
						document.head.appendChild(scriptHead);
						scriptHead.addEventListener("load", function(ev){
							that.loader = true;
							resolve();
						});
					});
				} else {
					document.getElementById("encSrc").addEventListener("load", function(){
						that.loader = true;
						resolve();
					});
				}
			}
			});
			return voPrms;
	}
}
