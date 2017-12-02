var luckDraw = function () {
  var click=false;
  var that = this;
  that.prizeIndex = null;
  that.prizeName = null;
  var luck={
    index:-1,	//当前转动到哪个位置，起点位置
    count:0,	//总共有多少个位置
    timer:0,	//setTimeout的ID，用clearTimeout清除
    speed:20,	//初始转动速度
    times:0,	//转动次数
    cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize:-1,	//中奖位置
    init:function(id){
      if ($("#"+id).find(".luck-unit").length>0) {
        $luck = $("#"+id);
        $units = $luck.find(".luck-unit");
        this.obj = $luck;
        this.count = $units.length;
        $luck.find(".luck-unit-"+this.index).addClass("active");
      };
    },
    roll:function(){
      var index = this.index;
      var count = this.count;
      var luck = this.obj;
      $(luck).find(".luck-unit-"+index).removeClass("active");
      index += 1;
      if (index>count-1) {
        index = 0;
      };
      $(luck).find(".luck-unit-"+index).addClass("active");
      this.index=index;
      return false;
    },
    stop:function(index){
      this.prize=index;
      return false;
    }
  };


  function roll(fn){
    luck.times += 1;
    luck.roll();//转动过程调用的是luck的roll方法，这里是第一次调用初始化
    if (luck.times > luck.cycle+10 && luck.prize==luck.index) {
      $("#drawBtn").removeClass("disabledBtn");
      if(!that.prizeName ){

      }
      else if(that.prizeName !== 'null' ){
        fn();
      }
      else {

        commonEvent.alertDialog('很遗憾，这次没有中奖，继续加油！',function () {
          $("#luck").find(".luck-unit-"+luck.index).removeClass("active");
          console.log('index');
          console.log(luck.index);

        });
      }

      clearTimeout(luck.timer);
      luck.prize=-1;
      luck.times=0;
      click=false;
    }else{
      if (luck.times<luck.cycle) {
        luck.speed -= 10;
      }else if(luck.times==luck.cycle) {
        //var index = Math.random()*(luck.count)|0; //静态演示，随机产生一个奖品序号，实际需请求接口产生
        var index = that.prizeIndex;//静态演示，随机产生一个奖品序号，实际需请求接口产生
        luck.prize = index;
      }else{
        if (luck.times > luck.cycle+10 && ((luck.prize==0 && luck.index==7) || luck.prize==luck.index+1)) {
          luck.speed += 60;
        }else{
          luck.speed += 20;
        }
      }
      if (luck.speed<40) {
        luck.speed=40;
      };

      luck.timer = setTimeout(function () {
        roll(fn);
      },luck.speed);
    }
    return false;
  }

  //闪灯效果
  function lampShining() {
    var num = 0;
    $(".shanDeng").attr("class",function(){
      setInterval(function(){
        num++;
        if(num%2==0){
          $('#deng').addClass("shanDeng2");
        }else{
          $('#deng').addClass("shanDeng");
          $('#deng').removeClass('shanDeng2');
        }
      },500)
    })
  }


  return{
    init:function () {
      lampShining();
      luck.init('luck');
    },
    setPrizeId:function (index,prizeName) {
      that.prizeIndex = index;
      that.prizeName = prizeName;
    },
    clickFn:function (callBack) {
      //按下弹起效果
      $("#drawBtn").addClass("cjBtnDom");
      setTimeout(function () {
        $("#drawBtn").removeClass("cjBtnDom");
      }, 200);
      if (click) {
       //return false;
      }
      else {
        luck.speed = 100;
        roll(callBack);
        click = true;
        //return false;
      }
    }
  }
}();

