//console.log('%cNo Debug!', 'font-size: 50px; font-weight: bold; color: #F00; text-shadow: 1px 1px #000, -1px -1px #000, -1px 1px #000, 1px -1px #000')
//console.log('%cStop!', 'font-size: 50px; font-weight: bold; color: #F00; text-shadow: 1px 1px #000, -1px -1px #000, -1px 1px #000, 1px -1px #000')

//language
var userLang = navigator.language || navigator.userLanguage; 
var res = userLang.split("-");
var lg = getLanguage('language');
checkMobile();
callLanguage(lg);
clearSessionStorage();
var divLanguageLi= "#"+lg;
$('#language-return').html($(divLanguageLi).html());

if (performance.navigation.type == 1) {
	  setCookie("isSubmit", false, -1 );
} else {
	  var valid_ = getCookie("isSubmit");
		if (valid_ == 'true'){
			var status = $('#res_login').val(); //EGOVHOTRO-9722
			switch(status) {
			  case '0':
				  var invalidCaptcha = $('#res_login').attr('invalid_captcha');
				  if(invalidCaptcha == '1'){
					  try{
						  $('#errorLogin>p').html(msg_validSaiMaXacNhan); break;
					  } catch(e){
						  $('#errorLogin>p').html('Sai mã xác nhận'); break;
					  }
				  }
				  $('#errorLogin>p').html(stringFormat(login_errMsg_invalidPassword, $('#res_login').attr('login_failed'))); break;
			  case '1':
				  $('#errorLogin>p').html(login_errMsg_locked); break;
			  case '-1':
				  $('#errorLogin>p').html(login_errMsg_invalidUser); break;
			  default:
				  $('#errorLogin>p').html(login_errMsg);
			}
			document.getElementById('errorLogin').style.display = '';
		}
		setCookie("isSubmit", false, -1 );
}

function callLanguage(languageKey, isApply){
	//document.getElementById("titlePage").innerHTML = login_title;
  	//document.getElementById("submitBtn").value = login_login;
  	//document.getElementById("btnLoginToken").value = login_logintoken;//nqanh add
	//document.getElementById("resetBtn").value = '{l0login.cancel}';
  	
  	$("#titlePage").val(login_title);
  	$("#submitBtn").val(login_login);
  	$("#btnLoginToken").val(login_logintoken);
  	
  	$("#xacThucBtn").val(login_xacThucBtn);
  	$("#reSentBtn").val(login_reSentBtn);
  	$("#returnBtn").val(login_returnBtn);
}
//Dropdown language
function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.dropdown > li');
	this.val = '';
	this.index = -1;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
		var obj = this;
		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			return false;
		});
	
		obj.opts.on('click',function(){
			var opt = $(this);
			obj.val = opt.text();
			obj.val = opt[0].innerHTML;
			obj.index = opt.index();
			obj.placeholder.text(obj.val);
			$('#language-return').html(opt[0].innerHTML);
			var data = returnKeyLg(opt[0].textContent.trim());
			callLanguage(data, true);
			setCookie('language', data, 1);
			window.location.href = "/" + app_param + "/main?lang=" + data;
		});
	},
	getValue : function() {
		return this.val;
	},
	getIndex : function() {
		return this.index;
	}
}

function returnKeyLg(languageName){
	if (languageName == 'VietNam'){
		return 'vi';
	}else if (languageName == 'Laos'){
		return 'la';
	} else if (languageName == 'English'){
		return 'en';
	} else if (languageName == 'Cambodia'){
		return 'kh';
	}
	return 'vi';
}
$(function() {
	var dd = new DropDown( $('#dd') );
});
//End Dropdown

function getLanguage(cname){
	var languageName = getCookie(cname);
	if (languageName == ""){
		var defined_language = $("#defined_language").val();
		if (defined_language == undefined || defined_language  == null || defined_language.length == 0){
			languageName = 'vi';
		}else {
			if (defined_language  == '-1'){
			  	languageName = res[0];
			}else {
				languageName = defined_language;
			}
		}
		window.location.href = "/" + app_param + "/main?lang=" + languageName;
		setCookie('language', languageName, 1);
	}
  	return languageName;
 }
//end

document.getElementById("userName").focus();
var exGnCapchar= "";
generalCapcha();
//add - - VNT
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkSubmit(){
	//setCookie("isSubmit", true, 1 );
	var xUser = document.getElementById("userName").value;
	var xPass = document.getElementById("passWord").value;
	var xData = document.getElementById("txtMaXacNhan").value;
	
	$('.help-error').hide();
	
	if (xUser.trim().length === 0){
		$('#validTen').show();
	}
	
	if (xPass.trim().length === 0){
		$('#validMatKhau').show();
	}
	if (xData.trim().length === 0){
		$('#validMaXacNhan').show();
	}
	
	if (xUser.trim().length === 0 || xPass.trim().length === 0 || (xData.trim().length === 0 && $('#txtMaXacNhan').is(':visible'))){
		return false;
	}
	
	setCookie("isSubmit", true, 1 );
	// vinhnt check submit -- multi app
	var frm = document.getElementById('form_login_qlvb');
	if(frm) {
	   //var n = xUser.trim().startsWith('admin.yensaokha');
	   //n = xUser.trim().endsWith('.yskha');
	   //if (n){
		   //$('#form_login_qlvb').attr('action', '/qlvbdh_kha_yensao/main');
	   //}
	}
	// done check
	EnableCaptcha(); // phucspeed
	//START IOFFICE 31029
	var ret = window.location.href.split("=");
	if(ret[ret.length -1] && ret[ret.length -2]?.includes('m2286')) {
		localStorage.setItem("idvanban", ret[ret.length -1]);
	}
	//END IOFFICE 31029
	return true;
}


// end add= - VNT

function  checkMobile() {
	var host_origin = window.location.host;
	if (host_origin == 'evpdt.sawaco.com.vn'){
		$("#qrCode").css("display","flex");
		$("#div_reset_matkhau").hide();
		$("#btnLoginToken").hide();
	}
	var isMobile_ = isMobile();
	if (isMobile_){
		$("#div_language_login").hide();
	}
}
function isMobile(){
   return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4)))
}

function onSubmit(e)
{
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return ;
	
	if (keycode == 13)
	   {
	   	a.submit();
	   }
	else
	   return;
}

function generalCapcha(){
	//Generates the captcha function
//	var a = Math.ceil(Math.random() * 9)+ ' ';
//	var b = Math.ceil(Math.random() * 9)+ ' ';
//	var c = Math.ceil(Math.random() * 9)+ ' ';
//	var d = Math.ceil(Math.random() * 9)+ ' ';
//	var e = Math.ceil(Math.random() * 9)+ ' ';
//	
//	var code = a + b + c + d + e;
//	
//	exGnCapchar = code.replace(/ /g , "");
//	
//	document.getElementById("txtCaptchaDiv").innerHTML = code;
	/*tat captcha
	exGnCapchar ="12345";
	document.getElementById("txtCaptchaDiv").innerHTML = "12345";
	*/
	getCaptcha('create', '');
	changeLoginFormView();
}

/// Check
var dbIndexed_;
try {
	var request = window.indexedDB.open("project_QLVB", 1);
	request.onerror = function(event) {
	   	console.log("error init: ");
	};
	request.onsuccess = function(event) {
		dbIndexed_ = request.result;
	   	clearDataIndexedDB();
	};
	request.onupgradeneeded = function(event) {
	   	var dbIndexed_ = event.target.result;
	   	var objectStore = dbIndexed_.createObjectStore("danhmuc", {keyPath: "id"});
	}
} catch(err) {
}

function clearDataIndexedDB() {
	var transaction = dbIndexed_.transaction(["danhmuc"], "readwrite");
	transaction.oncomplete = function(event) {
		//console.log("ok");
	};
	transaction.onerror = function(event) {
		console.log("error");
	};
  	var objectStore = transaction.objectStore("danhmuc");
  	var objectStoreRequest = objectStore.clear();
  	objectStoreRequest.onsuccess = function(event) {
    	//console.log("clear database success");
  	};
};
//nqanh add

