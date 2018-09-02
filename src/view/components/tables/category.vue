<template>
  <div id="app">
    <!-- directive -->
    <!-- <div class="images" v-viewer>
      <img src="../../../assets/images/1.jpg">
    </div> -->
    <!-- component -->
    <!-- <viewer :images="images">
      <img v-for="src in images" :src="src" :key="src" style="width:300px;height:300px;margin:0 10px">
    </viewer> -->
    <div class="container">
      <div class="images" :class="'img'+item.id" v-viewer="{movable: false}" v-for="(item,index) in category" :key="index" :style="backgroundImgStyle(item.photos[0])">
        <div class="bg-cover" @click="show(item.id)"></div>
        <div class="category">
          <div v-if="!item.modify">
            <p class="name">{{item.name}}</p>
            <p class="modify" @click="item.modify=true">修改类别名</p>
          </div>
          <div v-else>
            <input type="text" v-model="item.name">
            <p class="confirm" @click="updateName(index)">确认修改</p>
          </div>
        </div>
        <img v-for="(src,index) in item.photos" :src="src" :key="index" style="display:none">
      </div>
      <div class="create_category">
        <img src="../../../assets/images/add2.png" alt="" v-if="!addNew" @click="addNew=true">
        <div v-else>
          <input type="text" placeholder="要创建的类别名" v-model="newCategory">
          <p @click="addNewCategory">立即创建</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import { getCategory, updateCategoryName, addNewCategory } from '@/api/data'
import Vue from 'vue'
Vue.use(Viewer)

export default {
  name: 'category',
  data() {
    return {
      category: [],
      newName: '',
      addNew: false,
      newCategory: ''
    }
  },
  methods: {
    show(id) {
      const viewer = this.$el.querySelector(`.img${id}`).$viewer
      viewer.show()
    },
    backgroundImgStyle(image) {
      return {
        'background-image': `url(${image})`
      };
    },
    getCategory() {
      getCategory().then((result) => {
        this.category = result;
      }).catch((error) => {
        console.log(error);
      });
    },
    updateName(index) {
      if (index) {
        updateCategoryName({ newName: this.category[index].name, id: this.category[index].id })
          .then(result => {
            if (result) {
              this.category[index].modify = false;
            } else {
              console.log("类别名更新失败！");
            }
          })
      }
    },
    addNewCategory() {
      if (!this.newCategory) {
        console.log("新类名不能为空！");
      } else {
        addNewCategory({ newCategory: this.newCategory }).then(result => {
          if (result) {
            this.addNew = false;
            this.getCategory();
          }
          else {
            console.log("添加新类别失败！");
          }
        })
      }
    }
  },
  mounted() {
    this.getCategory();
  }
}
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
}
.container {
  display: flex;
  flex-wrap: wrap;
  width: 85%;

  .create_category {
    width: 300px;
    height: 300px;
    margin: 10px 20px;
    border: 2px solid #bfbfbf;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      &:hover {
        cursor: pointer;
      }
    }
    input {
      border: 1px solid #444;
      color: #444;
      padding-left: 5px;
      background-color: transparent;
      font-size: 14px;
      height: 35px;
      width: 130px;
    }
    p {
      text-align: center;
      border: 1px solid #444;
      border-radius: 5px;
      font-size: 14px;
      padding: 5px;
      margin-top: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .images {
    width: 300px;
    height: 300px;
    margin: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
  }
  .bg-cover {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .category {
    // border: 1px solid black;
    z-index: 101;
    text-align: center;
    color: #fff;
    .name {
      font-size: 18px;
      &:hover {
        cursor: pointer;
      }
    }
    .modify,
    .confirm {
      border: 1px solid #fff;
      border-radius: 5px;
      font-size: 14px;
      padding: 5px;
      margin-top: 10px;
      &:hover {
        cursor: pointer;
      }
    }
    input {
      border: 1px solid #fff;
      color: #fff;
      padding-left: 5px;
      background-color: transparent;
      font-size: 14px;
      height: 35px;
      width: 130px;
    }
  }
}
</style>
