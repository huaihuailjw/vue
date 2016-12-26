<template>
  <div class="table">
    <table>
      <tr>
        <th>id</th>
        <th>数量</th>
        <th>删除</th>
      </tr>
      <tr v-for="(item,$index) in list">
        <td>{{item.id}}</td>
        <td>{{item.pass_count}}</td>
        <td @click="removes($index)">Delete</td>
      </tr>
    </table>
    <button class="reverse" @click="reverse">扭转</button>
  </div>
</template>
<script>
  import form from '../json/form.js'
  export default {
    data() {
      return {
        list: form
      }
    },
    methods: {
      removes(index) {
        const _this = this;
        _this.list.splice(index, 1);
      },
      reverse() {
        const _this = this;
        _this.list.reverse();
      }
    }
  }

</script>