import axios from 'axios';
import URL from '../config/URL';
const service = {
  console: function (params) {
    console.log(JSON.parse(JSON.stringify(params)));
  },
  getData: function (params, url, cb) {
    axios.get(URL[url], params)
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  postData: function (params, url, cb) {
    axios.post(URL[url], {params:params})
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

}
export default service;