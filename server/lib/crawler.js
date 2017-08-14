var Crawler = require("crawler");
let cheerio = require('cheerio');
var c = new Crawler({
  maxConnections: 10,
  // 这个回调每个爬取到的页面都会触发
});
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
    }
    done();
  }
}]);

module.exports =  c;