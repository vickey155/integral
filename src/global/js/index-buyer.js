
;
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






