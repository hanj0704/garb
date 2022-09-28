///************************************************
// * verticalFill.module.js
// * Created at 2022. 1. 21. 오전 9:46:31.
// *
// * @author ryu
// ************************************************/
//
///************************************************
// * 전역 변수
// ************************************************/
//
//var ATTR_USE_VERTICAL_FILL = "use-vertical-fill";
//
///************************************************
// *  Constructor
// ************************************************/
//
//
///**
// * 
// * @param {cpr.controls.Container} container
// */
//function VFill(container) {
//	this._container = container;
//	this._appInstance = this._container.getAppInstance();
//	this._layout = this._container.getLayout();
//	
//	this._clipping = this._clipping.bind(this);
//	this._handleResize = this._handleResize.bind(this);
//	this._minHeight = 768;
//	this._originalConstraints = null;
//	
//	this._backup();
//	
//	this._appInstance.addEventListenerOnce("load", this._handleResize);
//
////	window.addEventListener("resize", this._handleResize);
//	window.addEventListener("resize", _.throttle(this._handleResize, 300));
//	
//	this._appInstance.addEventListenerOnce("unload", this._handleDispose.bind(this));
//	this.start();
//	
//}
//
//
///************************************************
// * 이벤트 필터
// ************************************************/
//
//
//VFill.prototype.start = function() {
//	if (this._container.getActualRect().width === 0){
//		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(this.start.bind(this));
//		return;
//	}
//	
//	this._handleResize();
//}
//
///**
// * 초기 컨스트레인트 상태 백업
// */
//VFill.prototype._backup = function() {
//	this._originalConstraints = new cpr.utils.ObjectMap();
//	
//	var children = this._container.getChildren();
////	for(var i = 0; i < children.length; i++){
//	var that = this;
//	children.forEach(function(each){
//		var a = each.getParent().getConstraint(each);
//		var b = JSON.parse(JSON.stringify(a));
//		that._originalConstraints.put(each, b);
//	});
////	}
//}
//
///**
// * 
// */
//VFill.prototype._handleDispose = function() {
//	window.removeEventListener("resize", this._handleResize);
//}
//
//
//VFill.prototype._handleResize = function() {
//	if (this._appInstance == null) return;
//	var appInstance = this._appInstance;
//	var container = this._container;
//	var layout = this._layout;
//	
//	console.log("handleResize");
//	
//	var available = window.innerHeight - layout.topMargin - layout.bottomMargin;
//	
//	if (appInstance.getHostAppInstance() != null) {
//		var offset = container.getActualRect().top + 1; // 보정치 추가
//		available -= offset;
//	}
//	
//	var target = this._getLastChild(container);
//	
//	if (target == null) return;
//
//	container.getChildren().forEach(function(each) {
//		if (each == target) return;
//		if (each.visible == false) return;
//		
//		available -= each.getActualRect().height;
//		available -= layout.spacing;
//	});
//	
//	// 만약 target이 그룹이고 내부 컨텐츠가 잘리는 상황이라면?
//	// 만약 탭 폴더여서 컨텐츠가 계속 변경되는 상황이라면?
//	var intersects = false;
////	(function(that, control, height){
//		cpr.core.DeferredUpdateManager.INSTANCE.update();
//		intersects = this._clipping(target, available);
////	})(this, target, available);
//		console.log(this._originalConstraints.get(target));
//
//	// resize가 필요한 상황에만 업데이트 (스크롤 크기를 넘어가는 경우는 실행하지 않도록)
//	if (!intersects && window.innerHeight > this._minHeight) { //if (available >= _limit) {
//		container.updateConstraint(target, {
//			autoSize: "none",
//			height: available + "px"
//		});
//	} else {
//		//FIXME 객체 간섭이 일어남
//		var constraint = this._originalConstraints.get(target);
////		constraint.autoSize = "height";
////		
////		// 대상 컨텐츠의 컨스트레인트를 원래대로 돌림
//		container.updateConstraint(target, constraint);
//	}
//
//	cpr.core.DeferredUpdateManager.INSTANCE.update();
//}
//
//
///**
// * 타켓을 가져옴
// * 마지막 컨트롤이 visible=false 인 경우 대상에서 제외함
// * @param {cpr.controls.Container} container
// * @return {cpr.controls.UIControl}
// */
//VFill.prototype._getLastChild = function(container) {
//	var target = null;
//	
//	var children = container.getChildren();
//	for(var i = children.length - 1; i < children.length; i--){
//		var each = children[i];
//		if (each.visible == true) { //TODO 제외 조건 추가
//			target = each;
//			break;
//		}
//	}
//	
//	return target;
//}
//
//VFill.prototype._clipping = function(control, height) {
//	if (control.type == "container"){
//		/** @type cpr.controls.Container */
//		var container = control;
//		
//		var viewport = container.getViewPortRect();
//		if (viewport.height > height){
//			return true;
//		}
//	} else if (control.type == "tabfolder") {
//		/** @type cpr.controls.TabFolder */
//		var tabfolder = control;
//	
//		var tabItem = tabfolder.getSelectedTabItem();
//		/** @type cpr.controls.Container */
//		var content = tabItem.content;
//		var layout = content.getLayout();
//		if (layout instanceof cpr.controls.layouts.VerticalLayout){
//			if (this._getLastChild(content) instanceof cpr.controls.Grid == false){
//				return true;
//			}
//		}
//	}
//	
//	return false;
//}
//
//
//cpr.events.EventBus.INSTANCE.addFilter("init", function(e) {
//	if (e.control instanceof cpr.core.AppInstance == true
//		&& e.control instanceof cpr.controls.UDCBase == false){
//		
//		/** @type cpr.core.AppInstance */
//		var appInstance = e.control;
//		var container = appInstance.getContainer();
//		if (container.userAttr(ATTR_USE_VERTICAL_FILL) == "true"){
//			new VFill(container);
//		}
//	}
//});
//
//cpr.events.EventBus.INSTANCE.addFilter("selection-change", function(e) {
//	/** @type cpr.controls.UIControl */
//	var control = e.control;
//	if (control.type == "tabfolder"){
//		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
////			var vFill = new VFill(control.getAppInstance().getContainer());
////			vFill.start();
//		});
//	}
//});
//
//
//
////VFill.prototype.f_selection = function(/* cpr.events.CSelectionEvent */ e) {
////	/** @type cpr.controls.UIControl */
////	var control = e.control;
////	
////	if (!_started || control.type == "mdifolder"){
////		return;
////	}
////	
////	_handleResize(e);
////}
////
////VFill.prototype.f_init = function( /* cpr.events.CEvent */ e) {
////	if (e.control instanceof cpr.core.AppInstance == true &&
////		e.control instanceof cpr.controls.UDCBase == false) {
////		
////		/** @type cpr.core.AppInstance */
////		var appInstance = e.control;
////		
////		var container = appInstance.getContainer();
////		var layout = container.getLayout();
////		
////		// 사용자 속성의 값이 true 이고, 루트 컨테이너의 레이아웃이 버티컬 레이아웃일 때 실행
////		if (container.userAttr(ATTR_USE_VERTICAL_FILL) != "true"){
////			return;
////		}
////
////		if (layout instanceof cpr.controls.layouts.VerticalLayout == false){
////			throw new cpr.exceptions.IllegalArgumentException("버티컬 레이아웃에서만 사용 가능합니다.");
////		}
////		
////		// 원래 컨스트레인트 저장
////		this._backup();
////		
////		// 여러 번 호출되는 등 불필요한 비용 발생 방지
////		window.addEventListener("resize", _.throttle(_handleResize, 300));
//////		window.addEventListener("resize", _.debounce(handleResize, 50));
////
////		appInstance.addEventListenerOnce("load", _handleResize);
////		
////		// 앱 언로드 시 이벤트 제거
////		appInstance.addEventListenerOnce("unload", function(e){
////			window.removeEventListener("resize", _handleResize);
////			_started = false;
////		});
////	}
////}