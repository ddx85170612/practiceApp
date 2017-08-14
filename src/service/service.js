import axios from 'axios';
import URL from '../config/URL';
const service = {
  console: function (params) {
    console.log(JSON.parse(JSON.stringify(params)));
  },
  getData: function (url, cb, params, index, size) {

    let data = {
      'params': JSON.parse(JSON.stringify(params)),
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
export default service;