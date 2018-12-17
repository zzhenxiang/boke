var express = require('express');
var router = express.Router();

// 引入后台控制器
var adminController = require('../controllers/adminController.js');

/* 首页 */
router.get('/',adminController.index);

/*添加栏目的页面*/
router.get('/itemAdd',adminController.itemAdd);
/*插入栏目数据*/
router.post('/itemInsert',adminController.itemInsert);
/*栏目列表*/
router.get('/itemList',adminController.itemList);
/*删除栏目*/ 
router.get('/itemRemove/:_id',adminController.itemRemove);
/*编辑栏目页面*/
router.get('/itemEdit/:_id',adminController.itemEdit);
/*更新栏目数据*/ 
router.post('/itemUpdate',adminController.itemUpdate);

/*发布文章页面*/ 
router.get('/articleAdd',adminController.articleAdd);
/*插入文章数据*/
router.post('/articleInsert',adminController.articleInsert);
/*文章列表*/
router.get('/articleList',adminController.articleList);
/* 删除文章 */
router.get('/articleRemove/:_id',adminController.articleRemove);
/* 编辑文章的页面 */
router.get('/articleEdit/:_id',adminController.articleEdit);
/*修改文章的封面*/
router.post('/articleImgUrlUpdate',adminController.articleImgUrlUpdate);
/*修改文章内容*/
router.post('/articleTextUpdate',adminController.articleTextUpdate);

/*添加管理员页面*/ 
router.get('/adminAdd',adminController.adminAdd);
/*插入管理员信息*/ 
router.post('/adminInsert',adminController.adminInsert);
/*管理员登录页面*/
router.get('/login',adminController.login);
/*登录的操作*/
router.post('/doLogin',adminController.doLogin);
// 退出登录
router.get('/logOut',adminController.logOut);

/*管理员列表*/
router.get('/adminList',adminController.adminList);
/*删除管理员*/ 
router.get('/adminRemove/:_id',adminController.adminRemove);
// /*编辑管理员页面*/
router.get('/adminEdit/:_id',adminController.adminEdit);
// /*更新管理员数据*/ 
router.post('/adminUpdate',adminController.adminUpdate);



/*添加友情链接的页面*/
router.get('/pyAdd',adminController.pyAdd);
/*插入友情链接数据*/
router.post('/pyInsert',adminController.pyInsert);
// /*友情链接列表*/
router.get('/pyList',adminController.pyList);
// /*删除友情链接*/ 
router.get('/pyRemove/:_id',adminController.pyRemove);
// /*编辑友情链接页面*/
router.get('/pyEdit/:_id',adminController.pyEdit);
// /*更新友情链接数据*/ 
router.post('/pyUpdate',adminController.pyUpdate);

/*验证码*/ 
router.get('/code',adminController.code);
module.exports = router;
