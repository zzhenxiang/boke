// 后台的控制器
var adminController = {};

// 引入栏目数据模型
var itemModel = require('../models/itemModel.js');
// 引入文章数据模型
var articleModel = require('../models/articleModel.js');
// 引入管理员的数据模型
var adminModel = require('../models/adminModel.js');
// 引入py的数据模型
var pyModel = require('../models/pyModel.js');

// 后台首页
adminController.index = function(req,res){
	// 判断用户是否登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 响应页面
	res.render('admin/index');
}
 

// 添加栏目的页面
adminController.itemAdd = function(req,res){
	// 判断用户是否登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 响应页面
	res.render('admin/itemAdd');	
}

// 插入栏目数据
adminController.itemInsert = function(req,res){
	// 判断用户是否登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 插入数据
	itemModel.create(req.body,function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'添加数据失败'});
		}else{
			// 跳转到栏目列表
			res.redirect('/admin/itemList');
		}
	})
}

// 栏目列表
adminController.itemList = function(req,res){
	// 判断用户是否登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 查询栏目数据
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			// 响应模板
			res.render('admin/itemList',{items:data});			
		}
	});

	
}

// 删除栏目
adminController.itemRemove = function(req,res){
	// 删除栏目
	itemModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'数据删除失败'});
		}else{
			// 跳转到栏目列表
			res.redirect('/admin/itemList');		
		}
	})
}

// 编辑栏目的页面
adminController.itemEdit = function(req,res){
	// 查询栏目数据
	itemModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询栏目数据失败'});
		}else{
			// 响应模板
			res.render('admin/itemEdit',{data:data});		
		}
	})
}

// 更新栏目数据
adminController.itemUpdate = function(req,res){
	// 更新数据
	itemModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'栏目修改失败'});
		}else{
			// 跳转到栏目列表
			res.redirect('/admin/itemList');		
		}		
	})
}


// 发布文章的页面
adminController.articleAdd = function(req,res){
	// 查询栏目数据
	itemModel.find({},function(err,data){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			// 响应模板
			res.render('admin/articleAdd',{items:data});			
		}
	})
}


// 插入文章数据
adminController.articleInsert = function(req,res){
	// 文章封面保存路径
	var imagePath = 'uploads';
	// 需要接收的文件类型
	var imageTypes = ['image/jpeg','image/png','image/gif'];
	// 允许图片的大小 单位： 字节
	var fileSize = 1024*1024*5;
	// 引入接收图的配置模块
	var imageUpload = require('../configs/uploadImage_config.js');
	// 调用图片上传的函数
	var upload = imageUpload(imagePath,imageTypes,fileSize).single('imgurl');
	upload(req,res,function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'图片上传失败'});
		}else{
			// 把图片名称 放到 req.body 里
			req.body.imgurl = req.file.filename;
			// 添加文章数据
			articleModel.create(req.body,function(err){
				if(err){
					// 响应错误信息
					res.render('admin/error',{info:"ERROR",errText:'添加数据失败'});
				}else{
					// 跳转到栏目列表
					res.redirect('/admin/articleAdd');
				}		
			})
		}
	})
}

// 文章列表
adminController.articleList = function(req,res){
	// 每页显示多少条数据
	var pageSize = 3;
	// 当前默认查询第一页数据
	var page = req.query.page?req.query.page:1;
	// 一共有多少条数据
	articleModel.find({}).count(function(err,total){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});		
		}else{
			// 一有多少页
			var maxPage = Math.ceil(total/pageSize);

			// 处理页码上下限
			if(page<1) page = 1;
			if(page>maxPage) page = maxPage;

			// 查询条件的便宜量
			var offsetPage = pageSize*(page-1);
			// 查询文件列表
			articleModel.find({}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data){
				if(err){
					// 响应错误信息
					res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
				}else{
					// 响应模板
					res.render('admin/articleList',{datas:data,maxPage:maxPage,page:page});			
				}
			});
		}
	})
}

// 删除文章
adminController.articleRemove = function(req,res){
	articleModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'数据删除失败'});
		}else{
			// 跳转到栏目列表
			res.redirect('/admin/articleList');		
		}
	})
}

// 编辑文章的页面
adminController.articleEdit = function(req,res){

	// 查询要编辑的文章数据
	articleModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			// 查询栏目数据
			itemModel.find({},function(err,itemdatas){
				if(err){
					// 响应错误信息
					res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
				}else{
					// 响应模板
					res.render('admin/articleEdit',{data:data,items:itemdatas});	
				}
			})
		}
	})
}


// 修改文章封面
adminController.articleImgUrlUpdate = function(req,res){
	// 文章封面保存路径
	var imagePath = 'uploads';
	// 需要接收的文件类型
	var imageTypes = ['image/jpeg','image/png','image/gif'];
	// 允许图片的大小 单位： 字节
	var fileSize = 1024*1024*5;
	// 引入接收图的配置模块
	var imageUpload = require('../configs/uploadImage_config.js');	
	// 调用图片上传的函数
	var upload = imageUpload(imagePath,imageTypes,fileSize).single('imgurl');
	upload(req,res,function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'图片上传失败'});
		}else{
			// 更新文章封面
			articleModel.update({_id:req.body._id},{$set:{imgurl:req.file.filename}},function(err){
				if(err){
					// 响应错误信息
					res.render('admin/error',{info:"ERROR",errText:'封面修改失败'});
				}else{
					// 跳转到栏目列表
					res.redirect('/admin/articleList');		
				}
			});
		}		

	});
}

