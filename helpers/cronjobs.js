// 載入工具
const cron = require('node-cron')
const nodemailer = require('nodemailer')

// 載入環境變數 (已在 app.js 載入)
// 載入所需 model
const { Todo } = require('../models')

// 設計計算任務數量的 function, 預計回傳一個 0 或正整數的回傳值
const countTasks = async () => {
  try {
    const todos = await Todo.findAll()

    // todos = null // 錯誤測試: 預期會出現以下訊息:
    if (!todos) {
      const error = new Error('Todos not found!')
      error.status = 404
      throw error
    }

    // 計算資料庫的 todos 的數量

    return todos.length
  } catch (error) {
    console.error('[Get Todos failed]:', error)
    return undefined // 若發生錯誤則回傳 undefined
  }
}

const scheduleCronjob = () => {
  // 設定 cronjob: 每天凌晨 0 點（UTC+8）執行
  // 利用 cron 表達式設定任務執行時間, 用 5 個字段指定任務執行時間
  const cronExp = process.env.CRON_EXP

  cron.schedule(cronExp, async () => {
    // 執行計算任務數量的 function
    const tasksCount = await countTasks()

    // 生成報告日期
    const now = new Date()
    now.setHours(now.getHours() + 8) // 獲取 UTC+8 時區的時間

    // 格式化日期為 yyyy/mm/dd
    const reportDate = now.toISOString().slice(0, 10).replace(/-/g, '/')

    // 建立 email 基本資訊
    const emailFrom = process.env.GMAIL_USER
    const emailTo = process.env.GMAIL_TO
    const emailSubject = 'Task Count Report'
    const emailText = `Date: ${reportDate}\nTasks: ${tasksCount}\n\nNote: Examples are not included.`

    // 設定 email option
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: emailSubject,
      text: emailText
    }

    // 建立一個 email 傳送器
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    })

    // 將 email 發送出去
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err)
      } else {
        console.log('Email sent:', info.response)
      }
    })
  }, {
    timezone: 'Asia/Taipei' // 設定時區為台北 (UTC+8)
  })
}

// 輸出程式
module.exports = scheduleCronjob
