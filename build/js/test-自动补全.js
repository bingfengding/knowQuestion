$(function () {
	function setRem(number) {
		var rem =parseFloat(getComputedStyle(document.documentElement)["fontSize"]);
		return number*rem;
	}

	$("#search_button").button({

	});
	$("#reg_a").click(function () {
		$("#reg").dialog("open")
	});
	$("#reg").dialog({
		autoOpen:false,
		buttons:{
			"提交":function () {
				alert("正在ajax提交中");
			},
			"取消":function () {
				$(this).dialog("close");
			}
		},
		position:"",
		width:setRem(20),
		height:setRem(20),

		show:"clip",
		hide:"clip",
		draggable:true,
		resizeable:false,
		modal:true,
		closeText:"我马上关闭了哟"
	});
	$("#date").datepicker();
	$("#reg input[title]").tooltip({
		disable:false,
		items:"input",
		position:{
			my:"left bottom",
			at:"right bottom"
		},
		tooltipClass:"titleColor",
		show:false,
		hide:false,
		track:false
	});
var host=["aaa","aaaaa","aaabcc","bbb","bbbb","bbbbbbb","ccc"];
	$("#email").autocomplete({
		//source:host,
		source:function (request,response) {//引入数据源，可以穿入回调函数，可以传2个参数，request，response，
			console.log(request.term);//request下面有1个属性term，为输入的内容
			response(["aaa","aaaaa","aaabcc","bbb","bbbb","bbbbbbb","ccc"]);//绑定数据源，不会根据你输入的数据进行过滤，而是把整个结果呈现，因为source数据源本身就是给你动态改变的，由你自定义，从而放弃了系统内置的搜索能力
		},
		autoFocus:true,
		change:function () {

		}
	});
	//$("#email").autocomplete("search","a");
//属性
	//disable，默认false，true的时候禁用自动补全
	//source,默认无，指定数据源，可以本地可以远程
	//minLength，默认1，触发自动补全最少输入字符数
	//delay,默认300，延迟显示设置
	//autoFocus,默认false，设置true的时候，第一个项目会被选定

//页面位置选项
	//position有2个属性，1个是my以左下角为基准，1个是at，以右下为基准
//事件选项
	//create(event,ui)自动补全被创建的时候调用，ui为空
	//open(event,ui)自动补全被显示的时候调用，ui为空
	//close(event,ui)自动补全被关闭的时候调用，ui为空
	//focus(event,ui)自动补全获取焦点的时候调用，ui有1个子属性item，分别有2个属性label，自动补全列表显示的文字，value，将要输入的值 value可以修改
	//select(event,ui)自动补全被选定的时候调用，ui有1个子属性item，分别有2个属性label，自动补全列表显示的文字，value，将要输入的值
	//change(event,ui)自动补全失去焦点并且内容发生改变的时候调用，ui为空
	//search(event,ui)自动补全搜索完成的时候调用，ui为空
	//response(event,ui)当自动补全搜索完成时，在菜单显示之前，会调用该方法，ui有1个子对象content，他会返回label，与value值。

//autocomplete("action",param)方法
	//autocomplete("close"),关闭
	//autocomplete("disable"),禁用
	//autocomplete("enable"),启用
	//autocomplete("destroy"),删除工具函数
	//autocomplete("widget"),获取工具提示的jQuery对象
	//autocomplete("search",value),在数据源获取匹配的字符串
	//autocomplete("option",param),获取某属性值
	//autocomplete("option",param,value),设置某个属性的值

//on(),   $.("autocompleteopen",function(){});

});