/*修改文章内容*/ 
adminController.articleTextUpdate = function(req,res){

	// 更新文章封面
	articleModel.update({_id:req.body._id},{$set:req.body},function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'文章修改失败'});
		}else{
			// 跳转到栏目列表
			res.redirect('/admin/articleList');		
		}
	});
}


/*添加管理员*/ 
adminController.adminAdd = function(req,res){
	// 响应模板
	res.render('admin/adminAdd');		
}

/*插入管理员的信息*/
adminController.adminInsert = function(req,res){

	// console.log(req.session.code)
	// console.log(req.body);
	// 1. 判断 验证码
	if(req.body.code != req.session.code){
		res.send('验证不正确');
		return;
	}

	// 判断两次密码是否一致
	if(req.body.password != req.body.repassword){
		res.send('两次密码不一致');
		return;		
	}

	// 引入 md5 模块
	var md5 = require('md5');

	// 把字符串两端的空白字符取消掉
	req.body.name = req.body.name.trim();
	req.body.password = md5(req.body.password.trim());

	// 把数据添加到数据库
	adminModel.create(req.body,function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'添加管理失败'});
		}else{
			// 跳转到栏目列表
			res.render('admin/error',{info:"ERROR",errText:'添加管理成功'});
		}		
	})
}


// 登录页面
adminController.login = function(req,res){
	// 响应错误信息
	res.render('admin/login');
}


// 登录的操作
adminController.doLogin = function(req,res){
	// 引入 md5 模块
	var md5 = require('md5');

	// 1. 判断 验证码
	if(req.body.code != req.session.code){
		res.send('验证不正确');
		return;
	}

	// 获取用户和密码并把字符串两端的空白字符取消掉
	var name = req.body.name.trim();
	var password = md5(req.body.password.trim());

	adminModel.findOne({name:name},function(err,data){
		if(data==null){
			console.log('用户名不存在');
			// 响应错误信息
			res.render('admin/login');
		}else{
			if(err){
				console.log('查询失败');
				res.render('admin/login');
			}else{
				// 判断密码
				if(password==data.password){
					// 登录成功
					// 把成功的信息存到服务器
					req.session.user = data;
					// 跳转到管理员的页面
					res.redirect('/admin');	

				}else{
					// 密码不正确
					console.log('密码不正确');
					res.render('admin/login');
				}
			}			
		}
	})
}

// 退出管理员的登录
adminController.logOut = function(req,res){
	// 把成功的信息存到服务器
	req.session.user = null;
	// 跳转到登录页面
	res.redirect('/admin/login');	
}

// 管理员列表
adminController.adminList = function(req,res){
	// 判断用户是否登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 查询管理员数据
	adminModel.find({},function(err,data){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			// 响应模板
			res.render('admin/adminList',{admins:data});			
		}
	});

	
}

// 删除管理员
adminController.adminRemove = function(req,res){
	// 删除管理员
	adminModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'数据删除失败'});
		}else{
			// 跳转到管理员列表
			res.redirect('/admin/adminList');		
		}
	})
}

// 编辑管理员的页面
adminController.adminEdit = function(req,res){
	// 查询管理员数据
	adminModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询管理员数据失败'});
		}else{
			// 响应模板
			res.render('admin/adminEdit',{data:data});		
		}
	})
}

// 更新管理员数据
adminController.adminUpdate = function(req,res){
	// 更新数据
	adminModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'管理员修改失败'});
		}else{
			// 跳转到管理员列表
			res.redirect('/admin/adminList');		
		}		
	})
}











// 添加友联的页面
adminController.pyAdd = function(req,res){
	// 判断用户是否登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 响应页面
	res.render('admin/pyAdd');	
}

// 插入友联数据
adminController.pyInsert = function(req,res){
	// 判断用户是否登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 插入数据
	pyModel.create(req.body,function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'添加数据失败'});
		}else{
			// 跳转到友联列表
			res.redirect('/admin/pyList');
			// res.send(req.body);
		}
	})
}

// // 友联列表
adminController.pyList = function(req,res){
	// 判断用户是否登录
	// if(!req.session.user) res.redirect('/admin/login');
	// 查询友联数据
	pyModel.find({},function(err,data){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			// 响应模板
			res.render('admin/pyList',{pys:data});			
		}
	});

	
}

// // 删除友联
adminController.pyRemove = function(req,res){
	// 删除友联
	pyModel.remove({_id:req.params._id},function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'数据删除失败'});
		}else{
			// 跳转到友联列表
			res.redirect('/admin/pyList');		
		}
	})
}

// // 编辑友联的页面
adminController.pyEdit = function(req,res){
	// 查询友联数据
	pyModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询友联数据失败'});
		}else{
			// 响应模板
			res.render('admin/pyEdit',{data:data});		
		}
	})
}

// // 更新友联数据
adminController.pyUpdate = function(req,res){
	// 更新数据
	pyModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'友联修改失败'});
		}else{
			// 跳转到友联列表
			res.redirect('/admin/pyList');		
		}		
	})
}














// 验证码
adminController.code = function(req,res){
	// 引入验证码模块
	var captchapng = require('captchapng');
	// 验证码的内容
	var code = parseInt(Math.random()*9000+1000);
	// 把code 存储到服务器
	req.session.code = code;
    // 生成验证码图片的宽度,高度,验证码内容
    var p = new captchapng(120,30,code); 
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.send(imgbase64);
}





// 暴露控制器
module.exports = adminController;
