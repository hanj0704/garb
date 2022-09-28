

var TmtFile = {
		
		inFormOrLink : false,
		
		getBrowser : function(){
			var ua = navigator.userAgent, tem, M = ua.match(/(edge(?=\/))\/?\s*(\d+)/i) || [];
	        if(M.length == 0){
	            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	        }
	        if (/trident/i.test(M[1])) {
	            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	            return  {name : 'IE', version :(tem[1] || '')};
	        }
	        if (M[1] === 'Chrome') {
	            tem = ua.match(/\bOPR\/(\d+)/);
	            if (tem != null) {
	                return  {name : 'Opera' ,version : tem[1]}
	            }
	        }
	        M = M[2] ? [ M[1], M[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];
	        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
	            M.splice(1, 1, tem[1]);
	        }
	        if(/MSIE/i.test(M[0])){
	            return {name : 'IE', version : M[1]};
	        }
	        return {name : M[0], version : M[1]};
		},
		
		__createIframe : function(psId, psSrc){
			 var voIfram = document.getElementById(psId);
			    if (voIfram != null && voIfram != undefined)
			        return voIfram;
			    var voIframe = document.createElement('iframe');
			    voIframe.setAttribute('id', psId);
			    voIframe.setAttribute('name', psId);
			    if (psSrc != null && psSrc != undefined)
			        voIframe.setAttribute('src', psSrc);
			    document.getElementById("file_content").appendChild(voIframe);
			    return voIframe;
			},
			
		__createForm : function(psAction){
			  var voUploadForm = document.createElement('form');
			    voUploadForm.setAttribute('method', 'post');
			    voUploadForm.setAttribute('action', psAction);
			    voUploadForm.setAttribute('accept-charset', 'utf-8');
			    document.getElementById("file_content").appendChild(voUploadForm);
			    return voUploadForm;
			},	
		__appendFileParams : function(poForm, psParamKey, psParamValue) {
		    var voInputElement = document.createElement('input');
		    voInputElement.setAttribute('type', 'hidden');
		    voInputElement.setAttribute('name', psParamKey);
		    voInputElement.setAttribute('value', psParamValue);
		    poForm.appendChild(voInputElement);
		},
		
		download : function(psDestUrl, psLocalUrl, pbVisibleDlg, psActionUrl, poParam){
			var vnVer = Math.random() * 10000;
		    vnVer = vnVer.toFixed(0);
		    var vsIframeId = 'iframe' + "file_content";
		    var vsformId = 'form' + vnVer.toString();
		    
		    
		    try {
		        if (psActionUrl) {
		            var voIframe = this.__createIframe(vsIframeId);
		            var voForm = this.__createForm(psActionUrl);
		            this.__appendFileParams(voForm, 'destUrl', psDestUrl);
		            this.__appendFileParams(voForm, 'localUrl', psLocalUrl);
		            voForm.setAttribute('target', vsIframeId);
		            voIframe.setAttribute('style', 'display:none;');
		            var vsName = null;
		            var vsValue = null;
		            if (poParam != null && typeof poParam == 'object') {
		                for (var i = 0; i < Object.keys(poParam).length; i++) {
		                    vsName = Object.keys(poParam)[i];
		                    vsValue = poParam[Object.keys(poParam)[i]];
		                    this.__appendFileParams(voForm, vsName, vsValue);
		                }
		            } else if (poParam != null && typeof poParam == 'string') {
		                var inParams = poParam.split('&');
		                for (var i = 0; i < inParams.length; i++) {
		                    var inParamsValues = inParams[i].split('=');
		                    if (inParamsValues != null && inParamsValues.length == 2) {
		                        vsName = inParamsValues[0];
		                        vsValue = inParamsValues[1];
		                        this.__appendFileParams(voForm, vsName, vsValue);
		                    }
		                }
		            }
		            var input = document.createElement('input');
		            input.type = 'submit';
		            voForm.appendChild(input);
		            voForm.addEventListener('submit', function () {
		                this.inFormOrLink = true;
		            });
		            voForm.submit();
		            voForm.reset();
		            document.getElementById("file_content").removeChild(voForm);
		            voForm = null;
		            voIframe = null;
		        } else {
		            if ('download' in document.createElement('a') && this.getBrowser().name != 'Edge') {
		                var aTag = document.createElement('a');
		                aTag.addEventListener('click', function () {
		                	this.inFormOrLink = true;
		                });
		                if (psLocalUrl) {
		                    aTag.download = psLocalUrl;
		                }
		                aTag.href = psDestUrl;
		                document.getElementById("file_content").appendChild(aTag);
		                aTag.click();
		                document.getElementById("file_content").removeChild(aTag);
		                aTag = null;
		            } else if (psLocalUrl && this.getBrowser().name == 'IE' || this.getBrowser().name == 'Edge') {
		                var xhr = new XMLHttpRequest();
		                xhr.open('post', psDestUrl, true);
		                xhr.responseType = 'blob';
		                xhr.onload = function (e) {
		                    if (this.status == 200) {
		                    	//수정필요.
		                        var file = new tmt.util.File();
		                        var blob = file.createBlob(this.response, this.getResponseHeader('Content-Type'));
		                        file.save(blob, psLocalUrl);
		                    }
		                };
		                xhr.send();
		            } else {
		                if (this.getBrowser().name == 'Safari') {
		                    alert('Safari는 열리는 새 창에서 \'다른 이름으로 저장\' 해주시기 바랍니다.');
		                }
		                var aTag = document.createElement('a');
		                aTag.addEventListener('click', function () {
		                	this.inFormOrLink = true;
		                });
		                aTag.target = '_blank';
		                aTag.href = psDestUrl;
		                document.getElementById("file_content").appendChild(aTag);
		                aTag.click();
		                document.getElementById("file_content").removeChild(aTag);
		                aTag = null;
		            }
		        }
		    } catch (err) {
		    	alert(err);
		        return false;
		    }
		    return true;
		}
};
