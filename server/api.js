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

router.post('/api/login/createAccount', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')

    let params = setParams(req.body.params);
    let Data = setData();


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


// 获取文章信息
router.post('/api/login/setCrawler', (req, res1) => {
    // 通过模型去查找数据库
    c.queue([{
        uri: 'http://www.jianshu.com/',
        jQuery: false,

        // 覆盖全局的callback
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = cheerio.load(res.body);;
                // console.log($);
                // $默认使用Cheerio
                // 这是为服务端设计的轻量级jQuery核心实现
                let m = [];
                $('.note-list li').each(function (idx, ele) {
                    let title = $(ele).find('.title').text();
                    let name = $(ele).find('.name a').text();
                    let abstract = $(ele).find('.abstract').text().replace(/\n/gi, '');

                    var obj = {
                        title: title,
                        name: name,
                        abstract: abstract
                    }
                    m.push(obj)
                })
                console.log(typeof m);
                db.collection('article', function (err, collection) {
                    if (err) {
                        res1.send(err)
                    } else {
                        collection.insertMany(m).toArray(function (err, data) {
                            if (err) {
                                res1.send(err)
                            } else {

                                res1.send('ok')
                            }
                        })
                    }
                })


            }
            done();
        }
    }]);
});


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