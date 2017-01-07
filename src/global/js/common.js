;
$(function () {
    $("input[type=date]").on("input",function(){
        if($(this).val().length>0){
            $(this).addClass("full");
        }
        else{
            $(this).removeClass("full");
        }
    });
    function insertTitle(path){
        var test1 = path.lastIndexOf("/");  //对路径进行截取
        var test2 = path.lastIndexOf("\\");  //对路径进行截取
        var test= Math.max(test1, test2)
        if(test<0){
           return path;
        }else{
            return path.substring(test + 1);
        }
    }
    //上传图片
    $("input[type=file]").on("change",function(){
        var inputWrapper = $(this).closest('.inputFile');
        if($(this).val() !== ''){
            var fileName = insertTitle($(this).val());
            inputWrapper.find('img').removeClass('opacity').attr('src',"/global/images/banner.jpg");
            inputWrapper.find('span').html("");
        }
        else{
            inputWrapper.find('span').html('上传图片');
            inputWrapper.find('img').addClass('opacity');
        }
    });

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
   //地区联动
    $(".region-select").regionSelect();
  //申请页有无隐藏
   if($(".loan-applay-second")[0]){
       var isShowContent = function (self) {
           var selectedOpt = self.find("option:selected");
           var selectedVal = $.trim(selectedOpt.val());
           var isHide = selectedOpt.data("hide");
           console.log(typeof isHide);
           var secHide = self.closest('.bg-white').find(".sec-hide");
           if(isHide == true || selectedVal === ''){
               secHide.hide();
           }
           else{
               secHide.show();
           }
       }
      $(".filter-select").each(function(){
          var self = $(this);
          isShowContent(self);
          self.on('change',function(){
              isShowContent(self);
          });
      });


   }


   if($("form")[0]){
       var checkForm = function () {
           var inputTxt = $("form input:not(:hidden)");
           var inputFile = $("form input[type=file]");
           var inputDate = $("form input[type=date]");
           var selectObj = $("form select:not(:hidden)");
           inputTxt.each(function(){
               var sel = $(this);
               var selVal = $.trim(sel.val());
               if(selVal == ''){
                   sel.addClass("error-input");
               }
               else{
                   sel.removeClass("error-input");
               }
           });
           inputTxt.on("focus",function(){
               $(this).removeClass("error-input");
           });

           inputFile.each(function(){
               var sel = $(this);
               var selVal = $.trim(sel.val());
               var fontColor = sel.closest(".inputFile").find('span');
               if(selVal == ''){
                   fontColor.addClass("error-input");
               }
               else{
                   fontColor.removeClass("error-input");
               }
           });
           inputFile.on("change",function(){
               var sel = $(this);
               var selVal = $.trim(sel.val());
               var fontColor = sel.closest(".inputFile").find('span');
               if(selVal == ''){
                   fontColor.addClass("error-input");
               }
               else{
                   fontColor.removeClass("error-input");
               }
           });
           selectObj.each(function(){
               var sel = $(this);
               var selVal = $.trim(sel.val());
               if(selVal == ''){
                   sel.addClass("error-input");
               }
               else{
                   sel.removeClass("error-input");
               }
           });
           selectObj.on("change",function(){
               $(this).removeClass("error-input");
           });
           if($(".error-input").length>0){
               return false
           }
           else{
               return true;
           }
       }


       $("a.submit-a").on("click",function () {
           //console.log(checkForm());
           if(checkForm()){
               //alert(0);
           }
           else{
              // alert('fail');
           }
       });
   }

})







