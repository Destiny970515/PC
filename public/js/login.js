//功能：完成用户登录
//1:获取[提交用户登录信息]按钮
//2:绑定点击事件
$("#bt-login").click(function(e){
//3:获取用户输入用户名和密码
e.preventDefault();//阻止事件提交
var u = $("#uname").val();
var p = $("#upwd").val();
//4:发送AJAX请求
    $.ajax({
        type:"POST",
        url:"/login",
        data:{uname:u,upwd:p},
        success:function(data){
            //5:获取服务器返回数据
            if(data.code==1){
                //7:如果返回认息 code == 1 登录成功 跳转到主页
                location.href = "hzc.html";
                //将uid和uname存储到sessionStorage
                sessionStorage.setItem("uname",u);
                sessionStorage.setItem("uid",data.uid);
                console.log(data);
            }else{
                //6:如果返回信息 code ==-1 登录失败 显示出错信息
                $('.textMsg').html('登陆失败，用户名或密码不正确');
                console.log(data);
            }
        },
        error:function(){
            alert("网络故障，请检查");
        }
    });
});

//功能二:完成用户注册
//1：获取注册按钮绑定点击事件
$("#btn1").click(function(){
    //2:获取参数
    var uname = $("#uname").val();
    var upwd = $("#upwd").val();
    var age = $("#age").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var hdate = $("#hdate").val();
    //alert(uname+upwd+hdate+phone+email);
    //3:创建ajax异步请求将参数发送/login_2
    //alert(uname && upwd && age && phone && email )
    if(uname&&upwd&&age&&phone&&email){
        $.ajax({
            type:"GET",
            url:"/login_2",
            data:{uname:uname,upwd:upwd,age:age,phone:phone,email:email},
            success:function(){
                location.href = "login_1.html";
            },
            error:function () {
                alert("网络出现故障,请检查！")
            }
        })
    }else{
        alert("注册失败，清重新注册");
    }
});

//功能三：查询产品列表
//1：网页加载成功后发送ajax请求
$(function () {
   loadPage(1);
});
//2:将所有发送请求拼接字符串保存在函数中
function loadPage(pageno){
    $.ajax({
        type:"GET",  //请求方式
        url:"/page", //请求地址
        data:{pageno:pageno}, //请求参数当前页数
        success:function(data){ //返回结果json
            // console.log(data);
            //拼接字符串
            var html = "";
            for(var obj of data){
                html += `
                <div class="shop_list">
                  <!--商品图片-->
                  <img src="${obj.pic}">
                  <!--商品描述-->
                  <p>${obj.pname}</p>
                  <!--价格-->
                  <ul class="price">
                    <li class="lf">¥${obj.price}</li>
                    <li class="rt">销量${obj.amount}</li>
                  </ul>
                  <!--按钮-->
                  <a href="${obj.pid}" class="join_shopCar addcart">加入购物车</a>
                </div>
                `;
            }
            $("#plist").html(html);
        },
        error:function () {
            alert("网络出现故障，请检查");
        }
    });
    //3:再次发送一个ajax请示获取总记录数
    //page发送总页数
    $.ajax({
        // type:"GET",  //请求方式
        url:"/totalPage",//请求的地址
        success:function (data) {//数据返回的是一个数组对象
            // console.log(data);
            var recound = data[0].page;//先获取指定数组下标，再获取对象
            // console.log(recound);
            var p = Math.ceil(recound/5);
            // console.log(p);
            //拼字符串
            var html = "";
            for(var i = 1;i<=p;i++){
                html +=`
                <li><a href="#">${i}</a></li>
                `;
            }
            $("#pager>ul").html(html);
        },
        error:function () {
            alert("网络故障，请检查网络")
        }
    });
}
// loadPage(1);
//功能四 ：为页码添加点击事件
$("#pager>ul").on("click","a",function(e) {
    e.preventDefault();
    loadPage($(this).html());
});
//功能五：为每个商品下面"添加购物车"绑定监听事件
$("#plist").on("click","a.addcart",function (e) {
    //1:阻止事件默认行为
    e.preventDefault();
    //2:发送ajax请求 uid pid
    var uid = sessionStorage.getItem("uid");
    console.log(uid);
    var pid = $(this).attr("href");
    $.ajax({
        type:"GET",
        url:"/addcart",
        data:{uid:uid,pid:pid},
        success:function (data) {
            if(data.code>0){
                alert("添加成功！"+data.msg);
            }
        }
    });
});
