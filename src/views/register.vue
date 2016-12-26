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
          <label>手机:</label>
          <input v-model="username" placeholder="请输入您的手机" type="text">
        </div>
      </li>
      <li>
        <div class="user">
          <label>密码:</label>
          <input v-model="password" placeholder="请输入您的密码" type="password">
        </div>
        <div class="user_model">密码是：<span>{{password}}</span></div>
      </li>
    </ul>
    <button class="login_button" v-on:click="login_button">注册</button>
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
        alert("注册个毛线，本项目无需注册");
        window.location = "#/login";
      }
    }
  }

</script>
