import axios from 'axios';
import URL from '../config/URL';
const service = {
  console: function (params) {
    console.log(JSON.parse(JSON.stringify(params)));
  },
  //拷贝对象
  copy:function (params) {
    return JSON.parse(JSON.stringify(params));
  },
  getData: function (url, cb, params, index, size) {
    let data = {
      'params': JSON.parse(JSON.stringify(setParams(params))),
      "currentIndex": index ? index : undefined,
      "size": size ? size : undefined
    }
    axios.post(URL[url], data)
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },

}
//筛选参数
function setParams(obj) {
  let params = {};
  for (var key in obj) {
    if (obj[key] != '' && obj[key] != null && obj[key] != undefined) {
      params[key] = obj[key];
    }
  }
  return params;
}
export default service;