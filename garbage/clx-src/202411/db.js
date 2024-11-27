/************************************************
 * db.js
 * Created at 2024. 11. 21. 오후 11:32:35.
 *
 * @author HAN
 ************************************************/

	let db;
/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e) {
	var button = e.control;
	debugger;
	let request = window.indexedDB.open("myDatabase", 1);
	request.onerror = function(event) {
		console.log("Database error: " + event.target.errorCode);
	};
	request.onsuccess = function(event) {
		db = event.target.result;
		console.log("Database opened successfully");
	};
	request.onupgradeneeded = function(event) {
		db = event.target.result;
		let objectStore = db.createObjectStore("myStore", {
			keyPath: "id",
			autoIncrement: true
		});
		objectStore.createIndex("name", "name", {
			unique: false
		});
		console.log("Object store created successfully");
	}
}

function addData(name, value) {
	let transaction = db.transaction(["myStore"], "readwrite");
	let objectStore = transaction.objectStore("myStore");
	let request = objectStore.add({
		name: name,
		value: value
	});
	request.onsuccess = function(event) {
		console.log("Data added successfully");
	};
	request.onerror = function(event) {
		console.log("Error adding data: " + event.target.errorCode);
	};
}
/*
 * "add" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e) {
	var button = e.control;
	 addData("exampleName", "exampleValue");
}
function readData(id,calls) {
    let transaction = db.transaction(["myStore"]);
    let objectStore = transaction.objectStore("myStore");

    let request = objectStore.get(id);

    request.onsuccess = function(event) {
        console.log("Data retrieved: ", request.result);
    };

    request.onerror = function(event) {
        console.log("Error reading data: " + event.target.errorCode);
    };
}

/*
 * "read" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	var button = e.control;
	readData(1);
}
function deleteDatabase(dbName) {
    let deleteRequest = window.indexedDB.deleteDatabase(dbName);

    deleteRequest.onerror = function(event) {
        console.log("Error deleting database: " + event.target.errorCode);
    };

    deleteRequest.onsuccess = function(event) {
        console.log("Database deleted successfully");
    };
}


/*
 * "delete" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(e){
	var button = e.control;
	deleteDatabase("myDatabase");
}
function clearObjectStore(dbName, storeName) {
    let request = window.indexedDB.open(dbName);

    request.onerror = function(event) {
        console.log("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        let db = event.target.result;
        let transaction = db.transaction([storeName], "readwrite");
        let objectStore = transaction.objectStore(storeName);

        let clearRequest = objectStore.clear();

        clearRequest.onsuccess = function(event) {
            console.log("All data cleared from the object store");
        };

        clearRequest.onerror = function(event) {
            console.log("Error clearing data from the object store: " + event.target.errorCode);
        };
    };
}



/*
 * "clear" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(e){
	var button = e.control;
	clearObjectStore("myDatabase", "myStore");
}
