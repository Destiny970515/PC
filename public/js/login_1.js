//表单验证
//查找form下的id名为uname的元素
$(function(){
    var $uName=$("#uname");
    //当uname元素失去焦点触发事件
    $uName.blur(e=>{
        vali($(e.target),3,10,"用户名必须介于3~10位之间！");
    });
    function vali($tar,min,max,msg){

        if($tar.val().length>=min
            &&$tar.val().length<=max){
            $(".textMsg").html("");
            return true;
        }else{
            $(".textMsg").html(msg);
            return false;
        }
    }
    //查找form下的id名为upwd的元素
    var $uPwd=$("#upwd");
    $uPwd.blur(e=>{
        vali($(e.target),6,10,"密码必须介于6~10位之间！");
    });
    //为表单元素绑定submit事件
    $("form").submit(function(){
        console.log(1);
        //调用vali验证用户名,将结果保存在uName中
        var uName=vali($uName,3,10,"用户名必须介于3~10位之间！");
        //调用vali验证密码,将结果保存在uPwd中
        var uPwd=vali($uPwd,6,10,"密码必须介于6~10位之间！");
        //如果uName和rpwd都不是true时,就阻止提交事件
        if(!(uName&&uPwd)){
            return false;
        }
    });
});