var keyLicenseCA = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PExpY2Vuc2U+PFBoYW5NZW0+Vk5QVC1DQSBQbHVnaW48L1BoYW5NZW0+PE5ndW9pQ2FwPlZOUFQgSVQ8L05ndW9pQ2FwPjxEb25WaUR1b2NDYXA+cWx2Yi5jYW9iYW5nLmdvdi52bixodHRwOi8vcWx2Yi5jYW9iYW5nLmdvdi52bixodHRwczovL3FsdmIuY2FvYmFuZy5nb3Yudm4sdm5wdC1lb2ZmaWNlLnZucHRzb2Z0d2FyZS52bixodHRwOi8vdm5wdC1lb2ZmaWNlLnZucHRzb2Z0d2FyZS52bixodHRwczovL3ZucHQtZW9mZmljZS52bnB0c29mdHdhcmUudm4sdmFuYmFuLm1pYy5nb3Yudm4saHR0cDovL3ZhbmJhbi5taWMuZ292LnZuLGh0dHBzOi8vdmFuYmFuLm1pYy5nb3Yudm4scWx2Yi5oYW5vaS5kY3Mudm4saHR0cDovL3FsdmIuaGFub2kuZGNzLnZuLGh0dHBzOi8vcWx2Yi5oYW5vaS5kY3Mudm4sdGhhbmhwaG9xdWFuZ25nYWkuZ292LnZuLGh0dHA6Ly90aGFuaHBob3F1YW5nbmdhaS5nb3Yudm4saHR0cHM6Ly90aGFuaHBob3F1YW5nbmdhaS5nb3Yudm4scWx2Yi5sc3R0LnZuLGh0dHA6Ly9xbHZiLmxzdHQudm4saHR0cHM6Ly9xbHZiLmxzdHQudm4scWx2Yi5ob2lub25nZGFuLmxzdHQudm4saW9mZmljZS52aWVudGhvbmdsYW5nc29uLnZuLGVvZmZpY2UtdGFwZG9hbi52bnB0c29mdHdhcmUudm4sbG9jYWxob3N0LGVvZmZpY2Uudm5wdC52bixlLW9mZmljZS52bnB0LnZuLHFsdmIuZG9hbnRubHMudm4sa29udHVtLnZucHRpb2ZmaWNlLnZuLHZhbnBob25nZGllbnR1Lmxhbmdzb24uZ292LnZuLGVvZmZpY2UuMzZjb3JwLmNvbSxlb2ZmaWNlLnhpbWFuZ2hhbG9uZy52bix0dHl0aHV1bHVuZy52aWVudGhvbmdsYW5nc29uLnZuLHZhbnBob25nZGllbnR1Lmxhbmdzb24uZ292LnZuLGFjdi52bnB0aW9mZmljZS52bix2cGR0LnZucHRpb2ZmaWNlLnZuLGVkaC52bnB0aW9mZmljZS52bixxbHZiLnhpbWFuZ2JpbXNvbi5jb20udm4scWx2Yi5kb2FudGhhbmhuaWVuLnZuLGJydnQudm5wdGlvZmZpY2Uudm4scWx2Yi50dHl0YmFjc29uLnZuLGVvZmZpY2UudmljZW10YW1kaWVwLnZuLGVvZmZpY2UudmljZW10YW1kaWVwLmNvbS52bixxbHZiLnZpY2VtaGF0aWVuLnZuLGVvZmZpY2UudmNjaS1oY20ub3JnLnZuLHNnZC1obi52bnB0aW9mZmljZS52bix2cGR0bmV3Lm1hcmQuZ292LnZuLHFsdmIuaGFuYW0uZ292LnZuLGh1bmd5ZW4uZGNzLnZuLHFsdmJkaWVudHUueG1ocC52bixlb2ZmaWNlLmhjbXVsYXcuZWR1LnZuLGVvZmZpY2UudmljZW1idXRzb24udm4sYnRndHcuZGNzLnZuLGVjYWJpbmV0LnZuLGVjYWJpbmV0LnZucHQudm4sZGVtby5lY2FiaW5ldC52bnB0LnZuLGhjbV9lY2FiaW5ldC52bnB0LnZuLHRlc3QuZWNhYmluZXQudm4sa2hhY2htb2kuZWNhYmluZXQudm4sa2hhY2htb2kuZWNhYmluZXQudm5wdC52bixlb2ZmaWNlLnBjYzEudm4sa29udHVtX25ldy52bnB0aW9mZmljZS52bixkaWVuYmllbi52bnB0aW9mZmljZS52bixlb2ZmaWNlLnZucHR0aGFuaGhvYS52bixpb2ZmaWNlLnZucHRkYWtsYWsudm4scWx2Yi5odW5neWVuLnZucHQudm4sZG9uZ25haS52bnB0aW9mZmljZS52bix2bnB0aW9mZmljZS52bixxbHZiLmxhaWNoYXUuZ292LnZuPC9Eb25WaUR1b2NDYXA+PE5nYXlCYXREYXU+MDQvMjkvMjAyMiAwMDowMDowMDwvTmdheUJhdERhdT48TmdheUtldFRodWM+MDQvMjkvMjAyNSAwMDowMDowMDwvTmdheUtldFRodWM+PE1hY09TPjE8L01hY09TPjxTaWduYXR1cmUgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPjxTaWduZWRJbmZvPjxDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMteG1sLWMxNG4tMjAwMTAzMTUiIC8+PFNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIgLz48UmVmZXJlbmNlIFVSST0iIj48VHJhbnNmb3Jtcz48VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiIC8+PC9UcmFuc2Zvcm1zPjxEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjc2hhMSIgLz48RGlnZXN0VmFsdWU+UXFIakcxWmNmSXBXQmNBdlF6QmgwbnVKODRvPTwvRGlnZXN0VmFsdWU+PC9SZWZlcmVuY2U+PC9TaWduZWRJbmZvPjxTaWduYXR1cmVWYWx1ZT5NSGJHWFptOVZLZ3JaSEVPK0xHSFZiY1lCMjVpWnhvZU52emlGWUJMMnZoblJaN1o4a1hTVFU2anBYNFoxL1dLTENiZ01Td3JlQndnV3lBd0wrMXNLTmIzcDNLQm5sTTdQUjJ6ZHJwSHp3NUc4ZGE2Y1Q1enFxTExLeFNzN3RHVXorcC9mcExDOEE5Q0NxcmdOczBhS0xOY2dFb05yMjR4Q0hsclVHZVNPbC9SZDZJdmJ3RUw4NndHMWJWNFgvUEdHVEUwYUl3RC84OExZYlJqZG9sTlZ6cTlDMVRPTG8yMFpEaWlscHdsSDNrVWovcVhoTVZPVmtGM3RxK2pzVmtsa0tvaEMydVgvTk8ra1MwVmxkNXU5QzU4SGNXLzR1UmhPeCtaNHVIdnM4SGhRTzROdXY2d3hCU1EyZCt6aGR0dkV2WW5QeDU1OC93NGg1MjlSZ1JIQXc9PTwvU2lnbmF0dXJlVmFsdWU+PEtleUluZm8+PEtleVZhbHVlPjxSU0FLZXlWYWx1ZT48TW9kdWx1cz5wMjhjVVRub1hHOVVvNzU0cGp3ZFpHSDhtWDRWWlFrQXlrb3Foc0FwdmdZUHlVUUVrQkU2ZDlxc1pMMzZHdjFqRloxdktob25JNmZMRXhWcmJIRG05K0RlS2V6VklacVF2TGlzNjNnM2hybXpSdCtjL29BemE2T1JxZUJWVm1QaENYT3cvSkRyd3hIM0NMWnJsUjFYR3htc3Fsamk3K1ZNMHBDL0NJa2lnLzV0RnUvUEN1VGNUWS9OZi95Zm1NVDk3Tml5OU5uRk5YNWNRcURFWTVsU0NEb295MGhwU0NuY1lRc3VMY1FKQWZZenZ6dzlvb09qRmpZT1V2bWNlbURDMS8wRUU5ZGJXbFdldGZuVk5iOHN6b3FzTEJyTEFEQjFDaFNmbmw5b1FGekdRVmEwUmlKOXhPd1BvSjI1alFkVmltRTE4dlRNWldadG1HTlMycisrT1E9PTwvTW9kdWx1cz48RXhwb25lbnQ+QVFBQjwvRXhwb25lbnQ+PC9SU0FLZXlWYWx1ZT48L0tleVZhbHVlPjxYNTA5RGF0YT48WDUwOUNlcnRpZmljYXRlPk1JSUdSVENDQkMyZ0F3SUJBZ0lRVkFFa2ozeVhSRUk3d0s3S1IvY0hzakFOQmdrcWhraUc5dzBCQVFVRkFEQnBNUXN3Q1FZRFZRUUdFd0pXVGpFVE1CRUdBMVVFQ2hNS1ZrNVFWQ0JIY205MWNERWVNQndHQTFVRUN4TVZWazVRVkMxRFFTQlVjblZ6ZENCT1pYUjNiM0pyTVNVd0l3WURWUVFERXh4V1RsQlVJRU5sY25ScFptbGpZWFJwYjI0Z1FYVjBhRzl5YVhSNU1CNFhEVEUzTURJeU56QTVNekl3TUZvWERURTVNREl5TnpJeE16SXdNRm93Z1lveEN6QUpCZ05WQkFZVEFsWk9NUkl3RUFZRFZRUUlEQWxJdzRBZ1R1RzdtRWt4RlRBVEJnTlZCQWNNREVQaHVxZDFJRWRwNGJxbGVURXNNQ29HQTFVRUF3d2pWazVRVkNCVFQwWlVWMEZTUlNBdElGWk9VRlFnUTBFZ0xTQlVSVk5VSUZOSlIwNHhJakFnQmdvSmtpYUprL0lzWkFFQkRCSk5VMVE2TVRBeE5qZzJPVGN6T0Mwd01USXdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDbmJ4eFJPZWhjYjFTanZuaW1QQjFrWWZ5WmZoVmxDUURLU2lxR3dDbStCZy9KUkFTUUVUcDMycXhrdmZvYS9XTVZuVzhxR2ljanA4c1RGV3RzY09iMzRONHA3TlVobXBDOHVLenJlRGVHdWJORzM1eitnRE5ybzVHcDRGVldZK0VKYzdEOGtPdkRFZmNJdG11VkhWY2JHYXlxV09MdjVVelNrTDhJaVNLRC9tMFc3ODhLNU54Tmo4MS8vSitZeFAzczJMTDAyY1UxZmx4Q29NUmptVklJT2lqTFNHbElLZHhoQ3k0dHhBa0I5ak8vUEQyaWc2TVdOZzVTK1p4NllNTFgvUVFUMTF0YVZaNjErZFUxdnl6T2lxd3NHc3NBTUhVS0ZKK2VYMmhBWE1aQlZyUkdJbjNFN0ErZ25ibU5CMVdLWVRYeTlNeGxabTJZWTFMYXY3NDVBZ01CQUFHamdnSEZNSUlCd1RCd0JnZ3JCZ0VGQlFjQkFRUmtNR0l3TWdZSUt3WUJCUVVITUFLR0ptaDBkSEE2THk5d2RXSXVkbTV3ZEMxallTNTJiaTlqWlhKMGN5OTJibkIwWTJFdVkyVnlNQ3dHQ0NzR0FRVUZCekFCaGlCb2RIUndPaTh2YjJOemNDNTJibkIwTFdOaExuWnVMM0psYzNCdmJtUmxjakFkQmdOVkhRNEVGZ1FVYkg0aHRGc09iTEQxazBOb0NYanlGVHZaQ1Fzd0RBWURWUjBUQVFIL0JBSXdBREFmQmdOVkhTTUVHREFXZ0JRR2FjRFYxUUtLRlkxR2ZlbDg0bWdLVmF4cXJ6Qm9CZ05WSFNBRVlUQmZNRjBHRGlzR0FRUUJnZTBEQVFFREFRRUNNRXN3SWdZSUt3WUJCUVVIQWdJd0ZoNFVBRThBU1FCRUFDMEFVQUJ5QUMwQU1nQXVBREF3SlFZSUt3WUJCUVVIQWdFV0dXaDBkSEE2THk5d2RXSXVkbTV3ZEMxallTNTJiaTl5Y0dFd01RWURWUjBmQkNvd0tEQW1vQ1NnSW9ZZ2FIUjBjRG92TDJOeWJDNTJibkIwTFdOaExuWnVMM1p1Y0hSallTNWpjbXd3RGdZRFZSMFBBUUgvQkFRREFnVHdNRFFHQTFVZEpRUXRNQ3NHQ0NzR0FRVUZCd01DQmdnckJnRUZCUWNEQkFZS0t3WUJCQUdDTndvRERBWUpLb1pJaHZjdkFRRUZNQndHQTFVZEVRUVZNQk9CRVRGamFIVmpkWFZBWjIxaGFXd3VZMjl0TUEwR0NTcUdTSWIzRFFFQkJRVUFBNElDQVFBeXFpSlB2dmtDTU1GM0JCaVBaM0duZWhud3ZodG1EUkpqWlJSTm1iNTIyTHc4eVNxSXBvNTdnWElTbkxlM3FXeUMwR0NXYVZzL1dKNlRKZzNmQjFHYUhwMnVKRzhoR1YwZzVNSm5nZ0FrV0lISGJraGt5WGxLZC94eHZGN2xDV3NsaDdPTG8vRHdKelBjQVFLZERtb3NETGtMdXRsamlyS2dQMTE4WG1UcEplOWNuaFRHV3htUjQzUlhvMXBLNk1aSlMvMzVBMGFFY1VGd2xreU9KcEZ1eitHcmpxMnFLMllzVHB2TkludzNMWkR3UmtrWWpobUpPRStmdWtxZnA4V0ZjQnRFR3FXRGFCYm1xZ1p2Y2l0OXMrUm9pM1dlT014VUtyaTBmU0FLRGN1eG5mNHJ4aWZRMEJiYXM5SFVtTm02NVZFc20rZjVCMHZkU202UzdYOFpvNTR1UXRSZy9IZDFhQ1B5MEFGZGZhSGkrNmFkcXIyWnEzcHRNSVMxMDdsQ2RxMjZLeU4zUk14WXZoNU5ac2c4OEpjOUlObEd4TDU4V0Q5RUI3TXpGa1dtbkdiOUpjMXVrQUVhUFpBOXZ3WldaVUF0cFdPSWRUeE5tVXZzWmRsVkE5dkRjL1RuSlJiVWswYUN3dnFWV01halBQb3p0OC9DdnpIcXdjT3Vna0Z1YzcrOE05UkZpK1J0WlhBK2tyVE5nblRLSlJIZDE2M2RXc3kzZnB5RlU5UEFjeWt5VEtxRmZpbEZqTmlHODdYME1acnA0bExSY1N1RmtnSFk2ci9pSWtMdkZNNkRJclRKU3hEUDNiWG85akZsOVFPYWJTTmZvUHhLbTQxdTVHcXBlSlhqbE5OQURJK0dOdFdRNmczWjJtdVlXcFM1NE5VZEpOcnlHUHlMeEE9PTwvWDUwOUNlcnRpZmljYXRlPjwvWDUwOURhdGE+PC9LZXlJbmZvPjxPYmplY3Q+PFNpZ25hdHVyZVByb3BlcnRpZXMgeG1sbnM9IiI+PFNpZ25hdHVyZVByb3BlcnR5IElkPSJTaWduaW5nVGltZSIgVGFyZ2V0PSJzaWduYXR1cmVQcm9wZXJ0aWVzIj48U2lnbmluZ1RpbWU+MjAyMi0wNC0yOVQwNDoyMDoxMlo8L1NpZ25pbmdUaW1lPjwvU2lnbmF0dXJlUHJvcGVydHk+PC9TaWduYXR1cmVQcm9wZXJ0aWVzPjwvT2JqZWN0PjwvU2lnbmF0dXJlPjwvTGljZW5zZT4=";

