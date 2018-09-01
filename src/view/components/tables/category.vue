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
          <div v-if="true">
            <p class="name">{{item.name}}</p>
            <p class="modify">点击修改类名</p>
          </div>
          <div v-else>
            <input type="text" placeholder="填写新的类别名">
            <p class="confirm">确认修改</p>
          </div>
        </div>
        <img v-for="(src,index) in item.photos" :src="src" :key="index" style="display:none">
      </div>
    </div>

  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import { getCategory } from '@/api/data'
import Vue from 'vue'
Vue.use(Viewer)

export default {
  name: 'category',
  data() {
    return {
      category: []
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
  },
  mounted() {
    getCategory().then((result) => {
      this.category = result;
    }).catch((error) => {
      console.log(error);
    });
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
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }
  .modify {
    border: 1px solid #fff;
    border-radius: 5px;
    font-size: 13px;
    padding: 2px;
    margin-top: 5px;
  }
  input {
    // text-align: center;
    border: 1px solid black;
    padding-left: 5px;
    background-color: transparent;
    font-size: 12px;
    height: 30px;
    width: 120px;
  }
  .confirm {
    text-align: center;
    border: 1px solid #444;
    width: 80px;
    border-radius: 5px;
    font-size: 13px;
    padding: 2px;
    margin: 8px 20px;
  }
}
</style>
