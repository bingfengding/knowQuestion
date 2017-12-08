$(function () {
    function setRem(number) {
        var rem =parseFloat(getComputedStyle(document.documentElement)["fontSize"]);
        return number*rem;
    }

    $("#search_button").button({
        icons:{
            //primary:"ui-icon-search"
        }
    });
    /*
     $.cookie('user','bnbbs',{
     expires:7,//设置过期时间，最常用的
     path:'/',//设置路径
     damain:'www.baidu.com',//设置域名，限制在这个域名下
     secure:true  //默认为false，需要使用安全协议http
     });
     $.cookie.raw = true;//,关闭或开启编码解码，默认为开启 false，
     console.log($.cookie('user'));// 读取cookie数据 所有cookie都是以对象键值对存放的，所以也可以通过$.cookie().user 获取
     $.removeCookie('user');//删除cookie
     $.removeCookie('user',{
     path:'/'
     });//删除指定路径cookie
     */

    $('#member,#logout').hide();
    if($.cookie('user')){
        $('#member').show().html($.cookie('user'));
        $('#logout').show();
        $('#reg_a,#login_a').hide()
    } else {
        $('#member,#logout').hide();
        $('#reg_a,#login_a').show()
    };
    $('#logout').click(function () {
        $.removeCookie('user');
        window.location.href = '/knowQuestion/build/';
    });
    $("#loading").dialog({
        autoOpen:false,
        modal:true,
        closeOnEscape:false,
        resizable:false,
        draggable:false,
        width:setRem(9),
        height:setRem(1.25)
    }).parent().parent().find(".ui-widget-header").hide();
    $("#reg_a").click(function () {
        $("#reg").dialog("open")
    });
    $("#reg").dialog({
        autoOpen:false,
        buttons:{
            "提交":function () {
                $(this).submit();
            }
        },
        width:setRem(20),
        height:setRem(20),
        show:false,
        hide:false,
        draggable:true,
        resizable:false,
        modal:true,
        closeText:"关闭"
    }).validate({
        rules:{
            user:{
                required:true,
                minlength:5,
                remote:{
                    url:'./php/is_user.php',
                    type:'POST'
                }
            },
            email:{
                required:true,
                email:true
            },
            pass:{
                required:true,
                rangelength:[5,10]
            },
            pwdSure:{
                required:true,
                equalTo:"#pass"
            }

        },
        messages:{
            user:{
                required:"账号不能为空",
                minlength:"账号不能小于{0}位",
                remote:"账号被占用"
            },
            email:{
                required:"邮箱不能为空！",
                email:"请输入正确的邮箱地址"
            },
            pwdSure:{
                required:"密码确认不能为空",
                equalTo:"请与上面密码一致"
            },
            pass:{
                required:"密码不能为空！",
                rangelength:"请输入{0}到{1}位的密码"
            }
        },
        errorLabelContainer:"ol.myerror",
        wrapper:"li",
        submitHandler:function (form) {
            $(form).ajaxSubmit({
                url:'./php/add.php',
                type:'POST',
                beforeSubmit:function (formData,jqForm,options) {
                    $('#loading').dialog('open');
                    $('#reg').dialog('widget').find('button').eq(1).button('disable');
                },
                success:function (reseponseText,statusText) {
                    if(reseponseText){
                        $('#reg').dialog('widget').find('button').eq(1).button('enable');
                        $("#loading").css('background','url(image/sure.png) no-repeat 1rem center').html('数据新增成功...');
                        $("#loading").css('background-size','1rem');
                        $.cookie('user',$('#user').val());
                        setTimeout(function () {
                            $('#loading').dialog('close');
                            $('#reg').dialog('close');
                            $('#reg').resetForm();
                            $('#reg i.star').html('*').removeClass('succ');

                            $("#loading").css('background','url(image/loading.gif) no-repeat 1rem center').html('数据交互...');
                            $("#loading").css('background-size','1rem');
                            $('#member').show().html($.cookie('user'));
                            $('#logout').show();
                            $('#reg_a,#login_a').hide()
                        },1000);
                    }
                }
            })
        },
        showErrors:function (errorMap,errorList) {
            var errors = this.numberOfInvalids();
            if(errors){
                var num = errors+20;
                $("#reg").dialog("option","height",setRem(num));
            }
            this.defaultShowErrors();
        },
        highlight:function(element,errorClass){
            $(element).css("border","1px solid #639");
            if($(element).parent().find("i").is(".succ")){
                $(element).parent().find("i").html("*").removeClass("succ");
            }
        },
        unhighlight:function(element,errorClass){
            $(element).css("border","1px solid #ccc");
            //$(element).parent().find("i").html("ok");
            $(element).parent().find("i").html("").addClass("succ");//添加1个class，然后可以设置背景图片来用图片替代OK
        }
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
        currentText: '今天mm-dd',
        showMonthAfterYear: true,
        numberOfMonths:1,
        showOtherMonths:true,
        selectOtherMonths:false,
        changeMonth:true,
        changeYear:true,
        autoSize:false,
        showOn:"focus",
        showButtonPanel:true,
        navigationAsDateFormat:true,
        yearSuffix:"",
        hideIfNoPrevNext:true,
        yearRange:"1900:2020",
        maxDate:0
    });
//登录
    $("#login_a").click(function () {
        $("#login").dialog("open");
    });

    $("#login").dialog({
        autoOpen:false,
        buttons:{
            "登录":function () {
                $(this).submit();

            }
        },
        width:setRem(20),
        height:setRem(15),
        show:false,
        hide:false,
        draggable:true,
        resizable:false,
        modal:true,
        closeText:"关闭"
    }).validate({

        rules:{
            login_user:{
                required:true,
                minlength:5
            },
            login_pass:{
                required:true,
                rangelength:[5,10],
                remote:{
                    url:'./php/login.php',
                    type:'POST',
                    data:{
                        login_user:function () {
                            return $('#login_user').val();
                        }
                    }
                }
            }
        },
        messages:{
            login_user:{
                required:"账号不能为空",
                minlength:"账号不能小于{0}位"
            },
            login_pass:{
                required:"密码不能为空！",
                rangelength:"请输入{0}到{1}位的密码",
                remote:"账号或密码有误"
            }
        },
        onkeyup:false,
        errorLabelContainer:"ol.login_error",
        wrapper:"li",
        submitHandler:function (form) {
            $(form).ajaxSubmit({
                url:'./php/login.php',
                type:'POST',
                beforeSubmit:function (formData,jqForm,options) {
                    $('#loading').dialog('open');
                    $('#login').dialog('widget').find('button').eq(1).button('disable');
                },
                success:function (reseponseText,statusText) {
                    if(reseponseText){
                        $('#login').dialog('widget').find('button').eq(1).button('enable');
                        $("#loading").css('background','url(image/sure.png) no-repeat 1rem center').html('登录成功...');
                        $("#loading").css('background-size','1rem');
                        if( $('#expires').is(':checked')){
                            $.cookie('user',$('#login_user').val(),{
                                expires:7
                            })
                        }else{
                            $.cookie('user',$('#login_user').val())
                        }
                        setTimeout(function () {
                            $('#loading').dialog('close');
                            $('#login').dialog('close');
                            $('#login').resetForm();
                            $('#login i.star').html('*').removeClass('succ');

                            $("#loading").css('background','url(image/loading.gif) no-repeat 1rem center').html('数据交互...');
                            $("#loading").css('background-size','1rem');
                            $('#member').show().html($.cookie('user'));
                            $('#logout').show();
                            $('#reg_a,#login_a').hide()
                        },1000);
                    }

                }
            })
        },
        showErrors:function (errorMap,errorList) {
            var errors = this.numberOfInvalids();
            if(errors){
                var num = errors+15;
                $("#login").dialog("option","height",setRem(num));
            }
            this.defaultShowErrors();
        },
        highlight:function(element,errorClass){
            $(element).css("border","1px solid #639");
            if($(element).parent().find("i").is(".succ")){
                $(element).parent().find("i").html("*").removeClass("succ");
            }
        },
        unhighlight:function(element,errorClass){
            $(element).css("border","1px solid #ccc");
            //$(element).parent().find("i").html("ok");
            $(element).parent().find("i").html("").addClass("succ");//添加1个class，然后可以设置背景图片来用图片替代OK
        }
    });
    $('#tabs').tabs();
    $('#accordion').accordion({
        collapsible:true,
        icons:{
            'header':'ui-icon-plus',//展开之前的可以在文档内查看具体的
            'activeHeader':'ui-icon-minus'//展开之后的
        }
    });

    //折叠菜单有2个形式，1，accordion(options),options以对象键值对传参，每个键值对表示1个选项，2.accordion('action',param),action是操作选项卡方法的字符串，param这是选项卡的某个选项。
    //accordion外观选项
    /*

        collapsible 默认false/布尔   设置true的时候，允许菜单折叠对应内容。
        disabled    默认无/数组      设置true为禁用折叠菜单
        event       默认click/字符串   触发accordion的事件类型，可以设置mouseover 等其他鼠标事件
        active      数值和布尔值      如果是数值，初始化默认显示哪个tab，默认值为0，如果是布尔值，那么默认是否折叠，条件是collapsible是true
        heightStyle  auto/字符串     默认Auto为根据内容伸展高度，content则自动根据最高的那个为基准，fill则是填充一定可用高度。
        header     h1/字符串          设置折叠菜单的标题标签
        icons      默认图标            设置想要的图标


     */

    /*
     accordion()方法的事件
     create 创建1个折叠菜单时激活此事件，该方法有2个参数（event,ui）,ui参数有2个子属性header和panel，得到当前活动卡和内容选项的对象。
     activate 当切换1个折叠菜单时，启动此事件，该方法有2个参数（event,ui）,ui参数有4个子属性newHeader，newPanel，oldHeader，oldPanel。分别得到的时候新折叠菜单对象，新内容，旧折叠菜单对象，旧内容。
     beforeActivate 当切换1个活动卡之前，启动此事件，该方法有2个参数（event,ui）,ui参数有4个子属性newHeader，newPanel，oldHeader，oldPanel。分别得到的时候新折叠菜单对象，新内容，旧折叠菜单对象，旧内容。

     */


    //accordion('action',param)方法
    //accordion('disable')  返回jquery对象  禁用折叠菜单 accordion('disable'，0)禁用第一个
    //accordion('widget')  返回jquery对象  获取折叠菜单的jquery对象
    //accordion('destroy')  返回jquery对象  删除折叠菜单，直接阻断了tabs
    //accordion('refresh')  返回jquery对象  更新折叠菜单，比如高度
    //accordion('action',param)  一般值         获取options的值
    //accordion('action',param,value)  返回jquery对象         设置options的值


    //accordion的事件里面提供使用on()方法处理的时间方法
    //accordionactivate  折叠菜单切换时候触发
    //accordionactivate  折叠菜单切换之前触发
//例如$('#accordion').on('accordionactivate',function(){})

});