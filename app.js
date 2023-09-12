const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // 載入method-override
const routes = require('./routes')

// 僅在非正式環境時(非Production正式機)，使用dotenv
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

require('./config/mongoose')

const app = express()

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過methodOverride進行前置處理

app.use(routes) // 將request導入路由器

app.listen(3000, () =>{
    console.log('App is running on port 3000.')
})