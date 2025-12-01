<script>
import db from 'virtual:dataset'
import TagsCard from './components/tags-card.vue'

// console.log(db.tags);

export default {
  components: {
    TagsCard,
  },
  data() {
    return {
      msg: 'App.vue',
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      tags: db.tags,
      tagsMeta: db['tags-meta'],
    }
  },
  mounted() {
    const _this = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        _this.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    updateTags(name, from, to) {
      const curArry = db.tags[name]
      this.tags[name] = curArry.map((item) => {
        item.name = item.name.replace(from, to)
        return item
      })
    },
  },
}
</script>

<template>
  <!-- {{ msg }} -->
  <h1>Z-BlogPHP 模板语法汇总</h1>
  <p>
    完整文档：
    <a
      href="https://docs.zblogcn.com/php/#/"
      target="_blank"
      title="Z-BlogPHP 官方文档"
    >https://docs.zblogcn.com/php/</a>
  </p>
  <p>
    本页面构建地址：
    <a
      href="https://github.com/wdssmq/docs-zblogphp-tamplate-markup"
      target="_blank"
      title="wdssmq/docs-zblogphp-tamplate-markup: Z-BlogPHP 模板语法汇总"
    >https://github.com/wdssmq/docs-zblogphp-tamplate-markup</a>
  </p>
  <TagsCard
    v-for="(subTags, name) in tags"
    :id="`tags-${name}`"
    :key="name"
    :cate="name"
    :meta="tagsMeta[name] ? tagsMeta[name] : {}"
    :screen-width="screenWidth"
    :tags="subTags"
    @change-tab="updateTags"
  />
</template>

<style>
#app {
  margin: 0 auto;
  max-width: 75rem;
  margin-bottom: 4rem;
}
</style>
