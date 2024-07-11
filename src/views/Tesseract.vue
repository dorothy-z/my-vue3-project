<template>
  <div>
    提取图片上的文字
  </div>
</template>

<script setup lang="ts">
import Tesseract from 'tesseract.js';

Tesseract.recognize(
  // 'https://tesseract.projectnaptha.com/img/eng_bw.png',  // 识别图片
  'https://i.postimg.cc/PqrPHLKH/img1.png',  // 识别图片
  'eng', //意思是识别英文
)
  .then(({data: {text}}) => {
    console.log(text);  
    // Mild Splendour of the various-vested Night!
    // Mother of wildly-working visions! hail
    // I watch thy gliding, while with watery light
    // Thy weak eye glimmers through a fleecy veil;
    // And when thou lovest thy pale orb to shroud
    // Behind the gather’d blackness lost on high;
    // And when thou dartest from the wind-rent cloud
    // Thy placid lightning o’er the awaken’d sky.
  })
  .catch(error => {
    console.log(error);
  })
</script>

<style scoped>

</style>