function dangNhapBangToken() {
	try {
		// checkbrowser support
		vnpt_plugin.checkPlugin().then(function (data) {
			if (data === "1") {
				vnpt_plugin.setLicenseKey(keyLicenseCA).then(function (dataLicense) {
					if (JSON.parse(dataLicense).code === 1)
					{
						vnpt_plugin.getCertInfo().then(function (dataCert) {
							if (dataCert !== null && dataCert !== "") {
								var dataJS = {};		   
								var arrData = [];
								dataJS.data = "MTIzNDU2Nzg5MA==";
								dataJS.type = "cmsdetached";							
								var jsData = "";
								jsData += JSON.stringify(dataJS);
								var serial = JSON.parse(dataCert).serial;
								arrData.push(jsData);
								
								vnpt_plugin.signArrDataAdvanced(arrData, serial, true, null, true).then(function (dataArr) {
									document.getElementById('serialCertificate').value = JSON.parse(JSON.parse(dataArr)).serial;
					                document.getElementById('signedHash').value = JSON.parse(JSON.parse(dataArr)).data;
									setCookie("isSubmit", true, 1 );
									document.getElementById('submitToken').click();
								}).catch(function (e) {
									//console.log(e);
									document.getElementById('errorLogin').style.display = '';
								});
							}
						}).catch(function (e) {
							//console.log(e);
							document.getElementById('errorLogin').style.display = '';
						});
					}
					else
					{
						/*alert("Cài đặt License không thành công!");
						console.log(data);*/
						$('#errorLogin').find('p').text(msg_license_install_notfound);
						document.getElementById('errorLogin').style.display = '';
					}
				}).catch(function (e) {
					/*alert("Cài đặt License không thành công!");
					console.log(e)*/
					$('#errorLogin').find('p').text(msg_license_install_notfound);
					document.getElementById('errorLogin').style.display = '';
				});
			}
			else {
				// app dung cho ban 1.0.0.9 tro len
				if (vnpt_plugin.checkBrowserSupportWS()) {
					var protoUrl = "vnpt-plugin:\/\/resolve?domain=vnpt";
					window.protocolCheck("vnpt-plugin:\/\/resolve?domain=a", function () {
						//alert("VNPT-CA Plugin chưa được cài đặt hoặc chưa được bật");
						$('#errorLogin').find('p').text(msg_plugin_install_notfound);
						document.getElementById('errorLogin').style.display = '';
					});
				}                    
			}
		}).catch(function (e) {
			//alert("VNPT-CA Plugin chưa được cài đặt hoặc chưa được bật");
			$('#errorLogin').find('p').text(msg_plugin_install_notfound);
			document.getElementById('errorLogin').style.display = '';
		});
	}
	catch (e) {
		//console.log(e);
		document.getElementById('errorLogin').style.display = '';
	}
}
if(document.getElementById('serialCertificate')!=null){//neu kich hoat dang nhap token thi hien thi nut nay len
	document.getElementById('btnLoginToken').style.display = '';
}

