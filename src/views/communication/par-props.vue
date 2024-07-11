<template>
  <div>
    <child :msg2="msg2"></child>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import child from './chi-props.vue'

const msg2 = ref("props传参")
</script>

<style scoped>

</style>