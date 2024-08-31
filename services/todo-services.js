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
  postTodo: (req, cb) => cb(null, { messages: '功能開發中' }),
  patchTodo: (req, cb) => cb(null, { messages: '功能開發中' }),
  deleteTodo: (req, cb) => cb(null, { messages: '功能開發中' })
}

module.exports = todoServices
