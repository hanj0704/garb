///************************************************
// * changer.module.js
// * Created at 2021. 4. 12. 오후 1:17:51.
// *
// * @author HANS
// ************************************************/
//// 의존 모듈 선언.
//module.depends("module/swiper_mobile");
//var mob = cpr.core.Module.require("module/swiper_mobile");
//var originConstraint;
//var originParent;
//
//cpr.events.EventBus.INSTANCE.addFilter("screen-change", function(e) {
//	var control = e.control;
//	if (control instanceof cpr.core.AppInstance) {
//		
//		if (control.id.indexOf("udc") != 0) {
//			
//			/** @type cpr.controls.Container[]*/
//			var vaSwipedContainer = control.getContainer().getAllRecursiveChildren().filter(function(ele) {
//				if (ele.userAttr("mobile-swiped") == "true") {
//					
//					return ele;
//				}
//			});
//			
//			if(vaSwipedContainer.length < 1) {
//				return;
//			}
//			var btns = vaSwipedContainer[0].getParent().getAllRecursiveChildren().find(function(ele){
//				if(ele.id =="btnFamilyInsert"){
//					return ele;
//				}
//			});
//			
//			if(btns) {
//				originConstraint = btns.getParent().getConstraint(btns);
//				originParent = btns.getParent();
//			}
//			if (e.screen.name != "default") {
//				cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
//					
//					if (vaSwipedContainer[0].getLayout() instanceof cpr.controls.layouts.VerticalLayout) {
//						vaSwipedContainer.forEach(function(each) {
//							
//							var vcSwipedContainer = each;
//							var voConst = vcSwipedContainer.getParent().getConstraint(vcSwipedContainer);
//							var vcSwipeCtrl = new cpr.controls.Container();
//							vcSwipeCtrl.style.setClasses("card-group vertical");
//							vcSwipeCtrl.userAttr("mobile-swiped", "true");
//							var voFlowLayout = new cpr.controls.layouts.FlowLayout();
//							voFlowLayout.scrollable = false;
//							voFlowLayout.lineWrap = false;
//							voFlowLayout.spacing = 0;
//							vcSwipeCtrl.setLayout(voFlowLayout);
//							vcSwipedContainer.getParent().addChild(vcSwipeCtrl, voConst);
//							var vnOriginChildLength = vcSwipedContainer.getChildren().length;
//							var visier;
//							vcSwipedContainer.getChildren().forEach(function(each, idx) {
//								var han = each.getParent().getConstraint(each);
//								if (vnOriginChildLength - 1 <= idx) {
//									each.addChild(btns,{
//										"width": "100px",
//										"height": "35px",
//										"autoSize": "none"
//									})
////									vcSwipeCtrl.addChild(each, han);
//								} else {
////									each.visible = false;
////									visier = each;
//								}
//									vcSwipeCtrl.addChild(each, han);
//								
//							});
//							
////							var btnq = new cpr.controls.Button();
////							btnq.value = "가족 구성원 추가";
////							btnq.style.setClasses("btn-secondary btn-innr");
////							vcSwipeCtrl.getChildren()[vnOriginChildLength - 2].addChild(btnq, {
////								"width": "100px",
////								"height": "35px",
////								"autoSize": "none"
////							});
//							btns.addEventListener("click", function(e){
//								console.log("ㅋㅋ~~");
//							});
//
//							vcSwipedContainer.dispose();
//							cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
//								
//								var slid = mob.slidify(vcSwipeCtrl);
//								slid.showCount = 1;
//								slid.itemSize = 0;
//								slid.navigationButtonClassName = "slide-btn-none"
//								slid.start();
//								
////								btnq.addEventListener("click", function(e) {
////									/** @type cpr.controls.UIControl */
////									var ctrl = vcSwipeCtrl.getChildren()[0].getChildren()[0];
////									var hh = visier.getParent().getConstraint(visier)
////									vcSwipeCtrl.getChildren()[0].addChild(visier, hh);
////									visier.visible = true;
////									slid.clear();
////									
////									slid.initialPage = 3;
////									slid.start();
////								});
//							});
//						});
//					}
//				});
//				
//			} else {
//				if (vaSwipedContainer[0].getLayout() instanceof cpr.controls.layouts.FlowLayout) {
//					vaSwipedContainer.forEach(function(each) {
//						var vcSwipedContainer = each;
//						
//						var voConstraint = vcSwipedContainer.getParent().getConstraint(vcSwipedContainer);
//						/** @type cpr.controls.Container */
//						var childParent = vcSwipedContainer.getChildren()[0];
//						
//						var vcVerticalContainer = new cpr.controls.Container();
//						var voVerticalLayout = new cpr.controls.layouts.VerticalLayout();
//						voVerticalLayout.spacing = 0;
//						voVerticalLayout.scrollable = false;
//						vcVerticalContainer.setLayout(voVerticalLayout);
//						vcVerticalContainer.style.setClasses("card-group vertical");
//						vcVerticalContainer.userAttr("mobile-swiped", "true");
//						
//						childParent.getChildren().forEach(function(each) {
//							
//							each.visible = true;
//							vcVerticalContainer.addChild(each, {
//								width: "1214px",
//								height: "300px",
//								autoSize: "height"
//							});
//						});
//						
//						vcSwipedContainer.getParent().addChild(vcVerticalContainer, voConstraint);
//						vcSwipedContainer.dispose();
//					});
//				}
//			}
//		}
//	}
//});