$(function(){
    //轮播图
   function banner(a,b,c,d,e){  //  a是背景图，b是active，c是背景对应按钮，d是上一页，e是下一页
       index=0;
       len=$(a).length-1;
       function teb(index){
           $(c).eq(index).addClass(b).siblings('').removeClass(b);
           $(a).eq(index).fadeIn(300).addClass('curr').siblings('').fadeOut(300).removeClass('curr');
       };
       $(c).click(function(){
           index=$(this).index();
           teb(index);
       });
       $(d).click(function(){
           index--;
           if(index<0){
               index=len;
           };
           teb(index);
       });
       $(e).click(function(){
           index++;
           if(index>len){
               index=0;
           };
           teb(index);
       });
       function timeRun(){
           time=setInterval(function(){
               index++;
               if(index>len){
                   index=0;
               };
               teb(index);
           },5000);
       };
       timeRun();
   };
   banner('.back>li','active','.point>li','.prev','.next');
//定时器****************
//定义定时结束时间
    var endTime=new Date(`2017/10/23`);
//启动定时器
    setInterval(function () {
        //定义现在的时间
        var nowTime=new Date();
        //剩余时间=（结束时间-现在时间）
        var time=endTime-nowTime;
        var day=parseInt(time/1000/60/60/24);
        var hh=parseInt(time/1000/60/60%24);
        var mm=parseInt(time/1000/60%60);
        var ss=parseInt(time/1000%60);
        //判断，如果hh<10,显示双位数
        if(hh<10){
            hh="0"+hh;
            //判断，如果mm<10,显示双位数
        }if(mm<10){
            mm="0"+mm;
            //判断，如果ss<10,显示双位数
        }if(ss<10){
            ss="0"+ss;
        }
        //找到#countdown_time>b下的第一个span
        $(`#countdown_time>b>span:first`)
            .html(hh);
        //找到#countdown_time>b下的第二个span
        $(`#countdown_time>b>span:nth-child(2)`)
            .html(mm);
        //找到#countdown_time>b下的最后一个span
        $(`#countdown_time>b>span:last`)
            .html(ss);
    });
    //电梯楼层式导航
    var $elevator=$("#elevator");
    var $floors=$(".floor");
    var curr_f=-1;
    $(window).scroll(()=>{
        var scrollTop=document.body.scrollTop;
        var offsetTop=$("#dessert1").offset().top;
        if(innerHeight/2+scrollTop>=offsetTop){
            $elevator.show();
        }else{ $elevator.hide(); }

        $floors.each((i,elem)=>{
            var offsetTop=$(elem).offset().top;
            if(innerHeight/2+scrollTop>=offsetTop){
                $elevator.find(
                    `li:eq(${i})`
                ).addClass("active").siblings().removeClass("active");
                curr_f=i;
            }
        })
    });
    // $elevator.on("mouseenter","li",e=>{
    //     $(e.target).addClass("active");
    // }).on("mouseleave","li",e=>{
    //     var $tar=$(e.target);
    //     if($tar.index()!=curr_f){
    //         $tar.removeClass("active");
    //     }
    // }).on("click","a:last-child",e=>{
    //     var i=$elevator.find("a:last-child").index(e.target);
    //     $("body").animate({
    //         scrollTop:$(`.floor:eq(${i})`).offset().top
    //     },500);
    // })
    $elevator.on("mouseenter","li",e=>{
      if(e.target.nodeName=="A"){
        e.target=e.target.parentNode
      }
      $(e.target).addClass("active");
    }).on("mouseleave","li",e=>{
      if(e.target.nodeName=="A"){
        e.target=e.target.parentNode
      }
      var $tar=$(e.target)
      if($tar.index()!=curr_f){
        $tar.removeClass("active");
      }
    }).on("click","a:last-child",e=>{
      var i=$elevator.find("a:last-child").index(e.target);
      $("body").animate({
        scrollTop:$(`.floor:eq(${i})`).offset().top
      },500);
    })
});
