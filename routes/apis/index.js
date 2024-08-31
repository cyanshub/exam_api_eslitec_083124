const express = require('express')
const router = express.Router()

// 載入 controller
const todoController = require('../../controllers/todo-controller')

// 載入 middleware
const { apiErrorHandler } = require('../../middlewares/error-handler')

// 設計路由: 主要功能
router.get('/todos', todoController.getTodos)
router.post('/todos', todoController.postTodo)
router.patch('/todos/:id', todoController.patchTodo)
router.delete('/todos/:id', todoController.deleteTodo)

// 設計路由: 錯誤處理
router.use('/', apiErrorHandler)

module.exports = router
