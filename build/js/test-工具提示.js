$(function () {
	function setRem(number) {
		var rem =parseFloat(getComputedStyle(document.documentElement)["fontSize"]);
		return number*rem;
	}

	$("#search_button").button({

	});
	$("#reg").dialog({
		autoOpen:true,
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


//调用的时候首先需要对元素设置title值，
//tooltip()方法的属性，有二种形式，与以前的一样。
	//disable，默认false,设置为true的时候，将禁止显示工具提示，
	//content,默认为无，设置title内容
	//items,设置选择器以限定范围
	//tooltipClass,默认无，引入class形式的css样式
	$("#user").tooltip({
		disable:false,
		//content:"改变了title",
		items:"input",
		//tooltipClass:"red"//添加1个class名获得样式
		position:{
			my:"left bottom",
			at:"right bottom"
		},
		show:false,
		hide:false,
		track:true
	});

//页面位置选项
	//position 默认为无，有2个属性my，at，my为目标左下角为基准，at以my为基准，
//视觉效果
	//show，hide，默认淡入淡出，改为false为无效果
	//其他效果：blind,bounce,clip,slide,drop,fold,highlight,puff,scale,pulsate

//行为选项
	//track，跟随坐标移动,默认false
//事件选项
	//create(event,ui) 被创建的时候会调用该方法，ui参数为空
	//open(event,ui) 当工具提示显示的时候调用，ui有1个tooltip参数，返回工具提示的jQuery对象
	//close(event,ui)当工具提示关闭的时候调用，关闭之后可以用tooltip("open")打开，ui有1个tooltip参数
//tooltip("action",param),
	//tooltip("open"),打开
	//tooltip("close"),关闭
	//tooltip("disable"),禁用
	//tooltip("enable"),启用
	//tooltip("destroy"),删除工具函数
	//tooltip("widget"),获取工具提示的jQuery对象
	//tooltip("option",param),获取某属性值
	//tooltip("option",param,value),设置某个属性的值

//可以使用on来出来，
	// $("reg").on("tooltipopen",function(){});其他方法相同



});