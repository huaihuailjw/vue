<template>
  <div class="login">
    <ul>
      <li>
        <input v-model="username" placeholder="手机/邮箱/用户名" type="text">
      </li>
      <li>
        <input v-if="class2 === ''" v-model="password" placeholder="密码" type="password">
        <input v-else="class2 === 'true'" v-model="password" placeholder="密码" type="text">
        <div @click="switch_wrap" class="switch">
          <div :class="['switch-wrap',{'switch-true':class2 == 'true' ? true : false }]">
            <div class="switch-cycle"></div>
            <div class="switch-left">abc</div>
            <div class="switch-right">···</div>
          </div>
        </div>
      </li>
    </ul>
    <button class="login_button" @click="login_button">登录</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        username: null,
        password: null,
        class1: 'switch-wrap',
        class2: ''
      }
    },
    methods: {
      switch_wrap(event) {
        const _this = this;
        _this.class2 = _this.class2 == '' ? _this.class2 = 'true' : _this.class2 = '';
      },
      login_button() {
        this.$toast('跳转中');
        this.$router.push('portal');
        // window.location = '#portal';
        // this.$store.dispatch('changeHead', 'portal');
      }
    }
  }

</script>
