
;(function ($) {
  //阻止浏览器的默认行为
  function stopDefault(e) {
    //阻止默认浏览器动作(W3C)
    if (e && e.preventDefault) e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else window.event.returnValue = false;
    return false;
  }

  var isTouch = 'ontouchstart' in document.documentElement ? 'touchend' : 'click',
      _on = $.fn.on;
  if (!$.fn.onClick) {
    $.fn.onClick = function () {
      arguments[0] = arguments[0] === 'click' ? isTouch : arguments[0];
      return _on.apply(this, arguments);
    };
  }
  $(document).on('change', 'select', function () {
    var self = $(this);
    var selectedVal = $.trim(self.find("option:selected").val());
    if (selectedVal === '' && self.hasClass('selected')) {
      self.removeClass('selected');
    } else if (selectedVal != '' && !self.hasClass('selected')) {
      self.addClass('selected');
    }
  });
  var isTouchStar = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click',
      _onT = $.fn.on;
  if (!$.fn.onTouch) {
    $.fn.onTouch = function () {
      arguments[0] = arguments[0] === 'click' ? isTouchStar : arguments[0];
      return _onT.apply(this, arguments);
    };
  }
  $(document).onTouch('click', '.bg-pic-pop,.dialog-alert-pop', function () {
    stopDefault();
  });
})(jQuery);

var commonEvent = function () {
  //获取url上的参数
  var getetQueryString = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  };
  var valTurnTwoNum = function (val) {
    var returnVal = '0.00';
    if (val == null) {
      returnVal = '0.00';
    } else {
      var selVal = $.trim(val.toString());
      if (selVal == '') {
        returnVal = '0.00';
      } else {
        if (selVal.indexOf('.') == -1) {
          //整数
          returnVal = selVal + ".00";
        } else {
          var arrNum = selVal.split(".");
          var pointNum = arrNum[1];
          if (pointNum.length == 1) {
            //一位小数
            returnVal = selVal + '0';
          } else if (pointNum.length == 2) {
            //两位小数
            returnVal = selVal;
          } else {
            //两位以上小数
            arrNum[1] = pointNum.substring(0, 2);
            returnVal = arrNum.join('.');
          }
        }
      }
    }
    return returnVal;
  };
  var closeDialog = function () {
    $('.dialog-alert-pop').onClick('click', '.close-btn', function () {
      $(".bg-alert-pop").remove();
      $(".dialog-alert-pop").remove();
      return false;
    });
  };
  var dialogErrTip = function (errTip, fun) {
    var temp = '<div class="bg-alert-pop"></div><div class="dialog-alert-pop">' + '<div class="dialog-cont"><p>' + errTip + '</p></div>' + '<div class="dialog-btn"><a href="javascript:void(0);" class="close-btn callBtn">确定</a>' + '</div> </div>';
    $('body').append(temp);
    $('.dialog-alert-pop .callBtn').onClick('click', function () {
      $(".bg-alert-pop").remove();
      $(".dialog-alert-pop").remove();
      if (fun) {
        fun();
      }
      return false;
    });
  };
  var dialogConfirm = function (tip, fun) {
    var temp = '<div class="bg-alert-pop"></div><div class="dialog-alert-pop">' + '<div class="dialog-cont"><p>' + tip + '</p></div>' + '<div class="dialog-btn"><a href="javascript:void(0);"class="close-btn">取消</a><a href="javascript:void(0);" class="sure-btn">确定</a>' + '</div> </div>';
    $('body').append(temp);
    $('.dialog-alert-pop .sure-btn').onClick('click', function () {
      $(".bg-alert-pop").remove();
      $(".dialog-alert-pop").remove();
      if (fun) {
        fun();
      }
      return false;
    });
  };
  var dialogConfirmUrl = function (tip, url, urlTxt) {
    var temp = '<div class="bg-alert-pop"></div><div class="dialog-alert-pop">' + '<div class="dialog-cont"><p>' + tip + '</p></div>' + '<div class="dialog-btn"><a href="javascript:void(0);" class="close-btn">关闭</a><a class="a-link" href="' + url + '">' + urlTxt + '</a>' + '</div> </div>';
    $('body').append(temp);
  };
  //关闭带图片的弹层
  var closePicDiaFn = function () {
    $(document).onClick('click', '.dia-pic .close-btn,.dia-pic .dia-close', function () {
      setTimeout(function () {
        $(".bg-pic-pop").hide();
        $(".dia-pic").hide();
      }, 200);
    });
  };

  return {
    getUrlPram: function (name) {
      return getetQueryString(name);
    },
    valPointTwoNum: function (val) {
      return valTurnTwoNum(val);
    },
    validataDialog: function (errTip) {
      dialogErrTip(errTip);
      closeDialog();
    },
    confirmDialog: function (tip, fun) {
      //fun为确认时执行的函数方法
      dialogConfirm(tip, fun);
      closeDialog();
    },
    urlGoDialog: function (tip, url, urlTxt) {
      dialogConfirmUrl(tip, url, urlTxt);
      closeDialog();
    },
    alertDialog: function (tip, fun) {
      //alert提示框
      dialogErrTip(tip, fun);
      closeDialog();
    },
    closePicDia: function () {
      closePicDiaFn();
    }
  };
}();

//进度条
var progress = function () {
  var signDay = function () {
    //签到进度条
    var wrap = $('.progress');
    var allDays = 7;
    var lastDays = wrap.find('#prossNum').text();
    // var allProgerssW = wrap.find('.progress-bar').width();
    var allProgerssW = 1.6;
    var cuppy = wrap.find('.progress-ocuppy');
    var signDays = allDays - Number(lastDays);
    //var rate = signDays/allDays;
    var rate = 0.23;
    //var ocuppyW =rate * allProgerssW;
    var ocuppyW = rate * signDays;
    cuppy.width(ocuppyW + 'rem');
  };
  var gradProgress = function () {
    //等级进度条
    var wrap = $('.histogram-wrap .histogram-cont');
    var allNum = 100;
    var h0 = 1;
    //var barH = Number(wrap.height()) - 1;
    var barH = 4.4 - h0;
    var column = wrap.find('.column');
    column.each(function () {
      var num0 = '0';
      var self = $(this);
      var selfOcuppyNum = Number($(this).find('.num i').text());
      var selfOcuppyH = $(this).find('.column-ocuppy');
      var rate = selfOcuppyNum / allNum;
      selfOcuppyH.height(rate * barH + 'rem');
    });
  };

  return {
    signDayInit: function () {
      signDay();
    },
    gradProgressInit: function () {
      gradProgress();
    }
  };
}();

$(function () {
  progress.signDayInit();
  progress.gradProgressInit();
});