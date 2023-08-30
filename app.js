const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars')

// 僅在非正式環境時(非Production正式機)，使用dotenv
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const Todo = require('./models/todo') //載入 Todo model

const app = express()
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology:true}) //設定連線到mongoDB

const db = mongoose.connection

db.on('error',() =>{
    console.log('mongodb error')
})

db.once('open',() =>{
    console.log('mongodb connected!')
})

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')

//設定路由
//Todo首頁
app.get('/',(req,res) =>{
    Todo.find() // 取出Todo model裡的所有資料
        .lean() // 把Mongoose的Model物件轉換成乾淨的JavaScript資料陣列
        .then(todos => res.render('index',{todos}))// 將資料傳給index樣板
        .catch(error => console.error(error))// 錯誤處理
})

app.listen(3000, () =>{
    console.log('App is running on port 3000.')
})