const models = require('./db').Models;
const db = require('./db').db;
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
    db.collection('ids').findOneAndUpdate({
            name: name
        }, //query
        {
            $inc: {
                id: 1
            }
        }, //update
        function (err, r) { //callback
            if (err) throw err;
            cb(r.value.id)
        }
    );

}

router.post('/api/login/createAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')

    let params = setParams(req.body.params);
    let Data = setData();

    setId('user', function (id) {
        params.userId = id;
        db.collection('users', {
            safe: true
        }, function (err, collection) {
            if (err) {
                res.send(err);
            } else {
                collection.find({
                    account: params.account
                }).toArray(function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        if (data.length > 0) {
                            Data.status = 'E';
                            Data.msg = '账户已存在';
                            res.send(Data)
                        } else {
                            collection.save(params, function (err, data) {
                                if (err) {
                                    res.send(err)
                                } else {
                                    Data.status = 'S';
                                    Data.msg = '新增成功';
                                    res.send(Data)
                                }
                            })
                        }
                    }
                })
            }

        })
    })


});

// 获取已有账号接口
router.post('/api/login/getAccount', (req, res) => {

    let params = setParams(req.body.params);

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

    db.collection('users', {
        safe: true
    }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            collection.find(params).toArray(function (err, data) {
                if (data.length) {
                    returnData.data = data.data;
                    returnData.status = 'S';
                    res.send(returnData);
                } else {
                    returnData.status = 'E';
                    res.send(returnData);
                }
            })
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
    console.log(params);
    db.collection('users', {
        safe: true
    }, function (err, collection) {
        /*collection方法用于连接现有表，{safe:true} 选项，当collection不存在的时候报错
        createCollection方法用于创建新表，{safe:true} 选项，当collection存在的时候报错
        */
        if (err) {
            console.log(err);
        } else {
            collection.count(function (err, data) {
                returnData.count = data
            });
            collection.find(params).skip((currentIndex - 1) * size).limit(size).toArray(function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    returnData.data = data
                    res.send(returnData);
                }
            });
        }
    });

});


//获取文章信息
router.post('/api/login/getArticle', (req, res) => {
    let params = setParams(req.body.params);
    let currentIndex = req.body.currentIndex;
    let size = req.body.size;
    let returnData = setData(currentIndex, size);

    db.collection('article', {
        safe: true
    }, function (err, collection) {
        /*collection方法用于连接现有表，{safe:true} 选项，当collection不存在的时候报错
        createCollection方法用于创建新表，{safe:true} 选项，当collection存在的时候报错
        */
        if (err) {
            console.log(err);
        } else {
            collection.count(function (err, data) {
                console.log(data);
                returnData.count = data
            });
            collection.find(params).skip((currentIndex - 1) * size).limit(size).toArray(function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    returnData.data = data
                    res.send(returnData);
                }
            });
        }
    });


})

module.exports = router;