<template>
  <div>
    <h1 class="tags-title">{{ cate }}</h1>
    <p v-if="meta && meta.tabs">
      <template v-for="tab in meta.tabs" :key="tab">
        <label :for="tab">
          <input
            type="radio"
            :name="`${cate}-tab`"
            :id="tab"
            @click="fnSwitchTab(tab)"
          />
          {{ tab }}
        </label>
      </template>
      <!-- {{ meta.tabs }} -->
    </p>
    <!-- {{ screenWidth }} -->
    <div class="cards-row is-flex is-flex-wrap">
      <template v-for="(tag, index) in tags" :key="tag">
        <div class="card-col" :class="fnGenCardClass(index, ext, lstExt)">
          <div class="card-content" :class="ext === index ? 'flipped' : ''">
            <div class="card-box front">
              <div class="is-flex jcsb">
                <div :class="`${cate}-${index}`" class="tag-name">
                  {{ tag.name }}
                </div>
                <div>
                  <button
                    class="btn btn-copy"
                    :data-clipboard-target="`.${cate}-${index}`"
                  >
                    复制
                  </button>
                </div>
              </div>
              <div class="tag-desc is-flex jcsb">
                {{ tag.desc }}
                <button v-if="tag.note" @click="fnSwitchExt(index, tag)">
                  备注
                </button>
                <button v-else disabled>备注为空</button>
              </div>
            </div>
            <div class="card-box back">
              <div :class="`${cate}-${index}-back`">
                {{ tag.name }}
                <button @click="fnSwitchExt(index, tag)">返回</button>
              </div>
              <div class="tag-note" v-html="buildNoteHtml(tag.note)"></div>
              <!-- <div class="tag-note">
                {{ tag.note || `${tag.desc} - 备注为空` }}
              </div> -->
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  tags: Object,
  meta: Object,
  cate: String,
  screenWidth: Number,
});
const emit = defineEmits(["changeTab"]);

const buildNoteHtml = (note) => {
  if (!note) {
    return "";
  }
  return note.replace(/<code>(.+)<\/code>/, function (a0, b1) {
    // console.log(arguments);
    return a0.replace(b1, html2Escape(b1));
  });
};

const html2Escape = (sHtml) => {
  return sHtml.replace(/[<>&"]/g, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
  });
};

// 延时函数
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 卡片翻转
const ext = ref(-1);
const lstExt = ref(-1);
const fnSwitchExt = async (index, tag) => {
  ext.value = ext.value === index ? -1 : index;
  if (ext.value === index) {
    lstExt.value = index;
  }
  if (!tag.note) {
    await sleep(1700);
    if (ext.value === index) {
      ext.value = -1;
    }
  }
};

// 分区 tab 切换
const lstTab = ref("");
const fnSwitchTab = (to) => {
  let from = lstTab.value == "" ? props.meta.tabs[0] : lstTab.value;
  console.log(from);
  emit("changeTab", props.cate, from, to);
  lstTab.value = to;
};

const fnGenCardClass = (index, ext, lstExt) => {
  const arr = [
    ext === index ? "col-ext" : "",
    lstExt === index ? "col-lst" : "",
  ];
  return arr.join(" ");
};

import Clipboard from "clipboard";
const clipboard = new Clipboard(".btn");
clipboard.on("success", async function (e) {
  e.trigger.innerHTML = "成功";
  await sleep(1700);
  e.trigger.innerHTML = "复制";
  // e.clearSelection();
});
clipboard.on("error", function (e) {
  e.trigger.innerHTML = "复制失败";
});
</script>

<style lang="scss" scoped>
.tags-title {
  font-size: 23px;
}
.is-flex {
  display: flex;
  &.is-flex-wrap {
    flex-wrap: wrap;
  }
  &.jcsa {
    justify-content: space-around;
  }
  &.jcsb {
    justify-content: space-between;
  }
}
.cards-row {
  display: flex;
  flex-wrap: wrap;
  .card-col {
    transition: all 0.5s;
    &.col-ext {
      width: 100%;
    }
  }
  .card-content {
    margin: 0.75em;
    position: relative;
    // backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: transform 1s;
    .back {
      transform: rotateY(180deg);
      display: none;
    }
    &.flipped {
      transform: rotateY(180deg);
      .front {
        display: none;
      }
      .back {
        display: block;
      }
    }
  }
}
.card-box {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%);
  color: #4a4a4a;
  display: block;
  padding: 0.55rem;
  .tag-desc,
  .tag-note {
    margin-top: 0.3rem;
  }
}
.col-lst .card-box {
  background-color: #eee;
}

.card-col {
  width: 100%;
}

@media (min-width: 576px) {
  .card-col {
    width: 50%;
  }
  #tags-module-by-name .card-col {
    width: 100%;
  }
}

@media (min-width: 992px) {
  .card-col {
    width: 33.33%;
  }
  #tags-module-by-name .card-col {
    width: 50%;
  }
  .tag-name {
    max-width: 83%;
  }
}

@media (min-width: 1200px) {
  .card-col {
    width: 25%;
  }
  #tags-module-by-name .card-col {
    width: 33.33%;
  }
}
</style>



