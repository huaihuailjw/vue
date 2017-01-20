<template>
  <div v-if="$route.name" class="header">
    <h1 style="text-align:center;">{{$route.name}}</h1>
    <a :href="$route.meta.to" v-if="$route.name != '登录'">
      <img src="static/images/back.png" />
    </a>
  </div>
</template>
