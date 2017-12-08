$(function () {
	function setRem(number) {
		var rem =parseFloat(getComputedStyle(document.documentElement)["fontSize"]);
		return number*rem;
	}
	$("#search_button").button({

	});
	/*$("#reg_a").click(function () {
		$("#reg").dialog("open")
	});*/
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
		show:"scale",
		hide:"scale",
		draggable:true,
		resizable:false,
		modal:true,
		closeText:"我马上关闭了哟"
	});


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
	$("#email").autocomplete({
		source:function (request,response) {
			var hosts=["qq.com","163.com","126.com","gmail.com","hotmail.com","sina.com.cn"],
				term = request.term,   //获取输入内容
				ix = term.indexOf("@"),  //@的位置，
				name = term,  //邮箱用户名
				host = "",    //域名，例如163.com
				result = []; //最终的邮箱列表
			result.push(term);
			if(ix >-1){
				name = term.substr(0,ix);
				host= term.substr(ix+1);
			}
			if(name){
				//如果用户已经输入了@和后面的域名
				//那么就找到相关的域名提示
				//如果用户没有输入 就提示所有域名
				var findedHosts = host ?  $.grep(hosts,function (value,index) {
					return value.indexOf(host) > -1;
				}) : hosts,
					findedResult=$.map(findedHosts,function (value,index) {
					return name + "@" +value;
				});
				result = result.concat(findedResult);
			}
			response(result);
		},
		autoFocus:true,
		delay:0
	});
	$("#date").datepicker({//调用日历ui
		closeText: '关闭',
		prevText: '&#x3C;上月',
		nextText: '下月&#x3E;',
		currentText: '今天mm-dd',
		monthNames: ['一月','二月','三月','四月','五月','六月',
			'七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort: ['一月','二月','三月','四月','五月','六月',
			'七月','八月','九月','十月','十一月','十二月'],
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		//showWeek:true,
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		showMonthAfterYear: true,
		altField:"#dateSure",//将获取的日期添加到指定的input里面
		altFormat:"dd/mm/yy@",
		//appendText:"这是添加的日期" ,//添加文字到了对应的input后面，
		isRTL: false,
		numberOfMonths:1,
		showOtherMonths:true,
		selectOtherMonths:false,
		changeMonth:true,
		changeYear:true,
		autoSize:false,
		showOn:"focus",
		showButtonPanel:true,
		navigationAsDateFormat:true,
		//yearSuffix:"年",
		hideIfNoPrevNext:true,
		yearRange:"1900:2020",
		maxDate:0,
		showAnim:"scale",
		beforeShow:function () {
			console.log(1);
		},
		beforeShowDay:function (date) {
			if(date.getDate()==1){
				return [false,"a","不能被选中"];//a为class名
			}else{
				return [true]
			}
		},
		onChangeMonthYear:function (year,month,inst) {
			console.log(year,month,inst);
			$.each(inst,function (index,element) {
				console.log(index,element);
			})
		}

	});
	$("#date").datepicker("setDate","2017-1-1");
