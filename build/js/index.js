$(function () {
	function setRem(number) {
        var top = document.documentElement ? document.documentElement : document.body;
        var rem =parseFloat(getComputedStyle(top)["fontSize"]);
        return number*rem;
	}


//搜索栏设置
	$("#search_button").button({
		icons:{
			primary:"ui-icon-search"
		}
	});

	//提问按钮设置
    $("#question_button").button({
        icons:{
            primary:"ui-icon-lightbulb"
        }
    }).click(function () {
		if($.cookie('user')){
			$("#question").dialog('open');
		}else{
			$('#error').dialog('open');
			setTimeout(function () {
                $('#error').dialog('close');
                $('#login').dialog('open');
            },1000)
		}
    });


	$.ajax({
		url:'./php/show_content.php',
		type:'POST',
		success:function (response,status,xhr) {
			//通过设置高度来隐藏,但是可能导致部分字显示一半
			var json = $.parseJSON(response);
			 var html = '';
			 var arr  =[];
			$.each(json,function (index,value) {
                html+= '<h4>'+ value.user +' 发表于'+value.date+'</h4><h3>'+value.title+'</h3><div class="editor">'+value.content+'<div class="gradients"></div></div><div class="bottom"><span class="comment" data-id="'+value.id+'">'+value.count+'条评论</span><span class="down">展开阅读全文</span><span class="up">收起</span><hr size="1"><div class="comment_list"></div></div>'

            });
			$('.content').append(html);
			$.each($('.editor'),function (index,value) {
				arr[index] = $(value).height();
                $(value).next('.bottom').find('.up').hide();
				if($(value).height()>setRem(10)){
                    $(value).height(setRem(10));
				}

            });
            $.each($('.bottom .down'),function (index,value) {
				$(this).click(function () {
					$(this).parent().prev().height(arr[index]);
                    $(this).hide();
                    $(this).parent().find('.up').show();
                    $(this).parent().prev().find('.gradients').hide();
                })
            });
            $.each($('.bottom .up'),function (index,value) {
                $(this).click(function () {
                	if($(this).parent().prev().height()>setRem(10)){
                        $(this).parent().prev().height(setRem(10));
					}
                    $(this).hide();
                    $(this).parent().find('.down').show();
                    $(this).parent().prev().find('.gradients').show();

                })
            });
            $.each($('.bottom .comment'),function (index,value) {
				$(this).click(function () {
					var comment_this=this;
					if($.cookie('user')){
						if(!$('.comment_list').eq(index).has('form').length){
							$.ajax({
								url: 'php/show_comment.php',
								type:'POST',
								data:{
									titleid:$(comment_this).attr('data-id'),
								},
								beforeSend:function (jqXHR,setting) {
                                    $('.comment_list').eq(index).append('<dl class="comment_load"><dd>正在加载评论</dd></dl>');
                                },
								success:function (response,status) {
                                    $('.comment_list').eq(index).find('.comment_load').hide();
                                  var response_len = response.indexOf('[');
                                    response = response.substr(response_len,response.length);
                                    var json_comment = JSON.parse(response);
                                    var count = 0;

                                    $.each(json_comment,function (index2,value) {
                                        count = value.count;

                                        $('.comment_list').eq(index).append('<dl class="comment_content"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>')
                                    });

                                    $('.comment_list').eq(index).append('<di><dd><span class="load_more">加载更多评论</span></dd></di>');

                                    var page = 2;
                                    if(page > count){
                                        //$('.comment_list').eq(index).find('.load_more').off('click');
                                        $('.comment_list').eq(index).find('.load_more').hide();
                                    }

                                    $('.comment_list').eq(index).find('.load_more').button().on('click',function () {
                                        $('.comment_list').eq(index).find('.load_more').button('disable');
                                        $.ajax({
                                        url: 'php/show_comment.php',
                                        type: 'POST',
                                        data:{
                                            titleid:$(comment_this).attr('data-id'),
                                            page :page,
                                        },
                                        beforeSend:function (jqXHR,setting) {

                                        },
                                        success:function (response,status) {
                                            var response_len = response.indexOf('[');
                                            response = response.substr(response_len,response.length);
                                            var json_comment_more = JSON.parse(response);
                                            $.each(json_comment_more,function (index3,value) {
                                                $('.comment_list').eq(index).find('.comment_content').last().append('<dl class="comment_content"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>')
                                            });
                                            page++;
                                            if(page > count){
                                                //$('.comment_list').eq(index).find('.load_more').off('click');
                                                $('.comment_list').eq(index).find('.load_more').hide();
                                            }
                                            $('.comment_list').eq(index).find('.load_more').button('enable');
                                        }
                                    });
									});

                                    $('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment" cols="30" rows="10"></textarea></dt><dd><input type="hidden" name="titleid" value="'+$(comment_this).attr('data-id')+'"><input type="hidden" name="user" value="'+$.cookie('user')+'"><input type="button" value="发表"></dd></dl></form>');

                                    $('.comment_list').eq(index).find('input[type=button]').button().click(function () {
                                        var _this=this;
                                        $('.comment_list').eq(index).find('form').ajaxSubmit({
                                            url:'php/comments.php',
                                            type:'POST',
                                            beforeSubmit:function (formData,jqForm,options) {
                                                $('#loading').dialog('open');
                                                $(_this).button('disable');
                                            },
                                            success:function (reseponseText,statusText) {
                                                if(reseponseText){
                                                    $(_this).button('enable');
                                                    $("#loading").css('background','url(image/sure.png) no-repeat 1rem center').html('数据新增成功...');
                                                    $("#loading").css('background-size','1rem');
                                                    setTimeout(function () {
                                                    	var date=new Date(),
                                                                    newDatW ,
                                                                    newHoursW ,
                                                                    newMinutesW,
                                                                    newMillisecondsW,
                                                                    newMonthW;
                                                        $('#loading').dialog('close');
                                                        if(date.getDate()<10){
                                                            newDateW = "0"+date.getDate();
                                                        }else{
                                                            newDateW = date.getDate();
                                                        }
                                                        console.log();
                                                        if(date.getMonth()+1<10){
                                                            newMonthW = "0"+(date.getMonth()+1);
                                                        }else{
                                                            newMonthW = date.getMonth()+1;
                                                        }
                                                        if(date.getHours()<10){
                                                            newHoursW = "0"+date.getHours();
                                                        }else{
                                                            newHoursW = date.getHours();
                                                        }
                                                        if(date.getMinutes()<10){
                                                            newMinutesW = "0"+date.getMinutes();
                                                        }else{
                                                            newMinutesW = date.getMinutes();
                                                        }
                                                        if(date.getSeconds()<10){
                                                            newMillisecondsW = "0"+date.getSeconds();
                                                        }else{
                                                            newMillisecondsW = date.getSeconds();
                                                        }
                                                       $('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>'+$.cookie('user')+'</dt><dd>'+$('.comment_list').eq(index).find('textarea').val()+'</dd><dd>'+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+newDateW+" "+newHoursW+":"+newMinutesW+":"+newMillisecondsW+'</dd></dl>');
                                                        $('.comment_list').eq(index).find('form').resetForm();
                                                        $("#loading").css('background','url(image/loading.gif) no-repeat 1rem center').html('数据交互...');
                                                        $("#loading").css('background-size','1rem');


                                                    },1000);
                                                }
                                            }
                                        });
                                    })
                                }

							})
						}
						if($('.comment_list').eq(index).css("display")=='none'){
                            $('.comment_list').eq(index).show();

						}else{
                            $('.comment_list').eq(index).hide();

						}

					}else{
						$('#error').dialog('open');
						setTimeout(function () {
							$('#error').dialog('close');
							$('#login').dialog('open');

                        },1000);
					}
                });

            })
        },
	});

//提问设置
    $("#question").dialog({
        autoOpen:false,
        buttons:{
            "发布":function () {
                $(this).ajaxSubmit({
					url:'./php/add_content.php',
					type:'POST',
					data:{
						user:$.cookie('user'),
					},
                    beforeSubmit:function (formData,jqForm,options) {
                        $('#loading').dialog('open');
                        $('#question').dialog('widget').find('button').eq(1).button('disable');
                    },
                    success:function (reseponseText,statusText) {
                        if(reseponseText){
                            $('#question').dialog('widget').find('button').eq(1).button('enable');
                            $("#loading").css('background','url(image/sure.png) no-repeat 1rem center').html('数据新增成功...');
                            $("#loading").css('background-size','1rem');
                            setTimeout(function () {
                                $('#loading').dialog('close');
                                $('#question').dialog('close');
                                $('#question').resetForm();
                           		$('#ueditor_0').contents().find('body.view').html("");
                                $("#loading").css('background','url(image/loading.gif) no-repeat 1rem center').html('数据交互...');
                                $("#loading").css('background-size','1rem');
                            },1000);
                        }
                    }
				});
            }
        },
        width:setRem(50),
        height:setRem(35),
        show:false,
        hide:false,
        draggable:true,
        resizable:false,
        modal:true,
        closeText:"关闭"
    });

    var ue = UE.getEditor('editor');
//错误提示
    $("#error").dialog({
        autoOpen:false,
        modal:true,
        closeOnEscape:false,
        resizable:false,
        draggable:false,
        width:setRem(9),
        height:setRem(1.25)
    }).parent().find(".ui-widget-header").hide();

	/*
	//cookie设置
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


	//按钮切换
	$('#member,#logout').hide();
	if($.cookie('user')){
        $('#member').show().html($.cookie('user'));
        $('#logout').show();
        $('#reg_a,#login_a').hide()
	} else {
        $('#member,#logout').hide();
        $('#reg_a,#login_a').show()
	}


	$('#logout').click(function () {
		$.removeCookie('user');
		window.location.href = '/zhihu';
    });

	//等待时间
	$("#loading").dialog({
		autoOpen:false,
		modal:true,
		closeOnEscape:false,
		resizable:false,
		draggable:false,
		width:setRem(9),
		height:setRem(1.25)
	}).parent().find(".ui-widget-header").hide();

	//注册按钮
	$("#reg_a").click(function () {
	 $("#reg").dialog("open")
	 });


	//注册设置
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

	//注册邮箱判断
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
        collapsible:true
    });

});