/************************************************
 * controlSelector.module.js
 * Created at 2020. 5. 20. 오후 7:13:20.
 *
 * @author ryu
 ************************************************/

/**
 * 자신과 연관된 상위 부모객체들 중에서 특정 appId를 가지고있는 앱 내에서 컨트롤을 찾아오는 함수입니다.
 * @param {cpr.core.AppInstance} app
 * @param {#app} appId
 * @param {String} ctrlId
 */
globals.getControlsFromParents = function(app, appId, ctrlId) {

    var _app = app;

    var hostApp = _app.getHost();
    var returnCtrl = null;
    var hostAppId = hostApp.getAppInstance().app.id == appId;
    do {
        var vcHostAppIns = hostApp.getAppInstance();
        if (vcHostAppIns.lookup(ctrlId)) {

            returnCtrl = vcHostAppIns.lookup(ctrlId);
        } else {

            hostApp = vcHostAppIns.getHost();

            if (!hostApp) {
                returnCtrl = null;
                try {
                    throw '해당컨트롤을찾을 수 없습니다'
                } catch (error) {
                  	console.log(error);
                    break;
                }
            }
            hostAppId = hostApp.getAppInstance().app.id == ctrlId;
            
        }
    }
    while (!hostAppId && !returnCtrl)


    return returnCtrl;
}


