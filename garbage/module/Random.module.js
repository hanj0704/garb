var texts = [
	"Fly me to the moon",
	"And let me play among the stars",
	"Let me see what Spring is likes on Jupiter and Mars",
	"In other words, Hold my hand.",
	"In other words, Darling kiss me.",
	"Feel my heart with your song",
	"And let me sing forever more",
	"You are only a man all I worship and adore",
	"In ohter words, please be true.",
	"In ohter words, I love you."
];

var images = [
	"1.jpg",
	"2.jpg",
	"3.jpg",
	"4.jpg",
	"5.jpg",
	"6.jpg",
	"7.jpg",
	"8.jpg",
	"9.jpg",
	"10.jpg",
	"11.jpg",
	"12.jpg",
	"13.jpg",
	"14.jpg",
	"15.png"
];

/**
 * 임의의 텍스트를 얻습니다.
 * @param count (Optional) 문장 갯수.
 * @param join  (Optional) 문장의 join 문자.
 */
function randomText(count, join) {
	if (count == null) {
		count = 1;
	}
	if (join == null) {
		join = " ";
	}
	/** @type String[] */
	var result = [];
	for (var idx = 0; idx < count; idx++) {
		var index = Math.floor(Math.random() * texts.length);
		result.push(texts[index]);
	}
	return result.join(join);
}

function randomImage(){
	var index = Math.floor(Math.random() * images.length);
	return "data/img/asset/" + images[index];
}

function randomColor() {
	var r = Math.floor(Math.random() * 255) * 256 * 256;
	var g = Math.floor(Math.random() * 255) * 256;
	var b = Math.floor(Math.random() * 255);

	var result = (r + g + b).toString(16);
	if (result.length == 5) {
		result = "0" + result;
	}
	return "#" + result;
}

function createRandomMessage() {
	var message = new udc.Message();
	message.photo = randomImage();
	message.tintColor = randomColor();
	message.title = randomText();
	message.detail = randomText(4, " ");
	return message;
}

/**
 * Generates random HTML color code.
 * 
 * @returns {String}
 */
exports.randomColor = function() {
	return randomColor();
};

exports.randomText = randomText;
exports.randomImage = randomImage;
exports.createRandomMessage = createRandomMessage;
exports.createSeparator = function(){
	var result = new cpr.controls.Output();
	result.style.css("background", "#ccc");
	return result;
} 