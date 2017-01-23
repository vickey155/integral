
;
$(function () {
    //登录事件
    var loginEvent = function () {
        var checkForm = function () {
            var inputValidate = $("form input[data-validate]:not(:hidden)");
            var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var password = /^[^\u4e00-\u9fa5]{6,16}$/;
            var showDialog = function (sel, dialogExist, errTip) {
                sel.addClass("error-input");
                if (dialogExist == 0) {
                    commonEvent.validataDialog(errTip);
                }
            };
            inputValidate.each(function () {
                var sel = $(this);
                var selVal = $.trim(sel.val());
                var selType = $.trim(sel.data("validate"));
                var dialogExist = $(".dialog-alert-pop").length;
                if (selVal == '') {
                    var errTip = $.trim(sel.attr("placeholder"));
                    showDialog(sel, dialogExist, errTip);
                } else if (selVal != '') {
                    sel.removeClass("error-input");
                    if (selType == 'telephone' && !mobile.test(selVal)) {
                        var errTip = "请输入正确的手机号";
                        showDialog(sel, dialogExist, errTip);
                    }
                    if (selType == 'password' && !password.test(selVal)) {
                        var errTip = "密码有6-16位数字，字母或特殊符号组成";
                        showDialog(sel, dialogExist, errTip);
                    }
                }
            });

            if ($(".error-input").length > 0) {
                return false;
            } else {
                return true;
            }
        };
        var saveUserInfo = function () {
            if ($("#rmbUser").hasClass('icon-ok') == true) {
                var userName = $("#user").val();
                var passWord = $("#password").val();
                $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
                $.cookie("userName", userName, { expires: 7 }); // 存储一个带7天期限的 cookie
                $.cookie("passWord", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie
            } else {
                $.cookie("rmbUser", "false", { expires: -1 });
                $.cookie("userName", '', { expires: -1 });
                $.cookie("passWord", '', { expires: -1 });
            }
        };
        var rememberUserFun = function () {
            if ($.cookie("rmbUser") == "true") {
                $("#rmbUser").attr("checked", true).addClass('icon-ok');
                $("#user").val($.cookie("userName"));
                $("#password").val($.cookie("passWord"));
            }
        };

        return {
            validateForm: function () {
                return checkForm();
            },
            remeberUserInfo: saveUserInfo,
            rememberUserInit: rememberUserFun
        };
    }();
    //登录记住密码
    loginEvent.rememberUserInit();
    //登录 注册 修改密码 验证
    if ($("form")[0]) {
        $(".sec-login a.submit-a").on("click", function () {
            console.log(loginEvent.validateForm());
            $('input').trigger('blur');
            if (loginEvent.validateForm()) {
                // alert('ok');
                //登录页的记住密码
                if ($("#rmbUser")[0]) {
                    loginEvent.remeberUserInfo();
                }
            } else {
                // alert('fail');
            }
        });
    }
});