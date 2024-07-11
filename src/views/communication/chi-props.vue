<template>
  <div>

  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    msg2: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(["myClick","myClick2"])

  console.log(props);
  
</script>

<style scoped>

</style>