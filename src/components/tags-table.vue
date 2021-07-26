<template>
  <div>
    <h1>{{ cate }}</h1>
    <table>
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

