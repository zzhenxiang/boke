// 栏目数据模型
// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 2. 定义 栏目 骨架 (用来约束集合)
var articleSchema = new mongoose.Schema({
	// 栏目Id
    itemId:{
        type:String,
        // 关联的集合
        ref:'item'
    },
    // 文章标题
    title:String,
    // 作者	
    author:String,
    // 关键字
    keywords:String,
    // 文章的描述
    description:String,
    // 文章的封面
    imgurl:String,
    // 文章内容
    content:String,   
    // 创建时间
    ctime: {
    	type: Date, 
    	default: new Date()
    }, 
});

// 3. 创建数据库模型   会自动把集合 变成 复数
var articleModel = mongoose.model('article', articleSchema);
	
// 暴露 栏目数据模型
module.exports = articleModel;