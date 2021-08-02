<template>
  <!-- {{ msg }} -->
  <h1>Z-BlogPHP 模板语法汇总</h1>
  <p>本页面构建地址：<a href="https://github.com/wdssmq/docs-zblogphp-tamplate-markup" target="_blank" title="wdssmq/docs-zblogphp-tamplate-markup: Z-BlogPHP 模板语法汇总">https://github.com/wdssmq/docs-zblogphp-tamplate-markup</a></p>
  <tags-table
    v-for="(subTags, name) in db.tags"
    :cate="name"
    :id="`tags-${name}`"
    :tags="subTags"
    :key="name"
  ></tags-table>
</template>

<script>
import db from "virtual:dataset";
import TagsTable from "./components/tags-table.vue";

// console.log(db.tags);

export default {
  data() {
    return {
      msg: "App.vue",
      db,
    };
  },
  components: {
    TagsTable,
  },
};
</script>

<style>
#app {
  margin: 0 auto;
  max-width: 75rem;
  margin-bottom: 4rem;
}
</style>
