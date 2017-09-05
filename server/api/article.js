
const express = require('express');
const common=require('../common')
const router = express.Router();

var service = require('../api_server/article_server')
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/


router.post('/api/article/findArticles',(req,res)=>{
    var params=req.body;
    console.log(params);
    console.log(typeof params);
    service.findArticles(    (data)=>{
        res.send(data)
    },params);
})
module.exports = router;