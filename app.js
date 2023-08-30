const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars')

// 僅在非正式環境時(非Production正式機)，使用dotenv
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

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
    res.render('index')
})

app.listen(3000, () =>{
    console.log('App is running on port 3000.')
})