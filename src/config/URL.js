let _url = 'http://127.0.0.1:8083/';
// let _url = 'http://192.168.87.142:8096/';

const API = {
    // 'sb': _url + 'api/article/findArticles',

    'userSave': _url + 'api/user/userSave',
    'userFind': _url + 'api/user/userFind',


    'getAccount': _url + 'api/login/getAccount',
    'setCrawler': _url + 'api/login/setCrawler',
    'getArticle': _url + 'api/login/getArticle',
}

export default API