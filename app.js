const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入method-override

// 僅在非正式環境時(非Production正式機)，使用dotenv
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const Todo = require('./models/todo') //載入 Todo model

const routes = require('./routes')
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

app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過methodOverride進行前置處理
app.use(routes) // 將request導入路由器


app.listen(3000, () =>{
    console.log('App is running on port 3000.')
})