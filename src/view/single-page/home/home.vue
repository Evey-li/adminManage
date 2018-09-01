<template>
  <div>
    <Row :gutter="20" style="margin-top: 20px;">
      <i-col span="8" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style" />
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 40px;">
      <i-col span="8">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="作品上传热门类Top5"></chart-pie>
        </Card>
      </i-col>
      <i-col span="16">
        <Card shadow>
          <chart-bar style="height: 300px;" v-if="!!barData" :value="barData" text="需求量统计" />
        </Card>
      </i-col>
    </Row>
    <!-- <Row style="margin-top: 20px;">
      <Card shadow>
        <example style="height: 310px;" />
      </Card>
    </Row> -->
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import { groupByCategory, getInforCardData, getDemandBySeason } from '@/api/data'

export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        // { title: '用户总数', icon: '_users', count: 803, color: '#2d8cf0' },
        // { title: '需求总数', icon: '_xiangmuxuqiu', count: 23432, color: '#19be6b' },
        // { title: '作品总数', icon: '_photos', count: 142, color: '#ff9900' },
        // { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        // { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        // { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        // { value: 335, name: '直接访问' },
        // { value: 310, name: '邮件营销' },
        // { value: 234, name: '联盟广告' },
        // { value: 135, name: '视频广告' },
        // { value: 1548, name: '搜索引擎' }
      ],
      barData: null
    }
  },
  // watch: {
  //   pieData(newValue) {
  //     console.log(newValue);
  //   }
  // },
  mounted () {
    groupByCategory().then(res => {
      this.pieData = res
    })
    getInforCardData().then(res => {
      let userInfo = { title: '用户总数', icon: '_users', count: res.userNum, color: '#2d8cf0' }
      this.inforCardData.push(userInfo)
      let demandInfo = { title: '需求总数', icon: '_xiangmuxuqiu', count: res.demandNum, color: '#19be6b' }
      this.inforCardData.push(demandInfo)
      let photoInfo = { title: '作品总数', icon: '_photos', count: res.photoNum, color: '#ff9900' }
      this.inforCardData.push(photoInfo)
    })
    getDemandBySeason().then(res => {
      this.barData = {
        '第一季度': res.firstSeason,
        '第二季度': res.secondSeason,
        '第三季度': res.thirdSeason,
        '第四季度': res.fourthSeason
      }
    })
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
