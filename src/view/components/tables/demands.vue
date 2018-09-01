<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableDemand } from '@/api/data'
export default {
  name: 'tables_demand',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        // {title: '姓名', key: 'realName', sortable: true},
        // {title: '昵称', key: 'userName', editable: true},
        {title: '需求名', key: 'demandName'},
        {title: '周转时间/天', key: 'workTime'},
        {title: '奖励报酬/￥', key: 'payment'},
        {title: '发布时间', key: 'releaseTime'},
        {title: '需求状态', key: 'status'},
        {title: '拍摄地点', key: 'place'},
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }
              // , [
              //   h('Button', '自定义删除')
              // ]
              )
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getTableDemand().then(res => {
      console.log(res)
      let demandData = []
      if (res) {
        for (let i = 0; i < res.length; i++) {
          demandData.push({
          demandName: res[i].title,
          workTime: res[i].workTime,
          payment: res[i].payment,
          releaseTime: res[i].releaseTime,
          status: res[i].status,
          place: res[i].place,
          })
        }
        this.tableData = demandData
      }
    })
  }
}
</script>

<style>
</style>
