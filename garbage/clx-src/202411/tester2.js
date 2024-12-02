/************************************************
 * tester2.js
 * Created at 2024. 11. 20. 오후 3:53:16.
 *
 * @author HAN
 ************************************************/

/**
 * 클래스에 지정된 스타일 관리 객체
 */
ExcelUtil.prototype._CLASS_INFO = {
	
}
ExcelUtil.prototype.fillZero = function(width, str) {
	return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str; //남는 길이만큼 0으로 채움
}

/**
 * 
 * @param {String} className
 * @param {"background-color"|"color"|"font-weight"|"border-right-width"|"border-bottom"|"border-left"} propertyNm
 */
ExcelUtil.prototype.getComputedCss = function(className,propertyNm){
	if(this._CLASS_INFO.hasOwnProperty(className)) {
		
		/** @type String */
		var target = this._CLASS_INFO[className][propertyNm];
		if(target == null) {
			return "";
		}
		if (target.indexOf("rgb") != -1) {
			if(propertyNm.indexOf("border")!= -1) {
				target = target.split[" "][2];
			}
			var background = target.match(/([0-9]+)/g);
			if (background && background.length > 0) {
				var newBgColor = this.fillZero(2, parseInt(background[0]).toString(16).toUpperCase()) +
					this.fillZero(2, parseInt(background[1]).toString(16).toUpperCase()) +
					this.fillZero(2, parseInt(background[2]).toString(16).toUpperCase());
				if (background.length > 3 && background[3] == "0") {
					newBgColor = "FFFFFF";
				}
			}
			return newBgColor
		}
		
		else if(propertyNm == "border-style") {
			return target.split(" ")[1]
		}
		else if(propertyNm =="font-weight") {
			return  target =="bold";
		}
		else {
			return target;
		}
	}
}
ExcelUtil.prototype.getStyleSheet = function(className) {
	
	if(this._CLASS_INFO.hasOwnProperty(className)){
		return null;
	}
		var vaRules = [];
		for (var voSheet of document.styleSheets) {
			for (var tempRule of voSheet.cssRules) {
				if (tempRule.selectorText && tempRule.selectorText.includes("."+className)) {
					vaRules.push(rule.cssText);
				}
			}
		}
		return vaRules;
}
/**
 * 
 * @param {String} cssText
 */
ExcelUtil.prototype.sheetParser = function(classNm,cssText) {
	
	var vsTemp = cssText[0];
	vsTemp = vsTemp.split("{")[1].slice(0,-1).trim();
	var vaKeyValue = vsTemp.match(/[^\:\;]+/g);
	var that = this;
	if(vaKeyValue && vaKeyValue.length > 0) {
		
		if(!that._CLASS_INFO.hasOwnProperty(classNm)) {
			that._CLASS_INFO[classNm] = {};
		}
		for(var i=0; i+2<=vaKeyValue.length; i+=2) {
			that._CLASS_INFO[classNm][vaKeyValue[i]] = vaKeyValue[i+1];
		}
	}
}



case "detail":
			vsBgColor = that._EXCEL_STYLE.DETAIL_BG_COLOR;
			paClass.forEach(function(each) {
				
				
				var sheets = that.getStyleSheet(each);
				if(sheets != null) {
					
					that.sheetParser(each, sheets);
				}
				if (each == "empNm") {
					vsBgColor = that.getComputedCss(each, "background-color") || "ADD8E6";
					vsBorderBottomStyle = that.getComputedCss(each, "background-color") ||"thin";
				}
				if (each == "pdiaNoView") {
					vbBold = that.getComputedCss(each, "font-weight") ||true;
					vsFgColor = that.getComputedCss(each, "color") || "0000FF";
				}
				if (each == "S") {
					vsFgColor = that.getComputedCss(each, "color") ||"FF0000";
					vsBgColor = that.getComputedCss(each, "background-color") ||"FFFF00";
				}
				if (each == "A") {
					vsFgColor = that.getComputedCss(each, "color") ||"000000";
				}
				if (each == "X") {
					vsFgColor = that.getComputedCss(each, "color") ||"008000";
				}
				if (each == "group-border-left") {
					voBorderLeftColor = that.getComputedCss(each, "border-left-color") ||"0000FF";
					vsBorderLeftStyle = that.getComputedCss(each, "border-left-style") ||"thick"
				}
				if (each == "group-border-bottom") {
					voBorderBottomColor = that.getComputedCss(each, "border-bottom-color") ||"0000FF";
					vsBorderBottomStyle = that.getComputedCss(each, "border-bottom-style") ||"thick"
				}
				if (each == "right-statsdata") {
					vsBgColor = that.getComputedCss(each, "background-color") ||"eeeeee";
					vbBold = that.getComputedCss(each, "font-weight") ||true;
					vsBorderBottomStyle = that.getComputedCss(each, "border-bottom-style") ||"thin";
				}
				if (each == "rest-dangerous") {
					vsBgColor = that.getComputedCss(each, "bacground-color") ||"FC9696";
				}
				if (each == "rest-warning") {
					vsBgColor =that.getComputedCss(each, "background-color") || "FFE699";
				}
			});
			break;
