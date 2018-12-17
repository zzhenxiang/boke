// 前台的控制器
var indexController = {};
// 引入栏目数据模型
var itemModel = require('../models/itemModel.js');
// 引入文章数据模型
var articleModel = require('../models/articleModel.js');
// 引入user的数据模型
var userModel = require('../models/userModel.js');
// 引入py的数据模型
var pyModel = require('../models/pyModel.js');
// 前台首页
indexController.index = function(req,res,next){
	
	pyModel.find({},function(err,pydata){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			// 响应模板
			// res.render('admin/foot',{pys:data});			
	

	// 查询栏目数据 1升 -1降
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应错误信息
			res.render('error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			console.log(req.query);
			getItemArticles(0)
			// 查询指栏目下的文章
			function getItemArticles(i){ 
				// 查询数据
				articleModel.find({itemId:data[i]._id}).limit(5).exec(function(err,articles){
					// 把查询到的数据 放到 data
					data[i].articlelist = articles;
					if(i<data.length-1){
						// 查询下一个栏目对应的文章列表
						getItemArticles(++i)
					}else{
						// 响应模板
						res.render('index',{items:data,pydata:pydata});	
					}
				})
			}
		}
	})


	}
	});
}





// 文章列表
indexController.articleList = function(req,res){

pyModel.find({},function(err,pydata){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			// 响应模板
			// res.render('admin/foot',{pys:data});	
			// 		
	
	// 每页显示多少条数据
	var pageSize = 3;
	// 当前默认查询第一页数据
	var page = req.query.page?req.query.page:1;
	// 一共有多少条数据
	articleModel.find({}).count(function(err,total){
		if(err){
			// 响应错误信息
			res.render('error',{info:"ERROR",errText:'查询数据失败'});		
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
					res.render('error',{info:"ERROR",errText:'查询数据失败'});
				}else{
					// 响应模板
					res.render('articleList',{datas:data,maxPage:maxPage,page:page,pydata:pydata});			
				}
			});
		}
	})

	}
	});


}

// 内容页面
indexController.content = function(req,res,next){
	
	pyModel.find({},function(err,pydata){
		if(err){
			// 响应错误信息
			res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			// 响应模板
			// res.render('admin/foot',{pys:data});			
	

	// 查询栏目数据 1升 -1降
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			// 响应错误信息
			res.render('error',{info:"ERROR",errText:'查询数据失败'});
		}else{
			console.log(req.query);
			getItemArticles(0)
			// 查询指栏目下的文章
			function getItemArticles(i){ 
				// 查询数据
				articleModel.find({itemId:data[i]._id}).limit(5).exec(function(err,articles){
					// 把查询到的数据 放到 data
					data[i].articlelist = articles;
					if(i<data.length-1){
						// 查询下一个栏目对应的文章列表
						getItemArticles(++i)
					}else{

						// 查询要编辑的文章数据
						articleModel.findOne({_id:req.params._id},function(err,iddata){
							if(err){
								// 响应错误信息
								res.render('admin/error',{info:"ERROR",errText:'查询数据失败'});
							}else{
								// 响应模板
								res.render('content',{iddatas:iddata,items:data,pydata:pydata});	
							}
						})

						
					}
				})
			}

		}
	})
	
	}
	});

}


// 登录
indexController.longin = function(req,res){
	
	res.render('longin');			
	
}
/*插入User的信息*/
indexController.userInsert = function(req,res){

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
	userModel.create(req.body,function(err){
		if(err){
			// 响应错误信息
			res.render('error',{info:"ERROR",errText:'添加user失败'});
		}else{
			// 跳转到栏目列表
			res.render('longin');			

		}		
	})
}

// 登录的操作
indexController.doUserLogin = function(req,res){
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

	userModel.findOne({name:name},function(err,data){
		if(data==null){
			console.log('用户名不存在');
			// 响应错误信息
			res.render('longin');
		}else{
			if(err){
				console.log('查询失败');
				res.render('longin');
			}else{
				// 判断密码
				if(password==data.password){
					// 登录成功
					// 把成功的信息存到服务器
					req.session.user2 = data;
					// 跳转到管理员的页面
					res.redirect('/');	

				}else{
					// 密码不正确
					console.log('密码不正确');
					res.render('longin');
				}
			}			
		}
	})
}
// 退出管理员的登录
indexController.userlogOut = function(req,res){
	// 把成功的信息存到服务器
	req.session.user2 = null;
	// 跳转到登录页面
	res.redirect('/longin');	
}


// 暴露控制器
module.exports = indexController;
