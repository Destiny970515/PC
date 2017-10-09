CREATE DATABASE hzc CHARSET=UTF8;
USE hzc;
CREATE TABLE hlogin(
uid INT PRIMARY KEY AUTO_INCREMENT,
uname VARCHAR(20) Not NULL DEFAULT '',
upwd VARCHAR(32) Not NULL DEFAULT ''
);
SET NAMES GBK;
INSERT INTO hlogin VALUES(null,'hzc','592150131');
INSERT INTO hlogin VALUES(null,'xky','5201314');

CREATE TABLE hregister(
rid INT PRIMARY KEY AUTO_INCREMENT,
uid INT Not NULL DEFAULT 0,
age INT Not NULL DEFAULT 0,
phone VARCHAR(20) Not NULL DEFAULT '',
email VARCHAR(50) Not NULL DEFAULT '',
hdate DATETIME Not NULL DEFAULT 0
);
CREATE TABLE hzc_product(
 pid   INT PRIMARY KEY AUTO_INCREMENT,
 pname VARCHAR(200) Not NULL DEFAULT '',
 price VARCHAR(100) Not NULL DEFAULT '' ,
 pic   VARCHAR(100) Not NULL DEFAULT '',
 amount INT Not NULL DEFAULT 0
);
INSERT INTO hzc_product VALUES
(1,'【良品铺子旗舰店】手剥松子218g 坚果炒货零食新货巴西',56.90,'images/guess.jpg',1100),
(2,'【经典香橙卡通雪糕】经典美味 好吃又好玩',20.50,'images/shop/Shop_1.jpg',658),
(3,'【经典双色球雪糕】配士多俾梨 小孩子最爱',28.50,'images/shop/Shop_2.jpg',863),
(4,'法式马卡龙甜点6粒装礼盒食品情人节礼物',80.70,'images/shop/Shop_3.jpg',1635),
(5,'芒果布丁150g 零食小吃 儿童零食',16.20,'images/shop/Shop_4.jpg',987),
(6,'糖豆豆沙包1包300g 买一送一 0990后素小吃零食',18.50,'images/shop/Shop_5.jpg',1642),
(7,'椰子芒果布丁 大人小孩都爱吃 布丁果冻 小孩子最爱',19.70,'images/shop/Shop_6.jpg',1247),
(8,'越南原装进口 泉记芝士牛奶椰子酥120g越南特产糕点心休闲零食 芝士牛奶口味',35.50,'images/shop/Shop_7.jpg',365),
(9,'韩国进口 海太蜂蜜黄油薯片 饼干碳烤薯条 休闲膨化零食品土豆脆片',18.10,'images/shop/Shop_8.jpg',745),
(10,'日本进口 crisp choco CISCO麦脆批巧克力 0990后素小吃零食',99.30,'images/shop/Shop_9.jpg',663),
(11,'徐福记糖果橡皮糖果汁软糖1500g 结婚庆喜糖 橡皮QQ糖',24.30,'images/shop/Shop_10.jpg',1243),
(12,'【Morinaga/森永 DARS达诗白巧克力43.2g12粒 日本进口零食入口即化',48.60,'images/shop/Shop_11.jpg',842),
(13,'韩国进口 九日牌加糖葡萄果汁饮料238ml',22.00,'images/shop/Shop_12.jpg',530),
(14,'韩国进口饼干 好丽友奥利奥巧克力奶油夹心饼干66g一盒装',14.50,'images/shop/Shop_13.jpg',439),
(15,'【疆域吃货-多味花生米210g】休闲零食炒货特产 香辣花生豆',21.90,'images/shop/Shop_14.jpg',2463),
(16,'三只松鼠旗舰店 开口东北松子 坚果零食 218g',31.45,'images/shop/Shop_15.jpg',1736),
(17,'良品铺子东北手剥松子开口手拨红松干果坚果零食特产小吃袋装98g',28.40,'images/shop/Shop_16.jpg',1301),
(18,'【三只松鼠_甘栗仁100g】休闲零食坚果河北特产板栗栗子仁美栗',16.52,'images/shop/Shop_17.jpg',971),
(19,'丹夫华夫饼原味720g软格子饼蛋糕 休闲零食早餐',34.50,'images/shop/Shop_18.jpg',653),
(20,'巧克力蛋糕免费包邮黑森林樱桃速递巧克力水果德士',28.10,'images/shop/Shop_19.jpg',430),
(21,'cake21客上海杭州北京广州下午茶点零食甜点糕点西点茶歇小蛋糕',19.50,'images/shop/Shop_20.jpg',843);

CREATE TABLE hzc_cart(
 cid INT PRIMARY KEY AUTO_INCREMENT,
 uid INT Not NULL DEFAULT 0,
 pid INT Not NULL DEFAULT 0,
 count INT Not NULL DEFAULT 0
);

INSERT INTO hzc_cart VALUES(null,1,1,1);
INSERT INTO hzc_cart VALUES(null,1,2,2);