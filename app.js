// 載入環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入需要使用的工具
const express = require('express')
const methodOverride = require('method-override')
const { apis } = require('./routes')

// 設定應用程式
const app = express()
const port = process.env.PORT || 3000

// 設計 middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

// 設計路由
app.use('/api', apis)
app.use('/', (req, res) => res.redirect('/api/todos')) // 設計重導向路由處理路徑未匹配的狀況

// 啟動並監聽網站
app.listen(port, () => {
  console.info(`Todo-list application is listening on: http://localhost:${port} `
  )
})
