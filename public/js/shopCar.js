$(function () {
    //功能一：异步请求当前登录用户购物车信息
    //1:发送ajax请求
    //2:getcart get请求
    $.ajax({
        type:"GET",
        url:"/getcart",
        data:{uid:sessionStorage["uid"]},
        success:function (data) {
            //3:获取返回数据 data[]
            var html = "";
            for(var i = 0;i<data.length;i++){
                var o = data[i];
                //4：拼接字符串
                html +=`
            <div class="buyWares clear">
                <ul class="lf">
                    <li>
                        <input type="checkbox" class="chb"/>
                        <!--<input type="hidden" value="1" />-->
                    </li>
                    <li>
                        <a href="xiangqingye.html">
                            <img src="${o.pic}" class="img_size"/>
                        </a>
                    </li>
                    <li>
                        <span>${o.pname}</span>
                    </li>
                    <li>
                        <span>口味：原味 包装：手袋单人份</span>
                    </li>
                    <li>
                        <span>¥${o.price}</span>
                    </li>
                    <li  class="lis">
                        <ul class="lf raise">
                            <li class="btn ${o.cid}">-</li>
                            <li class="val">
                              <input type="text" value="${o.count}"/>
                            </li>
                            <li class="btn ${o.cid}">+</li>
                        </ul>
                    </li>
                    <li>
                        <span>¥${o.price*o.count}</span>
                    </li>
                    <li>
                        <ul class="lf">
                            <li><a href="#">移入收藏夹</a></li>
                            <li><a href="${o.cid}" class="btn-del">删除</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            `;
            }
            //5:保存 id="tb1"
            $("#tb1").html(html);
        }
    });

    //功能二：异步删除购物车中的信息 cid
    $("#tb1").on("click","a.btn-del",function (e) {
        //1:阻止事件默认行为
        e.preventDefault();
        //2:获取当前删除记录cid
        var cid = $(this).attr("href");
        //3:获取当前元素祖先元素  div
        var del = $(this).parents(".buyWares");
        //4:发送ajax请求 get/delcart cid
        var rs = window.confirm("是否要删除该记录");
        if(rs===false){
            return;
        }
        $.ajax({
            url:"/delcart",
            data:{cid:cid},
            success:function (data) {
                //5:获取返回结果code
                if(data.code>0){
                    alert(data.msg);
                    //6:如果删除成功 删除 div
                    del.remove();
                }else{
                    alert(data.msg)
                }
            }
        });
    });

    // //功能三：购物车中按钮"-"绑定点击事件发送ajax请求
    // $("#tb1").on("click","li:contains('-')",function () {
    //     //1:获取参数cid
    //     var cid = $(this).attr("class");
    //     console.log(cid);
    //     //2:获取数量 count
    //     var inputCount = $(this).next()[0];
    //     console.log(inputCount);
    //     //3:获取单价
    //     var inputPrice = $(this).parent().prev();
    //     console.log(inputPrice);
    //     //4:获取小计
    //     var totalInput = $(this).parent().next();
    //     console.log(totalInput);
    //     // //5:如果当前数量为1
    //     // if(inputCount.val()==1){
    //     //     // 3.1 询问是否删除该记录
    //     //     // 3.2 如果用户点击 "是" 记录
    //     // }
    //     //5:发送ajax请求 get /cart_update_sub
    //     $.ajax({
    //         url:"/cart_update_sub",
    //         data:{cid:cid},
    //         success:function (data) {
    //             //6:获取返回数据
    //             if(data.code>0){
    //                 alert(data.msg);
    //                 //7:重新计算小计 (获取单价*数量)
    //                 totalInput.html
    //                 (
    //                     "<span>"
    //                     +(inputCount.val()*inputPrice.html())+
    //                     "</span>"
    //                 );
    //             }
    //         }
    //     });
    // });
});