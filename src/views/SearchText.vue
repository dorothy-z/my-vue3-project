<template>
  <div class="search-box">
    <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
    <div class="img-container">
      <img v-for="img in filterImgs" :key="img.src" :src="img.src" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Tesseract from 'tesseract.js'

const requestImgs = () => {
  return [
    'https://i.postimg.cc/PqrPHLKH/img1.png',
    'https://i.postimg.cc/d1h37zzS/img2.png',
    'https://i.postimg.cc/SxmKLXB9/img3.png'
  ].map(img => ({
    name: img,
    src: img,
  }))
}

const value = ref('');
const allImgs = ref<any[]>([]);
// 过滤出符合条件的图片
const filterImgs = computed(() => 
  allImgs.value.filter(({keyword}) => keyword.includes(value.value)),
)
const resolveImg = (obj: any) => {
  const o = { ...obj };
  return Tesseract.recognize(o.src, 'eng')
    .then(({data: { text }}) => {
      // 成功则把 text 放在 keyword 中
      return { ...o, keyword: text };
    })
    .catch(() => {
      // 失败则把src放在keyword中
      return { ...o, keyword: o.src };
    })
}

const getImgs = async () => {
  const res = requestImgs();
  // 解析图片文字
  allImgs.value = await Promise.all(res.map(o => resolveImg(o)));
  console.log(allImgs.value);
}

onMounted(() => {
  getImgs();
})


</script>

<style scoped>
.search-box {
  margin-top: 15px;
}
</style>