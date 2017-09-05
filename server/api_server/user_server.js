const jdbc_conn = require('../jdbc')
const common = require('../common')

function userFind(cb, params) {
    let sqlArr = []
    let selectSQL = 'select * from users where 1=1 ';
    if (common.isHasProperty(params, 'account')) {
        let sql = " and account like '%" + params.account + "%'";
        sqlArr.push(sql)
    }
    sqlArr.map((item) => {
        selectSQL += item;
    })
    jdbc_conn.query(selectSQL, function (err, rows, fields) {
        if (err) throw err;
        common.getCount('users', (count) => {
            let data = {
                count: count,
                data: rows
            }
            cb(data)
        })

    })
}

function userSave(cb, params) {

    let checkUser="select * from users where account = '" + params.account+ "'";

    jdbc_conn.query(checkUser, params, function (err, rows, fields) {
        if (err) console.log(err);
        if(rows.length>0){
            cb('E')
        }else{
            if (common.isHasProperty(params, 'userId')) {
                let insertSql = 'update  users set ? where userId =' + params.userId;
                jdbc_conn.query(insertSql, params, function (err, rows, fields) {
                    if (err) console.log(err);
                    cb(rows,'修改成功')
                })
            } else {
                let insertSql = 'insert into users set ?'
                jdbc_conn.query(insertSql, params, function (err, rows, fields) {
                    if (err) console.log(err);
                    cb(rows,'新增成功')
                })
            }
        
        }
    })

}



module.exports = {
    userFind: userFind,
    userSave: userSave,
}