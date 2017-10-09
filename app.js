//项目主程序
//1:加载相关模块 http express mysql qs
const http = require ("http");
const express = require ("express");
const mysql = require ("mysql");
const qs = require ("querystring");
//2:创建连接池 25
var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   database:"hzc",
   port:3306,
   connectionLimit:25
});
//3:创建express对象
var app = express();
//4:创建服务器对象
var server = http.createServer(app);
//5:绑定监听端口
server.listen(8081);
//6:处理所有静态文件
//express提供非常实用功能:静态文件中间件(函数)
//你指需要指定(目录)  public
//该目录下所有静态资源请求，读取，发送，帮助我们自动完成
//示例:首页   http://127.0.0.1:8081/login_1.html
app.use(express.static("public"));
//7:模块一:用户登录
app.post("/login",(req,res)=>{
   //1:获取用户参数 uname upwd
   req.on("data",(data)=>{
       var str = data.toString();
       var obj = qs.parse(str);
       var u = obj.uname;
       var p = obj.upwd;
       //2:获取数据库连接
       pool.getConnection((err,conn)=>{
           if(err)throw err;
           //3:创建sql语句并且发送sql
           var sql = "SELECT * FROM hlogin";
           sql += " WHERE uname=? AND upwd=?";
           conn.query(sql,[u,p],(err,result)=>{
               if(err)throw err;
               //4:返回结果并且判断 result.length
               if(result.length<1){
                   res.json({code:-1,msg:"用户名或密码不正确"});
                   console.log(result.length);
               }else{
                   res.json({code:1,"msg":"登录成功",uid:result[0].uid});
                   console.log(result.length);
               }
               conn.release();//返回连接池
           });
       });
   });
});

//模块二:用户注册  get /login_2
//参数 uname upwd hdate phone email age
//0.1:先向hlogin表添加记录 uname upwd
//0.2:再hregister表中添加记录 hdate phone email age
app.get("/login_2",(req,res)=>{
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    //var hdate = req.query.hdate;
    var phone = req.query.phone;
    var email = req.query.email;
    var age = req.query.age;
    //2:获取连接池中一个连接
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        //3:创建SQL insert并且发送SQL
        var sql1 = "insert into hlogin values(null,?,?)";
        conn.query(sql1,[uname,upwd],(err,result)=>{
            if(err) throw err;
            var uid = result.insertId;
            var sql2 = "insert into hregister values(null,?,?,?,?,now())";
            conn.query(sql2,[uid,age,phone,email],(err,result)=>{
                if(err) throw err;
                if(result.length<1){
                    res.json({code:-1,msg:"注册失败"});
                }else{
                    res.json({code:1,msg:"注册成功"});
                }
                conn.release();
            });
        });
    });
//});
});
//模块三：查询商品列表(shop_List.html)
// http://127.0.0.1:8081/page?pageno=1
app.get("/page",(req,res)=>{
    //1:获取参数pageno
    var pageno = req.query.pageno;
    //2：依据当前页数计算数据查询偏移量
    var offset = (pageno-1)*5;
    //3:获取连接
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        //4:创建sql语句并且发送sql语句
        var sql = "SELECT * FROM hzc_product";
        sql += " LIMIT ?,5";
        conn.query(sql,[offset],(err,result)=>{
            if(err) throw err;
            //5:将查询结果转json发送
            res.json(result);
            //6:归还连接
            conn.release();
        });
    });
});

//模块四 ：获取总页数
app.get("/totalPage",(req,res)=>{
    //1：获取连接
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        //2:创建sql语句并且发送sql语句
        var sql = "SELECT count(*) as page FROM hzc_product";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            //3：将查询结果转json发送
            res.json(result);
            //4:归还连接
            conn.release();
        });
    });
});
//模块五：将某个商品添加至购物车
app.get("/addcart",(req,res)=>{
    var uid = req.query.uid;
    var pid = req.query.pid;
    pool.getConnection((err,conn)=>{
        //1根据用户编号和产品编号查询购物编码
        var sql = " SELECT * FROM hzc_cart";
        sql += " WHERE uid=? AND pid=?";
        //2：查询没有结果
        conn.query(sql,[uid,pid],(err,result)=>{
            if(err) throw err;
            if(result.length<1){
                var sql = " INSERT INTO hzc_cart";
                sql+=" VALUES(null,?,?,1)";
                conn.query(sql,[uid,pid],(err,result)=>{
                    if(err) throw err;
                    res.json({code:1,msg:"当前商品数量加 1"});
                    conn.release();//归还连接
                })
            }else{
                var c = parseInt(result[0].count)+1;
                var sql = "UPDATE hzc_cart";
                sql+=" SET count=count+1";
                sql+=" WHERE uid=? AND pid=?";
                conn.query(sql,[uid,pid],(err,result)=>{
                    if(err) throw err;
                    res.json({code:1,msg:"数量为:"+c});
                    conn.release();//归还连接
                });
            }
        });
    })
});
//模块六：查看购物车信息
//1:get/getcart 参数 uid
app.get("/getcart",(req,res)=>{
    //2:获取用户传递参数 uid
    var uid = req.query.uid;
    //3:获取数据库连接
    pool.getConnection((err,conn)=>{
        //4：创建sql语句并且发送sql
        var sql = " SELECT c.cid, p.pname, p.price,";
        sql += " p.pic, c.count";
        sql += " FROM hzc_product p,hzc_cart c";
        sql += " WHERE p.pid= c.pid AND c.uid = ?";
        conn.query(sql,[uid],(err,result)=>{
            if(err) throw err;
            //5:将查询结果发送json
            res.json(result);
            //6:归还数据库连接
            conn.release();
        });
    })
});
//模块七：删除购物车中的信息
//1：get/delcart
app.get("/delcart",(req,res)=>{
    //2:获取用户提交参数 cid
    var cid = req.query.cid;
    //3:获取连接
    //4:创建sql语句并且发送sql
    pool.getConnection((err,conn)=>{
        var sql = "DELETE FROM hzc_cart WHERE cid=?";
        conn.query(sql,[cid],(err,result)=>{
            if(err) throw err;
            //5:获取服务器返回
            //{code:1,msg:"删除成功"}
            //{code:-1,msg:"删除失败"}
            if(result.affectedRows>0){//affectedRows：函数返回前一次 MySQL 操作所影响的记录行数。
                res.json({code:1,msg:"删除成功"});
            }else{
                res.json({code:-1,msg:"删除失败"});
            }
            conn.release();//归还连接
        });
    });
});
// 有待开发
// //模块八：减去当前购物车记录数量 -
// //1:get /cart_update_sub
// app.get("/cart_update_sub",(req,res)=>{
//     //2:获取购物项 cid
//     var cid = req.query.cid;
//     //3:获取数据库连接
//     //4:创建sql语句并且发送sql
//     pool.getConnection((err,conn)=>{
//         var sql = "UPDATE hzc_cart SET count=count-1";
//         sql += " WHERE cid=?";
//         conn.query(sql,[cid],(err,result)=>{
//             //5:获取返回结果
//             if(result.affectedRows>0){
//                 res.json({code:1,msg:"更新成功"});
//             }else{
//                 res.json({code:-1,msg:"更新失败"});
//             }
//             //6:归还连接
//             conn.release();
//         });
//     });
// });
