/**
 * Created by Administrator on 2017-05-27.
 */
$(function () {
	$("#search_button").button({
		"disabled":false,
		//"label":"",
		"icons":{
			"primary":"ui-icon-search"
			//"secondary":" ui-icon-clock"//附加效果input按钮可能无法获得，建议使用button按钮
		},
		"test":true,
		create:function (e) {
			console.log("我被创建了");
		}
	});
	$("#reg_a").click(function () {
		$("#reg").dialog({
			title:"知问注册",
			buttons:{
				"提交":function () {
					alert("正在ajax提交中");
				},
				"取消":function () {
					$(this).dialog("close");
				}
			},
			position:"",
			width:500,
			height:400,
			minWidth:300,
			minHeight:300,
			show:"puff",
			hide:"puff",
			draggable:true,
			resizeable:true,
			modal:false,
			closeText:"我马上关闭了哟"



		});
	});
//button（）方法的属性，1.button(options),以对象键值对方式传参，每个键值对对应1个选项，2，button("action",param),action是操作对话框方法的字符串，param为options的某个选项
	//disabled 默认false，设置true的时候，按钮为非激活状态
	//label，默认为无，对应按钮上的文字，如果没有html内容将被显示
	//icons,默认为无，对应按钮上的图标，在按钮文字前面与后面都可以放置1个图标，通过对象键值对的方式完成
	//test,默认为true，设置为false则不会显示文字，但必须指定1个图标
//button有1个事件，create,创建button的时候调用。

//button("action",param)方法设置和获取按钮，action表示操作的方法
	//button("disable"),返回jquery，禁用按钮，反之 button("enable")启用
	$("#search_button").button("disable");
	$("#search_button").button("enable");
	//button("destroy"),删除按钮，直接阻断button
	//$("#search_button").button("destroy");

	//button("refresh"),更新按钮布局
	$("#search_button").button("refresh");
	//button("widget"),获取按钮的jQuery属性
	console.log($("#search_button").button("widget"));
	console.log($("#search_button").button());
	//button("option",param),返回一般值，获取option属性

	//button("option",param，value),设置option属性

	console.log($("#search_button").button("option","label","搜索"));
//单选框button效果
	//$("#reg input[type=radio]").button();
	//$("#reg").buttonset();
//复选框与上面一样

});