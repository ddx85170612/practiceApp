var jdbc_conn = require('../jdbc')


function findArticles(cb, params) {

    var selectSQL = ' select * from article where 1=1 ';
    var page=params.page;
    var count=params.count;
    var params=params.params;
    let paramsArr = [];
    //作者名模糊查询条件
    if (params.author != null && params.author != undefined && params.author != '') {
        var author = '%' + params.author + '%';
        paramsArr.push(author);
        selectSQL = selectSQL + " and article.author like ? ";
    }
    //类型查询条件
    if (params.tag != null && params.tag != undefined && params.tag != '') {
        var tag = params.tag;
        paramsArr.push(tag);
        selectSQL = selectSQL + " and article.tag = ? ";
    }
    selectSQL=selectSQL+" limit "+(page-1)*count+","+count;
    jdbc_conn.query(selectSQL, paramsArr, function (err, rows, fields) {
        if (err) throw err;
        cb(rows)
    })
}


module.exports = {
    findArticles: findArticles
}


