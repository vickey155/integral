
;(function($){
    var isTouch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click', _on = $.fn.on;
    if(!$.fn.onClick) {
        $.fn.onClick = function () {
            arguments[0] = (arguments[0] === 'click') ? isTouch : arguments[0];
            return _on.apply(this, arguments);
        };
    }
    $(document).on('change','select',function () {
        var self = $(this);
        var selectedVal = $.trim(self.find("option:selected").val());
        if(selectedVal === '' && self.hasClass('selected')){
            self.removeClass('selected');
        }
        else if(selectedVal != '' && !self.hasClass('selected')){
            self.addClass('selected');
        }
    });
})(jQuery);

//阻止浏览器的默认行为
function stopDefault( e ) {
    //阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
}

var commonEvent = function() {
    var closeDialog = function(){
        $('body').onClick('click', '.close-btn', function () {
            $(".bg-alert-pop").remove();
            $(".dialog-alert-pop").remove();
        });
    }
    var dialogErrTip = function (errTip) { //<a class="a-btn-graybg">取消</a>  <p>对不起，您未填写</p><p class="red-font">'+errTip+'</p>
        var temp = '<div class="bg-alert-pop"></div><div class="dialog-alert-pop">' +
            '<div class="dialog-title"> 温馨提示</div><div class="dialog-cont">' +
            '<p>' + errTip + '</p></div>' +
            '<div class="dialog-btn"><a class="a-btn-redbg close-btn">确认</a>' +
            '</div> </div>';
        $('body').append(temp);
    };
    var dialogFillNone = function (errTip) {
        var temp = '<div class="bg-alert-pop"></div><div class="dialog-alert-pop">' +
            '<div class="dialog-title"> 温馨提示</div><div class="dialog-cont">' +
            '<p>对不起，您未填写</p><p class="red-font">'+errTip+'</p></div>' +
            '<div class="dialog-btn"><a class="a-btn-redbg close-btn">确认</a>' +
            '</div> </div>';
        $('body').append(temp);
    };
    var dialogInput = function (formObj,errTip) {
        var temp = '<div class="bg-alert-pop"></div><div class="dialog-alert-pop">' +
            '<div class="dialog-title"> 温馨提示</div><div class="dialog-cont">' +
            '<input type="text" placeholder="'+errTip+'"/></div>' +
            '<div class="dialog-btn a-2"><a class="a-btn-graybg close-btn">取消</a><a class="a-btn-redbg sure-btn">确认</a>' +
            '</div> </div>';
        $('body').append(temp);
        $('body').onClick('click', '.sure-btn', function () {
            var inputObj = $(".dialog-alert-pop input");
            var inputVal = $.trim(inputObj.val());
            if( inputVal == ''){
                inputObj.addClass("input-error");
            }
            else{
                var temp='<div class="checkbox-wrap"><span class="a-tab active">'+inputVal +'</span><input type="checkbox" checked="checked" name="'+inputVal +'"/></div>'
                inputObj.removeClass("input-error");
                formObj.before(temp);
                $(".bg-alert-pop").remove();
                $(".dialog-alert-pop").remove();
            }

        });
    };
    return{
        validataDialog:function (errTip) {
            dialogErrTip(errTip);
            closeDialog();
        },
        inputTextNone:function (errTip) {
            dialogFillNone(errTip);
            closeDialog();
        },
        customizeDialog:function (obj,errTip) {
            dialogInput(obj,errTip);
            closeDialog();
        }
    }
}();

$(function () {
    //checkbox
    //登录页面记住密码
    $("input.input-cbox").onClick("click", function () {
        var self = $(this);
        if (self.hasClass('icon-ok')) {
            self.removeClass('icon-ok').attr('checked',false);
        }
        else {
            self.addClass('icon-ok').attr('checked',true);
        }
    });

    //加减
    $(".opts-wrap input").on('keyup',function (e) {
        var sel = $(this);
        var selVal =  $.trim(sel.val());
        if(selVal == ''){
            sel.val('0');
        }
        else{
            var selVla =parseInt(selVal);
            sel.val(selVla);
        }
        stopDefault(e);
    });

   $(".opts-wrap").on('click','a',function (e) {
       var selInd = $(this).index();
       var input = $(this).parent('.opts-wrap').find("input");
       input.trigger('blur');
       var num = Number(input.val());
       if(selInd == 0){  // -
           if(num == 0){
               num = 0;
           }
           else{
               num--;
           }
       }
       else if(selInd == 2){  // +
           num++;
       }
       input.val(num);
       stopDefault(e);
   });

    $(".dialog-container").onClick("click",".icon-close",function(){
        $(".bg-pop").hide();
        $(".dialog-container").hide();
    })
})