function checkOtp(isReturn, resend){
	setCookie("isOtp", true, 1 );
	if (isReturn){
		$("#returnLogin").val('1');
		//document.getElementById('returnLogin').value = '1';
	}else {
		//document.getElementById('returnLogin').value = '0';
		$("#returnLogin").val('0');
	}
	document.getElementById('resendOtp').value = resend;
}
//end.nqanh add
function changeLoginFormView(){
	var host_origin = window.location.host;
	var host_pathname = window.location.pathname;
	
	if (!host_origin.includes("vnptsoftware.vn")) {
		$("#divThongBaoChung").hide();
	}

	if (host_origin == 'edh.vnptioffice.vn'){
		$("#logo_box_login").attr("src","login/image_schema/logo_EDH.png");
		$("#logo_box_login").css("cssText", "height: 37px !important;");
		$("#logo_box_header").attr("src","login/image_schema/logo_EDH.png");
		$("#logo_box_header").css("cssText", "height: 65px !important;");
		$("#title_login_system_info").html('Công Ty Cổ phần Phát triển Kỹ thuật Công nghệ EDH');
		
	} else if (host_origin == 'qlvb.doanthanhnien.vn'){
		//EGOVHOTRO-4056 ThanhNV add for doanthanhnien
		$("#div-contact-default").hide();
		$("#div-contact-dynamic").show();
		$("#logo_box_login").attr("src","login/image_schema/logo_trunguongdoan.png");
		$("#logo_box_login").css("cssText", "height: 37px !important;");
		$("#logo_box_header").attr("src","login/image_schema/logo_trunguongdoan.png");
		$("#logo_box_header").css("cssText", "height: 65px !important;");
		$("#title_login_system_info").html('Trung ương đoàn TNCS Hồ Chí Minh');
		
	} else if (host_origin == 'esign.vovtn.vn' || host_origin == 'vovtn.vnptioffice.vn'){
		$("#favicon_login_page_id").attr("href", "mycss/custom/favicon-tn.png");
		$("#logo_box_header").attr("src","login/img/logo_vov_tn.png");
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ CHƯƠNG TRÌNH PHÁT THANH DÂN TỘC');
		$("#title_login_system_info").html('VOV TÂY NGUYÊN');
		$(".wrap-login").css("max-width", "1030px");
		$(".box-login").attr("style", "width: 45% !important;");
		$('#numberInfoSingleLogin').text("085.665.1115");
		$('#linkAppMobileEof').find('span.text').find('span#text-setup-mobile').text("Cài đặt trên thiết bị di động: ");
	} else if (host_origin == 'eoffice.vcci-hcm.org.vn'){
		//EGOVHOTRO-5366 ThanhNV add for vcci
		$("#logo_box_login").attr("src","login/image_schema/logo_vcci.png");
		$("#logo_box_login").css("cssText", "height: 37px !important;");
		$("#logo_box_header").attr("src","login/image_schema/logo_vcci.png");
		$("#logo_box_header").css("cssText", "height: 65px !important;");
		$("#title_login_system_info").html('Phòng Thương mại và Công nghiệp Việt Nam <br> CHI NHÁNH TẠI TP. HỒ CHÍ MINH (VCCI-HCM) ');
		
		$(".sidebar").css("cssText","width: 90px !important; padding: 20px 20px 20px 3px !important;");
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.qlvbdh.hcm");
		$("#linkiOsMobileEof").attr("href","https://itunes.apple.com/vn/app/vnpt-ioffice-hcm/id1455802708?mt=8");
		
	} else if (host_origin == 'vinapaco.vnptioffice.vn'){
		$("#logo_box_login").attr("src","login/image_schema/logo_hcm_vinapaco.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_hcm_vinapaco.png");
		$("#title_login_system_info").html('CN TCT GIẤY VN TP HỒ CHÍ MINH');
		
	} else if (host_origin == 'sasco.vnptioffice.vn'){
		$("#logo_box_login").attr("src","login/image_schema/logo_hcm_sasco.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_hcm_sasco.png");
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN DICH VỤ HÀNG KHÔNG<br>TÂN SƠN NHẤT (SASCO)');
		
	} else if (host_origin == 'vpdtnew.mard.gov.vn' || host_origin == 'vpdt2.mard.gov.vn' || host_origin == 'vpdt.mard.gov.vn'){
		$("#logo_box_login").attr("src","login/image_schema/log_bnnptnn.png");
		$("#logo_box_header").attr("src","login/image_schema/log_bnnptnn.png");
		$("#favicon_login_page_id").attr("href", "login/image_schema/log_bnnptnn.png");
		$("#div-contact-default").html('');
		$("#contactDivLogin").hide();
		$("#div-contact-dynamic").show();
		$("#title_login_system").html('HỆ THỐNG VĂN PHÒNG ĐIỆN TỬ');
		$("#title_login_system_info").html('Bộ Nông nghiệp và Phát triển nông thôn');
		$("#divThongBaoChung").hide();
		$(".copyright").hide();
		$("#loginByToken").hide();
		
	} else if (host_origin == 'sgd-hn.vnptioffice.vn'){
		$("#logo_box_login").attr("src","login/image_schema/logo_sogddt_hn.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_sogddt_hn.png");
		$("#div-contact-default").html('');
		$("#numberInfoSingleLogin").html('024.39421429 hoặc 024.39421420');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: 23 Quang Trung, 81 Thợ Nhuộm, Hoàn Kiếm, Hà Nội.');
		$("#title_login_system_info").html('SỞ GIÁO DỤC VÀ ĐÀO TẠO HÀ NỘI');
		
	} else if (host_origin == 'eoffice.hcmulaw.edu.vn'){
		//EGOVHOTRO-5801 
		$("#logo_box_login").attr("src","login/image_schema/logo_ULAW.png");
		$("#logo_box_login").css("cssText", "height: 75px !important;");
		$("#logo_box_header").attr("src","login/image_schema/logo_ULAW.png");
		$("#logo_box_header").css("cssText", "height: 111px !important;");
		$("#title_login_system").html('TRƯỜNG ĐẠI HỌC LUẬT TP HỒ CHÍ MINH');
		$("#title_login_system_info").html('Slogan: "SÁNG TRI THỨC - VỮNG CÔNG MINH"');
		$(".sidebar").css("cssText","width: 90px !important; padding: 20px 20px 20px 3px !important;");
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.qlvbdh.hcm");
		$("#linkiOsMobileEof").attr("href","https://itunes.apple.com/vn/app/vnpt-ioffice-hcm/id1455802708?mt=8");
		
	} else if (host_origin == 'qlvbdientu.xmhp.vn'){
		//EGOVHOTRO-6625
		$("#div-contact-default").html('');
		$("#div-contact-vicem-hp").show();
		
	} else if (host_origin == 'eoffice.ximanghalong.vn'){
		//EGOVHOTRO-6844
		$("#title_login_system_info").html('Công ty Xi măng Vicem Hạ Long');
		$("#logo_box_header").attr("src","login/image_schema/logo_vicem_halong.png");
		$("#logo_box_header").css("cssText", "height: 80px !important;");
		
	} else if (host_origin == 'eoffice.pcc1.vn' || host_origin == 'eoffice.pc1group.vn'){ 
		//EGOVHOTRO-6747
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN TẬP ĐOÀN PC1');
		$("#logo_box_header").remove();
		$("#logo_box_login").attr("src","login/image_schema/logo_pcc1.png");
		$("#logo_box_header").css("cssText", "height: 90px !important;");
		$("#title_login_system_info").css("font-size", "29px");
		$("#div-contact-default").hide();
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html('<span class="text" style="font-weight: bold;" >Mr Hoan Mobile: </span>0936 061 083');
		$("#favicon_login_page_id").attr("href", "login/favicon/favicon_pcc1.png");
		
	} else if (host_origin == 'qlvb.vicemhatien.vn'){
		//EGOVHOTRO-6867
		$("#title_login_system_info").html('Công ty Cổ phần Xi măng Hà Tiên 1');
		$("#logo_box_header").attr("src","login/image_schema/logo_vicem_hatien.png");
		$("#logo_box_header").css("cssText", "height: 40px !important;");
		$("#textInfoContact").html('Liên hệ hỗ trợ: ');
		$("#div-contact-default").hide();
		$("#div-contact-vicem-hatien").show();
		$(".sidebar").css("cssText","display: none;");
		
	} else if (host_origin == 'eoffice.nhidong.org.vn'){
		//EGOVHOTRO-8743
		$("#logo_box_login").attr("src","login/image_schema/logo_hcm_bv_nhidong.png");
		$("#logo_box_login").css("cssText", "height: 75px !important;");
		$("#logo_box_header").attr("src","login/image_schema/logo_hcm_bv_nhidong.png");
		$("#logo_box_header").css("cssText", "height: 111px !important;");
		$("#title_login_system").html('BỆNH VIỆN NHI ĐỒNG 1');
		$("#title_login_system_info").html('"Thầy thuốc tận tâm - Chăm mầm đất nước"');
		
		$(".sidebar").css("cssText","width: 90px !important; padding: 20px 20px 20px 3px !important;");
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.qlvbdh.hcm");
		$("#linkiOsMobileEof").attr("href","https://apps.apple.com/vn/app/vnpt-ioffice-hcm/id1455802708");
		
		$("#title_login_system").removeClass("title");
		$("#title_login_system").addClass("title_bvnhidong1");
		
		$("#sub_comp_name").removeClass("comp-name");
		$("#sub_comp_name").addClass("comp-name_bvnhidong1");  
		$("#div_phone_number_detail").remove();
		
	} else if (host_origin == 'cv.ttn.edu.vn'){
		$("#logo_box_header").attr("src","login/image_schema/logo_dh_taynguyen_new.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_dh_taynguyen_new.png");
		$("#title_login_system_info").html('TRƯỜNG ĐẠI HỌC TÂY NGUYÊN');
		disableCaptcha(0);
		
	} else if (host_origin == 'thanhnien.thuathienhue.vn'){
		//EGOVHOTRO-12053
		$("#div-contact-default").hide();
		$("#div-contact-dynamic").show();
		$("#logo_box_login").attr("src","login/image_schema/logo_doanthanhnien.png");
		$("#logo_box_login").css("cssText", "height: 37px !important;");
		$("#logo_box_header").attr("src","login/image_schema/logo_doanthanhnien.png");
		$("#logo_box_header").css("cssText", "height: 65px !important;");
		$("#contact-dynamic").html('<span class="text" style="font-weight: bold;" >Hà Nội: </span>0945.783.112');
		$("#title_login_system_info").html('Tỉnh đoàn Thừa Thiên Huế');
		
	} else if (host_origin == 'qlvb.ninhthuan.dcs.vn' || host_origin == 'tuninhthuan.vnptioffice.vn'){
		//EGOVHOTRO-12327
		$("#logo_box_login").attr("src","login/image_schema/logo_dcsvn.png");
		$("#div-contact-default").html('');
		$("#numberInfoSingleLogin").html('024.3768.9347 | Fax: (0259) 3823600');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 04 Đường Hùng Vương, Tp Phan Rang Tháp Chàm, tỉnh Ninh Thuận');
		$("#title_login_system_info").html('TỈNH ỦY NINH THUẬN');
		$("#logo_box_header").remove();
		$("#divThongBaoChung").hide();
		
	} else if (host_origin == 'gnvb.tayninh.dcs.vn' || host_origin == 'tayninh.vnptioffice.vn'){
		//EGOVHOTRO-13453
		$("#logo_box_header").attr("src","login/image_schema/logo_tayninh.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_tayninh.png");
		$("#div-contact-default").hide();
		$("#div-contact-dynamic").show();
		$("#numberInfoSingleLogin").html('02763828829');
		$("#title_login_system_info").html('TỈNH ỦY TÂY NINH');
		$("#divThongBaoChung").hide();
	
	}  else if (host_origin == 'ioffice.hancorp.vn'){
		$("#logo_box_header").hide();
		$("#logo_box_login").attr("src","login/img/hancorp.png");
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("<span class=\"text\" style=\"font-weight: bold;\">Văn phòng TCT: </span>0243.943.9063");
		$("#title_login_system_info").html('TỔNG CÔNG TY XÂY DỰNG HÀ NỘI-CTCP');
		$("#favicon_login_page_id").attr("href", "login/favicon/hancorp.ico");
	}else if (host_origin == 'agribankyenbai.vn'){
		$("#logo_box_header").attr("src","login/image_schema/logo_agribankyenbai.png");
		$("#logo_box_login").hide();
		$("#title_login_system_info").html('NGÂN HÀNG NÔNG NGHIỆP VÀ PHÁT TRIỂN<br>NÔNG THÔN VIỆT NAM <br>CHI NHÁNH TỈNH YÊN BÁI');
		$("#numberInfoSingleLogin").html('02163.852.368');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 43, Đinh Tiên Hoàng, Phường Đồng Tâm, TP. Yên Bái');
		$("#favicon_login_page_id").attr("href", "login/favicon/favicon_agribank_ybi.ico");
	
	} else if (host_origin == 'agribanknamth.vnptioffice.vn'){
		$("#logo_box_header").attr("src","login/image_schema/logo_agribankyenbai.png");
		$("#logo_box_login").hide();
		$("#title_login_system_info").html('AGRIBANK CHI NHÁNH NAM THANH HÓA');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("<div class=\"row\" id=\"qrCode\" style=\"display: flex; justify-content: space-evenly;\"><div style=\"text-align: center;\"><div id=\"androidQR\"><a href=\"https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.th\"><img width=\"128\" height=\"128\" src=\"smart_admin/img/agriNamThAndroid.png\" style=\"display: block;\"></a></div><div class=\"row\" style=\"margin-top: 10px;\"><span>Android</span></div></div><div style=\"text-align: center;\"><div id=\"iOSQR\"><a href=\"https://install.appcenter.ms/orgs/egov-vnpt-it/apps/vnpt-ioffice-thanh-hoa/distribution_groups/ios\"><img width=\"128\" height=\"128\" src=\"smart_admin/img/agriNamThIOS.png\" style=\"display: block;\"></a></div><div class=\"row\" style=\"margin-top: 10px;\"><span>iOS</span></div></div></div>");
		$("#contactDivLogin").hide();
		$("#linkAppMobileEof").hide();
		$("#favicon_login_page_id").attr("href", "login/favicon/favicon_agribank_ybi.ico");
	} else if ( host_origin == 'dakruco.vnptioffice.vn' ){
		$("#logo_box_header").attr("src","login/image_schema/logo_dakruco_kotext.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_dakruco.png");
		$("#logo_box_login").css("height", "140px");
		$("#title_login_system_info").html('DAKRUCO');
		$("#title_login_system_info").css("font-family", "VNI-Cooper");
		$("#title_login_system_info").css("font-size", "40px");
		disableCaptcha(0);
	
	} else if ( host_origin == 'eoffice.cuulongcipm.com.vn'){
		$("#title_login_system").html('TỔNG CÔNG TY ĐẦU TƯ PHÁT TRIỂN & <br>QUẢN LÝ DỰ ÁN HẠ TẦNG GIAO THÔNG CỬU LONG');
		$("#title_login_system_info").html('');
		$("#title_dv_chuquan").html('BỘ GIAO THÔNG VẬN TẢI');
		$("#title_dv_chuquan").css("cssText", "padding-bottom: 36px; font-size: 27px;");
		$("#logo_box_header").hide();
		$("#logo_box_login").attr("src","login/image_schema/logo_cuulongcipm.png");
		$(".language-div").hide();
		$(".wrap-login").css("max-width", "940px");
		$("#numberInfoSingleLogin").html('0903685530');
	
	} else if ( host_origin == 'bdhc.vnptioffice.vn'){
		$("#title_login_system_info").html('Công ty Cổ phần Thủy điện Buôn Đôn');
		$("#logo_box_login").attr("src","login/image_schema/logo_dlk_bdhc.png");
		disableCaptcha(0);
	
	} else if (host_origin == 'eoffice.itel.vn'){
		//EGOVHOTRO-17054
		$("#logo_box_login").attr("src","login/image_schema/logo_itelecom_do.png");
		$("#logo_box_login").css("cssText", "height: 75px !important;");
		$("#logo_box_header").attr("src","login/image_schema/logo_itelecom_trang.png");
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ VĂN BẢN VÀ ĐIỀU HÀNH');
		$("#title_login_system_info").html('MẠNG DI ĐỘNG ITEL');	
		$('.info').hide();
	
	} else if (host_origin == 'eoffice.saigontourist.com.vn'){
		//EGOVHOTRO-19650
		$("#title_login_system").html('TỔNG CÔNG TY DU LỊCH SÀI GÒN');
		$("#title_login_system").css("cssText", "color: white;");
		$("#title_login_system_info").html('HỆ THỐNG QUẢN LÝ VĂN BẢN VÀ ĐIỀU HÀNH');
		$("#title_login_system_info").css("cssText", "color: yellow;");
		$("#logo_box_login").attr("src","login/image_schema/logo_saigontourist.png");
		$("#logo_box_login").css("cssText", "height: 110px !important;");
		$("#logo_box_header").hide();
	
	} else if (host_origin == 'oms.vnptdaklak.vn'){
		$("#title_login_system_info").html('Ngành giáo dục đắk lắk');
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ VĂN BẢN');
		$("#text-setup-mobile").html($("#text-setup-mobile").text().replace("eOffice",""));
		disableCaptcha(0);
	
	} else if (host_origin == 'vpdtnd.vnptioffice.vn'){
		$("#title_login_system_info").html('TỈNH NAM ĐỊNH');
		$("#numberInfoSingleLogin").html('(0228) 3632632 - (0228) 3848229');
		
	} else if (host_origin == 'ndunnamdinh.vnptioffice.vn'){
		$("#title_login_system_info").html('TRƯỜNG ĐẠI HỌC ĐIỀU DƯỠNG NAM ĐỊNH');
		$("#logo_box_header").attr("src","login/image_schema/logo_ndh_dhdieuduong.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_ndh_dhdieuduong.png");
		$("#numberInfoSingleLogin").html('(0228) 3649 666');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 257 Đường Hàn Thuyên - Thành phố Nam Định');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Website: www.ndun.edu.vn; Email: dieuduong@ndun.edu.vn");
	
	} else if (host_origin == 'portal.camphaport.com.vn'){
		$("#logo_box_login").hide();
		$("#title_login_system_info").html('CÔNG TY KHO VẬN VÀ CẢNG CẨM PHẢ');
		$("#logo_box_header").attr("src","login/img/logo_campha.png");
	} else if (host_origin == 'portal.thanthongnhat.vn'){
		$("#title_login_system_info").html('CÔNG TY THAN THỐNG NHẤT - TKV');
		$("#logo_box_header").attr("src","login/img/logo_thanthongnhat.png");
	} else if (host_origin == 'xlvb.bdvtw.dcs.vn'){
		$("#title_login_system").html('BAN DÂN VẬN TRUNG ƯƠNG');
		$("#title_login_system").css("cssText", "padding-bottom: 36px; font-size: 35px; color: crimson;");
		$("#title_login_system_info").html('');
		$("#logo_box_header").attr("src","login/image_schema/logo_bandanvan.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_bandanvan.png");
		$("#numberInfoSingleLogin").html('080.43893');
	
	} else if (host_origin == 'mpi.e-office.gov.la') {
		//EGOVHOTRO-22622
		try {
			$("#title_login_system_info").html(login_systemInfo_mpi);
			var strHtml = '<p>' + login_address_mpi + ' </p><p class="text">' + login_phonenumber_mpi + ' </p><p class="text">' + login_email_mpi + ' </p>';
			$("#contactDivLogin").html(strHtml);

			$("#logo_box_header").attr("src","login/img/logo_mpi.png");
			$("#logo_box_login").attr("src","login/img/lao.png");
			$("#favicon_login_page_id").attr("href", "login/img/logo_mpi.png");
			$("#titlePage").html("E-Office MPI");
		} catch (e) {

		}
		
	} else if (host_origin == 'dri.vnptioffice.vn') {
		$("#title_login_system_info").html("CÔNG TY CỔ PHẦN ĐẦU TƯ CAO SU ĐẮK LẮK");
		$("#logo_box_header").attr("src","login/image_schema/logo-DRI.png");
		$("#logo_box_login").attr("src","login/image_schema/logo-DRI.png");
		$("#favicon_login_page_id").attr("href", "login/image_schema/logo-DRI.png");
		disableCaptcha(0);
	
	} else if (host_origin == 'vpdt-lamdong.vnptioffice.vn'){
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		
	} else if (host_origin == 'lananhvillage.vnptioffice.vn'){
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		
	} else if (host_origin == 'qh_hdlamdong.vnptioffice.vn' || host_origin == 'qh-hdlamdong.vnptioffice.vn'){
		$("#title_login_system_info").html('VĂN PHÒNG ĐOÀN ĐẠI BIỂU QUỐC HỘI VÀ HỘI ĐỒNG NHÂN DÂN TỈNH LÂM ĐỒNG');
		$("#logo_box_header").attr("src","login/img/vnpt.png");
		$("#numberInfoSingleLogin").html('02633.822.821');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 02 Trần Hưng Đạo Phường 3, Thành Phố Đà Lạt, tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
	
	} else if (host_origin == 'baolam.vnptioffice.vn'){
		$("#title_login_system_info").html('HỘI ĐỒNG NHÂN DÂN - ỦY BAN NHÂN DÂN - HUYỆN BẢO LÂM');
		$("#logo_box_login").attr("src","login/image_schema/logo_baolam.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_baolam.png");
		$("#numberInfoSingleLogin").html('02633.877027 - 02633.877180');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 09 Nguyễn Tất Thành - Thị trấn Lộc Thắng - Huyện Bảo Lâm - Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'cattien.vnptioffice.vn'){
		$("#title_login_system_info").html('UBND HUYỆN CÁT TIÊN');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_cattien.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_cattien.png");
		$("#numberInfoSingleLogin").html('0263.3884.005 - Fax: 0263.3884.455');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: ubndcattien@lamdong.gov.vn");
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Tổ dân phố 13, Thị trấn Cát Tiên, huyện Cát Tiên, tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'caodangcnktbl.vnptioffice.vn'){
		$("#title_login_system_info").html('TRƯỜNG CAO ĐẲNG CÔNG NGHỆ & KINH TẾ BẢO LỘC');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_caodangcnktbl.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_caodangcnktbl.png");
		$("#numberInfoSingleLogin").html('02633 864 102');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 454 Trần Phú, Phường 2, TP. Bảo Lộc, Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'blaowaco.vnptioffice.vn'){
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN CẤP THOÁT NƯỚC VÀ XÂY DỰNG BẢO LỘC');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_blaowaco.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_blaowaco.png");
		$("#numberInfoSingleLogin").html('02633.864073');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: Blaowaco@yahoo.com.vn");
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 56, Lê Thị Pha, Phường 1, Thành phố Bảo Lộc, Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'banqldagtlamdong.vnptioffice.vn'){
		$("#title_login_system_info").html('BAN QUẢN LÝ DỰ ÁN GIAO THÔNG TỈNH LÂM ĐỒNG');
		$("#numberInfoSingleLogin").html('(02633) 3822117 - Fax: (02633) 3820212');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Tầng 5 - Trung tâm hành chính tỉnh Lâm Đồng, 36 Trần Phú - Phường 4 - Đà Lạt - Lâm Đồng');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: bqldagt@lamdong.gov.vn");
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'lamha.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN - HUYỆN LÂM HÀ');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_lamha.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_lamha.png");
		$("#numberInfoSingleLogin").html('0263.3850329 - Fax: 0263.3850340');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Đường Thống Nhất - Thị Trấn Đinh Văn - Huyện Lâm Hà - Tỉnh Lâm Đồng');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: ubndlamha@lamdong.gov.vn");
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'cdytld.vnptioffice.vn'){
		$("#title_login_system_info").html('TRƯỜNG CAO ĐẲNG Y TẾ LÂM ĐỒNG');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_truong_cdyt.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_truong_cdyt.png");
		$("#numberInfoSingleLogin").html('0263 822153');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 16 Ngô Quyền, Phường 6, Thành phố Đà Lạt, Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'dalattuyenlam.vnptioffice.vn'){
		$("#title_login_system_info").html('BAN QUẢN LÝ KHU DU LỊCH QUỐC GIA HỒ TUYỀN LÂM');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_hotuyenlam.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_hotuyenlam.png");
		$("#numberInfoSingleLogin").html('0263.3531537- 0263.3531538');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 29 đường Ba tháng Tư, Phường 3, Thành phố Đà Lạt, tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'ttbtxhlamdong.vnptioffice.vn'){
		$("#title_login_system_info").html('TRUNG TÂM BẢO TRỢ XÃ HỘI TỈNH LÂM ĐỒNG');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_btxh.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_btxh.png");
		$("#numberInfoSingleLogin").html('0263 3834 805');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 233 Đường Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt, Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'lacduong.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN HUYỆN LẠC DƯƠNG');
		$("#logo_box_login").attr("src","login/image_schema/logo_lacduong.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_lacduong.png");
		$("#numberInfoSingleLogin").html('0263.3839046');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 36, Bi Đoup - TT. Lạc Dương - Huyện Lạc Dương - Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'sgdlamdong.vnptioffice.vn'){
		$("#title_login_system_info").html('SỞ GIÁO DỤC VÀ ĐÀO TẠO LÂM ĐỒNG');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_sgd.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_sgd.png");
		$("#numberInfoSingleLogin").html('02633. 822.488 - 02633.532.586');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Tầng 9 - Khu trung tâm hành chính Số 36 - Trần Phú - Phường 4 - TP Đà Lạt');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'dateh.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN HUYỆN ĐẠ TẺH');
		$("#logo_box_login").attr("src","login/image_schema/logo_datehok.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_datehok.png");
		$("#numberInfoSingleLogin").html('0263.3880348- Fax: 0263.3880150');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Tổ dân phố 1B, Thị trấn Đạ Tẻh, huyện Đạ Tẻh, tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'damrong.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN HUYỆN ĐAM RÔNG');
		$("#logo_box_login").attr("src","login/image_schema/logo_huyendamrong_ldg.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_huyendamrong_ldg.png");
		$("#numberInfoSingleLogin").html('0263.3616040 - Fax: 0263.3616040');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Thôn 1 xã Rô Men huyện Đam Rông tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'dukdn.vnptioffice.vn'){
		$("#title_login_system_info").html('ĐẢNG ỦY KHỐI DOANH NGHIỆP - TỈNH LÂM ĐỒNG');
		$("#logo_box_login").attr("src","login/img/vnpt.png");
		$("#logo_box_header").attr("src","login/img/vnpt.png");
		$("#numberInfoSingleLogin").html('02633.822612');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 10 Đường Lê Hồng Phong, Phường 4, Thành phố Đà Lạt, Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);

	} else if (host_origin == 'edocstttt.vnptioffice.vn'){
		$("#title_login_system_info").html('SỞ THÔNG TIN VÀ TRUYỀN THÔNG - TỈNH LÂM ĐỒNG');
		$("#logo_box_login").attr("src","login/img/vnpt.png");
		$("#logo_box_header").attr("src","login/img/vnpt.png");
		$("#numberInfoSingleLogin").html('02633 541 546');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Tầng 8, Trung tâm hành chính tỉnh Lâm Đồng, 36 Trần Phú - Phường 4 - Thành phố Đà Lạt - Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'cckl.vnptioffice.vn'){
		$("#title_login_system_info").html('CHI CỤC KIỂM LÂM LÂM ĐỒNG');
		$("#logo_box_login").attr("src","login/image_schema/logo_kiemlam_ldg.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_kiemlam_ldg.png");
		$("#numberInfoSingleLogin").html('02633 822 441');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 04 - Yên Thế - Phường 10 - TP. Đà Lạt - Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'dalat.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN THÀNH PHỐ ĐÀ LẠT');
		$("#logo_box_login").attr("src","login/image_schema/logo_tpdalat.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_tpdalat.png");
		$("#numberInfoSingleLogin").html('0263.3822386; Fax: 0263.3823070');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 02 Trần Nhân Tông, Thành phố Đà Lạt, Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'qlhs-lamdong.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN TỈNH LÂM ĐỒNG');
		$("#logo_box_login").attr("src","login/image_schema/logo_lamdong_hslt.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_lamdong_hslt.png");
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 04 Trần Hưng Đạo, Phường 3, Thành phố Đà Lạt, Lâm Đồng');
		$("#contactDivLogin").hide();
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'ykhoapasteurdalat.vnptioffice.vn'){
		$("#title_login_system_info").html('TRUNG TÂM Y KHOA PASTEUR ĐÀ LẠT');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_pateur.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_pateur.png");
		$("#numberInfoSingleLogin").html('1900 1042');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 16 Đường Lê Hồng Phong, Phường 4, Thành phố Đà Lạt, Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
	
	} else if (host_origin == 'bidoupnuiba.vnptioffice.vn'){
		$("#title_login_system_info").html('VƯỜN QUỐC GIA BIDOUP NÚI BÀ');
		$("#logo_box_login").attr("src","login/image_schema/logo_ldg_bidoupnuiba.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ldg_bidoupnuiba.png");
		$("#numberInfoSingleLogin").html('02633.502.005');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: bidoupnuiba@gmail.com");
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Tiểu khu 97 - Xã Đạ Nhim - Huyện Lạc Dương - Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);

	} else if (host_origin == 'qlvbbentre.vnptioffice.vn'){
		$("#title_login_system_info").html('VNPT IOFFICE TỈNH BẾN TRE');
		
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.bte");
		$("#linkiOsMobileEof").attr("href","https://tiny.app.link/z9C1S0o6Veb");
		disableCaptcha(0);
	
	} else if (host_origin == 'vbdhhoabinh.vnptioffice.vn'){
		$("#title_login_system").html('TỈNH ỦY HÒA BÌNH');
		$("#title_login_system").css("font-size", "30px");
		$("#title_login_system_info").html('HỆ THỐNG VĂN BẢN VÀ ĐIỀU HÀNH');
		$("#title_login_system_info").css("font-size", "25px");
		$("#logo_box_header").attr("src","login/img/logo-dang.png");
		$("#logo_box_header").css("cssText", "height: 65px !important;");
		$("#logo_box_login").attr("src","login/img/logo-dang-1.png");
		
		$("#numberInfoSingleLogin").html('02183.852.783');
		$("#div_language_login").hide();
		
	} else if (host_origin == 'tinhuylaichau.vnptioffice.vn'){
		$("#title_login_system_info").html('TỈNH ỦY LAI CHÂU');
		$("#title_login_system_info").css("font-size", "30px");
		$("#logo_box_header").attr("src","login/img/logo-dang.png");
		$("#logo_box_header").css("cssText", "height: 65px !important;");
		$("#logo_box_login").attr("src","login/img/logo-dang-1.png");
		$('#contactDivLogin').hide();
		$('#linkAppMobileEof').hide();
		$("#div_language_login").hide();
	
	} else if (host_origin == 'c11.bocongan.vn'){
		$("#title_login_system_info").html('CỤC CẢNH SÁT QUẢN LÝ TẠM GIỮ, TẠM GIAM VÀ THI HÀNH ÁN HÌNH SỰ TẠI CỘNG ĐỒNG');
		$("#logo_box_header").attr("src","login/img/logo_CA.png");
		$("#logo_box_login").attr("src","login/img/logo_CA.png");
		$(".copyright").hide();
	
	} else if (host_origin == 'vpdt_datc.vnptioffice.vn'){
		$("#title_login_system_info").html('CÔNG TY TNHH MUA BÁN NỢ VIỆT NAM');
		$("#logo_box_header").remove();
		$(".copyright").hide();
	
	} else if (host_origin == 'nhomdaknong.vnptioffice.vn'){
		$("#title_login_system_info").html('CÔNG TY NHÔM ĐẮK NÔNG - TKV');
		$("#logo_box_header").attr("src","login/img/logo_vinacomin.png");
		$("#numberInfoSingleLogin").html('0828.123.355');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Thôn 11, Xã Nhân Cơ, Huyện Đắk R\'Lấp, Đắk Nông');
		
	} else if (host_origin == 'tinhuyvinhlong.vnptioffice.vn' || host_origin == 'qlcvtinhuy.vinhlong.dcs.vn'){
		$("#title_login_system_info").html('TỈNH ỦY VĨNH LONG');
		$("#logo_box_header").attr("src","login/img/logo-dang.png");
		$("#favicon_login_page_id").attr("href", "login/favicon/favicon_dang.ico");
		$("#contactDivLogin").hide();
		$(".copyright").hide();
		
	} else if (host_origin == 'sottttphuyen.vnptioffice.vn' || host_origin == 'vpdt-sotttt.phuyen.gov.vn'){
		$("#title_login_system_info").html('SỞ THÔNG TIN VÀ TRUYỀN THÔNG PHÚ YÊN');
		$("#logo_box_header").attr("src","login/img/logo_so4t_pyn.png");
		//$("#numberInfoSingleLogin").html('02573.888.999');
		
	} else if (host_origin == 'qlvb.daknong.gov.vn'){
		$("#title_login_system_info").html('TỈNH ĐẮK NÔNG');
		$("#logo_box_header").attr("src","login/image_schema/logo_daknong.png");
		$("#numberInfoSingleLogin").html('02616.260.203; Fax: 02616.260.203');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Đường 23/3 - Phường Nghĩa Đức - Thành phố Gia Nghĩa - Tỉnh Đắk Nông');
	
	} else if (host_origin == 'baoloc.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN THÀNH PHỐ BẢO LỘC');
		$("#logo_box_login").attr("src","login/image_schema/logo_TPBAOLOC.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_TPBAOLOC.png");
		$("#numberInfoSingleLogin").html('0941583058');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 01 Kim Đồng - Phường 1 - Thành phố Bảo Lộc - Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'dilinh.vnptioffice.vn'){
		$("#title_login_system_info").html('UỶ BAN NHÂN DÂN HUYỆN DI LINH');
		$("#logo_box_login").attr("src","login/image_schema/logo_di_linh.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_di_linh.png");
		$("#numberInfoSingleLogin").html('02633.870365');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 41 Trần Hưng Đạo, Huyện Di Linh, Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
	
	} else if (host_origin == 'ductrong.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN HUYỆN ĐỨC TRỌNG');
		$("#logo_box_header").attr("src","login/img/vnpt.png");
		$("#numberInfoSingleLogin").html('(02633) 844132');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Quốc lộ 20, Thị trấn Liên Nghĩa, Huyện Đức Trọng, Tỉnh Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
	
	} else if (host_origin == 'donduong.vnptioffice.vn'){
		$("#title_login_system_info").html('ỦY BAN NHÂN DÂN HUYỆN ĐƠN DƯƠNG');
		$("#logo_box_login").attr("src","login/image_schema/logo_donduong.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_donduong.png");
		$("#numberInfoSingleLogin").html('0263.3621612');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 124 Hai Tháng Tư, Thị Trấn Thạnh Mỹ, Đơn Dương, Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'qlvbtinhuy.vinhphuc.gov.vn' || host_origin == 'qlvbtinhuy.vinhphuc.vn'){
		$("#title_login_system_info").html('CỦA CÁC CƠ QUAN ĐẢNG TỈNH VĨNH PHÚC');
		$("#logo_box_header").attr("src","login/img/logo-dang.png");
		$("#logo_box_login").attr("src","login/img/logo-header_hyn_dcs.png");
	
	} else if (host_origin == 'bsc.vnptioffice.vn'){
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN CHỨNG KHOÁN BIDV');
		$("#logo_box_header").attr("src","login/image_schema/logo_hni_bsc.png");
		$("#numberInfoSingleLogin").html('(024) 3935 2722');
	
	} else if (host_origin == 'vpdtsotttt.phuyen.gov.vn'){
		$("#title_login_system_info").html('SỞ THÔNG TIN VÀ TRUYỀN THÔNG PHÚ YÊN');
		$("#logo_box_header").attr("src","login/image_schema/logo_SoTTTT_PYN.png");
		$("#numberInfoSingleLogin").html('02573.888.999');
	
	} else if (host_origin == 'sytthanhhoa.vnptioffice.vn'){
		$("#title_login_system_info").html('SỞ Y TẾ THANH HÓA');
		$("#logo_box_header").attr("src","login/image_schema/logo_soyte_THA.png");
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.th");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/vnpt-ioffice-thanh-hoa/distribution_groups/ios");

	} else if (host_origin == 'ioffice.ptscthanhhoa.com.vn'){
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN CẢNG DỊCH VỤ DẦU KHÍ TỔNG HỢP PTSC THANH HÓA');
		$("#logo_box_header").attr("src","login/image_schema/logo_ptscthanhhoa.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_ptscthanhhoa_login.png");
		$(".copyright").hide();
	
	} else if (host_origin == 'vmic.cnoto.vn'){
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN CÔNG NGHIỆP Ô TÔ');
		$("#logo_box_header").attr("src","login/image_schema/logo_vmic.png");
		$("#numberInfoSingleLogin").html('0203 3865286');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 370 đường Trần Quốc Tảng, Phường Cẩm Thịnh, Thành phố Cẩm Phả, Tỉnh Quảng Ninh');
		$("#logo_box_login").hide()
		$("#favicon_login_page_id").attr("href", "login/image_schema/logo_vmic.png");
		
	} else if (host_origin == 'pvchem.vnptioffice.vn'){
		$("#title_login_system_info").html('TỔNG CÔNG TY HÓA CHẤT VÀ DỊCH VỤ DẦU KHÍ');
		$("#logo_box_header").attr("src","login/image_schema/logo_pvchem_update.png");
		$("#numberInfoSingleLogin").html('024 3856 2861');
		$("#logo_box_login").hide()
		$("#favicon_login_page_id").attr("href", "login/image_schema/logo_pvchem_update.png");
		
	} else if (host_origin == 'dlu.vnptioffice.vn'){
		$("#title_login_system_info").html('TRƯỜNG ĐẠI HỌC ĐÀ LẠT');
		$("#logo_box_login").attr("src","login/image_schema/logo_dlu.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_dlu.png");
		$("#numberInfoSingleLogin").html('0263 3822 246');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Số 01 Đường Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt, Lâm Đồng');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'anthinh.vnptioffice.vn'){
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN TẬP ĐOÀN AN THỊNH');
		$("#logo_box_login").attr("src","login/image_schema/logo_ATG.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_ATG.png");
		$("#numberInfoSingleLogin").html('024.38581068');
	
	} else if (host_origin == 'portal.thancaoson.com.vn' || host_origin == 'portal.thancaoson.vn'){
		$("#title_login_system_info").html('Công ty cổ phần than Cao Sơn - TKV');
		$("#logo_box_header").attr("src","login/image_schema/logo_thancaoson.png");
		$("#logo_box_login").hide();
		$("#numberInfoSingleLogin").html('(84)0203 862210 - Fax: 0203 3863945');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Phường Cẩm Sơn - Thành phố Cẩm Phả - Tỉnh Quảng Ninh');
		
	} else if (host_origin == 'portal.tuyenthancuaong.com.vn'){
		$("#title_login_system_info").html('Công ty tuyển than Cửa Ông - TKV');
		$("#logo_box_header").attr("src","login/image_schema/logo_thancuaong.png");
		$("#numberInfoSingleLogin").html('02033 865043 - Fax: 02033 865656');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Phường Cửa Ông - Thành phố Cẩm Phả - Tỉnh Quảng Ninh');
		
	} else if (host_origin == 'eoffice.pilotcotkv.com'){
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN HOA TIÊU HÀNG HẢI - TKV');
		$("#logo_box_header").attr("src","login/image_schema/logo-pilot.png");
		$("#numberInfoSingleLogin").html('0203 3659 855. Fax: 0203.3811919');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Ngõ 4, Phố Hàng Than, Phường Hồng Gai, Hồng Gai, Thành phố Hạ Long, Tỉnh Quảng Ninh');
		
	} else if (host_origin == 'eportal.thanhalong.com.vn'){
		$("#title_login_system_info").html('Công ty than Hạ Long - TKV');
		$("#logo_box_header").attr("src","login/image_schema/logo_thanhalong.png");
		$("#logo_box_login").hide();
		$("#numberInfoSingleLogin").html('02033 968993, Fax: 02033936860');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Phường Cẩm Đông, TP. Cẩm Phả, T. Quảng Ninh');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Website: http://halongcoal.com.vn");
		
	} else if (host_origin == 'portal.thanuongbi.vn'){
		$("#title_login_system_info").html('CÔNG TY THAN UÔNG BÍ');
		$("#logo_box_header").attr("src","login/image_schema/logo_TUB.png");
		$("#numberInfoSingleLogin").html('02033.854491 Fax: 02033.854115');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Tổ 17, khu 3, Phường Trưng Vương, TP Uông Bí, Tỉnh Quảng Ninh');

	} else if (host_origin == 'thiuyphuoclong.vnptioffice.vn'){
		$("#title_login_system_info").html('THỊ ỦY PHƯỚC LONG');
		$("#logo_box_header").attr("src","login/img/logo-dang.png");
		$("#numberInfoSingleLogin").html('0918 313 239');
	
	} else if (host_origin == 'vpdt.tinhuyquangtri.vn'){
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ VĂN BẢN CHỈ ĐẠO ĐIỀU HÀNH');
		$("#title_login_system_info").html('TỈNH ỦY QUẢNG TRỊ');
		$("#logo_box_header").attr("src","login/image_schema/logo_quangtri.png");
		$("#numberInfoSingleLogin").html('0233 555407, 0233 858710, 0233 855321');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: 30 Hùng Vương - TP Đông Hà - Quảng Trị');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: phong.cycntt@tinhuyquangtri.vn");
		$("#contactDivLogin").html("<div class=\"li\" style=\"margin-left: 25px;\">Đơn vị quản trị và hỗ trợ kỹ thuật: Phòng Cơ yếu - CNTT</div>" + $("#contactDivLogin").html());

	} else if (host_origin == 'caodangcongnghiepcaosu.vnptioffice.vn'){
		$("#title_login_system_info").html('TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP CAO SU');
		$("#logo_box_header").attr("src","login/image_schema/logo_caosu_bpc.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_caosu_bpc.png");

	} else if (host_origin == 'vpdtsgtvt.phuyen.gov.vn'){
		$("#title_login_system_info").html('SỞ GIAO THÔNG VẬN TẢI TỈNH PHÚ YÊN');
		$("#logo_box_header").attr("src","login/image_schema/logo_SGT_PYN.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_SGT_PYN.png");
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: 72 Lê Duẩn, Phường 7, TP Tuy Hoà, Phú Yên');
		$("#numberInfoSingleLogin").html('0573 841 264 - Fax: 0573 842 373');
		
	} else if (host_origin == 'bpc.vnptioffice.vn'){
		$("#title_login_system_info").html('VĂN PHÒNG UBND TỈNH BÌNH PHƯỚC');
		$("#logo_box_header").attr("src","login/image_schema/logo_binhphuoc.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_binhphuoc.png");
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Phường Tân Phú - TP. Đồng Xoài - Tỉnh Bình Phước');
		$("#numberInfoSingleLogin").html('0271 3879 481');
		disableCaptcha(0);

	} else if (host_origin == 'qlvbtbk.backan.gov.vn'){
		$("#title_login_system_info").html('TỈNH BẮC KẠN');
		$("#logo_box_header").attr("src","login/img/vnpt.png");
		$("#numberInfoSingleLogin").html('0209.3810.745 hoặc 0209.3872.745');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.bkn");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-bac-kan/distribution_groups/ios");
		disableCaptcha(0);
		
	} else if (host_origin == 'ioffice.haiphongport.com.vn'){
		$("#title_login_system").html('Hệ thống quản lý văn bản và điều hành (IOFFICE)');
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN CẢNG HẢI PHÒNG');
		$("#logo_box_header").attr("src","login/image_schema/logo_cang_hp.png");
		$("#logo_box_login").hide();
		$("#numberInfoSingleLogin").html('022253859454 / 02253751994');
		
	} else if (host_origin == 'eportal.hatucoal.vn'){
		$("#title_login_system_info").html('Công ty cổ phần than Hà Tu - Vinacomin');
		$("#logo_box_header").attr("src","login/image_schema/logo_hatu.png");
		$("#numberInfoSingleLogin").html('0203.3835169; Fax: 0203.3836120');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Phường Hà Tu - TP. Hạ Long - T. Quảng Ninh');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Website: http://www.hatucoal.vn; Email: thanhatu@hatucoal.vn");
		
	} else if (host_origin == 'qlvb.anhphatpetro.com.vn'){
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN ANH PHÁT PETRO');
		$("#logo_box_header").attr("src","login/image_schema/logo_anhphat_petro.png");
		
	} else if (host_origin == 'vbdhnaa.vnptioffice.vn'){
		$("#title_login_system_info").html('CẢNG VỤ HÀNG KHÔNG MIỀN BẮC');
		$("#logo_box_header").attr("src","login/image_schema/logo-cvhkmb.png");
		$("#contactDivLogin").hide();
		
	} else if (host_origin == 'vpdttq.vnptioffice.vn' || host_origin == 'qlvb.tuyenquang.gov.vn'){
		$("#title_login_system_info").html('TỈNH TUYÊN QUANG');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.tqg");
		$("#linkiOsMobileEof").attr("href","https://apps.apple.com/us/app/vnpt-ioffice-tuy%C3%AAn-quang/id6474380943");
		$("#logo_box_header").attr("src","login/image_schema/logo_tuyenquang.png");
		disableCaptcha(0);
		
	} else if (host_origin == 'xsktcantho.vnptioffice.vn'){
		$("#title_login_system_info").html('CÔNG TY TNHH NHÀ NƯỚC MỘT THÀNH VIÊN XỔ SỐ KIẾN THIẾT CẦN THƠ');
		$("#logo_box_header").attr("src","login/image_schema/logo_xskt_cantho.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_xskt_cantho.png");
		$("#numberInfoSingleLogin").html('0292. 3812.218 - 3822.127');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: 29 Cách Mạng Tháng 8, P.Thới Bình, Q.Ninh Kiều, Tp.Cần Thơ<br><br>Website: www.xsktcantho.vn - Email:hanhchanh@xsktcantho.vn');
		
	} else if (host_origin == 'office.quangngai.gov.vn'){
		$("#title_login_system").html('UBND TỈNH QUẢNG NGÃI');
		$("#title_login_system_info").html('HỆ THỐNG QUẢN LÝ VĂN BẢN VÀ ĐIỀU HÀNH');
		$("#logo_box_header").attr("src","login/img/vnpt.png");
		$('#logo_box_login').hide();
		$("#contactDivLogin").hide();
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.qlvbhd.quangngai&hl=vi");
		$("#linkiOsMobileEof").attr("href","https://apps.apple.com/vn/app/vnpt-ioffice-qu%E1%BA%A3ng-ng%C3%A3i/id1517935879?l=vi");
		$('#div_language_login .language-div').html('<a href="https://tinnhiemmang.vn/danh-ba-tin-nhiem/officequangngaigovvn-1620635332" target="_blank"><img src="https://tinnhiemmang.vn/handle_cert?id=office.quangngai.gov.vn" width="150px" height="auto"></a><br><br><a href="https://ipv6-test.com/validate.php?url=office.quangngai.gov.vn"><img src="https://ipv6-test.com/button-ipv6-big.png" alt="ipv6 ready" title="ipv6 ready" style="border-width: 0px; border-style: solid;"></a>');
		disableCaptcha(0);

	} else if (host_origin == 'ubndsonghinh.vnptioffice.vn'){
		$("#title_login_system_info").html('UBND HUYỆN SÔNG HINH');
		$("#logo_box_header").attr("src","login/image_schema/logo_huyen_songhinh.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_huyen_songhinh.png");
		$('#contactDivLogin').hide();
		
	} else if (host_origin == 'portal.quanghanhcoal.vn'){
		$("#logo_box_header").attr("src","login/image_schema/logo_than_quanghanh.png");
		$("#logo_box_login").hide();
		$("#title_login_system_info").html('Công ty than Quang Hanh - TKV');
		$("#numberInfoSingleLogin").html('0203.3862282 Fax: 0203.3862739');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 302, Đường Trần Phú - TP. Cẩm Phả - T. Quảng Ninh');
		
	} else if (host_origin == 'kiengiang.vnptioffice.vn' || host_origin == 'vpdt.kiengiang.gov.vn'){
		$("#title_login_system_info").html('UỶ BAN NHÂN DÂN TỈNH KIÊN GIANG');
		$("#logo_box_header").attr("src","login/image_schema/logo_kiengiang.png");
		$("#numberInfoSingleLogin").html('0297 3862 135');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.kg");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/vnpt-ioffice-kien-giang/distribution_groups/ios");
		isableCaptcha(0);
		
	} else if (host_origin == 'phunhuan.vnptioffice.vn' || host_origin == 'qlvbdh-phunhuan.tphcm.gov.vn'){
		$("#title_login_system").html('QUẬN PHÚ NHUẬN');
		$("#title_login_system").css({"color": "white", "font-size": "35px"});
		$("#title_login_system_info").html('HỆ THỐNG QUẢN LÝ VĂN BẢN VÀ <br/> CHỈ ĐẠO ĐIỀU HÀNH');
		$("#title_login_system_info").css({"color": "yellow", "font-size": "25px"});
		$("#logo_box_header").hide();
		$("#favicon_login_page_id").attr("href", "login/image_schema/logo_hcm_quanphunhuan.png");
		$("#linkiOsMobileEof").attr("href","https://apps.apple.com/us/app/v%C4%83n-ph%C3%B2ng-%C4%91i%E1%BB%87n-t%E1%BB%AD-ph%C3%BA-nhu%E1%BA%ADn/id6474413457");
		disableCaptcha(0);
		
	} else if (host_origin == 'qldh.ou.edu.vn'){
		$("#title_login_system_info").html('TRƯỜNG ĐẠI HỌC MỞ TP.HỒ CHÍ MINH');
		$("#logo_box_header").attr("src","login/image_schema/logo_hcm_dhmo_header.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_hcm_dhmo.png");
		$("#numberInfoSingleLogin").html('028-38364748');
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.qlvbdh.hcm");
		$("#linkiOsMobileEof").attr("href","https://apps.apple.com/vn/app/vnpt-ioffice-hcm/id1455802708");
		disableCaptcha(0);
		
	} else if (host_origin == 'quydautucto.vnptioffice.vn'){
		$("#title_login_system_info").html('QUỸ ĐẦU TƯ PHÁT TRIỂN THÀNH PHỐ CẦN THƠ');
		$("#logo_box_header").attr("src","login/image_schema/logo_cto_quydautu.png");
		$("#numberInfoSingleLogin").html('(84-292) 3817 704');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Trụ sở: Số 24 - 26 đường Lý Thái Tổ, KDC Hưng Phú 1, P. Hưng Phú, Q. Cái Răng, TP Cần Thơ');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: cadif@cantho.gov.vn");
		
	} else if (host_origin == 'evpdt.sawaco.com.vn'){
		$("#title_login_system").html('VĂN PHÒNG ĐIỆN TỬ');
		$("#title_login_system").css({"color": "white", "font-size": "35px"});
		
		$("#div_language_login .copyright img").attr('src', 'login/image_schema/logo_hcm_sawaco.png');
		
		$("#logo_box_login").attr("src","login/image_schema/logo_hcm_sawaco.png");
		$("#favicon_login_page_id").attr("href", "login/image_schema/logo_hcm_sawaco.png");
		
		$("#logo_box_login").css("cssText", "height: 90px !important;");
		$("#logo_box_header").remove();
		$("#title_login_system_info").html('TỔNG CÔNG TY CẤP NƯỚC SÀI GÒN<br>TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN<br>SAWACO');
		$("#title_login_system_info").css({"color": "deepskyblue"});
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.qlvbdh.hcm");
		
		//$("#linkiOsMobileEof").attr("href","https://apps.apple.com/vn/app/vnpt-ioffice-hcm/id1455802708");
		$("#linkiOsMobileEof").attr("href","https://apps.apple.com/vn/app/sawaco-evp%C4%91t/id6474414090");
		
		$("#numberInfoSingleLogin").html('(028) 38.291.777 - Fax: (028) 38.241.644');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: 01 Công Trường Quốc tế - Phường Võ Thị Sáu - Quận 3 - Thành phố Hồ Chí Minh');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("<img src=\"login/qr/qr_sawaco_android.png\" style=\"height:70px;\">&nbsp;&nbsp;&nbsp;<img src=\"login/qr/qr_sawaco_ios.png\" style=\"height:70px;\">");
		$("#contact-dynamic").css("cssText", "text-align: center;");
		disableCaptcha(0);
	
	} else if (host_origin == 'vpdt.mattran.org.vn'){
		$("#title_login_system_info").html('ỦY BAN TRUNG ƯƠNG<br>MẶT TRẬN TỔ QUỐC VIỆT NAM');
		$("#logo_box_header").attr("src","login/image_schema/logo_ubmttq.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_ubmttq.png");
		$("#numberInfoSingleLogin").html('0982.218.964');
		
	} else if (host_origin == 'agribank.vnptioffice.vn'){
		$("#title_login_system").html('VĂN PHÒNG ĐIỆN TỬ');
		$("#title_login_system_info").html('NGÂN HÀNG NÔNG NGHIỆP VÀ PHÁT TRIỂN NÔNG THÔN VIỆT NAM - AGRIBANK');
		$("#logo_box_header").attr("src","login/image_schema/logo_agribank.jpg");
		$("#logo_box_login").hide();
		
	} else if (host_origin == 'vpdt.hcm.edu.vn'){
		$("#title_login_system_info").html('NGÀNH GIÁO DỤC VÀ ĐÀO TẠO TP HỒ CHÍ MINH');
		$("#logo_box_header").attr("src","login/image_schema/logo_hcm_sogiaoduc.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_hcm_sogiaoduc.png");
		$("#numberInfoSingleLogin").html('0908897480 (Thông) - 0931855771 (Khoa)');
		
	} else if (host_origin == 'tinhuyhanam.vnptioffice.vn'){
		$("#logo_box_login").attr("src","login/image_schema/logo_dcsvn.png");
		
	} else if (host_origin == 'ltdt.hanam.gov.vn'){
		$("#titlePage").html("HỆ THỐNG LẬP HỒ SƠ LƯU TRỮ ĐIỆN TỬ");
		$("#title_id").html("HỆ THỐNG LẬP HỒ SƠ LƯU TRỮ ĐIỆN TỬ");
	}else if (host_origin == 'vinafor.vnptioffice.vn'){
		$("#title_login_system_info").html('TỔNG CÔNG TY LÂM NGHIỆP VIỆT NAM');
		$("#logo_box_header").attr("src","login/image_schema/logo_hni_vinafor.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_hni_vinafor.png");
		
	} else if (host_origin == 'qlvb.deonai.com.vn'){
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN THAN ĐÈO NAI - VINACOMIN');
		$("#logo_box_header").attr("src","login/image_schema/logo_qnh_deonai.png");
		$("#logo_box_login").hide();
		$("#numberInfoSingleLogin").html('0203.3863.942');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Phường Cẩm Tây, Thành phố Cẩm Phả, Tỉnh Quảng Ninh');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: ctycpthandeonai@gmail.com");
		$(".copyright").hide();
		
	} else if (host_origin == 'eoffice.hub.edu.vn'){
		$("#title_login_system_info").html('TRƯỜNG ĐẠI HỌC NGÂN HÀNG TP. HỒ CHÍ MINH');
		$("#logo_box_header_before").show();
		
	} else if (host_origin == 'eportal.xaylapmo.vn'){
		$("#title_login_system_info").html('Công Ty Xây Lắp Mỏ - TKV');
		$("#logo_box_header").attr("src","login/image_schema/logo_qnh_xaylapmo.png");
		$("#logo_box_login").hide();
		$("#numberInfoSingleLogin").html('02033.862.601 - Fax: 02033.860.288');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 804, Khu 7b, Phường Cẩm Phú, Thành Phố Cẩm Phả, Tỉnh Quảng Ninh, Việt Nam');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Mã số thuế: 5700100256-039<br>Email: xaylapmo@gmail.com<br>Website: xaylapmo.vn");
		
	} else if (host_origin == 'qlvbdh.doanhnghieptrunguong.vn'){
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ VÀ ĐIỀU HÀNH VĂN BẢN');
		$("#title_login_system_info").html('ĐẢNG UỶ KHỐI DOANH NGHIỆP TRUNG ƯƠNG');
		$("#logo_box_header").attr("src","login/image_schema/logo_hni_duk.png");
		$("#logo_box_login").attr("src","login/image_schema/logo_hni_duk.png");
		$("#favicon_login_page_id").attr("href", "login/image_schema/logo_hni_duk.png");
		$("#title_login_system").css("cssText", "color: #fff;");
		$("#contactDivLogin").hide();
		$("#logo_box_header").remove();
		
	} else if (host_origin == 'shp.vnptioffice.vn'){
		$("#logo_box_login").attr("src","login/image_schema/logo_hcm_shp.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_hcm_shp.png");
		$("#favicon_login_page_id").attr("href", "login/image_schema/logo_hcm_shp.png");
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN THỦY ĐIỆN MIỀN NAM');
		
	} else if (host_origin == 'eportal.thanhongai.com.vn'){
		$("#title_login_system_info").html('CHI NHÁNH TẬP ĐOÀN CÔNG NGHIỆP THAN - KHOÁNG SẢN VIỆT NAM - CÔNG TY THAN HÒN GAI - TKV');
		$("#logo_box_login").hide();
		$("#logo_box_header").attr("src","login/image_schema/logo_tkv_hongai.png");
		$("#numberInfoSingleLogin").html('02033825233 - Fax: 02033826085');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: 169 Lê Thánh Tông, Phường Hồng Gai, Thành phố Hạ Long, Quảng Ninh');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: hongaicoal@gmail.com");
		
	} else if (host_origin == 'qlvb.thainguyen.gov.vn'){
		disableCaptcha(0);
		
	//ISTORAGE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	} else if (host_origin == 'hsltdt.kontum.gov.vn'){
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ HỒ SƠ LƯU TRỮ ĐIỆN TỬ');
		$("#titlePage").html("Hệ thống Quản lý hồ sơ lưu trữ điện tử tỉnh Kon Tum");
		$('#linkAppMobileEof').hide();
		
	} else if (host_origin == 'istorage.soctrang.gov.vn'){
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ HỒ SƠ LƯU TRỮ ĐIỆN TỬ');
		$("#titlePage").html("Hệ thống Quản lý hồ sơ lưu trữ điện tử");
		$('#contactDivLogin').hide();
		$('#linkAppMobileEof').hide();
		
	} else if (host_origin == 'qlhs.vnptioffice.vn'){
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ HỒ SƠ LƯU TRỮ ĐIỆN TỬ');
		$("#titlePage").html("Hệ thống Quản lý hồ sơ lưu trữ điện tử");
		$('#contactDivLogin').hide();
		$('#linkAppMobileEof').hide();
		
	} else if (host_origin == 'qlhsdongnai.vnptioffice.vn'){
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ HỒ SƠ LƯU TRỮ ĐIỆN TỬ');
		$("#titlePage").html("Hệ thống Quản lý hồ sơ lưu trữ điện tử");
		$('#contactDivLogin').hide();
		$('#linkAppMobileEof').hide();
		
	} else if (host_origin == 'ltls.vnptdaklak.vn'){
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ TÀI LIỆU ĐIỆN TỬ');
		$("#titlePage").html("Hệ thống Quản lý tài liệu điện tử");
		$("#title_login_system_info").html('TỈNH ĐẮK LẮK');
		$("#logo_box_header").attr("src","login/image_schema/logo_istorage_dlk.png");
		$("#favicon_login_page_id").attr("href", "login/image_schema/logo_istorage_dlk.png");
		$("#numberInfoSingleLogin").html('02623.813.665');
		$('#linkAppMobileEof').hide();
		
	} else if (host_origin == 'qlhs-tuyenquang.cuakhauso.vn'){
		$("#title_login_system").html('HỆ THỐNG QUẢN LÝ HỒ SƠ LƯU TRỮ ĐIỆN TỬ');
		$("#title_login_system_info").html('TỈNH TUYÊN QUANG');
		$("#logo_box_header").hide();
		$("#div_language_login").hide();
		$('#contactDivLogin').hide();
		$('#linkAppMobileEof').hide();

	//QLCV////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	} else if (host_origin == 'quanlycongviec.binhdinh.gov.vn'){
		$("#title_login_system").html('ỦY BAN NHÂN DÂN TỈNH BÌNH ĐỊNH');
		$("#titlePage").html("Hệ thống quản lý công việc");
		$("#title_login_system_info").html('HỆ THỐNG QUẢN LÝ CÔNG VIỆC');
		$("#logo_box_header").attr("src","login/img/vnpt.png");
		$('#contactDivLogin').hide();
		$('#linkAppMobileEof').hide();
	} else if (host_origin == 'qlvb.binhthuancpv.org.vn'){
		$("#title_login_system_info").html('TỈNH ỦY BÌNH THUẬN');
		$("#logo_box_login").attr("src","login/image_schema/logo_dcsvn.png");
		$("#logo_box_header").hide();
		$('#contactDivLogin').hide();
	} 
	
	if (host_origin == 'dongnai.vnptioffice.vn'
			|| host_origin == 'mobihscv.quangtri.gov.vn'
				|| host_origin == 'thunghiemhscv.quangtri.gov.vn'
					|| host_origin == 'vpdt.quangtri.gov.vn'
						|| host_origin == 'ioffice.vnptdaklak.vn'
							|| host_origin == 'qlcv.vnptioffice.vn'
								|| host_origin == 'vhttdl.vnptioffice.vn' 
									|| host_origin == 'vpdt-new.vnptioffice.vn'
										|| host_origin == 'vpdt-hcm.vnptioffice.vn'){
		disableCaptcha(0);

	} else if (host_origin == 'namdinh-dev.vnptioffice.vn' 
				|| host_origin == 'namdinh-stag.vnptioffice.vn'
					|| host_origin == 'localhost:8080'
						|| host_origin == 'dev-outsource.vnptioffice.vn'
							|| host_origin == 'istorage-gtm.vnpt.vn'){
		disableCaptcha(0);
	} else if(host_origin == 'vpdt.vnptioffice.vn'){
		if(host_pathname.startsWith('/qlvbboca/') || host_pathname.startsWith('/qlvbdh_hcm/')){
			disableCaptcha(0);
		}
	} else if(host_origin == 'ovc.vnptioffice.vn'){
		disableCaptcha(0);
		$("#logo_box_login").attr("src","login/image_schema/Logo_ubnvnonn_ok.png");
		$("#logo_box_header").attr("src","login/image_schema/Logo_ubnvnonn_ok.png");
		$("#title_login_system_info").html('ỦY BAN VỀ NGƯỜI VIỆT NAM Ở NƯỚC NGOÀI THÀNH PHỐ HỒ CHÍ MINH');
	}else if(host_origin == 'cddl.vnptioffice.vn'){
		$("#logo_box_login").attr("src","login/image_schema/logocaodang_dalat.png");
		$("#logo_box_header").attr("src","login/image_schema/logocaodang_dalat.png");
		$('#numberInfoSingleLogin').text("(0263)3822487");
		$("#title_login_system_info").html('TRƯỜNG CAO ĐẲNG ĐÀ LẠT');
		$("#addressDivLogin").show();
		$("#addressDetailLogin").html('Địa chỉ: Số 109 Yersin, phường 10, thành phố Đà Lạt, tỉnh Lâm Đồng');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("Email: caodangdalat@cddl.edu.vn");
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.ld&pli=1");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/ioffice-lam-dong/distribution_groups/ios");
		disableCaptcha(0);
	} else if(host_origin == 'dev-vpdt.vnptioffice.vn'){
		disableCaptcha(0);
		if(host_pathname.startsWith('/qlvbboca/')){
			$("#title_login_system").html('HỆ THỐNG QUẢN LÝ HỒ SƠ LƯU TRỮ ĐIỆN TỬ');
			$("#titlePage").html("Hệ thống Quản lý hồ sơ lưu trữ điện tử");
		}
	} else if(host_origin == 'beta-vpdt.vnptioffice.vn'){
		disableCaptcha(0);
	} else if (host_origin == 'ximangdaiduong.vnptioffice.vn'){
		$("#logo_box_header").attr({
			"src": "login/image_schema/1.logoximang.png",
			"alt": "login/img/logo-header.png"
		});
		$("#logo_box_login").attr({
			"src": "login/image_schema/1.logoximang.png",
			"alt": "login/img/vnpt.png"
		});
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN XI MĂNG ĐẠI DƯƠNG');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("<div class=\"row\" id=\"qrCode\" style=\"display: flex; justify-content: space-evenly;\"><div style=\"text-align: center;\"><div id=\"androidQR\"><a href=\"https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.th\"><img width=\"128\" height=\"128\" src=\"smart_admin/img/agriNamThAndroid.png\" style=\"display: block;\"></a></div><div class=\"row\" style=\"margin-top: 10px;\"><span>Android</span></div></div><div style=\"text-align: center;\"><div id=\"iOSQR\"><a href=\"https://install.appcenter.ms/orgs/egov-vnpt-it/apps/vnpt-ioffice-thanh-hoa/distribution_groups/ios\"><img width=\"128\" height=\"128\" src=\"smart_admin/img/agriNamThIOS.png\" style=\"display: block;\"></a></div><div class=\"row\" style=\"margin-top: 10px;\"><span>iOS</span></div></div></div>");
		$("#contactDivLogin").hide();
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.th");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/vnpt-ioffice-thanh-hoa/distribution_groups/ios");						
	} else if (host_origin == 'oicgroup.vnptioffice.vn'){
		$("#logo_box_header").attr({
			"src": "login/image_schema/2.logokhoangsan.png",
			"alt": "login/img/logo-header.png"
		});
		$("#logo_box_login").attr({
			"src": "login/image_schema/2.logokhoangsan.png",
			"alt": "login/img/vnpt.png"
		});
		$("#title_login_system_info").html('CÔNG TY CỔ PHẦN ĐẦU TƯ KHOÁNG SẢN ĐẠI DƯƠNG');
		$("#div-contact-dynamic").show();
		$("#contact-dynamic").html("<div class=\"row\" id=\"qrCode\" style=\"display: flex; justify-content: space-evenly;\"><div style=\"text-align: center;\"><div id=\"androidQR\"><a href=\"https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.th\"><img width=\"128\" height=\"128\" src=\"smart_admin/img/agriNamThAndroid.png\" style=\"display: block;\"></a></div><div class=\"row\" style=\"margin-top: 10px;\"><span>Android</span></div></div><div style=\"text-align: center;\"><div id=\"iOSQR\"><a href=\"https://install.appcenter.ms/orgs/egov-vnpt-it/apps/vnpt-ioffice-thanh-hoa/distribution_groups/ios\"><img width=\"128\" height=\"128\" src=\"smart_admin/img/agriNamThIOS.png\" style=\"display: block;\"></a></div><div class=\"row\" style=\"margin-top: 10px;\"><span>iOS</span></div></div></div>");
		$("#contactDivLogin").hide();
		$("#linkAndroidMobileEof").attr("href","https://play.google.com/store/apps/details?id=vn.com.vnpt.vinaphone.vnptsoftware.vnptoffice.th");
		$("#linkiOsMobileEof").attr("href","https://install.appcenter.ms/orgs/egov-vnpt-it/apps/vnpt-ioffice-thanh-hoa/distribution_groups/ios");						
    } else if (host_origin == 'ttytmucangchai.vnptioffice.vn'){
		$("#logo_box_header").attr("src","login/image_schema/logo_ttyt_mucangchai.png");
		$("#title_login_system_info").html('TRUNG TÂM Y TẾ HUYỆN MÙ CANG CHẢI');
		$("#numberInfoSingleLogin").html('02163.878.104');				
    } else if (host_origin == 'qlvb.hdndbinhduong.vn'){
		disableCaptcha(0);
		$('#contactDivLogin .text').html('Số điện thoại hỗ trợ kỹ thuật: ');
		$('#logo_box_login').attr("src","login/image_schema/logo_binhduong_trongsuot.png");
		$("#logo_box_header").attr("src","login/image_schema/logo_binhduong_trongsuot.png");
		$("#title_login_system_info").html('VĂN PHÒNG ĐOÀN ĐẠI BIỂU QUỐC HỘI');
		$("<div>").text("VÀ HỘI ĐỒNG NHÂN DÂN TỈNH BÌNH DƯƠNG").insertAfter("#title_login_system_info");
		$("#numberInfoSingleLogin").html('(0274) 3831699');			
    }
	
	//localhost:8080
}

