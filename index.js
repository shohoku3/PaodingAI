const express=require('express')
const path=require('path')
const config = require('./config/default')
const app=express()

//设置模板
app.set('views',path.join(__dirname,'views'))
//设置模板引擎
app.set('view engine','ejs')
//
app.use(express.static(path.join(__dirname, 'public')))
//路由
app.get('/', function (req, res) {
  res.render('index')
})

app.listen(config.port, function () {
  console.log(`listening on port ${config.port}`)
})