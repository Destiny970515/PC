//动态生成选择城市
//页面加载完成后，为select填充option
$(function () {
    var provinceList = [
        //--请选择  --[0]
        '广州市', //--[1]
        '北京市',
        '上海市',
        '浙江省'
    ];
    var cityList = [
        //--请选择  --[0]
        ['番禺区', '黄埔区', '天河区', '越秀区'],//--[1]
        ['东城区', '西城区', '海淀区'],
        ['闵行区', '浦东区', '金山区'],
        ['杭州市', '宁波市', '绍兴市', '嘉兴市']
    ];
    //将provinceList中每个省份转为option标签，追加到id为select-province的元素下
    var $selProv =
        $("#select-province");
    var $selCts = $("#select-city");
    $selProv.html(
        `<option>--请选择--</option>
        <option>
        ${provinceList.join("</option><option>")}
        </option>`);
    //为id为select-province的元素绑定change事件
    $selProv.change(e=> {
        //获得当前选中项的下标i
        var i = e.target.selectedIndex;//获得当前选中项的下标
        if (i > 0) {
            //去cityList数组中获得i-1位置的子数组
            var cts = cityList[i - 1];
            //清空id为select-city的元素内容
            $selCts.empty();
            //先追加一个option“请选择”
            //将每个城市转为option追加到id为select-city的元素下
            $selCts.html(`<option>--请选择--</option><option>${cts.join("</option><option>")}</option>`);
        } else {
            $selCts.html(`<option>--请选择--</option>`);
        }
    });
    //数量增加
    //var btnAdd=document.getElementById("shop_quantity");

    var lis = document.querySelectorAll("#shop_quantity>ul>li");
    //console.log(lis);
    var text = lis[1];

    for (var i = 0, len = lis.length; i < len; i++) {
        if(1 == i)continue;
        lis[i].onclick = function () {
            //console.log("onclick---------------------------");
            var n = parseInt(text.innerHTML);
            if (this.innerHTML == "+") {
                n++;
            } else if (n > 0) {
                n--;
            }
            text.innerHTML = n;
        }
    }
    //添加商品边框、打钩
    var likeShopLis = document.querySelectorAll("#like_shop>ul>li");
    var packAges=document.querySelectorAll("#package>ul>li");
    //console.log(likeShopLis);
    for (var i = 0, len = likeShopLis.length; i < len; i++) {
        (function (n) {
            likeShopLis[n].onclick = function () {
                for (var j = 0,len = likeShopLis.length; j < len; j++) {
                    //console.log(n);
                    //console.log(j);
                    likeShopLis[j].className = n == j ? "selected" : "";
                }
            }
        })(i);
    }
    for (var i = 0, len = packAges.length; i < len; i++){
        (function(n){
            packAges[n].onclick = function () {
                for(var j = 0,len =packAges.length; j < len; j++){
                    packAges[j].className = n == j ? "selected" : "";
                }
            }
        })(i);
    }

    //多项标签页效果
    //设置id为container下的第一个div置顶
    document.getElementById("container")
        .children[0]
        .style.display="block";
    //查找id为tab下的所有a，保存在变量as中
    var as=document.querySelectorAll("#shop_choice>ul>li a");
    //遍历as中每个a
    for(var i=0;i<as.length;i++){
        //为当前a绑定单击事件处理函数
        as[i].onclick=function(e){
            //阻止事件提交
            e.preventDefault();
            //查找id为container下的所有div
            var divs=document.querySelectorAll(
                "#container>div"
            );
            //遍历所有div
            for(var i=0;i<divs.length;i++) {
                //清除当前div的zIndex
                divs[i].style.display="";
            }
            //获得当前a的href属性保存在变量id中
            var i=this.href.lastIndexOf("#");
            var id=this.href.slice(i);
            //用id查找对应div，设置其zIndex为10
            document.querySelector(id)
                .style.display="block";
        }
    }
    /*放大镜*/
    /*小图片移动*/
    var LIWIDTH=72;
    var OFFSET=20;
    var moved=0;
    var ulList=document.getElementById("ph_sm");
    var aSm1=document.querySelector(".sm_button1");
    var aSm2=document.querySelector(".sm_button2");
    //如果ulList下的li个数<=5
    if(ulList.children.length<=5)
    //为class为aSm1的a添加disabled class
        aSm2.className+=" disabled";
    //为class为aSm1的p绑定单击事件
        aSm1.onclick=function () {
            if(this.className.indexOf("disabled")==-1){
                moved--;//将moved-1
                //重新计算ulList的left
                ulList.style.left =-moved*LIWIDTH+OFFSET+"px";
                checkA();
            }
        };
    //为class为aSm2d的p绑定单击事件
        aSm2.onclick=function () {
            if(this.className.indexOf("disabled")==-1){
                moved++;
                ulList.style.left =-moved*LIWIDTH+OFFSET+"px";
                checkA();
            }
        };
        //负责检查并修改两个p的状态
    function checkA() {
        if (moved==0)
            aSm1.className="sm_button1 disabled";
        else if(ulList.children.length-moved==5)
            aSm2.className="sm_button2 disabled";
        else{
            aSm1.className="sm_button1";
            aSm2.className="sm_button2";
        }
    }
    //鼠标进入小图片，切换显示中图片
    var phMedium = document.getElementById("ph_m");
    //利用冒泡，为ulList统一绑定一次鼠标进入事件
    ulList.onmouseover=function(e) {
        //阻止a标签事件提交
        //如果当前节点名为img
        if (e.target.nodeName=="IMG"){
            //获取当前图片的src
            var src = e.target.src;
            //查找最后一个.的位置
            var i = src.lastIndexOf(".");
            //设置phMedium的src为：
            phMedium.src = src.slice(0,i)+"-m"+src.slice(i);
            //选取src中0~i之前的子字符串
            //+ -m
            //+ src中i到结尾的剩余子字符串
        }
    };
    //让mask跟随鼠标移动
    var mask = document.getElementById("mask");
    var sMask = document.getElementById("superMask");
    //相对于当前图片宽高的一半：当前图片宽高为400px
    var MSIZE=200;
    var largeDiv = document.getElementById("largeDiv");
    //为sMake绑定鼠标进入和鼠标移出事件
    sMask.onmouseover=function(){
        mask.style.display="block";
        largeDiv.style.display="block";
        //根据phMedium的src,修改largeDiv的背景图片
        var src = phMedium.src;
        var i = src.lastIndexOf(".");
        src = src.slice(0,i-1)+"l"+src.slice(i);
        largeDiv.style.backgroundImage="url("+src+")";
    };
    sMask.onmouseout=function(){
        mask.style.display="none";
        largeDiv.style.display="none";
    };
    //为sMask绑定鼠标移动事件
    sMask.onmousemove=function(e){
        var top = e.offsetY-MSIZE/2;
        var left = e.offsetX-MSIZE/2;
        if (top<0) top=0;
        else if (top>200) top =200;
        if (left<0) left=0;
        else if (left>200) left=200;

        mask.style.top=top+"px";
        mask.style.left=left+"px";
        //中图片与大图片的倍数关系计算；例如 中图片400，大图片800，则两者关系是两倍大小。
        largeDiv.style.backgroundPosition=
            -1.75 * left + "px " + -1.75 * top + "px";
    }
});
