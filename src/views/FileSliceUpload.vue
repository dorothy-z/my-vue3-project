<template>
  <div class="file-box">
    <input type="file" name="" id="" @change="handleChange">
    <button @click="handleUpload">上传</button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue';

const uploadFile = ref(null);
const uploadChunkList = ref<any[]>([]);

const handleChange = (e: any) => {
  console.log(e);
  if (!e.target.files[0]) return
  uploadFile.value = e.target.files[0]
}

const handleUpload = () => {
  if (!uploadFile.value) return
  const chunkList = createChunk(uploadFile.value)
  console.log(chunkList);
  // 另外切片打上标记。保证后端正确合并
  uploadChunkList.value = chunkList.map(({ file }, index: number) => {
    return {
      file,
      size: file.size,
      percent: 0,
      chunkName: `${(uploadFile.value as any).name}-${index}`,
      fileName: (uploadFile.value as any).name,
      index
    }
  })
  console.log(uploadChunkList.value);
  // 发请求，把切片一个一个地给后端
  uploadChunks()
}

// 上传切片
const uploadChunks = () => {
  const formateList = uploadChunkList.value.map(({ file, fileName, index, chunkName }) => {
    // 对象需要转成二进制数据流进行传输
    const formData = new FormData()  // 创建表单格式的数据流
    // 将切片转换成了表单的数据流
    formData.append('file', file)
    formData.append('fileName', fileName)
    formData.append('chunkName', chunkName)
    return { formData, index }
  })
  console.log(formateList, 'formateList');  // 浏览器不给你展示二进制流，但是得清楚确实拿到了
  // 发接口请求
  const requestList = formateList.map(({ formData, index }) => {
    return requestUpload({
      url: 'http://localhost:3000/upload',
      data: formData,
      onUploadProgress: createProgress(uploadChunkList.value[index])  // 进度条函数拿出来写 
    })
  })

  // 合并切片请求
  Promise.all(requestList).then(mergeChunks)
}

// 合并切片
const mergeChunks = () => {
  requestUpload({
    url: 'http://localhost:3000/merge',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      fileName: (uploadFile.value as any).name,
      size: 1 * 1024 * 1024
    })
  })
}

// 上传的进度
const createProgress = (item: any) => {
  return (e: any) => {
    // 为何函数需要return出来，因为axios的onUploadProgress就是个函数体
    // 并且这个函数体参数e就是进度
    item.percent = parseInt(String((e.loaded / e.total) * 100))  // axios提供的
  }
}

// 使用类型保护，否则下方axios[method]处ts会报错
type Method = 'get' | 'post' | 'put' | 'delete';
interface AxiosParams {
  url: string,
  method?: Method,
  data: any,
  headers?: object
  onUploadProgress?: any
}

// 为了实现进度条，封装请求
const requestUpload = ({ url, method = 'post', data, headers = {}, onUploadProgress = (e: any) => e }: AxiosParams): Promise<object | any> => {
  return new Promise((resolve, reject) => {
    // axios支持在请求中传入一个回调onUploadProgress, 其目的是为了知道请求的进度
    axios[method](url, data, { headers, onUploadProgress })
      .then((res: any) => {
        resolve(res)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

const createChunk = (file: any, size = 1 * 1024 * 1024) => {
  const chunkList = [];
  let cur = 0;
  while (cur < file.size) {
    chunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return chunkList
}
</script>

<style scoped>
.file-box {
  margin-top: 20px;
}
</style>