<template>
  <div class="login">
    <ul>
      <li>
        <div class="user">
          <label>账号:</label>
          <input v-model="username" placeholder="请输入您的账号" type="text">
        </div>
      </li>
      <li>
        <div class="user">
          <label>密码:</label>
          <input v-model="password" placeholder="请输入您的密码" type="password">
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
        password: null
      }
    },
    methods: {
      login_button() {
        alert('禁止向前！')
      }
    }
  }

</script>
