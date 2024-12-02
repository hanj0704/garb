/************************************************
 * UIControlConfigurator.module.js
 * Created at 2024. 11. 27. 오전 10:07:52.
 *
 * @author HAN
 ************************************************/
Object.defineProperty(cpr.controls.UIControl.prototype, "_h_class", {
		get: function(){
			return this.style.getClasses();
		}
	});

Object.defineProperty(cpr.controls.UIControl.prototype,"testProp", {
	get : function(){
		return new cpr.expression.Expression(this._testProp).evaluate(this.getBindContext());
	},
	set : function(val){
		this._testProp = val
	}
})
function fillZero(width, str) {
	return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str; //남는 길이만큼 0으로 채움
}

var StyleParser = {
	
	_CLASS_INFO: {
		
	},
	_OWNER_SET : new Set(),
	_SHEETS: null,
	cssStringToObject: function(cssString) {
		const cssObject = {};
		const properties = cssString
			.replace(/[{|}]/g, '') // 중괄호 제거
			.split(';') // 세미콜론으로 분리
		
		properties.forEach(function(property){
			var arrays = property.split(":").map(function(each){return each.trim()});
			var key = arrays[0];
			var value = arrays[1];
			if (key) {
				// CSS 속성 이름을 camelCase로 변환
//				const camelCaseKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
				cssObject[key] = value;
			}
		})
		
		return cssObject;
	},

	/**
	 * 
	 * @param {Array} pArray
	 */
	arrayToObject : function(pArray){
			const value = pArray.pop(); // 배열의 마지막 값을 추출합니다.
			var nestedObject = this.cssStringToObject(value);
			
			// 배열을 역순으로 순회하면서 중첩된 객체를 만듭니다.
			for (let i = pArray.length - 1; i >= 0; i--) {
				nestedObject = {
					[pArray[i]]: nestedObject
				};
			}
			
			return nestedObject;
	},
	getComputedCss: function(className, propertyNm) {
		if (this._CLASS_INFO.hasOwnProperty(className)) {
			var vsPropertyName = propertyNm;
			if (/(border-)(\w*)(-color)/.test(propertyNm)) {
				vsPropertyName = propertyNm.replace(/(border-)(\w*)(-color)/g, "$1$2");
			}
			/** @type String */
			var target = this._CLASS_INFO[className][vsPropertyName];
			if (target == null) {
				return "";
			}
			target = target.trim();
			if (target.indexOf("rgb") != -1) {
				if (propertyNm.indexOf("border") != -1) {
					target = target.split("rgb")[1];
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
			} else if (propertyNm == "border-style") {
				return target.split(" ")[1]
			} else if (propertyNm == "font-weight") {
				return target == "bold";
			} else if (/(border-)(\w*-)(color)/g.test(propertyNm)) {
				return target.split[" "][2];
			} else {
				return target;
			}
		}
	},
	getStyleSheet: function(className) {
		
		if (this._CLASS_INFO.hasOwnProperty(className)) {
			return null;
		}
		var vaRules = [];
		for (var voSheet of this._SHEETS) {
			for (var tempRule of voSheet.cssRules) {
				if (tempRule.selectorText && tempRule.selectorText.includes("." + className)) {
					vaRules.push(tempRule.cssText);
				}
			}
		}
		return vaRules;
	},
	/**
	 * 
	 * @param {Object} classObj
	 */
	getStyleSheetArray: function(classObj) {
		var vaClass = classObj;
		var that = this;
		if (that._OWNER_SET.has(JSON.stringify(vaClass))) {
			return;
		}
		that._OWNER_SET.add(JSON.stringify(vaClass));
		var results = {};
		if (this._SHEETS == null) {
			this._SHEETS = document.styleSheets;
		}
		//.cl-grid-cell안에 있는 클래스와 cl-controltype안에 있는 클래스를 분리해서 룰 가져오기
//		Object.keys(voClass).forEach(function(each){
			/** @type Array */
//			var vaTempClass = voClass[each];
			vaClass.forEach(function(eachClass){
				//룰 가져오기
				var rules = that.getStyleSheet(eachClass);
//				if(eachClass == "rest-dangerous") debugger;
//				console.log(eachClass,rules);
				if(rules.length > 0) {
					rules.forEach(function(/*String*/eachRule){
						if(eachRule.indexOf(eachClass+",") != -1) {
							eachRule=  eachRule.replace(eachRule.slice(eachRule.indexOf(","),eachRule.indexOf("{")-1),"");
						}
						var classInfo = eachRule.substr(eachRule.indexOf("."+eachClass)).match(/(\.[\w-]+)|(\{[^}]*\})/g);
						var returns = that.arrayToObject(classInfo);
						that.assign(that._CLASS_INFO, returns);
//						that._CLASS_INFO = {...that._CLASS_INFO,...returns};
					});
				}
			});
//		});
	},
	assign : function(arg1,arg2) {
		var that = this;
//		debugger;
		if(!(arg2 instanceof Object)) {
			arg1 = arg2; 
		}
		Object.keys(arg2).forEach(function(each){
			
			if(arg1.hasOwnProperty(each)) {
				if(!(arg2[each] instanceof Object)) {
					arg1[each] = arg2[each];
					return;
				}
				if(JSON.stringify(arg1[each]) ==  JSON.stringify(arg2[each])) {
					return;
				}
				that.assign(arg1[each], arg2[each]);
			} else {
				arg1[each] = arg2[each];
			}
		});
	},
//mergeObjects: function(obj1, obj2) {
//	var result = obj1;
////	Object.entries(obj2).
//	Object.keys(obj2).forEach(function(each){
//		if(result[each] !== undefined) {
//			result[each] = [].concat(result[each],obj2[each]);
//		} else {
//			result[each] = obj2[each];
//		}
//	});
//	return result;
////	for(var key,value of Object.entries(obj2)) {
////		
////	}
////	for (const [key, value] of Object.entries(obj2)) {
////		if (result[key] !== undefined) {
////			result[key] = [].concat(result[key], value);
////		} else {
////			result[key] = value;
////		}
////	}
////	return result;
//
////const mergeObjects = (obj1, obj2) => {
////		const result = {
////			...obj1
////		};
////		for (const [key, value] of Object.entries(obj2)) {
////			if (result[key] !== undefined) {
////				result[key] = [].concat(result[key], value);
////			} else {
////				result[key] = value;
////			}
////		}
////		return result;
//},
//	rememberRule : function(paRules){
//		var that = this;
//		paRules.forEach(function(/*String*/eachRule){
//			var classInfo = eachRule.trim().match(/(\.[\w-]+)|(\{[^}]*\})/g);
//			var returns = that.arrayToObject(classInfo);
////			console.log(returns);
////			that._CLASS_INFO = Object.assign(that._CLASS_INFO,returns);
//		});
//	},
//	sheetParser: function(classNm, cssText) {
//		if (cssText == null) return;
//		var vsTemp = cssText.find(function(ele) {
//			return ele.indexOf(".sr") != -1;
//		});
//		if (vsTemp == null) return;
//		vsTemp = vsTemp.split("{")[1].slice(0, -1).trim();
//		var vaKeyValue = vsTemp.match(/[^\:\;]+/g);
//		var that = this;
//		if (vaKeyValue && vaKeyValue.length > 0) {
//			if (!that._CLASS_INFO.hasOwnProperty(classNm)) {
//				that._CLASS_INFO[classNm] = {};
//			}
//			for (var i = 0; i + 2 <= vaKeyValue.length; i += 2) {
//				that._CLASS_INFO[classNm][vaKeyValue[i].trim()] = vaKeyValue[i + 1].trim();
//			}
//		}
//	},
	/**
	 * 
	 * @param {cpr.controls.Grid} pcGrid
	 */
	parse : function(pcGrid) {
		var vcGrid = pcGrid;
		var that = this;
		if(!(vcGrid instanceof cpr.controls.Grid)) {
			return;
		}
//		console.time("parse");
		var exportData = vcGrid.getExportData({
			exceptStyle: false,
			applyFormat: true,
			applySuppress: true, // 동적 병합
		});
		
		
		exportData.rowgroups.forEach(function(each){
			
			/** @type Array */
			var vaRowData = each.data;
			var vsRegion = each.region;
			/** @type Array */
			var vaStyle=  each.style;
//			console.log(vaRowData);
//			console.log(vsRegion);
//			console.log(vaStyle);
			
			vaRowData.forEach(function(eachD,idx){
				
				if(vsRegion =="header") {
					var header = vcGrid.header;
					vaStyle.forEach(function(eachSt){
						
						var vaClass = [];
//						var voClass = {};
						var voClass = [];
						
						var control = header.getControl(eachSt.cellIndex);
						var column = header.getColumn(eachSt.cellIndex);
						vaClass = column.style.getClasses().filter(function(each){return each != ""});
						if (vaClass.length > 0) {
							
//							voClass["cl-grid-cell"]  =vaClass;
							voClass.push(...vaClass);
						}
						
						if (control) {
							vaClass = control._h_class;
							if (vaClass.length > 0) {
								
//								voClass["cl-"+control.type] = vaClass; 
								voClass.push(...vaClass);
							}
						}
						
						that.getStyleSheetArray(voClass);
					});
					
				}
				if(vsRegion == "detail") {
					var detail = vcGrid.detail;
					
					vaStyle.forEach(function(eachSt){
					var vaClass = [];
//					var voClass = {};
					var voClass = [];
//					if(eachSt.cellIndex == 67) {
//						debugger;
//					}
						vaClass = detail.getColumn(eachSt.cellIndex).style.getClasses().filter(function(each){return each != ""});
//						voClass["cl-grid-cell"] = vaClass;
						voClass.push(...vaClass); 
						var control = detail.getControl(eachSt.cellIndex);
						if(detail.getControl(eachSt.cellIndex)) {
							/** @type Array */
							var classInfo = detail.getControlAttr(idx, eachSt.cellIndex, "_h_class");
//							voClass["control"] = classInfo;
							voClass.push(...classInfo); 
						}
//						if(!that._OWNER_SET.has(JSON.stringify(voClass))) {
//							that._OWNER_SET.add(JSON.stringify(voClass));
							that.getStyleSheetArray(voClass);
//						}	
					});
				}
				if(vsRegion == "footer") {
					var footer = vcGrid.footer;
					
					vaStyle.forEach(function(eachSt){
						var vaClass = [];
//						var voClass = {};
						var voClass = [];
						vaClass = footer.getColumn(eachSt.cellIndex).style.getClasses().filter(function(each){return each != ""});
//						voClass["cl-grid-cell"] = vaClass;
						voClass.push(...vaClass); 
						var control = footer.getControl(eachSt.cellIndex);
						if(control) {
							
							var classInfo = footer.getControlAttr(eachSt.cellIndex, "_h_class");
//							voClass["control"] = classInfo;
							voClass.push(...vaClass); 
						}
//						if(!that._OWNER_SET.has(JSON.stringify(voClass))) {
//							that._OWNER_SET.add(JSON.stringify(voClass));
							that.getStyleSheetArray(voClass);
//						}	
					});
				}
			});
			
			
		});
//		console.timeEnd("parse");
//			console.log(this._CLASS_INFO);
		
	}
}


