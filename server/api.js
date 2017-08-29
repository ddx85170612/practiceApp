var db = require('./db');
const express = require('express');
const router = express.Router();
const c = require('./lib/crawler');
const cheerio = require('cheerio');
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

function setData(index, size, count) {
    let Data = {
        data: '',
        msg: '',
        status: '',
        count: count,
        currentIndex: index,
        size: size
    }
    return Data;
}

function setParams(obj) {
    let params = {};
    for (var key in obj) {
        if (obj[key] != '') {
            params[key] = obj[key];
        }
    }
    return params;
}

function setId(name, cb) {
    db.db.collection('ids').findOneAndUpdate({
        name: name
    }, {
        $inc: {
            ids: 1
        }
    }, (err, data) => {
        data = JSON.parse(JSON.stringify(data))
        console.log(data.value.ids);
        cb(data.value.ids)
    })

}

router.post('/api/login/createAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')

    let params = setParams(req.body.params);
    let Data = setData();
    setId('user', function (id) {
        params.userId = id;
        
        db.users.find({
            account: params.account
        }, (err, data) => {
            if (data.length > 0) {
                Data.status = 'E';
                Data.msg = '账户已存在';
                res.send(Data)
            } else {
                let user = new db.users({
                    userId: id,
                    account:params.account,
                    password:params.password
                })
                user.save((err, data) => {
                    if (err) {
                        res.send(err)
                    } else {
                        Data.status = 'S';
                        Data.msg = '新增成功';
                        res.send(Data)
                    }
                })
            }
        })

    })


});

// 获取已有账号接口
router.post('/api/login/getAccount', (req, res) => {

    let params = setParams(req.body);

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
    db.users.find(params, (err, data) => {
        console.log(data);
        if (data.length) {
            returnData.data = data.data;
            returnData.status = 'S';
            res.send(returnData);
        } else {
            returnData.status = 'E';
            res.send(returnData);
        }
    })


});

// 获取所有账号
router.post('/api/login/getAllUser', (req, res) => {



    let params = setParams(req.body.params);
    let currentIndex = req.body.currentIndex;
    let size = req.body.size;
    // let count = db.getCollection('users').count();
    let returnData = setData(currentIndex, size);
    db.users.count((err, data) => {
        returnData.count = data
    })
    db.users.find(params, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            returnData.data = data
            res.send(returnData);
        }
    }).skip((currentIndex - 1) * size).limit(size)



});


//获取文章信息
router.post('/api/login/getArticle', (req, res) => {
    let params = setParams(req.body.params);
    let currentIndex = req.body.currentIndex;
    let size = req.body.size;
    let returnData = setData(currentIndex, size);
    db.js.count((err, data) => {
        console.log(data);
        returnData.count = data
    })
    db.js.find(params, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            returnData.data = data
            res.send(returnData);
        }
    }).skip((currentIndex - 1) * size).limit(size)




})

module.exports = router;