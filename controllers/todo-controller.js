// 載入 services 層
const todoServices = require('../services/todo-services')

// 設計 todoController
const todoController = {
  getTodos: (req, res, next) => {
    return todoServices.getTodos(req, (err, data) => err ? next(err) : res.json({ status: 200, data }))
  },
  postTodo: (req, res, next) => {
    return todoServices.postTodo(req, (err, data) => err ? next(err) : res.json({ status: 200, data }))
  },
  patchTodo: (req, res, next) => {
    return todoServices.patchTodo(req, (err, data) => err ? next(err) : res.json({ status: 200, data }))
  },
  deleteTodo: (req, res, next) => {
    return todoServices.deleteTodo(req, (err, data) => err ? next(err) : res.json({ status: 200, data }))
  }
}

module.exports = todoController
