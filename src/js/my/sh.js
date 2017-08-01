/**
 * Created by Administrator on 2016/8/15.
 */
$(function(){
  //乐语head
  //修复搜狗的bug
  var time;
  var moveBg;
  function setBg(){
    if($("#doyoo_monitor").css("backgroundImage")!="none"){
      //console.log("取到背景");
      moveBg=$("#doyoo_monitor").css("backgroundImage");
      function fixdoyoo(bg){
        $("#doyoo_monitor").css({backgroundImage:""});
        $("#doyoo_mon_innner").css({backgroundImage:bg});
      }
      setTimeout(function(){
        fixdoyoo(moveBg);
        clearInterval(time);
      },100);
    }else{
      console.log("没取到背景");
    }
  }
  time=setInterval(setBg,300);
  //乐语字距
  function setLeyu(){
    $("#doyoo_panel_main a span").css({lineHeight:"80px"});
  }
  setTimeout(function(){
    setLeyu();
  },500);
  setTimeout(function(){
    setLeyu();
  },1000);
  setTimeout(function(){
    setLeyu();
  },3000);
  setTimeout(function(){
    setLeyu();
  },10000);
  //出口乐语
  function exportLeyu(){
    window.open ('http://chat.looyuoms.com/chat/chat/p.do?c=20000738&f=10064811&g=10064715', '蓝海骆驼',
        'height=500, width=800, top=120,left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
  }
  //进口乐语
  function importLeyu(){
    window.open ('http://chat.looyuoms.com/chat/chat/p.do?c=20000738&f=10064811&g=10064716', '蓝海骆驼',
        'height=500, width=800, top=120,left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
  }
  //触发出口对话框
  $(".open_export").click(function(e){
    e.preventDefault();
    exportLeyu();
  });
  //触发进口对话框
  $(".open_import").click(function(e){
    e.preventDefault();
    importLeyu();
  });
  //乐语end

  $("#switch_btn>a").bind("hover click",function(){
    var _this=$(this);
    var files=$("#switch_file .switch_list");
    _this.addClass("current").siblings().removeClass("current");
    files.eq(_this.index()).addClass("current").siblings().removeClass("current");
  });
  $("#process>.process_li,#process1>.process_li").hover(
   function(){
     if($(window).width()<768){
       $(this).find(".msg:not(animate)").css({display:"block"}).stop().animate({top:"60px", opacity:"1"},500);
     }else{
       $(this).find(".msg:not(animate)").css({display:"block"}).stop().animate({top:"30px", opacity:"1"},500);
     }
  },
   function() {
    $(this).find(".msg:not(animate)").css({display: "none"}).stop().animate({top: "-80px", opacity: "0"}, 500);
 }
  );

  $("#slide_bar li").hover(function(){
    $(this).find(".sideToggle").toggle();
  });
  $("#to_top").click(function(){
    $("html,body").animate({
      scrollTop:0
    },300);
  });
  $(window).scroll(function(){
    if($(document).scrollTop()>=150){
      $("#to_top").slideDown(500);
    }else{
      $("#to_top").fadeOut(200);
    }
  });

  $("#downMore").bind("click.dowmore",function(){
    $(document).find(".edge_right").slideToggle(200);
  });
});
