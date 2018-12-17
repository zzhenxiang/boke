// 图片上传的配置模块

// 引入 path 模块
var path = require('path');
// 引入时间模块
var timestamp = require('time-stamp');
// 引入 模块
var uid = require('uid');
// 引入 multer 模块（接收文件域）
var multer  = require('multer');


/**
* 功能：处理图片上传的函数
* 参数：
*	imagePath 	-String 	图片保存在服务器的路径  例： 'uploads'
*	imageTypes	-Array 		允许用户上传图片的格式  例：['image/jpeg','image/png','image/gif']
*	fileSize	-Number 	允许接收图片的最大大小（单位是：字节）
* 返回值:
*	upload      -Object     文件上传的 multer 对象
* 作者：jack
* 版本：1.0.0
* 邮箱：jack@niubi.com
* 日期：2018年11月02号
* 
*/
var imageUpload = function(imagePath,imageTypes,fileSize){
	// 配置参数
	var storage = multer.diskStorage({
		// 接收文件保存位置
		destination: function (req, file, cb) {
			cb(null, imagePath)
		},
		// 给接收的文件重新命名
		filename: function (req, file, cb) {
			// 获取文件扩展名
			var extname = path.extname(file.originalname);
			cb(null, file.fieldname + '-' + timestamp('YYYYMMDD')+'-'+uid()+extname);
		}
	})

	// 文件过滤函数
	function fileFilter (req, file, cb) {
		// 判断图片是不是允许接收的
		if(imageTypes.indexOf(file.mimetype)==-1){ 
			// 拒绝这个文件
			cb(null, false);
			// 告诉错误的信息
			cb(new Error('请上传 jpeg 或 png 格式的图片'));
		}else{
			// 接收这个文件
			 cb(null, true)
		}
	}

	// multer 配置
	var upload = multer({ 
		// 基本配置
		storage: storage, 
		// 文件过滤函数
		fileFilter:fileFilter,
		// 限制文件大小
		limits:{
			fileSize: fileSize   // 字节
		}
	})

	// 返回 upload 对象
	return upload;

}

// 暴露图片上传的函数
module.exports = imageUpload;















