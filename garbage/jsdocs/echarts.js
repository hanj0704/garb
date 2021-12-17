
var echarts = {
	
	 /**
     * Global echarts object, which can be accessed after including echarts.js in script tag or through require('echarts') in AMD environment.
	 * @param {HTMLCanvasElement | HTMLDivElement} dom
	 * @param {String | Object} theme?
	 * @param {{devicePixelRatio? : Number, renderer? : String, width? : Number | String, height? : Number | String}} opts?
	 * @returns {echartInstance} echartInstance
     */
    init : function (dom, theme, opts) {},
    
    /**
     * Connects interaction of multiple chart series.
	 * @param {String | Array} group
     */
    connect : function (group) {},
    
    
    /**
     * Disconnects interaction of multiple chart series. To have one single instance to be removed, you can set group of chart instance to be null.
	 * @param {String | Array} group
     */
    disconnect : function (group) { },
    
    /**
     * Destroys chart instance, after which the instance cannot be used any more.
	 * @param {echartInstance | HTMLDivElement | HTMLCanvasElement} target
     */
    dispose : function (target) { },
    
    /**
     * Returns chart instance of dom container.
	 * @param {HTMLDivElement | HTMLCanvasElement} target
	 * @return {echartInstance} echartInstance
     */
    getInstanceByDom : function (target) { },
    
    /**
     * registers available maps. This can only be used after including geo component or chart series of map.
	 * @param {String} mapName
	 * @param {Object} geoJson
	 * @param {Object} specialAreas?
     */
    registerMap : function (mapName, geoJson, specialAreas) {},
    
     /**
     * Get a registed map in the following format.
	 * @param {String} mapName
	 */
    getMap : function(mapName) {},
    
      /**
     * Registers a theme, should be specified when initialize the chart instance.
	 * @param {String} themeName
	 * @param {Object} theme
	 */
    registerTheme : function(themeName,theme) {},
    
    
   	 grapic : {
    		 /**
   			  *  Clip the given points by the given rectangular.
			  */
    		clipPointsByRect : function (){},
    			
    		/**
   			  *  Clip the first input rectangular by the second input rectangular.
			  */
    		clipRectBtRect : function(){}
   	 		}
}


/**
 * @class echartInstance
 * @type {Object}
 * @property {String} group
 */
