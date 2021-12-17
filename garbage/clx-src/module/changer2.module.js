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
//var slid ;
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
//		
//			if (e.screen.name != "default") {
//				cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
//						if(btns) {
//				console.log("ztz");
//				originConstraint = btns.getParent().getConstraint(btns);
//				originParent = btns.getParent();
//			}
//					if (vaSwipedContainer[0].getLayout() instanceof cpr.controls.layouts.VerticalLayout) {
//						vaSwipedContainer.forEach(function(each) {
//							
//							var vcSwipedContainer = each;
////							var voConst = vcSwipedContainer.getParent().getConstraint(vcSwipedContainer);
////							var vcSwipedContainer = new cpr.controls.Container();
////							vcSwipedContainer.style.setClasses("card-group vertical");
////							vcSwipedContainer.userAttr("mobile-swiped", "true");
//							var voFlowLayout = new cpr.controls.layouts.FlowLayout();
//							voFlowLayout.scrollable = false;
//							voFlowLayout.lineWrap = false;
//							voFlowLayout.spacing = 0;
//							vcSwipedContainer.setLayout(voFlowLayout);
////							vcSwipedContainer.getParent().addChild(vcSwipedContainer, voConst);
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
//									vcSwipedContainer.addChild(each, han);
//								
//							});
//							
//
////							vcSwipedContainer.dispose();
//							cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
//								
//								slid = mob.slidify(vcSwipedContainer);
//								slid.showCount = 1;
//								slid.itemSize = 0;
//								slid.navigationButtonClassName = "slide-btn-none"
//								slid.start();
//								btns.addEventListener("click", function(e){
//								var last = vcSwipedContainer.getChildren()[0];
//								console.log(last.getLayout());
//								last.addChild(e.control,{
//									"width": "100px",
//									"height": "35px",
//									"autoSize": "none"
//								})
//								slid.clear();
//								slid.initialPage = vcSwipedContainer.getChildren().length-1;
//								slid.start();
//							});
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
////						var vcSwipedContainer = new cpr.controls.Container();
//						var voVerticalLayout = new cpr.controls.layouts.VerticalLayout();
//						voVerticalLayout.spacing = 0;
//						voVerticalLayout.scrollable = false;
//						vcSwipedContainer.setLayout(voVerticalLayout);
////						vcSwipedContainer.style.setClasses("card-group vertical");
////						vcSwipedContainer.userAttr("mobile-swiped", "true");
//						
//						childParent.getChildren().forEach(function(each) {
//							
//							each.visible = true;
//							vcSwipedContainer.addChild(each, {
//								width: "1214px",
//								height: "300px",
//								autoSize: "height"
//							});
//						});
//						originParent.addChild(btns,originConstraint);
//						console.log(originParent);
//						console.log(originConstraint);
//						childParent.dispose();
//						slid.disposs();
////						vcSwipedContainer.getParent().addChild(vcSwipedContainer, voConstraint);
////						vcSwipedContainer.dispose();
//					});
//				}
//			}
//		}
//	}
//});