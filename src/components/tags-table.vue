<script setup>
import Clipboard from 'clipboard'

defineProps({
  tags: Object,
  cate: String,
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const clipboard = new Clipboard('.btn')

clipboard.on('success', async (e) => {
  e.trigger.innerHTML = '成功'
  await sleep(3000)
  e.trigger.innerHTML = '复制'
  e.clearSelection()
})

clipboard.on('error', (e) => {
  e.trigger.innerHTML = '复制失败'
})
</script>

<template>
  <div>
    <h1 class="tags-title">
      {{ cate }}
    </h1>
    <table class="tags-table">
      <tr>
        <th>标签</th>
        <th class="w-5">
          复制
        </th>
        <th>含义</th>
        <th>备注</th>
      </tr>
      <tr v-for="(tag, index) in tags" :key="tag">
        <td :class="`${cate}-${index}`">
          {{ tag.name }}
        </td>
        <td>
          <button class="btn" :data-clipboard-target="`.${cate}-${index}`">
            复制
          </button>
        </td>
        <td>{{ tag.desc }}</td>
        <td>{{ tag.note }}</td>
      </tr>
    </table>
  </div>
</template>

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
    &.w-5 {
      width: 5%;
    }
    &.w-15 {
      width: 15%;
    }
  }
}
</style>
