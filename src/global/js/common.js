
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
    var valTurnTwoNum = function(val){
        var returnVal = '0.00';
        if(val == null){
            returnVal = '0.00';
        }
        else{
            var selVal = $.trim(val.toString());
            if(selVal == ''){
                returnVal = '0.00';
            }
            else{
                if(selVal.indexOf('.') == -1){   //整数
                    returnVal = selVal+".00";
                }
                else{
                    var arrNum = selVal.split(".");
                    var pointNum = arrNum[1];
                    if(pointNum.length == 1){ //一位小数
                        returnVal = selVal +'0';
                    }
                    else if(pointNum.length == 2){ //两位小数
                        returnVal = selVal;
                    }
                    else{     //两位以上小数
                        arrNum[1] = pointNum.substring(0,2);
                        returnVal = arrNum.join('.');
                    }
                }
            }
        }
        return returnVal;
    };
    var closeDialog = function(){
        $('.dialog-alert-pop').onClick('click', '.close-btn', function () {
            $(".bg-alert-pop").remove();
            $(".dialog-alert-pop").remove();
            return false;
        });
    };
    var dialogErrTip = function (errTip) {
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
            '<p>对不起，'+errTip+'</span></p></div>' +
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
        $('.dialog-alert-pop .sure-btn').onClick('click', function () {
            var inputObj = $(".dialog-alert-pop input");
            var inputVal = $.trim(inputObj.val());
            if( inputVal == ''){
                inputObj.addClass("input-error");
            }
            else{
                var temp='<div class="checkbox-wrap"><span class="a-tab">'+inputVal +'<i class="icon-close"></i></span><input type="checkbox" name="'+inputVal +'"/></div>'
                inputObj.removeClass("input-error");
                formObj.before(temp);
                $(".bg-alert-pop").remove();
                $(".dialog-alert-pop").remove();
                $(".a-tab-wrap .icon-close").onClick('click',function(e){
                  var sel = $(this);
                  //sel.closest('.checkbox-wrap').find('input[type=checkbox]').prop("checked", false);
                  sel.closest('.checkbox-wrap').remove();
                  stopDefault(e);
                })
            }

        });
    };
    var dialogConfirm = function (errTip,fun) {
        var temp = '<div class="bg-alert-pop"></div><div class="dialog-alert-pop">' +
            '<div class="dialog-title"> 温馨提示</div><div class="dialog-cont">' +
            '<p>' + errTip + '</p></div>' +
            '<div class="dialog-btn a-2"><a class="a-btn-graybg close-btn">取消</a><a class="a-btn-redbg sure-btn">确认</a>' +
            '</div> </div>';
        $('body').append(temp);
       // closeDialog();
      $('.dialog-alert-pop .sure-btn').onClick('click',function(){
        $(".bg-alert-pop").remove();
        $(".dialog-alert-pop").remove();
        fun();
        return false;
      });
    };

    return{
        valPointTwoNum:function(val){
            return valTurnTwoNum(val);
        },
        validataDialog:function (errTip) {
            dialogErrTip(errTip);
            closeDialog();
        },
        inputTextNone:function (errTip) {
            dialogFillNone(errTip);
            closeDialog();
        },
        confirmDialog:function(tip,fun){ //fun为确认时执行的函数方法
            dialogConfirm(tip,fun);
            closeDialog();
        },
        customizeDialog:function (obj,errTip) {
            dialogInput(obj,errTip);
            closeDialog();
        },
        alertDialog:function(tip){ //alert提示框
            dialogErrTip(tip);
            closeDialog();
        },
    }
}();


$(function (){


});