function clearSessionStorage(){
	try {
		if (typeof(Storage) !== "undefined") { 
			window.sessionStorage.clear();
		} else { 
			console.log("The browser does not support Web Storage.");
		}
	} catch(err) {
	    //console.trace();
	}
}

//EGOVHOTRHO-9722
function stringFormat() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];
    
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    
    return theString;
}
//IOFFICE-499
//Bỏ captcha, nếu đăng nhập sai 3 lần mới hiện lên lại
function disableCaptcha(dis){
	if(dis==0){//Tắt captcha
		var host_origin = window.location.host;
		var last_login_time=localStorage.getItem("last_login_time")==null?0:parseInt(localStorage.getItem("last_login_time"));
		var login_times=0;
		if(Date.now()-last_login_time<300000){
			var login_times=localStorage.getItem("so_lan_login_fail")==null?0:parseInt(localStorage.getItem("so_lan_login_fail"));
		}
		if(login_times>2 && host_origin != 'vpdt.quangtri.gov.vn'){
			$("#txtMaXacNhan").parent().parent().parent().parent().prop("style","display:block");
			$("#txtMaXacNhan").val("");
		}
		else{
			$("#txtMaXacNhan").val($("#txtCaptchaDiv").html().replace(" ","").replace(" ","").replace(" ","").replace(" ","").replace(" ",""));
			$("#txtMaXacNhan").parent().parent().parent().parent().prop("style","display:none");
		}
	}
}

