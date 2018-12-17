var express = require('express');
var router = express.Router();

// 引入后台控制器
var indexController = require('../controllers/indexController.js');

/* 首页 */
router.get('/',indexController.index);
// 栏目列表
router.get('/articleList',indexController.articleList);
// 内容页面
router.get('/content/:_id',indexController.content);
// 登录注册页面
router.get('/longin',indexController.longin);
/*插入管理员信息*/ 
router.post('/userInsert',indexController.userInsert);
/*登录的操作*/
router.post('/doUserLogin',indexController.doUserLogin);
// 退出登录
router.get('/userlogOut',indexController.userlogOut);



module.exports = router;
