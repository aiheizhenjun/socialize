const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const app = express();


//跨域请求
app.use(cors());
//处理post请求数据
app.use(bodyParser.urlencoded({ extended: false }));


// 引入自定义的路由文件
const loginRouter = require('./router/loginRouter');
const recommendRouter = require('./router/recommendRouter')
const uploadRouter = require('./router/uploadRouter');
const settingRouter = require('./router/settingRouter')
const commentsRouter = require('./router/commentRouter')

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });
// 应用路由
app.use('/login', loginRouter);//登录
app.use('/recommend', recommendRouter);//推荐
app.use('/upload', uploadRouter);//上传文件
app.use('/set',settingRouter);//设置头像和用户名
app.use('/comments', commentsRouter);//评论

const port = 5500; // 指定服务器监听的端口号
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});