SelectUtil = {
	/**
	 * 루트 컨테이너 내에서 클래스명을 통해 일치 하는 첫 번째 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱스턴스
	 * @param {String} className 클래스명
	 * @param {#container} groupId? 그룹 ID (컨테이너 ID)
	 * @return {cpr.controls.UIControl}
	 * 
	 * @alt 특정 컨테이너 내에서 클래스명을 통해 일치 하는 첫 번째 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱스턴스
	 * @param {String} className 클래스명
	 * @param {#container} groupId? 그룹 ID (컨테이너 ID)
	 * @return {cpr.controls.UIControl}
	 * 
	 * @alt 자기 자신인 컨테이너를 포함하여 클래스명을 통해 일치 하는 첫 번째 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱스턴스
	 * @param {String} className 클래스명
	 * @param {#container} groupId? 그룹 ID (컨테이너 ID)
	 * @param {Boolean} includeSelf? 반환 값에 자기자신을 포함할 지 여부 (default=false)
	 * @return {cpr.controls.UIControl}
	 */
	getControlByClassName : function (app, className, groupId, includeSelf) {
		if (className == null || className == ""){
			return null;
		}
		
		var _app = app;
		
		/** @type cpr.controls.Container */
		var container = _app.lookup(groupId);

		if (container == null
			|| (container != null && container.type != "container")){
			container = _app.getContainer();
		}
		
		if (!_.isBoolean(includeSelf)){
			includeSelf = false;
		}
		
		var matchedControls = container.getAllRecursiveChildren(includeSelf).filter(function(each){
			return each.style.hasClass(className);
		});
		
		if (matchedControls.length > 0){
			return matchedControls[0];
		}
		
		return null;
	},
	
	/**
	 * 루트 컨테이너 내에서 클래스명을 가진 모든 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {String} className 클래스명
	 * @return {cpr.controls.UIControl[]}
	 * 
	 * @alt 특정 컨테이너 내에서 클래스명을 가진 모든 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {String} className 클래스명
	 * @param {#container} groupId? 그룹 ID (컨테이너 ID)
	 * @return {cpr.controls.UIControl[]}
	 * 
	 * @alt 자기 자신인 컨테이너를 포함하여 클래스명을 가진 모든 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {String} className 클래스명
	 * @param {#container} groupId? 그룹 ID (컨테이너 ID)
	 * @param {Boolean} includeSelf? 반환 값에 자기자신을 포함할 지 여부 (default=false)
	 * @return {cpr.controls.UIControl[]}
	 */
	getAllControlsByClassName : function (app, className, groupId, includeSelf) {
		if (className == null || className == ""){
			return null;
		}
		
		var _app = app;
		
		/** @type cpr.controls.Container */
		var container = _app.lookup(groupId);

		if (container == null
			|| (container != null && container.type != "container")){
			container = _app.getContainer();
		}
		
		if (!_.isBoolean(includeSelf)){
			includeSelf = false;
		}
		
		var matchedControls = container.getAllRecursiveChildren(includeSelf).filter(function(each){
			return each.style.hasClass(className);
		});
		
		return matchedControls;
	},
	
	/**
	 * 루트 컨테이너 내에서 컨트롤 타입을 통해 일치 하는 첫 번째 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {
	 * 	"accordion" | "audio" | "button" | "calendar" | "checkbox"
	 * 	| "checkboxgroup" | "combobox" | "dateinput" | "embeddedapp"
	 * 	| "embeddedpage" | "fileinput" | "fileupload" | "grid" | "treecell"
	 * 	| "container" | "htmlobject" | "htmlsnippet" | "image" | "inputbox"
	 * 	| "searchinput" | "linkedcombobox" | "linkedlistbox" | "listbox"
	 * 	| "maskeditor" | "mdifolder" | "menu" | "navigationbar" | "notifier"
	 * 	| "numbereditor" | "output" | "pageindexer" | "progress" | "radiobutton"
	 * 	| "uicontrolshell" | "slider" | "tabfolder" | "textarea" | "tree" | "dialog"
	 * 	| "video"
	 * } type 컨트롤 타입
	 * @return {cpr.controls.UIControl}
	 * 
	 * @alt 특정 컨테이너 내에서 컨트롤 타입을 통해 일치 하는 첫 번째 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {
	 * 	"accordion" | "audio" | "button" | "calendar" | "checkbox"
	 * 	| "checkboxgroup" | "combobox" | "dateinput" | "embeddedapp"
	 * 	| "embeddedpage" | "fileinput" | "fileupload" | "grid" | "treecell"
	 * 	| "container" | "htmlobject" | "htmlsnippet" | "image" | "inputbox"
	 * 	| "searchinput" | "linkedcombobox" | "linkedlistbox" | "listbox"
	 * 	| "maskeditor" | "mdifolder" | "menu" | "navigationbar" | "notifier"
	 * 	| "numbereditor" | "output" | "pageindexer" | "progress" | "radiobutton"
	 * 	| "uicontrolshell" | "slider" | "tabfolder" | "textarea" | "tree" | "dialog"
	 * 	| "video"
	 * } type 컨트롤 타입
	 * @param {String} groupId? 그룹 ID (컨테이너 ID)
	 * @return {cpr.controls.UIControl}
	 * 
	 * @alt 자기 자신인 컨테이너를 포함하여 클래스명을 통해 일치 하는 첫 번째 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {
	 * 	"accordion" | "audio" | "button" | "calendar" | "checkbox"
	 * 	| "checkboxgroup" | "combobox" | "dateinput" | "embeddedapp"
	 * 	| "embeddedpage" | "fileinput" | "fileupload" | "grid" | "treecell"
	 * 	| "container" | "htmlobject" | "htmlsnippet" | "image" | "inputbox"
	 * 	| "searchinput" | "linkedcombobox" | "linkedlistbox" | "listbox"
	 * 	| "maskeditor" | "mdifolder" | "menu" | "navigationbar" | "notifier"
	 * 	| "numbereditor" | "output" | "pageindexer" | "progress" | "radiobutton"
	 * 	| "uicontrolshell" | "slider" | "tabfolder" | "textarea" | "tree" | "dialog"
	 * 	| "video"
	 * } type 컨트롤 타입
	 * @param {String} groupId? 그룹 ID (컨테이너 ID)
	 * @param {Boolean} includeSelf? 반환 값에 자기자신을 포함할 지 여부 (default=false)
	 * @return {cpr.controls.UIControl}
	 */
	getControlByType : function(app, type, groupId, includeSelf) {
		if (type == null || type == ""){
			return null;
		}
		
		var _app = app;
		
		/** @type cpr.controls.Container */
		var container = _app.lookup(groupId);

		if (container == null
			|| (container != null && container.type != "container")){
			container = _app.getContainer();
		}
		
		if (!_.isBoolean(includeSelf)){
			includeSelf = false;
		}
		
		var matchedControls = container.getAllRecursiveChildren(includeSelf).filter(function(each){
			return each.type == type;
		});
		
		if (matchedControls.length > 0){
			return matchedControls[0];
		}
		
		return null;
	},
	/**
	 * 루트 컨테이너 내에서 특정 컨트롤 타입을 가진 모든 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {
	 * 	"accordion" | "audio" | "button" | "calendar" | "checkbox"
	 * 	| "checkboxgroup" | "combobox" | "dateinput" | "embeddedapp"
	 * 	| "embeddedpage" | "fileinput" | "fileupload" | "grid" | "treecell"
	 * 	| "container" | "htmlobject" | "htmlsnippet" | "image" | "inputbox"
	 * 	| "searchinput" | "linkedcombobox" | "linkedlistbox" | "listbox"
	 * 	| "maskeditor" | "mdifolder" | "menu" | "navigationbar" | "notifier"
	 * 	| "numbereditor" | "output" | "pageindexer" | "progress" | "radiobutton"
	 * 	| "uicontrolshell" | "slider" | "tabfolder" | "textarea" | "tree" | "dialog"
	 * 	| "video"
	 * } type 컨트롤 타입
	 * @return {cpr.controls.UIControl[]}
	 * 
	 * @alt 특정 컨테이너 내에서 특정 컨트롤 타입을 가진 모든 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {
	 * 	"accordion" | "audio" | "button" | "calendar" | "checkbox"
	 * 	| "checkboxgroup" | "combobox" | "dateinput" | "embeddedapp"
	 * 	| "embeddedpage" | "fileinput" | "fileupload" | "grid" | "treecell"
	 * 	| "container" | "htmlobject" | "htmlsnippet" | "image" | "inputbox"
	 * 	| "searchinput" | "linkedcombobox" | "linkedlistbox" | "listbox"
	 * 	| "maskeditor" | "mdifolder" | "menu" | "navigationbar" | "notifier"
	 * 	| "numbereditor" | "output" | "pageindexer" | "progress" | "radiobutton"
	 * 	| "uicontrolshell" | "slider" | "tabfolder" | "textarea" | "tree" | "dialog"
	 * 	| "video"
	 * } type 컨트롤 타입
	 * @param {String} groupId? 그룹 ID (컨테이너 ID)
	 * @return {cpr.controls.UIControl[]}
	 * 
	 * @alt 자기 자신인 컨테이너를 포함하여 특정 컨트롤 타입을 가진 모든 컨트롤을 찾습니다.
	 * @param {cpr.core.AppInstance} app 앱인스턴스
	 * @param {
	 * 	"accordion" | "audio" | "button" | "calendar" | "checkbox"
	 * 	| "checkboxgroup" | "combobox" | "dateinput" | "embeddedapp"
	 * 	| "embeddedpage" | "fileinput" | "fileupload" | "grid" | "treecell"
	 * 	| "container" | "htmlobject" | "htmlsnippet" | "image" | "inputbox"
	 * 	| "searchinput" | "linkedcombobox" | "linkedlistbox" | "listbox"
	 * 	| "maskeditor" | "mdifolder" | "menu" | "navigationbar" | "notifier"
	 * 	| "numbereditor" | "output" | "pageindexer" | "progress" | "radiobutton"
	 * 	| "uicontrolshell" | "slider" | "tabfolder" | "textarea" | "tree" | "dialog"
	 * 	| "video"
	 * } type 컨트롤 타입
	 * @param {String} groupId? 그룹 ID (컨테이너 ID)
	 * @param {Boolean} includeSelf? 반환 값에 자기자신을 포함할 지 여부 (default=false)
	 * @return {cpr.controls.UIControl[]}
	 */
	getAllControlsByType : function(app, type, groupId, includeSelf) {
		if (type == null || type == ""){
			return null;
		}
		
		var _app = app;
		
		/** @type cpr.controls.Container */
		var container = _app.lookup(groupId);

		if (container == null
			|| (container != null && container.type != "container")){
			container = _app.getContainer();
		}
		
		if (!_.isBoolean(includeSelf)){
			includeSelf = false;
		}
		
		var matchedControls = container.getAllRecursiveChildren(includeSelf).filter(function(each){
			return each.type == type;
		});
		
		return matchedControls;
	}
}
