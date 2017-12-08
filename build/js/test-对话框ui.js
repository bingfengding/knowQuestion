$(function () {
	$("#search_button").button();
	/*同时打开多个dialog
	 $("#reg").dialog();
	 $("#login").dialog();
	 */

//dialog()有2种形式，1.dialog(options),options是以对象键值对的形式传参，每个键值对表示1个选项，2：
//dialog("action",param),action是操作对话框方法的字符串，param则是option的某个选项
//dialog外观选项
//title   无/字符串   对话框的标题，可以直接设置在DOM元素上
//buttons  无/对象   以对象键值对方式，给dialog添加按钮，键是按钮的名称，值是用户点击后调用的回调函数
	$("#reg_a").click(function () {
		$("#reg").dialog({
			title:"知问注册",
			buttons:{
				"提交":function () {
					alert("正在ajax提交中");
					console.log($("#reg").dialog("option","title","title修改"));
				},
				"取消":function () {
					$(this).dialog("close");//关闭
				}
			},
			position:"",
			width:500,
			height:400,
			minWidth:300,
			minHeight:300,
			show:"puff",
			hide:"highlight",
			draggable:true,
			resizeable:true,
			modal:false,
			closeText:"我马上关闭了哟",
			focus:function (event) {
				console.log(event.type);
			},
			create:function (event) {
				console.log("创建");
			},
			open:function (event) {
				console.log("我被打开了");
			},
			beforeClose:function (event) {
				console.log("我马上被关闭了，可惜你关闭不掉我");
				return true;
			},
			close:function (event) {
				console.log("我被关闭了");
			},
			drag:function (event,ui) {
				console.log(ui.position,ui.offset)
			},
			dragStart:function (event,ui) {
				console.log("我是开始",ui.position,ui.offset);
			},
			dragStop:function (event,ui) {
				console.log("我是停止",ui);
			},
			resizeStart:function (event,ui) {
				console.log(ui.size,ui.originalSize);
			}

		});
	});

//dialog位置选项
//属性：position   默认为center/字符串  设置对话框坐标位置，默认为center。其他设置为：left top，top right  ，bottom left，right bottom （四个角）top，bottom，left，right，center

	//dialog大小选项
	//width 默认300  默认为px
	//height auto
	//minWidth 150
	//minHeight 150
	//maxWidth auto
	//maxHeight auto
//dialog视觉效果
	//show 默认 false  显示对话框时，默认采用淡入效果
	//hide 默认false  关闭对话框时候，默认采用淡出效果
	//其他效果：blind,bounce,clip,slide,drop,fold,highlight,puff,scale,pulsate
//dialog行为选项
	//autoOpen 默认true 调用dialog（）就会打开对话框，如果为false，则对话框不可见，但是实际已经存在，通过dialog("open")才能可见。
	//draggable,可以移动对话框，false不可移动
	//resizeable， 可以调整对话框大小，false不可调整
	//modal 默认为false，对话框为可操作，true对话框会罩一层灰纱，无法操作
	//closeText 默认为无/字符串，设置关闭按钮的的title文字


//dialog事件，提供了大量回调函数，这些函数内部的this指向的是对话框内容的div对象，而不是整个对话框的div
//focus,当对话框被激活的时候（首次显示与在上面点击的时候(例如多个弹出框相互点击的时候)）会调用，该方法有2个参数（event,ui）,该事件ui参数为空
//create，创建对话框的时候执行函数参数与上面相同
//open,打开时候被执行 参数与上面相同
//beforeClose,将要关闭的时候执行（单击关闭按钮或调用dialog（“close”）方法的时候），如果该函数返回false，则无法被关闭，参数与上面相同
//drag,当对话框移动的时候执行，每次移动都会调用，该方法有2个参数(event,ui),ui有2个属性对象，1，position:得到当前坐标（top，left），2,offset:得到当前移动的坐标（top，left）
//dragStart,开始移动对话框时候调用该方法，2个参数，与上面相同，
//dragStop,移动对话框结束的时候调用，2个参数，与上面相同
//resize,对话框改变大小的时候执行，ui有4个属性，1，size：得到对话框大小，子属性：width，height，2，positon，对话框的坐标，3,originalSize,对话框的原始大小，4，originalPosition，得到对话框原始坐标，
//resizeStart,开始改变的时候执行，参数与上面相同
//resizeStop，改变结束的时候执行，参数与上面相同



//dialog方法，
//dialog("open"), 打开对话框，返回jQuery对象
//dialog("close"), 关闭对话框，返回jQuery对象
//dialog("destroy"), 删除对话框直接阻断dialog，返回jQuery对象
//dialog("isOpen"), 判断是否打开了对话框，返回布尔值
//dialog("widget"), 获取对话框的jQuery对象，返回jQuery对象，是整个对话框的div，而不是内容的div
//dialog("moveToTop"),将制定的对话框置前
//dialog("option",param), 获取option属性的值，返回一般值

//dialog("option",param，value), 设置option属性的值，返回jQuery对象

//dialog()中使用on（）

	$("#reg").on("dialogclose",function () {
		alert("关闭");
	});
//其他所有方法用on都如此






});