globals.StyleParser = StyleParser;

function ExcelUtil(){
	
};

/**
 * 클래스에 지정된 스타일 관리 객체
 */
//ExcelUtil.prototype._CLASS_INFO = {
//	
//}
//
//ExcelUtil.prototype._SHEETS = null;
//ExcelUtil.prototype._CONTAINS_CLASS = [];
//ExcelUtil.prototype.fillZero = function(width, str) {
//	return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str; //남는 길이만큼 0으로 채움
//}
//
///**
// * 
// * @param {String} className
// * @param {"background-color"|"color"|"font-weight"|"border-right-width"|"border-bottom"|"border-left"} propertyNm
// */
//ExcelUtil.prototype.getComputedCss = function(className, propertyNm) {
//	if (this._CLASS_INFO.hasOwnProperty(className)) {
//		var vsPropertyName = propertyNm;
//		if (/(border-)(\w*)(-color)/.test(propertyNm)) {
//			vsPropertyName = propertyNm.replace(/(border-)(\w*)(-color)/g, "$1$2");
//		}
//		/** @type String */
//		var target = this._CLASS_INFO[className][vsPropertyName];
//		if (target == null) {
//			return "";
//		}
//		target = target.trim();
//		if (target.indexOf("rgb") != -1) {
//			if (propertyNm.indexOf("border") != -1) {
//				target = target.split("rgb")[1];
//			}
//			var background = target.match(/([0-9]+)/g);
//			if (background && background.length > 0) {
//				var newBgColor = this.fillZero(2, parseInt(background[0]).toString(16).toUpperCase()) +
//					this.fillZero(2, parseInt(background[1]).toString(16).toUpperCase()) +
//					this.fillZero(2, parseInt(background[2]).toString(16).toUpperCase());
//				if (background.length > 3 && background[3] == "0") {
//					newBgColor = "FFFFFF";
//				}
//			}
//			return newBgColor
//		} else if (propertyNm == "border-style") {
//			return target.split(" ")[1]
//		} else if (propertyNm == "font-weight") {
//			return target == "bold";
//		} else if (/(border-)(\w*-)(color)/g.test(propertyNm)) {
//			return target.split[" "][2];
//		} else {
//			return target;
//		}
//	}
//}
//ExcelUtil.prototype.getStyleSheet = function(className) {
//	
//	if (this._CLASS_INFO.hasOwnProperty(className)) {
//		return null;
//	}
//	var vaRules = [];
//	if(this._SHEETS == null) {
//		this._SHEETS = document.styleSheets;
//	}
//	for (var voSheet of this._SHEETS) {
//		for (var tempRule of voSheet.cssRules) {
//			if (tempRule.selectorText && tempRule.selectorText.includes("." + className)) {
//				vaRules.push(tempRule.cssText);
//			}
//		}
//	}
//	return vaRules;
//}
//
//ExcelUtil.prototype.getStyleSheetArray = function(classNames) {
//	/** @type Array */
//	var classArray = classNames;
//	var that = this;
//	var results = {};
//	console.log(classArray);
//	classArray.forEach(function(each,idx){
////		if(each == "pdiaNoView") {
////			debugger;
////		}
//		var tempStyleSheet = that.getStyleSheet(each);
//		console.log(tempStyleSheet)
//		if(tempStyleSheet.length > 1) {
//			debugger;
//		}
//	});
//}
//
///**
// * 
// * @param {String} classNm
// * @param {Array} cssText
// */
//ExcelUtil.prototype.sheetParser = function(classNm, cssText) {
//	if (cssText == null) return;
//	var vsTemp = cssText.find(function(ele) {
//		return ele.indexOf(".sr") != -1;
//	});
//	if (vsTemp == null) return;
//	vsTemp = vsTemp.split("{")[1].slice(0, -1).trim();
//	var vaKeyValue = vsTemp.match(/[^\:\;]+/g);
//	var that = this;
//	if (vaKeyValue && vaKeyValue.length > 0) {
//		if (!that._CLASS_INFO.hasOwnProperty(classNm)) {
//			that._CLASS_INFO[classNm] = {};
//		}
//		for (var i = 0; i + 2 <= vaKeyValue.length; i += 2) {
//			that._CLASS_INFO[classNm][vaKeyValue[i].trim()] = vaKeyValue[i + 1].trim();
//		}
//	}
//}