function EnableCaptcha(){//Hiện captcha nếu đăng nhập sai 3 lần
		var login_times=localStorage.getItem("so_lan_login_fail")===null?0:parseInt(localStorage.getItem("so_lan_login_fail"));
		localStorage.setItem("so_lan_login_fail",(login_times+1).toString());
		localStorage.setItem("last_login_time",Date.now().toString());
}
//END IOFFICE-499		 

function getCaptcha(type, value){
	try {
	    var getCaptchaUrl = "/" + app_param + "/public/captcha.jsp";
		$.ajax({
	        'url': getCaptchaUrl,
	        'data': {
	            type: type,
	            value: value
	        },
	        'type': 'get',
	        'success': function(response) {
				if(type == 'create' && response.indexOf("[TRUE]")>=0){
					var imgStr = '<img src="data:image/png;base64, '+ response.split('|')[1] +'" style="width: 100px; height: 30px;" />';
            		document.getElementById("txtCaptchaDiv").innerHTML = imgStr;
				} else {
					document.getElementById('errorLogin').style.display = '';
				}
	        },
	        'error': function(xhr) {
	            //console.log(xhr);
				document.getElementById('errorLogin').style.display = '';
	        }
	    });
    } catch (e) {
		//console.log(e);
		document.getElementById('errorLogin').style.display = '';
	}
}