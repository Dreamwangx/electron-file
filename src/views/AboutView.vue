<template>
  <div>
    <h1>系统文件221213目录</h1>
    <ul>
      <li v-for="(file, index) in files" :key="index">{{ file }}</li>
      <el-button type="primary" @click="getSystemFiles">获取系统文件</el-button>
    </ul>
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </el-card>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: []
    }
  },
  mounted() {
    // 调用Node.js中的方法来获取系统文件目录
    this.getSystemFiles()
    ElMessage.error('This is an error message')
  },
  methods: {
    getSystemFiles() {
      const fs = window.require('fs')
      const directoryPath = '/' // 这里可以更改为你想要获取的目录路径

      // 使用fs模块读取目录内容
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err)
        } else {
          this.files = files
        }
      })
    }
  }
}
</script>
