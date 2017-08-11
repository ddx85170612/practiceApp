const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

router.post('/api/login/createAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')

    let newAccount = new models.users({
        account: req.body.account,
        password: req.body.password,

    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createAccount successed');
        }
    });
});

// 获取已有账号接口
router.post('/api/login/getAccount', (req, res) => {

    let params = {
        account: req.body.account,
        password: req.body.password
    }
    var returnData = {
        data: '',
        status: '',
        msg: ''
    }
    if (params.account == '' || params.password == '') {
        returnData.status = 'E';
        res.send(returnData);
        return;
    }
        console.log(params)

    // 通过模型去查找数据库
    models.users.find(params, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            console.log(data)
            if (data.length) {
                returnData.data = data.data;
                returnData.status = 'S';
                res.send(returnData);
            } else {
                returnData.status = 'E';
                res.send(returnData);
            }
        }
    });
});
// 获取文章信息
router.get('/api/login/getarticleList', (req, res) => {
    // 通过模型去查找数据库
    models.articleList.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

module.exports = router;