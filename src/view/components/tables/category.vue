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
    <div class="images" v-viewer="{movable: false}">
      <div class="category">
        <div v-if="true">
          <p @click="show" class="name">星野</p>
          <p class="modify">点击修改类名</p>
        </div>
        <div v-else>
          <input type="text" placeholder="填写新的类别名">
          <p class="confirm">确认修改</p>
        </div>
      </div>
      <img v-for="src in images" :src="src" :key="src" style="display:none">
    </div>
    <!-- <button type="button" @click="show">Show</button> -->
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

export default {
  name: 'category',
  data() {
    return {
      images: ['/img/1.f1d485e4.jpg', '/img/2.dc975729.jpg'],
      res: {
        name: '分类',
        imgs: [
          '/img/1.f1d485e4.jpg', '/img/2.dc975729.jpg'
        ]
      }
    }
  },
  methods: {
    show() {
      const viewer = this.$el.querySelector('.images').$viewer
      viewer.show()
    }
  }
}
</script>
<style lang="scss" scoped>
.images {
  width: 200px;
  height: 200px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('');
}
.category {
  // border: 1px solid black;
  text-align: center;
  .name {
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }
  .modify {
    border: 1px solid #444;
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
