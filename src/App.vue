<template>
  <div id="app">
  
    <router-view></router-view>
    <x-footer></x-footer>
  </div>
</template>

<style lang="less">
#app {
  li,
  ul {
    list-style-type: none
  }
}
</style>
}
</style>


<script>
import footer from './components/common/footer.vue';


export default {
  components: {
    'x-footer': footer
  }


  //   data() {
  //     return {
  //       account: '',
  //       password: ''
  //     }
  //   },
  //   methods: {
  //     login() {
  //       axios.get(API.getAccount)
  //         .then((response) => {
  //           console.log(response)
  //           console.log(API);

  //           let params = {
  //             account: this.account,
  //             password: this.password
  //           };
  //           return axios.post(API.createAccount, params);
  //         })
  //         .then((response) => {
  //           console.log(response)

  //         })
  //         .catch((reject) => {
  //           console.log(reject)

  //         });
  //     }
  //   }
}
</script>

