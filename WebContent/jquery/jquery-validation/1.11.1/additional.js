// 中文字三个字节
jQuery.validator.addMethod("byteMaxLength", function(value, element, param) {
    var length = value.length;
    for(var i = 0; i < value.length; i++){
        if(value.charCodeAt(i) > 127){
        	 length++;
        }
        if(value.charCodeAt(i) == 10){
        	length++;
        }
    }
  return this.optional(element) || ( length <= param );   
}, $.validator.format("超长，不能超过{0}个字符"));


//手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
	return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

//电话号码验证
jQuery.validator.addMethod("isTel", function(value, element) {
	var tel = /^\d{3,4}-?\d{7,9}$/; //电话号码格式010-12345678
	return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码");

//联系电话(手机/电话皆可)验证
jQuery.validator.addMethod("isPhone", function(value,element) {
	var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
	var tel = /^\d{3,4}-?\d{7,9}$/;
	return this.optional(element) || (tel.test(value) || mobile.test(value));

}, "请正确填写您的联系电话"); 

//ID类的标识只能输入字母和数字
jQuery.validator.addMethod("idFormat", function(value, element) {   
    var tel = /^[a-z]{1}[0-9a-zA-Z]*$/;
    return this.optional(element) || (tel.test(value));
}, "字母开头的字母数字");

//ID类纯数字开头但首字不能为0
jQuery.validator.addMethod("id0NotFirst", function(value, element) {   
    var tel = /^[1-9]{1}[0-9]*$/;
    return this.optional(element) || (tel.test(value));
}, "数字不可0开头");

//输入低于16个字节
jQuery.validator.addMethod("less16Byte", function(value, element) {   
	var cnt = value.trim().replace(/[^\x00-\xff]/g, "**").length;
	return this.optional(element) || (cnt<=16);
}, "文字过长");

//输入低于20个字节
jQuery.validator.addMethod("less20Byte", function(value, element) {   
	var cnt = value.trim().replace(/[^\x00-\xff]/g, "**").length;
	return this.optional(element) || (cnt<=20);
}, "文字过长");


