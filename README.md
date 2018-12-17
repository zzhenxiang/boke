# CMS 内容管理系统
下载后在cmd工具输入npm install npm start (需要安装node npm)
## 个人博客

## 需要使用到的技术
	html  css  js  	bootstrap 框架
	node.js 	   	express   框架
	mongodb			mongoose model模块

## MVCR 模式


### 前台
	首页 (展示一些有用的文章)
	从数据库里遍历栏目列表做为导航(主页和内容页右侧放有详细导航)
	友情链接 (不单独一个页面，放在每个页面的底部)
	列表页  (分页)
	内容页 (呈现用户点击的文章)
	验证码 (1)
	登录 注册 (同一个页面放置，储存在user集合 登录后前台页面存在)

### 后台
	栏目管理 (增删改查)
	文章管理 (增删改查)
	友情链接管理 (增删改查)
	管理员管理 (增删改查)
	验证码 (1)
	登录 注册 (分开放置 储存在admin集合 登录后后台页面存在)


## 设计一下数据库

### admins 集合  管理员的集合
	属性			类型			描述
	_id			ObjectId 	数据唯一标记
	name		String 		用户名称
	password	String 		登录密码
	tel			String		电话
	ctime		Date		创建时间


### users 集合  用户的集合
	属性			类型			描述
	_id			ObjectId 	数据唯一标记
	name		String 		用户名称
	password	String 		登录密码
	tel			String		电话
	ctime		Date		创建时间


### itmes 栏目的集合
	属性			类型			描述
	_id			ObjectId 	数据唯一标记
	name		String 		栏目名称
	ctime		Date		创建时间
	info		String		栏目简介



### articles
	属性			类型			描述
	_id			ObjectId 	数据唯一标记	
	itemId		ObjectId    栏目Id
	title 		String		文章标题
	author		String 		作者
	content		String	    文章内容
	keywords	String 		关键字
	description String      文章的描述
	ctime		Date		发布时间
	imgurl		String      文章的封面

### py 集合  友情链接的集合
	属性			类型			描述
	_id			ObjectId 	数据唯一标记
	name		String 		网站名称
	goin	String 		网址
	ctime		Date		创建时间

## 项目的目录结构
	-|bin/						项目启动文件目录
	-|--|www 					项目的启动文件
	-|configs/					项目的配置模块
	-|--|db_config.js			数据库的配置模块
	-|--|uploadImage_config.js			图片上传的配置模块
	-|controllers/				控制器的目录
	-|--|adminController.js		后台（管理员）控制器
	-|--|indexController.js		前台（游客）控制器
	-|models/					数据库骨架
	-|--|adminModel.js			管理员骨架
	-|--|articleModel.js			文章骨架
	-|--|itemModel.js			栏目骨架
	-|--|pyModel.js			友情链接骨架
	-|--|userModel.js			用户骨架
	-|package.json				项目的配置文件
	-|node_modules/				项目依赖的模块目录
	-|views/					视图目录（模板目录）
	-|routes/					路由目录
	-|--|admin.js				后台路由
	-|--|index.js				前台路由
	-|uploads/					图片上传目录
	-|public/					项目的静态资源库
	-|--|assets/				后台模板的资源目录
	-|--|images/				图片
	-|--|css/					css 文件
	-|--|js/					js 的文件夹
	-|--|ueditor/				富文本编辑器
	-|app.js					项目的入口文件



## mongoose 模块


## 文件上传

## 图片上传


## 验证码