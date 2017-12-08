$(function () {
	var reg=$("#reg");
    reg.submit(function(){
		$(this).ajaxSubmit({
			url:"./php/test.php",//设置提交的url，可以覆盖默认设置的action属性
			target:"#box",//服务器返回的内容储存到#box内
			type:"POST",//GET,POST请求
			dateType:null,//xml,json,script默认null
			clearForm:true, //成功提交之后清空表单
		resetForm:true,//成功提交之后重置表单
		data:{//增加额外的数据提交
			aaa:"bbb",
			ccc:"ddd"
		},
	success:function(){
		console.log("sure");//成功提交之后回调
	},
	beforeSubmit:function(formData,jqForm,options){//提交之前执行，一般用于数据验证
		//如果数据验证不合法就返回false，不让提交，返回true就让提交
		//使用插件的话，这个基本用不上，可以存放提交等待的lording
		console.log(formData[0].name);//得到表单元素的name
		console.log(formData[0].value);//得到表单元素的value
		console.log(jqForm);//得到form的jquery对象
		console.log(options);//获得目前options设置的属性
		console.log("正在提交中");
		return true;
	},
	error:function (event,errorText,errorType) {
		console.log("this is error");
	}
		});

		return false;
	});
	console.log(reg.formSerialize());

	/*
		 form.js有2个核心方法，ajaxForm(),与ajaxSubmit()
		//ajaxForm提交方法
		$("#reg").ajaxForm(function(){
			console.log("成功提交")
		})；
		//使用ajaxForm提交会直接实现ajax提交，阻止默认行为，而它提交的默认页面为form表单的action属性的值，提交方法为method属性的值
	 //ajaxSubmit提交方法
	 $("#reg").submit(function(){
		 $(this).ajaxSubmit(function(){  //这里面的function（）{}  就是success的
		 console.log("成功提交")
	 })
	 return false;
	 }
	 )；
	 //ajaxSubmit提交是针对的sbumit()方法，所以需要手动阻止默认行为，而使用validate.js插件的话，ajaxSubmit()更合适

	//option参数，
	是以键值对传递的对象，可以通过这个对象设置各种ajax 提交的功能


	 $("#reg").submit(function(){
		 $(this).ajaxSubmit({
			 url:"test.html",//设置提交的url，可以覆盖默认设置的action属性
			 target:"#box",//服务器返回的内容储存到#box内
			 type:"POST",//GET,POST请求
			 dateType:null,//xml,json,script默认null
			 clearForm:true, //成功提交之后清空表单
			 resetForm:true,//成功提交之后重置表单
			 data:{//增加额外的数据提交
				 aaa:"bbb",
				 ccc:"ddd"
			 },
			 success:function(){
			 	console.log("sure");//成功提交之后回调
			 },
			 beforeSubmit:function(formData,jqForm,options){//提交之前执行，一般用于数据验证
				 console.log(formData[0].name);//得到表单元素的name
				 console.log(formData[0].value);//得到表单元素的value
				 console.log(jqForm);//得到form的jquery对象
				 console.log(options);//获得目前options设置的属性
				 console.log("正在提交中");
				 return true;
				 }
		 })
	 });


//工具方法
	除了2个核心方法之外，还提供了常用的工具方法，这些方法主要是在提交前后对数据或表单进行处理，
	//表单序列化
	console.log($("#reg").formSerialize());
	//序列化某个字段
	 console.log($("#reg #user").fieldSerialize());
	 //获取某个字段的value
	 console.log($("#reg #user").fieldValue());
	 //重置表单
	 $("#reg").resetForm();
	 //清空某个字段
$("#reg #user").clearFields();





	 */











});