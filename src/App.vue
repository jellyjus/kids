<template>
  <div id="app">
    <el-container>
      <el-main>
        <div class="select">
          <el-radio v-model="type" label="interstitial">Interstitial</el-radio>
          <el-radio v-model="type" label="banner">Banner</el-radio>
        </div>
        <CreativeUpload :type="type" :creativeSet="creativeSet" :creativeId="creativeId"></CreativeUpload>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import CreativeUpload from './components/CreativeUpload'

export default {
  name: 'app',
  data() {
      return {
          type: "interstitial",
          creativeId: '123',
          creativeSet: [
              {dimensions: { width: 320, height: 480 }, assetUrl: "http://mobiliv.ru/_ph/72/2/880935807.jpg"},
              {dimensions: { width: 1600, height: 900 }, assetUrl: "http://www.setwalls.ru/pic/201304/1600x900/setwalls.ru-25400.jpg"},
              {dimensions: { width: 768, height: 1024 }, assetUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Gutenberg_Castle%2C_Balzers%2C_Liechtenstein.jpg/768px-Gutenberg_Castle%2C_Balzers%2C_Liechtenstein.jpg"},
              {dimensions: { width: 1024, height: 768 }, assetUrl: "https://wpapers.ru/wallpapers/nature/Waterfalls/7358/1024x768_%D0%A1%D0%BE%D0%BB%D0%BD%D0%B5%D1%87%D0%BD%D1%8B%D0%B9-%D0%B2%D0%BE%D0%B4%D0%BE%D0%BF%D0%B0%D0%B4.jpg"}
          ]
      }
  },
  components: {
      CreativeUpload
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  body {
    background-color: #f5f5f5;
  }

  .select {
    margin-bottom: 20px;
  }
</style>
