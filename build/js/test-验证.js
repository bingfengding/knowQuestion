$(function () {
/*$("#reg").validate();//启用验证插件*/
/*
validate.js的验证规则写法有二种，1：空间属性方式，2，js键值对传参方式
规则名                  说明
required:true			必须输入字段
email:true				必须输入正确格式的垫子邮箱
url:true				必须输入正确的网址
date:true				必须输入正确格式的日期
dateISO:true			必须输入正确格式的日期（ISO）（只验证格式不验证有效）
number:true				必须输入合法的数字（负数，小数）
digits:true				必须输入正整数
creditcard:true			必须输入合法的信用卡号：5105105105105100
equalTo:"#field"		输入值必须与#field相同
minlength:5				输入长度最小是5的字符串
maxlength:10			输入长度最大是10的字符串
rangelength:[5,10]		输入长度介于5-10之间的字符串，（汉字算1字符）
range:[5,10]			输入值必须介于5-10之间的数字
min:5					输入值不能小于5
max:10					输入值不能大于10
remote:"check.php"		使用ajax方法调用check.php验证输入值

 //使用空间方式验证"必须填写并且不得小于2位"
 <input type="test" class="required" minlength="2" name="user" id="user"/>
 //默认规则设置为布尔值的，可以直接添加到class里面即可实现，数字或数组的需要使用属性=值方式。对于错误提示是因为，可以引入中文汉化文件，或直接替换掉

*/


//使用js对象键值对方式设置
	$("#reg").validate({
		submitHandler:function(form){//验证成功之后才能执行，并且阻止了默认提交，一般用于ajax提交使用
			alert(form);
		},
		debug:true,  //阻止提交
		rules:{
			user:{//name的user
				required:true,
				minlength:5,
				remote:"user.php"
			},
			email123:{
				required:true,
				email:true
			},
			url:{
				url:true
			},
			pwd:{
				rangelength:[5,10],
				/*remote:{
					url:"user.php",
					type:"GET",
					dataType:"json",
					data:{
						user:function(){
							return $("#user").val();
						}
					}
				}*/

			},
			date:{
				date:true
			},
			number:{
				number:true
			},
			notpwd:{
				equalTo:"#pwd"
			}


		},
		messages:{
			user:{
				required:"账号不能为空！",
				minlength:"账号不得小于{0}位！",
				remote: "账号被占用"
			},
			email123:{
				required:"账号不能为空！",
				email:"请输入正确的邮箱地址"
			},
			notpwd:{
				equalTo:"请输入一致的密码"
			},
			pwd:{
				rangelength:"请输入{0}到{1}位的密码"//2个数字的用花括号0,1表示
			}
		},
		//ignore:"#user",
		/*groups:{
			myerror: "user pwd"
		},
		focusInvalid:false,//默认为true，改为false则出现报错提示之后不会默认光标选为第一个错误上
		errorPlacement:function (error,element) {
			$.each(error,function (index,value) {
				$(".myerror").html($(".myerror").html()+$(value).html());
			})
		}，*/
		/*
		groups:{
			error_user:"user",
			error_pass:"pass"
		},
		*/
		/*errorPlacement:function (error,element) {
			error.appendTo(".myerror");//直接将原生添加进去
		},*/
		errorClass:"error_list",
		errorElement:"p",

		errorLabelContainer:"ol.myerror",
		wrapper:"li",
		success:function(label){
			label.addClass("valid").text("ok");
		},
		highlight:function(element,errorClass){
			$(element).css("border","1px solid #639")
		},
		unhighlight:function(element,errorClass){
			$(element).css("border","1px solid #ccc")
		},
		/*invalidHandler:function(event,validator){//该方法只有错误的时候才会执行，会导致最后1个错误执行之后无法隐藏错误提示，需要在提交那里进行隐藏
			var errors = validator.numberOfInvalids();

			if(errors){
				$(".ierror").html("您有"+errors+"个表单元素填写非法！")
			}
		},*/
		showErrors:function(errorMap,errorList){
			let errors = this.numberOfInvalids();
			if(errors){
				$(".ierror").html("您有"+errors+"个表单元素填写非法！")
			}else{
				$(".ierror").hide();
			}
			this.defaultShowErrors();   //执行默认错误
		}

	});

/*
validate()的方法与属性
//格式化错误提示
 messages:{
 user:{
 required:"账号不能为空！",
 minlength:"账号不得小于{0}位！"
 }
 }

//开启调试默认
$("#reg").validate({
	debug:true
});

 //这样设置可以全局设置默认为调试模式，阻止多个表单提交
 $.validator.setDefaults({
 debug:true
 });

 //使用其他方式替代默认提交
submitHandler:function(form){
	//可以执行的ajax提交，并且无需debug:true阻止提交了
}

 //忽略某个字段的验证
ignore:"#pass"

//群组错误提示

groups:{
	myerror:"user pass"
};
//显示群组的错误提示
focusInvalid:false,
	errorPlacement:function(error,element){
		$.each(error,function(index,value){
			$(".myerror").html($(".myerror").html()+$(value).html())
		})
	};
//群组错误提示，分开
groups:{
	error_user:"user",
	error_pass:"pass"
}
//设置错误提示的class名
errorClass:"error_list",

//设置错误提示的标签
errorElement:"p",

//统一包裹错误提示
errorLabelContainer:"ol.error",
warpper:"li",
//设置成功过后加载的class
success:"success",

//使用方法加载class并添加文本
success:function(label){
	label.addClass("success").text("ok");
}

//高亮显示有错误的元素 ，变色式
highlight:function(element,errorClass){
	$(element).fadeOut(function(){
 	$(element).fadeIn()
	})
};

 highlight:function(element,errorClass){
 $(element).css("border","1px solid red")
 }
//成功的元素移除错误高亮
 unhighlight:function(element,errorClass){
 $(element).css("border","1px solid #ccc")
 }
//表单提交时候获取信息
invalidHandler:function(event,validator){
	var errors = validator.numberOfInvalids();
	if(errors){
		$(".ierror").html("您有"+error+"个表单元素填写非法！")；
	}
}
//获取错误提示句柄，不用提交及时获取值
showErrors:function(errorMap,errorList){
	var errors = this.numberOfInvalids();
	if(errors){
 		$(".ierror").html("您有"+error+"个表单元素填写非法！")；
	}else{
		$(".ierror").hide();
	}
	this.defaultShowError();   //执行默认错误
}

//获取错误提示句柄，errorList
showErrors:function(errorMap,errorList){
	console.log(errorList[0].message);	//得到错误信息
 	console.log(errorList[0].element); //当前错误的表单元素
}

//使用remote:url ,可以对表单进行ajax验证，默认会提交当前验证的值到远程地址，如果需要提交其他值，可以使用data选项，
//使用ajax
rules:{
	user:{
		required:true,
		minlength:2,
		remote:"user.php"
	}
}
//user.php内容
 <?php
 if($_GET['user']=='bnbbs'){
 echo 'false';
 }else {
 echo 'true';
 }
 ?>
// 远程地址只能输出true与false不能输出其他的

//传递多个到远程
pass:{
	required:true,
	minlength:6,
	remote:{
		url:"user.php",
		type:"POST",
		dataType:"json",
		data:{
			user:function(){
				return $("#user").val();
			}
		}
	}
}
//user.php
<?php
if($_POST["user"]!="bnbbs"||$_POST["psw"]!="123456"){
	echo "false"
}else {
	echo "true"
}

?>


validate.js 提供给了一些事件触发的默认值，
//取消提交验证
onsubmit:false, 默认true
设置为false会导致直接传统提交，不会实现验证功能，一般用于click/blur、KEYUP提交
//设置鼠标离开不触发验证
onfocusout:false
设置键盘下弹起不触发验证
onkeyup:false,
只要设置了，在测试的浏览器不管是false，true都不触发了，

设置点击checkbox和radio点击不触发验证
onclick:false

设置错误提示后，无法获取焦点
focusInvalid:false

提示错误时候，隐藏错误提示，不能与focusInvalid 一起用，会冲突
focusCleanup:true   默认false

如果表单元素设置了title，且message为默认，就会读取title值的错误信息，设置ignoreTitle:true,就会屏蔽该功能

判断表演验证的元素是否全部有效
console.log($("#reg").valid())//全部有效就返回true

validate.js 提供了可以单独验证每个表单元素的rules方法，不但提供了add增加验证，还提供给了remove删除验证的功能

$("#user").rules("add",{
	required:true,
	minlegth:2,
	messages:{
		required:"账号不能为空",
		minlength: "账号不小于{0}位"
	}
})

//删除user的所有验证规则
$("#user").rules("remove");

删除user的指定验证规则
 $("#user").rules("remove","minlength min max");

添加自定义验证
	$.validator.addMethod("code",function(value,element){
	var tel = /^[0-9]{6}$/;
	return this.optional(element)||(tel.test(value));
},"请正确填写您的邮政编码")



*/

});