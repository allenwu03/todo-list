// 引用Express 與 Express路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組
const home = require('./modules/home')
// 引入todos模組程式碼
const todos = require('./modules/todos')

router.use('/',home)
// 將網址結構符合 /todos 字串開頭的request導向todos模組
router.use('/todos',todos)
// 匯出路由器
module.exports = router