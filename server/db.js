// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/DBAPP');



// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('mongo connect error'));
db.once('open', () => console.log('mongo connect success'));
/************** 定义模式loginSchema **************/
// 用户登录
const loginSchema = mongoose.Schema({
    userId: Number,
    account: String,
    password: String
});
//文章信息
const articleListSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    url: String,
});
/************** 定义模型Model **************/
const Models = {
    users: mongoose.model('users', loginSchema),
    articleList: mongoose.model('articleList', articleListSchema)
}


module.exports = Models;

