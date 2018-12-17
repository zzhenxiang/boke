// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 2. 定义 管理员 骨架 (用来约束集合)
var adminSchema = new mongoose.Schema({
	// 栏目名称
    name:String,  		
    password:String,
    tel:String,
    // 创建时间
    ctime: {
    	type: Date, 
    	default: new Date()
    },
});


// 3. 创建数据库模型   会自动把集合 变成 复数
var adminModel = mongoose.model('admin', adminSchema);
	
// 暴露 栏目数据模型
module.exports = adminModel;