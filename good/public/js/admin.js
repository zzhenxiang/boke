// 判断两次密码是否一样
var password = $('input[name=password]');
var repassword = $('input[name=repassword]');
repassword.blur(function(){
	if(password.val()==repassword.val()){
		$(this).css('border','1px solid #eaeaea');
		password.css('border','1px solid #eaeaea');
	}else{
		$(this).css('border','1px solid red');
		password.css('border','1px solid red');
	}
});


