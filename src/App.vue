<template>
  {{ msg }}
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
</style>
