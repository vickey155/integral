
;(function ($) {
    var isTouch = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click',
        _on = $.fn.on;
    $.fn.on = function () {
        arguments[0] = arguments[0] === 'click' ? isTouch : arguments[0];
        return _on.apply(this, arguments);
    };
    $(document).on('change', 'select', function () {
        var self = $(this);
        var selectedVal = $.trim(self.find("option:selected").val());
        if (selectedVal === '' && self.hasClass('selected')) {
            self.removeClass('selected');
        } else if (selectedVal != '' && !self.hasClass('selected')) {
            self.addClass('selected');
        }
    });
})(jQuery);
$(function () {
    //登录事件
    var loginEvent = function () {
        var showDialogErr = function (errTip) {
            //<a class="a-btn-graybg">取消</a>  <p>对不起，您未填写</p><p class="red-font">'+errTip+'</p>
            var temp = '<div class="bg-alert-pop"></div><div class="dialog-alert-pop">' + '<div class="dialog-title"> 温馨提示</div><div class="dialog-cont">' + '<p>' + errTip + '</p></div>' + '<div class="dialog-btn"><a class="a-btn-redbg close-btn">确认</a>' + '</div> </div>';
            $('body').append(temp);
            $('body').on('click', '.close-btn', function () {
                $(".bg-alert-pop").remove();
                $(".dialog-alert-pop").remove();
            });
        };
        var checkForm = function () {
            var inputValidate = $("form input[data-validate]:not(:hidden)");
            var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var password = /^[^\u4e00-\u9fa5]{6,16}$/;
            var showDialog = function (sel, dialogExist, errTip) {
                sel.addClass("error-input");
                if (dialogExist == 0) {
                    showDialogErr(errTip);
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
            //登录页面记住密码
            $("input.input-cbox").on("click", function () {
                var self = $(this);
                if (self.hasClass('icon-ok')) {
                    self.removeClass('icon-ok');
                } else {
                    self.addClass('icon-ok');
                }
            });
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
        $("a.submit-a").on("click", function () {
            console.log(loginEvent.validateForm());
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