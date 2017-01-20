
;(function($){
    var isTouch = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click', _on = $.fn.on;
    $.fn.onClick = function(){
        arguments[0] = (arguments[0] === 'click') ? isTouch: arguments[0];
        return _on.apply(this, arguments);
    };
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
$(function () {

   //买家
    //banner 轮播
    if($("#banner")[0]){
        TouchSlide({
            slideCell:"#banner",
            titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell:".bd ul",
            effect:"leftLoop",
            autoPlay:true,//自动播放
            autoPage:true, //自动分页
            interTime: 3000
        });
    }

})







