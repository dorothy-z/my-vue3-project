<template>
  <div class="box">
    <div id="container" class="liquidfill-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import echarts, { EChartOption } from "echarts";
import 'echarts-liquidfill';

onMounted(() => {
  // const data = [0.68] // 显示一个波浪
  const dom = document.getElementById('container') as HTMLDivElement
  const chart = echarts.init(dom)
  chart.setOption(
    {
      series: [{
        type: 'liquidFill',
        // 显示多个波浪, 并且数值必须从大到小排列, 若从小到大排列，最大的波浪会遮挡住其余比它小的波浪
        radius: '80%',
        center: ['50%', '50%'],
        waveAnimation: 50, // 动画时长
        amplitude: 30, // 振幅
        data: [
          0.6,
          {
            value: 0.5,
            direction: 'left', // 让波浪往不同的方向浮动，比如这里设置往左，未设置的波浪会往右
            // 定义第二个波浪的样式
            itemStyle: {
              color: 'red',
              opacity: 0.6
            },
            // 设置hover之后的样式
            emphasis: {
              itemStyle: {
                opacity: 0.9
              }
            }
          }, 0.4, 0.3
        ],
        // shape: 'diamond' // 改变水球图的形状，比如 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 默认为 circle
        color: ['green', 'red', 'blue', 'yellow'], // 修改波浪的颜色，并会自动与 data 中的数据从大到小进行映射，如，green-0.6；red-0.5；blue-0.4
        backgroundStyle: {
          color: 'purple', // 修改背景颜色
          borderWidth: 8, // 修改背景边框宽度
          borderColor: '#cccccc' // 修改背景边框的颜色
        },
        outline: { // 修改外层样式
          show: true,
          borderDistance: 10, // 设置和外层轮廓的间距
          itemStyle: {
            borderWidth: 5, // 设置外层边框宽度
            borderColor: 'red', // 设置外层边框颜色
            shadowBlur: 'none' // 消除外层边框阴影
          }
        }
      }]
    } as EChartOption<any>
  )
})

</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: center;

  .liquidfill-container {
    width: 700px;
    height: 700px;
  }
}
</style>
