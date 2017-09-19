var fs = require('fs');
let fileName = 'users'
let filePath = 'login'
let tabName = 'login'




var api = fs.readFileSync('api.js', 'utf8');
var server = fs.readFileSync('server.js', 'utf8');

fs.readFile('api.js', {
  flag: 'r+',
  encoding: 'utf8'
}, function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  data = data.replace(/filePath/g, filePath);
  data = data.replace(/fileName/g, fileName);
  fs.writeFile('../api/'+fileName + '.js', data, {
    flag: 'a'
  }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('api写入成功');
    }
  });
});

fs.readFile('server.js', {
  flag: 'r+',
  encoding: 'utf8'
}, function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  data = data.replace(/tabName/g, tabName);
  data = data.replace(/fileName/g, fileName);

  fs.writeFile('../api_server/'+fileName + '_server.js', data, {
    flag: 'a'
  }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('server写入成功');
    }
  });
});