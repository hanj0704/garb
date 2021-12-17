/************************************************
 * dialog.module.js
 * Created at 2019. 3. 29. 오후 8:02:40.
 *
 * @author jeeeyul
 ************************************************/

/**
 * 다이얼로그를 애니메이션 처리 합니다.
 * 
 * @param {cpr.controls.Dialog} dialog
 */
function animafy(dialog) {
	dialog.style.css("opacity", "0");
	dialog.ready(function() {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
			dialog.style.css("opacity", "1");
			dialog.style.animateFrom({
				"opacity": "0",
				"transform": "translate3d(0px, 100%, 0px)"
			}, 0.3, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
		});

	});

	dialog.addEventListenerOnce("close", function(e) {
		e.preventDefault();
		dialog.style.animateTo({
			"transform": "translate3d(0px, 100%, 0px)",
			"opacity": "0"
		});
		dialog.addEventListenerOnce("transitionend", function() {
			dialog.close(e.returnValue);
		});
	});
}

globals.animafy = animafy;