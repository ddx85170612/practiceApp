var jdbc_conn = require('./jdbc')

//初始化返回数据
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
//检查传入数据
function setParams(obj) {
    let params = {};
    for (var key in obj) {
        if (obj[key] != '' && obj[key] != null && obj[key] != undefined) {
            params[key] = obj[key];
        }
    }
    return params;
}
//判断是否又该属性
function isHasProperty(params, property) {
    return params.hasOwnProperty(property)
}
//获取总数
function getCount(tabName, cb) {
    var count = 'select count(*) as count from   ' + tabName;

    jdbc_conn.query(count, function (err, count, fields) {
        if (err) throw err;
        cb(count[0].count)
    })
}


module.exports = {
    setData: setData,
    setParams: setParams,
    isHasProperty: isHasProperty,
    getCount: getCount
};