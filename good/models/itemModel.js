// 栏目数据模型
// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 2. 定义 栏目 骨架 (用来约束集合)
var itemSchema = new mongoose.Schema({
	// 栏目名称
    name:String,  		
    // 创建时间
    ctime: {
    	type: Date, 
    	default: new Date()
    },		
    // 栏目的排序
    order:Number,
    // 栏目简介
    info: String 
});


// 3. 创建数据库模型   会自动把集合 变成 复数
var itemModel = mongoose.model('item', itemSchema);
	
// 暴露 栏目数据模型
module.exports = itemModel;
