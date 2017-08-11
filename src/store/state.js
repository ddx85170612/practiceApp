const state = {
  count: 1,
  menudata: [{
    name: '首页'
  }, {
    name: '系统管理'
  }, {
    name: '用户管理'
  }, ],
  menulist: [{
      name: "系统管理",
      meunFlag: false,
      icon: 'icon-cog',
      child: [{
        name: '用户管理',
        url:'userManagement'
      }]
    },
    {
      name: "文章管理",
      icon: 'icon-book',
      meunFlag: false,
      child: [{
        name: '上传管理'
      }]
    }
  ]
}
export default state;