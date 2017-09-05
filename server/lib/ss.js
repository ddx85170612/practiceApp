const express = require('express');
const router = express.Router();
const common = require('../common');
var service = require('../api_server/user_server');
router.post('/api/user/ss', (req, res) => {
  let params = common.setParams(req.body.params);
  let currentIndex = req.body.currentIndex;
  let size = req.body.size;
  let returnData = common.setData(currentIndex, size);
  if (params.account == '' || params.password == '') {
    returnData.status = 'E';
    res.send(returnData);
    return
  }
  service.userFind((data) => {
    returnData.data = data.data;
    returnData.count = data.count;
    res.send(returnData)
  }, params)
});
router.post('/api/user/userSave', (req, res) => {
  let params = common.setParams(req.body.params);
  let returnData = common.setData();
  service.userSave((data, msg) => {
    if (data == 'E') {
      returnData.status = data;
      returnData.msg = '该用户已存在';
      res.send(returnData)
    } else {
      returnData.status = 'S';
      returnData.msg = msg;
      returnData.data = data;
      res.send(returnData)
    }
  }, params)
});
module.exports = router;