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
import { getTableUser } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        // {title: '姓名', key: 'realName', sortable: true},
        // {title: '昵称', key: 'userName', editable: true},
        { title: '姓名', key: 'realName' },
        { title: '昵称', key: 'userName' },
        { title: '国家', key: 'country' },
        { title: '城市', key: 'city' },
        { title: '类型', key: 'userType' },
        { title: '关注', key: 'follows' },
        { title: '关注者', key: 'followers' },

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
    getTableUser().then(res => {
      // console.log(res)
      let userData = []
      if (res) {
        for (let i = 0; i < res.length; i++) {
          let type = ''
          if (res[i].userType === 0) {
            type = '创作人'
          } else {
            type = '需求人'
          }
          userData.push({
            realName: res[i].realName,
            userName: res[i].userName,
            country: res[i].country,
            city: res[i].city,
            follows: res[i].follows,
            followers: res[i].followers,
            userType: type
          })
        }
        this.tableData = userData
      }
    })
  }
}
</script>

<style>
</style>
