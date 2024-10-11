/************************************************
 * T24567.js
 * Created at 2024. 10. 2. 오후 4:56:39.
 *
 * @author techdom
 ************************************************/


/**
 * @param {cpr.controls.TabItem} item
 * @return {cpr.controls.Button}
 */
function headerForItem(item) {
	return app.lookup("left-header").getChildren().find(function(e) {
		return e.userData("item") == item;
	});
}

/**
 * 
 * @param {cpr.controls.Button} button
 * @param {cpr.controls.TabItem} item
 */
function updateItem(button, item) {
	button.text = item.text;
	button.tooltip = item.tooltip;
}

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e) {
	app.lookup("mdi1").setItemsDelegate({
		onTabItemAdded: function(folder, item) {
			console.log("onAdd");
			console.time("add");
			var btn = headerForItem(item);
			if (!btn) {
				btn = new cpr.controls.Button();
				btn.userData("item", item);
				btn.ariaButtonType = "link";
				updateItem(btn, item);
				app.lookup("left-header").addChild(btn);
				btn.addEventListener("click", function() {
					app.lookup("mdi1").setSelectedTabItem(item);
				})
			}
		},
		onTabItemPropertyChanged: function(folder, item, property, oldValue, newValue) {
			console.log("propertychanged");
			console.time("changed");
			var button = headerForItem(item);
			if (button) {
				updateItem(button, item);
			}
		},
		onTabItemRemoved: function(folder, item) {
			console.log("removed");
			var button = headerForItem(item);
			if (button) {
				button.dispose();
			}
		},
		onTabItemSelected: function(folder, item) {
			console.log("ITEMSELECTED");
			app.lookup("left-header").getChildren().forEach(function( /* cpr.controls.Button*/ each) {
				if (each.userData("item") == item) {
					if (!each.style.hasClass("selected-item")) {
						each.style.addClass("selected-item");
						each.fieldLabel = each.text + ", 선택됨";
					}
				} else {
					if (each.style.hasClass("selected-item")) {
						each.style.removeClass("selected-item");
						each.fieldLabel = each.text;
						console.log(each.fieldLabel)
					}
				}
			});
		}
	});
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e) {
	app.lookup("mdi1").addItemWithApp("202410/T24567_pop")
}