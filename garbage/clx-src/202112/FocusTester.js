/************************************************
 * FocusTester.js
 * Created at 2021. 12. 3. 오후 5:17:47.
 *
 * @author HANS
 ************************************************/
var isIE = (cpr.core.Platform.INSTANCE.browserInfo.name == "ie");

window.addEventListener("focusin", function(ev){
	if(document.body == ev.relatedTarget){
		
		ev.preventDefault();
		app.lookup("ipb2").focus();
		
	} else {
		
		if(ev.relatedTarget == null || ev.relatedTarget == undefined) {
			
			ev.preventDefault();
			
			var a = app.lookup("ipb2");
			console.log(a.uuid);
			var b = document.getElementById("uuid-"+a.uuid);
			console.log(b);
			var c = b.lastChild.lastChild;
			console.log(c);
			c.focus();
			
//			console.log("WINDOW FOCUSIN OCCURED");
//			console.log(ev);
//			app.lookup("ipb2").focus();
			return false;
		}
	}
},true);