//日历方法，2种形式1，datepicker(option),里面为对象键值对，2,datepicker("action",param),前者为操作的字符串，后者为option里面的某个选项

	//dateFormat 默认 mm/DD/YY  指定日历返回的日期格式
	//dayNames 默认英文日期  以数组形式指定星期中的长格式 比如Sunday，Monday，中文：星期日，
	//dayNamesShort 以数字形式指定星期中的短格式，比如sun， Mon等
	//dayNamesMin    以数组形式指定星期中的最小格式，比如Su，Mo
	//monthNames  默认英文月份   以数组形式指定月份的长格式（January，February），数组必须从January开始
	//monthNamesShort  以数组形式指定月份短格式，Jan，Feb，必须从Jan开始
	//altField, 默认无，为日期选择器指定一个<input>域
	//altFormat,   添加到<input>域的可选日期格式
	//appendText,在日期选择器的 <input>域后面附加文字
	//showWeek, 默认 false，  显示周
	//weekHeader 默认"Wk"  显示周的标题
	//firstDay 默认0   指定日历中的星期几开始，0表示星期日
	//isRTL 默认false  改为true则为日历从右向左显示
	//日历默认为英文，使用中文日历需要引入中文语言包或将对应的几行代码整合到对应js文件内
	//日期格式代码
	/*
	d      月份的天，从1到31
	dd     月份的天，从01到31
	o      年份的天，从1到366
	oo     年份的天，从01到366
	D      星期中的天的缩写名称（Mon，Tue等）
	DD     星期中的天的全写名称（Sunday，Monday，）
	m		月份，从1到12
	mm     月份，从01到12
	M		月份的缩写方式，
	MM      月份的全月名称
	y		二位数字的年份（14表示2014）
	yy		四位数字的年份，（2014）
	@		从01/01/1970至今的毫秒数

外观选项
	 disable 默认false  改为true为禁用日历
	 numberOfMonths 默认1  日历中同时显示的月份个数，设置3就为显示3个月，也可以设置数组[3,2],3行2列共6个
	 showOtherMonths 默认false，设置true，则当月没有使用的单元格会被自动填充，但无法使用，false会隐藏无法使用的单元格
	 selectOtherMonths, 为true则可以选择上个月或下个月的填充日期，前提是showOtherMonths 为true
	 changeMonth 设置true，显示快速选择月份的下拉菜单
	 changeYear   设置true，显示快速选择年份的下拉菜单
	 autoSize  是否自动调整控件大小，以适应当前日期格式的输入
	 showOn  默认"focus"  获取焦点触发，还有button点击按钮触发，和both任一事件发生时候触发
	 buttonText  默认“...”触发按钮上面的文字
	 buttonImage  图片按钮地址
	 buttonImageOnly  设置为true，则会用图片代替按钮
	 showButtonPanel 设置为true，则开启显示按钮面板
	 closeText 默认"done"  设置关闭按钮的文本
	 currentText  默认Today  设置获取今日日期的按钮文本
  	nextText 设置下一个月的alt文本
  	prevText  设置上一个月的alt文本
  	navigationAsDateFormat  默认false， 设置prev ，next，current 的文字可以是format的日期格式
  	yearSuffix  默认无  附加在年份后面的文本
  	showMonthAfterYear  设置true 则将月份防止在年份后面

datepicker日期选择选项
	minDate 默认为无   日历可以选择的最小日期
	maxDate 默认为无   日历选择的最大日期
	defaultDate  默认当天  预设默认选定日期，没有指定则为当天
	yearRange    默认无     设置下拉菜单年份的区间，比如1950:2200
	hideIfNoPrevNext  默认false  设置true  如果上个月或下个月不存在则隐藏按钮
	gotoCurrent  设置true 则点击今日且回车后选择的是当前选定的日期，而不是今日的。

选择日期的字符串表示方法
x  当前日期的X天x为1到n
-x  当前日期之前的X天
xm 当前日期的x个月    1m， 2m
-xm  当前日期之前的x个月
xw  当前日期的x 周
-xw 当前日期之前的x周


视觉选项
showAnim  默认fateIn  设置false 无效果，
duration  300   日历显示或消失的持续时间
//其他效果：blind,从顶部显示，bounce，断断续续显示，clip，从中心垂直显示，slide，从左边显示，drop从左边显示外加透明变化， fold从左上角显示
highlight，伴随透明变化与背景色变化，puff，中间缩放，显示时候收缩，消失为生长，scale与上面相反，pulsate，闪耀显示显示,fateIn 伴随透明度变化

事件，回调函数的this等于对话框的div对象，而不是整个对话框的div
	beforeShow   日历显示之前调用
	beforeShowDay(date).在显示日历中的每个日期都会被调用（参数是1个date类对象）。返回1个数组来指定每个日期的信息：1，日期是否可以被选中（数组的第一项，true或false），2，日期单元格上使用的css样式，3，单元格上显示的字符串提供信息。
	  onChangeMonthYear(year,month,inst),在日历中显示的月份，或年份改变的时候调用，或者changeMonth，changeYear为true时，下拉也会触发，year为当前的年，month为当前的月，inst是一个对象，可以调用一些属性值
	  onClose(dateText,inst),关闭的时候调用，dateTest为当前选中的日期字符串，inst是1个对象，可以调用一些属性获取值。
	  onSelect(dateText,inst),在选择日历上的日期的时候调用，前者为选中的日期的字符串，

只允许选项中定义的事件，目前不能用on（）管理
方法
 //datepicker("action",param)方法
	 //datepicker("show"),显示
	 //datepicker("hide"),隐藏
	 //datepicker("getDate"),获取当前选定日历
	 //datepicker("setDate"，date),设置当前选定日历
	 //datepicker("destroy"),删日历
	 //datepicker("widget"),获取日历的jQuery对象
	 //datepicker("isDisabled"),获取日历是否禁用
	 //datepicker("refresh"),刷新日历
	 //datepicker("option",param),获取某属性值
	 //datepicker("option",param,value),设置某个属性的值


*/







});