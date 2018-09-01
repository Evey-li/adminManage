<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import {
  getTablePhoto
} from '@/api/data'
export default {
  name: 'tables_photo',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        // {title: '姓名', key: 'realName', sortable: true},
        {
          title: '图片',
          key: 'photo',
          render: (h, params) => {
            return h('div', {
              style: {
                // 'position': 'relative',
                'overflow': 'visible'
              }
            }, [
              h('div', {
                style: {
                  height: '100px',
                  'background-image': `url(${params.row.photo})`,
                  'background-size': 'cover',
                  'background-repeat': 'no-repeat',
                  'margin': '5px'
                },
                on: {
                  mouseOver: this.viewPhoto
                }
              })
              // h('div', {
              //   class: {
              //     foo: true,
              //   },
              //   style: {
              //     'height': "100px",
              //     'width': "100px",
              //     "background-color": '#444',
              // "position": 'absolute',
              // 'top': '100px',
              // 'left': '200px',
              // 'z-index': '1000'
              // 'display': 'none'
              //   }
              // })
            ])
          }
        },
        {
          title: '创作人',
          key: 'creatorName'
        },
        {
          title: '作品分类',
          key: 'category'
        },
        {
          title: '上传日期',
          key: 'uploadTime'
        },
        {
          title: '点赞数',
          key: 'photoLikes'
        },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete', 'add'],
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
    viewPhoto () {

    },
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
    getTablePhoto().then(res => {
      let photos = []
      if (res) {
        for (let i = 0; i < res.length; i++) {
          const isHttp = res[i].imgUrl && res[i].imgUrl.indexOf('http') !== -1
          let image = res[i].imgUrl
          if (!isHttp) {
            image = `http://127.0.0.1:7001${image}`
          }
          photos.push({
            photo: image,
            creatorName: res[i].user.userName,
            category: res[i].category.name,
            uploadTime: res[i].uploadTime,
            photoLikes: res[i].likes
          })
        }
        this.tableData = photos
      }
    })
  }
}
</script>

<style>
.a {
  background-size: cover;
}
</style>
