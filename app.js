const express = require('express')
const mongoose = require('mongoose') //載入mongoose

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

app.get('/',(req,res) =>{
    res.send('hello world!')
})

app.listen(3000, () =>{
    console.log('App is running on port 3000.')
})