$(function(){function e(e){var o=parseFloat(getComputedStyle(document.documentElement).fontSize);return e*o}$("#search_button").button({icons:{primary:"ui-icon-search"}}),$("#question_button").button({icons:{primary:"ui-icon-lightbulb"}}).click(function(){$.cookie("user")?$("#question").dialog("open"):($("#error").dialog("open"),setTimeout(function(){$("#error").dialog("close"),$("#login").dialog("open")},1e3))}),$("#question").dialog({autoOpen:!1,buttons:{"发布":function(){$(this).ajaxSubmit({url:"add_content.php",type:"POST"})}},width:e(55),height:e(42),show:!1,hide:!1,draggable:!0,resizable:!1,modal:!0,closeText:"关闭"});UE.getEditor("editor");$("#error").dialog({autoOpen:!1,modal:!0,closeOnEscape:!1,resizable:!1,draggable:!1,width:e(9),height:e(1.25)}).parent().find(".ui-widget-header").hide(),$("#member,#logout").hide(),$.cookie("user")?($("#member").show().html($.cookie("user")),$("#logout").show(),$("#reg_a,#login_a").hide()):($("#member,#logout").hide(),$("#reg_a,#login_a").show()),$("#logout").click(function(){$.removeCookie("user"),window.location.href="/knowQuestion/build/"}),$("#loading").dialog({autoOpen:!1,modal:!0,closeOnEscape:!1,resizable:!1,draggable:!1,width:e(9),height:e(1.25)}).parent().find(".ui-widget-header").hide(),$("#reg_a").click(function(){$("#reg").dialog("open")}),$("#reg").dialog({autoOpen:!1,buttons:{"提交":function(){$(this).submit()}},width:e(20),height:e(20),show:!1,hide:!1,draggable:!0,resizable:!1,modal:!0,closeText:"关闭"}).validate({rules:{user:{required:!0,minlength:5,remote:{url:"./php/is_user.php",type:"POST"}},email:{required:!0,email:!0},pass:{required:!0,rangelength:[5,10]},pwdSure:{required:!0,equalTo:"#pass"}},messages:{user:{required:"账号不能为空",minlength:"账号不能小于{0}位",remote:"账号被占用"},email:{required:"邮箱不能为空！",email:"请输入正确的邮箱地址"},pwdSure:{required:"密码确认不能为空",equalTo:"请与上面密码一致"},pass:{required:"密码不能为空！",rangelength:"请输入{0}到{1}位的密码"}},errorLabelContainer:"ol.myerror",wrapper:"li",submitHandler:function(e){$(e).ajaxSubmit({url:"./php/add.php",type:"POST",beforeSubmit:function(e,o,i){$("#loading").dialog("open"),$("#reg").dialog("widget").find("button").eq(1).button("disable")},success:function(e,o){e&&($("#reg").dialog("widget").find("button").eq(1).button("enable"),$("#loading").css("background","url(image/sure.png) no-repeat 1rem center").html("数据新增成功..."),$("#loading").css("background-size","1rem"),$.cookie("user",$("#user").val()),setTimeout(function(){$("#loading").dialog("close"),$("#reg").dialog("close"),$("#reg").resetForm(),$("#reg i.star").html("*").removeClass("succ"),$("#loading").css("background","url(image/loading.gif) no-repeat 1rem center").html("数据交互..."),$("#loading").css("background-size","1rem"),$("#member").show().html($.cookie("user")),$("#logout").show(),$("#reg_a,#login_a").hide()},1e3))}})},showErrors:function(o,i){var n=this.numberOfInvalids();if(n){var r=n+20;$("#reg").dialog("option","height",e(r))}this.defaultShowErrors()},highlight:function(e,o){$(e).css("border","1px solid #639"),$(e).parent().find("i").is(".succ")&&$(e).parent().find("i").html("*").removeClass("succ")},unhighlight:function(e,o){$(e).css("border","1px solid #ccc"),$(e).parent().find("i").html("").addClass("succ")}}),$("#email").autocomplete({source:function(e,o){var i=["qq.com","163.com","126.com","gmail.com","hotmail.com","sina.com.cn"],n=e.term,r=n.indexOf("@"),t=n,a="",s=[];if(s.push(n),r>-1&&(t=n.substr(0,r),a=n.substr(r+1)),t){var l=a?$.grep(i,function(e,o){return e.indexOf(a)>-1}):i,u=$.map(l,function(e,o){return t+"@"+e});s=s.concat(u)}o(s)},autoFocus:!0,delay:0}),$("#date").datepicker({currentText:"今天mm-dd",showMonthAfterYear:!0,numberOfMonths:1,showOtherMonths:!0,selectOtherMonths:!1,changeMonth:!0,changeYear:!0,autoSize:!1,showOn:"focus",showButtonPanel:!0,navigationAsDateFormat:!0,yearSuffix:"",hideIfNoPrevNext:!0,yearRange:"1900:2020",maxDate:0}),$("#login_a").click(function(){$("#login").dialog("open")}),$("#login").dialog({autoOpen:!1,buttons:{"登录":function(){$(this).submit()}},width:e(20),height:e(15),show:!1,hide:!1,draggable:!0,resizable:!1,modal:!0,closeText:"关闭"}).validate({rules:{login_user:{required:!0,minlength:5},login_pass:{required:!0,rangelength:[5,10],remote:{url:"./php/login.php",type:"POST",data:{login_user:function(){return $("#login_user").val()}}}}},messages:{login_user:{required:"账号不能为空",minlength:"账号不能小于{0}位"},login_pass:{required:"密码不能为空！",rangelength:"请输入{0}到{1}位的密码",remote:"账号或密码有误"}},onkeyup:!1,errorLabelContainer:"ol.login_error",wrapper:"li",submitHandler:function(e){$(e).ajaxSubmit({url:"./php/login.php",type:"POST",beforeSubmit:function(e,o,i){$("#loading").dialog("open"),$("#login").dialog("widget").find("button").eq(1).button("disable")},success:function(e,o){e&&($("#login").dialog("widget").find("button").eq(1).button("enable"),$("#loading").css("background","url(image/sure.png) no-repeat 1rem center").html("登录成功..."),$("#loading").css("background-size","1rem"),$("#expires").is(":checked")?$.cookie("user",$("#login_user").val(),{expires:7}):$.cookie("user",$("#login_user").val()),setTimeout(function(){$("#loading").dialog("close"),$("#login").dialog("close"),$("#login").resetForm(),$("#login i.star").html("*").removeClass("succ"),$("#loading").css("background","url(image/loading.gif) no-repeat 1rem center").html("数据交互..."),$("#loading").css("background-size","1rem"),$("#member").show().html($.cookie("user")),$("#logout").show(),$("#reg_a,#login_a").hide()},1e3))}})},showErrors:function(o,i){var n=this.numberOfInvalids();if(n){var r=n+15;$("#login").dialog("option","height",e(r))}this.defaultShowErrors()},highlight:function(e,o){$(e).css("border","1px solid #639"),$(e).parent().find("i").is(".succ")&&$(e).parent().find("i").html("*").removeClass("succ")},unhighlight:function(e,o){$(e).css("border","1px solid #ccc"),$(e).parent().find("i").html("").addClass("succ")}}),$("#tabs").tabs(),$("#accordion").accordion({collapsible:!0})});