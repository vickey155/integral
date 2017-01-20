
;
$(function () {
    //登录事件
    var loginEvent = function(){
        var checkForm = function () {
            var inputValidate = $("form input[data-validate]:not(:hidden)");
            var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var password = /^[^\u4e00-\u9fa5]{6,16}$/;
            var showDialog = function (sel,dialogExist,errTip) {
                sel.addClass("error-input");
                if(dialogExist == 0){
                    commonEvent.validataDialog(errTip);
                }
            }
            inputValidate.each(function(){
                var sel = $(this);
                var selVal = $.trim(sel.val());
                var selType = $.trim(sel.data("validate"));
                var dialogExist = $(".dialog-alert-pop").length;
                if(selVal == ''){
                    var errTip = $.trim(sel.attr("placeholder"));
                    showDialog(sel,dialogExist,errTip);
                }
                else if(selVal != ''){
                    sel.removeClass("error-input");
                    if(selType == 'telephone' && !mobile.test(selVal)){
                        var errTip = "请输入正确的手机号";
                        showDialog(sel,dialogExist,errTip);
                    }
                    if(selType == 'password' && !password.test(selVal)){
                        var errTip = "密码有6-16位数字，字母或特殊符号组成";
                        showDialog(sel,dialogExist,errTip);
                    }
                }
            });

            if($(".error-input").length>0){
                return false
            }
            else{
                return true;
            }
        };
        var saveUserInfo = function() {
            if ($("#rmbUser").hasClass('icon-ok') == true) {
                var userName = $("#user").val();
                var passWord = $("#password").val();
                $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
                $.cookie("userName", userName, { expires: 7 }); // 存储一个带7天期限的 cookie
                $.cookie("passWord", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie
            }
            else {
                $.cookie("rmbUser", "false", { expires: -1 });
                $.cookie("userName", '', { expires: -1 });
                $.cookie("passWord", '', { expires: -1 });
            }
        };
        var rememberUserFun = function(){
            if ($.cookie("rmbUser") == "true") {
                $("#rmbUser").attr("checked", true).addClass('icon-ok');
                $("#user").val($.cookie("userName"));
                $("#password").val($.cookie("passWord"));
            }
        }

        return{
            validateForm:function () {
                return checkForm();
            },
            remeberUserInfo: saveUserInfo,
            rememberUserInit: rememberUserFun
        }
    }();
    //登录记住密码
    loginEvent.rememberUserInit();
   //登录 注册 修改密码 验证
   if($("form")[0]){
       $(".sec-login a.submit-a").on("click",function () {
           console.log(loginEvent.validateForm());
           $('input').trigger('blur');
           if(loginEvent.validateForm()){
              // alert('ok');
               //登录页的记住密码
               if($("#rmbUser")[0]){
                   loginEvent.remeberUserInfo();
               }
           }
           else{
               // alert('fail');
           }
       });
   }


   //产品发布
    $("#product-type").on("change",function(){
        var selVal = $.trim($(this).find("option:selected").val());
        $(".sec-fill-cont").hide();
        if(selVal == 'package'){
            $(".package").show();
        }
        else if(selVal == 'cottonSock'){
            $(".cottonSock").show();
        }
        else if(selVal == 'stockings'){
            $(".stockings").show();
        }
        else if(selVal == ''){
            $(".sec-fill-cont").hide();
        }

    });
    //tab-a 选择
    //单选
    $(".a-tab-wrap").onClick('click','.radio-wrap span',function(){
        var sel = $(this);
        var selRadio = sel.parent(".radio-wrap").find("input[type=radio]");
        $(".a-tab-wrap span").removeClass('active');
        $(".a-tab-wrap input[type=radio]").attr("checked",false);
        sel.addClass('active');
        selRadio.attr("checked",true);
    });
    //多选
    $(".a-tab-wrap").onClick('click','.checkbox-wrap span',function(){
        var sel = $(this);
        var selCheckbox = sel.parent(".checkbox-wrap").find("input[type=checkbox]");
        if(sel.hasClass('active')){
            sel.removeClass('active');
            selCheckbox.attr("checked",false);
        }
        else{
            sel.addClass('active');
            selCheckbox.attr("checked",true);
        }
    });
    //添加input
    $(".input-add-wrap").onClick('click','.add-btn',function(){
        var sel = $(this);
        var cutBtn = '<span class="cut-btn">-</span>';
        var inputWrap = sel.prev('.input-wrap');
        var cloneRow = inputWrap.clone(true);
        if(inputWrap.find(".cut-btn").length == 0){
            inputWrap.append(cutBtn);
        }
        cloneRow.find("input").val("");
        sel.before(cloneRow);
    });
    //删除input
    $(".input-add-wrap").onClick('click','.cut-btn',function(){
        var sel = $(this);
        var selWrap = sel.parent(".input-wrap");
        selWrap.remove();
    });

    //自定义点击事件
    $(".a-tab-wrap").onClick("click",".last-a",function () {
        var sel = $(this);
        var placeholderTxt = $.trim(sel.data('tip'));
        commonEvent.customizeDialog(sel,placeholderTxt);
    });
    //图片上传最多五张
     $(".upload-pic").on("change","input[type=file]",function () {
         var sel = $(this);
         var ulWrap = sel.closest('ul');
         var temp = '<li><img src="../global/images/pic'+liLen+'.png"/><i class="icon-close"></i></li>'
         sel.closest('li').before(temp);
         var liLen = ulWrap.find('li').length;
         if(liLen == 6){
             sel.closest('li').hide();
             //commonEvent.validataDialog("最多上传五张图片！");
            // return false
         }
     });
    $(".upload-pic").onClick("click",'li .icon-close',function(){
        var sel = $(this);
        var ulWrap = sel.closest('ul');
        var liLen = ulWrap.find('li:not(:hidden)').length;
        if(liLen <= 5){
            ulWrap.find("li.input-file-wrap").show();
        }
        sel.closest('li').remove();
    })



    //产品发布 验证
    var productReleaseEvent = function(){
        var checkForm = function () {
            var inputValidate = $("form input[data-validate]:not(:hidden)");
            var showDialog = function (sel,dialogExist,errTip) {
                sel.addClass("error-input");
                if(dialogExist == 0){
                    commonEvent.inputTextNone(errTip);
                }
                sel.trigger('focus');
            }
            inputValidate.each(function(){
                var sel = $(this);
                var selVal = $.trim(sel.val());
                var selType = $.trim(sel.data("validate"));
                var dialogExist = $(".dialog-alert-pop").length;
                if(selVal == ''){
                    var errTip = $.trim(sel.data("validate"));
                    showDialog(sel,dialogExist,selType);
                }
                else if(selVal != ''){
                    sel.removeClass("error-input");
                    if(selType == 'telephone' && !mobile.test(selVal)){
                        var errTip = "请输入正确的手机号";
                        showDialog(sel,dialogExist,errTip);
                    }
                    if(selType == 'password' && !password.test(selVal)){
                        var errTip = "密码有6-16位数字，字母或特殊符号组成";
                        showDialog(sel,dialogExist,errTip);
                    }
                }
            });

            if($(".error-input").length>0){
                return false
            }
            else{
                return true;
            }
        };
        return{
            validateForm:function () {
                return checkForm();
            }
        }
    }();
    if($("form")[0]){
        $(".product-release a.submit-a").onClick("click",function () {
            console.log(productReleaseEvent.validateForm());
            $('input').trigger('blur');
            if(productReleaseEvent.validateForm()){
                 alert('ok');
            }
            else{
                 alert('fail');
            }
        });
    }
});







