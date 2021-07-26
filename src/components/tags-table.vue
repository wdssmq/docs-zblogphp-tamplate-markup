<template>
  <div>
    <h1 class="tags-title">{{ cate }}</h1>
    <table class="tags-table">
      <tr>
        <th>标签</th>
        <th>含义</th>
        <th>备注</th>
      </tr>
      <tr v-for="tag in tags" :key="tag">
        <td>{{ tag.name }}</td>
        <td>{{ tag.desc }}</td>
        <td>{{ tag.note }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
defineProps({
  tags: Object,
  cate: String,
});
</script>

<style lang="scss" scoped>
.tags-title {
  font-size: 23px;
}
.tags-table {
  border-collapse: collapse;
  empty-cells: show;
  border-spacing: 0;
  border: 1px solid #ccc;
  font-size: 14px;
  td,
  th {
    padding: 0.3em 0.5em;
    vertical-align: top;
    border: 1px solid #ccc;
  }
}
</style>