function echartInstance(){};

	/**
	 * @type {String | Number}
	 */
	echartInstance.prototype.group=  "";
	/**
     * Configuration item, data, universal interface, all parameters and data can all be modified through setOption. ECharts will merge new parameters and data, and then refresh chart. If animation is enabled, ECharts will find the difference between two groups of data and present data changes through proper animation.
	 * @param {Object} option
	 * @param {Boolean} notMerge?
	 * @param {Boolean} lazyUpdate?
	 */
	echartInstance.prototype.setOption = function(option, notMerge, lazyUpdate){};
	
	/**
	 * Gets width of ECharts instance container.
	 * @return {Number} width
	 */
	echartInstance.prototype.getWidth = function(){};
	
	/**
	 * Gets height of ECharts instance container.
	 * @return {Number} height
	 */
	echartInstance.prototype.getHeight = function(){};
	
	/**
	 * Gets DOM element of ECharts instance container.
	 * @return {HTMLCanvasElement|HTMLDivElement} document
	 */
	echartInstance.prototype.getDom = function(){};

	/**
	 * Gets option object maintained in current instance, which contains configuration item and data merged from previous setOption operations by users, along with user interaction states. For example, switching of legend, zooming area of data zoom, and so on. Therefore, a new instance that is exactly the same can be recovered from this option.
	 * @return {Object} Object
	 */
	echartInstance.prototype.getOption = function () {};
	
	/**
	 * Resizes chart, which should be called manually when container size changes.
	 * @param {Number | String} width
	 * @param {Number | String} height
	 * @param {Boolean} silent
	* @returns {echartInstance} echartInstance
	 */
	echartInstance.prototype.resize = function (width, height, silent){};
	
	/**
	 * Triggers chart action, like chart switch legendToggleSelect,zoom data area dataZoom, show tooltip showTip and so on. See action and events for more information.
		payload parameter can trigger multiple actions through batch attribute.
	 * @param {Object} payload
	 */
	echartInstance.prototype.dispatchAction = function(payload){};
	
	/**
	 * Binds event-handling function.

       There are two kinds of events in ECharts, one of which is mouse events, which will be triggered when the mouse clicks certain element in the chart, the other kind will be triggered after dispatchAction is called. Every action has a corresponding event. Please refer to action and events for more information.

	   If event is triggered externally by dispatchAction, and there is batch attribute in action to trigger batch action, then the corresponding response event parameters be in batch.
	 * 
	 * @param {String} eventName
	 * @param {String | Object} query
	 * @param {function} handler
	 * @param {Object} context?
	 */
	echartInstance.prototype.on = function(eventName, query, handler, context) {};
	
	/**
	 * Unbind event-handler function.
	 * @param {String} eventName
	 * @param {fuction} handler?
	 */
	echartInstance.prototype.off = function(eventName, handler){};
	
	
	/**
	 * Convert a point from logical coordinate (e.g., in geo, cartesian, graph, ...) to pixel coordinate.
	 * @param {{seriesIndex: number,seriesId: string,seriesName: string,geoIndex: number,geoId: string,geoName: string,xAxisIndex: number,xAxisId: string,xAxisName: string,yAxisIndex: number,yAxisId: string,yAxisName: string,gridIndex: number,gridId: string, gridName: string}} finder 
	 * @param {Array | String} value
	 * @return {Array | String}
	 */
	echartInstance.prototype.convertToPixel = function(finder,value){};
	
	
	/**
	 * Convert a point from pixel coordinate to logical coordinate (e.g., in geo, cartesian, graph, ...). This method is the inverse operation of convertToPixel, where the examples can be referred.
	 * @param {{seriesIndex: number,seriesId: string,seriesName: string,geoIndex: number,geoId: string,geoName: string,xAxisIndex: number,xAxisId: string,xAxisName: string,yAxisIndex: number,yAxisId: string,yAxisName: string,gridIndex: number,gridId: string, gridName: string}} finder 
	 * @param {Array | String} value
	 * @return {Array | String}
	 */
	echartInstance.prototype.convertFromPixel = function(finder, value){};
	
	/**
	 * Determine whether the given point is in the given coordinate systems or series.
	These coordinate systems or series are supported currently: grid, polar, geo, series-map, series-graph, series-pie.
	 * @param {{seriesIndex: number,seriesId: string,seriesName: string,geoIndex: number,geoId: string,geoName: string,xAxisIndex: number,xAxisId: string,xAxisName: string,yAxisIndex: number,yAxisId: string,yAxisName: string,gridIndex: number,gridId: string, gridName: string}} finder 
	 * @param {Array | String} value
	 * @return {Boolean}
	 */
	echartInstance.prototype.containPixel = function(finder, value){};
	
	/**
	 * Shows loading animation. You can call this interface manually before data is loaded, and call hideLoading to hide loading animation after data is loaded.
	 * @param {String} type?
	 * @param {Object} opts?
	 */
	echartInstance.prototype.showLoading = function(type, opts){};
	
	/**
	 * Hides animation loading effect.
	 */
	echartInstance.prototype.hideLoading = function(){};	
	
	
	/**
	 * Exports chart image; returns a base64 URL; can be set to src of Image.
	 * @param {{type? :String, pixelRatio? : Number, backgroundColor? : String, excludeComponents? : Array}} opts
	 * @return {String}
	 */
	echartInstance.prototype.getDataURL = function(opts){};
	
	
	/**
	 * Exports connected chart image; returns a base64 url; can be set to src of Image. Position of charts in exported image are related to that of the container.
	 * @param {{type? :String, pixelRatio? : Number, backgroundColor? : String, excludeComponents? : Array}} opts
	 * @return {String}
	 */
	echartInstance.prototype.getConnectedDataURL = function(opts){};
	
	/**
	 * The method is used in rendering millions of data (e.g. rendering geo data). In these scenario, the entire size of data is probably up to 10 or 100 MB, even using binary format. So chunked load data and rendering is required. When using appendData, the graphic elements that have been rendered will not be cleared, but keep rendering new graphic elements.
	 * @param {{seriesIndex? : String, data? : Array}} opts
	 * @return {String}
	 */
	echartInstance.prototype.appendData = function(opts){};
	
	
	/**
	 * Clears current instance; removes all components and charts in current instance. After clearing, getOption returns an empty object {}.
	 */
	echartInstance.prototype.clear = function(){};
	
	/**
	 * Returns whether current instance has been disposed.
	 * @return {Boolean}
	 */
	echartInstance.prototype.isDisposed = function(){};
	
	
	/**
	 * Disposes instance. Once disposed, the instance can not be used again.
	 */
	echartInstance.prototype.dispose = function(){};


var action = {
		
		highlight : {
			type : "",
			
		}
}