ExcelUtil.prototype.more = function(classArray) {
    const stylesheets = document.styleSheets;
    let cssText = '';

    for (let i = 0; i < stylesheets.length; i++) {
        const rules = stylesheets[i].cssRules || stylesheets[i].rules;
        
        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            const selectorText = rule.selectorText || '';
            
            let match = classArray.some(cls => selectorText.includes(cls));
            
            if (match) {
                cssText += `${rule.cssText}\n`;
            }
        }
    }

    return cssText;
}
ExcelUtil.prototype.more2 = function(classArray) {
    const mainClass = classArray[0]; // 첫 번째 클래스 (주 클래스)
    const subClasses = classArray.slice(1); // 나머지 클래스들 (서브 클래스들)

    const stylesheets = document.styleSheets;
    let cssText = '';

    for (let i = 0; i < stylesheets.length; i++) {
        const rules = stylesheets[i].cssRules || stylesheets[i].rules;

        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            const selectorText = rule.selectorText || '';
            let match = false;

            // 주 클래스 단독 또는 주 클래스와 서브 클래스의 조합이 있는지 확인
            if (selectorText.includes(mainClass)) {
                if (subClasses.length === 0) {
                    match = true;
                } else {
                    subClasses.forEach(subClass => {
                        const combinedClass = `${mainClass}.${subClass}`;
                        if (selectorText.includes(combinedClass)) {
                            match = true;
                        }
                    });
                }
            }

            if (match) {
                cssText += `${rule.cssText}\n`;
            }
        }
    }

    return cssText;
}