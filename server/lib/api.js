var conn = require('./db');
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


router.post('/api/login/createAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')

    let params = setParams(req.body.params);
    let Data = setData();
    let findSql = 'select count from users where account = ?'
    let insertSql = 'insert into users set ?'
    conn.connect();
    conn.query(findSql, [params.account], (err, data) => {
        if (data.length > 0) {
            Data.status = "E";
            Data.msg = "用户已存在";
            res.send(Data)
            conn.end();
        } else {
            conn.query(insertSql, params, (err, data) => {
                Data.status = "S";
                Data.msg = "新增成功";
                res.send(Data)
                conn.end();
            })
        }
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
    let findSql = 'select * from users where  account = ? and password =?';
    conn.query(findSql, [params.account, params.password], (err, data) => {
        console.log(data[0].userId);
        if (data.length == 1) {
            returnData.data = data[0];
            returnData.status = 'S';
            res.send(returnData);
        } else {
            returnData.status = 'E';
            res.send(returnData);
        }
    })



});

// // 获取所有账号
router.post('/api/login/getAllUser', (req, res) => {



    let params = setParams(req.body.params);
    let currentIndex = req.body.currentIndex;
    let size = req.body.size;
    // let count = db.getCollection('users').count();
    let returnData = setData(currentIndex, size);
    let findSql = 'select * from users LIMIT ' + (currentIndex - 1) * size + ',' + currentIndex * size;
    let findAll = 'select count(*) as count from users ';

    conn.query(findAll, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            console.log(data);
            returnData.count = data[0].count;
        }
    })
    conn.query(findSql, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            returnData.data = data
            res.send(returnData);
        }
    })




});


// //获取文章信息
router.post('/api/login/getArticle', (req, res) => {
    let params = setParams(req.body.params);
    let currentIndex = req.body.currentIndex;
    let size = req.body.size;
    let returnData = setData(currentIndex, size);

    let findSql = 'select * from article ? LIMIT ' + (currentIndex - 1) * size + ',' +  size;
    let findAll = 'select count(*) as count from article ';
   
    conn.query(findAll, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            returnData.count = data[0].count;
        }
    })
    conn.query(findSql, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            returnData.data = data
            res.send(returnData);
        }
    })



})

module.exports = router;