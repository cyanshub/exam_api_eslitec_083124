// 載入所需 model
const { Todo } = require('../models')

// 設計 todoServices
const todoServices = {
  getTodos: (req, cb) => {
    return Todo.findAll({
      raw: true
    })
      .then(todos => {
        // todos = null // 錯誤測試: 預期會出現以下訊息:
        if (!todos) {
          const error = new Error('Todos not found!')
          error.status = 404
          throw error
        }

        const data = { todos: todos }
        return cb(null, data)
      })
      .catch(err => cb(err))
  },
  postTodo: (req, cb) => {
    // 接住表單傳過來的資料
    const { name, content, remarks, time, date, location, creator } = req.body

    // 檢查必填資料是否存在或空白
    if (!name || !name.trim()) {
      const error = new Error('The todo name is required!')
      error.status = 422
      throw error
    }

    // 檢查必填資料是否存在或空白
    if (!content || !content.trim()) {
      const error = new Error('The todo content is required!')
      error.status = 422
      throw error
    }

    // 將 time 轉換為數值並檢查是否為有效數字
    const parsedTime = parseFloat(time)
    if (!time || parsedTime <= 0) {
      const error = new Error('The expected time for the todo is required!')
      error.status = 422
      throw error
    }

    // 檢查必填資料是否存在或空白
    if (!date) {
      const error = new Error('The date for the todo is required!')
      error.status = 422
      throw error
    }

    // 檢查必填資料是否存在或空白
    if (!creator || !creator.trim()) {
      const error = new Error('The Todo creator is required!')
      error.status = 422
      throw error
    }

    return Todo.create({
      name,
      content,
      remarks,
      time: parsedTime,
      date,
      location,
      creator
    })
      .then(newTodo => {
        // newTodo = null // 錯誤測試: 預期會出現以下訊息:
        if (!newTodo) {
          const error = new Error('Todo not found!')
          error.status = 404
          throw error
        }

        const data = { todo: newTodo }
        return cb(null, data)
      })
      .catch(err => cb(err))
  },
  patchTodo: (req, cb) => cb(null, { messages: '功能開發中' }),
  deleteTodo: (req, cb) => cb(null, { messages: '功能開發中' })
}

module.exports = todoServices
