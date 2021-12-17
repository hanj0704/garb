exports.id = "sampleUtil.module.js";


{
	var SampleUtil = function() {
		
	}
	
	/**
	 * lengthUnit 속성값이 utf8인 인풋박스의 byteLength 길이를 가져옵니다.
	 * @param {cpr.controls.InputBox} inputbox 인풋박스
	 */
	SampleUtil.prototype.getUtfByteLength = function(/* cpr.controls.InputBox */inputbox){
		var byte = 0;
		var i = 0;
		var code;
		var target = inputbox;
		var inputValue = target.value;
		
		if(!inputbox){
			return;
		}
		
		if(target.lengthUnit != "utf8"){
			alert("lengthUnit 속성값이 utf8이어야합니다.");
			return;
		}
		
		if(inputValue.length == 0){
			return 0;
		}
		
		var index = 0;
		var length = inputValue.length;
		var output = [];
	
		for (; index < length - 1; ++index) {
			var charCode = inputValue.charCodeAt(index);
			if (charCode >= 0xD800 && charCode <= 0xDBFF) {
				charCode = inputValue.charCodeAt(index + 1);
				if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
					output.push(inputValue.slice(index, index + 2));
					++index;
	
					if (index == inputValue.length - 1) {
						return output;
					}
					continue;
				}
			}
			output.push(inputValue.charAt(index));
		}
		output.push(inputValue.charAt(index));
		
		var arr = output;
		
		for (byte = 0, i = 0; i < arr.length; i++) {
			code = arr[i].charCodeAt(0) > 127 ? '0x' + encodeURI(arr[i]).replace(/%/g, '') : arr[i].charCodeAt(0);
			code > 0xFFFFFF ? byte += 4 : byte += code >> 11 ? 3 : code >> 7 ? 2 : 1;
		};
		
		return byte;
	};
	
}


globals.SampleUtil = function() {
		return new SampleUtil();
}

