const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const User = require('../modules/users');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.post('/setting', upload.array('avatar', 1), async (req, res) => {
//     // 直接使用 req.files[0].buffer
//     const avatar = req.files[0].buffer;
//     const username = req.body.username;
//     //图片路径
//     const uploadDir = path.join(__dirname, '..', '..', 'web', 'socialize', 'public', 'img');
//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const imagePaths = [];

//     try {

//         const timestamp = Date.now(); // 使用当前时间戳作为唯一标识符
//         const imagePath = path.join('img', `avatar_${timestamp}.jpg`);

//         const absoluteImagePath = path.join(__dirname, '..', '..', 'web', 'socialize', 'public', imagePath);

//         fs.writeFileSync(absoluteImagePath, avatar);
//         //图片上传路径  
//         imagePaths.push('../../public/img/' + `avatar_${timestamp}.jpg`);

//         // 使用Sequelize将数据插入User表
//         const userInstance = await User.create({
//             avatar: JSON.stringify(imagePaths),
//             username: username
//         });
//         res.json({
//             data: userInstance,
//             code: 0,
//             msg: "上传成功"
//         });

//     }
//     catch (error) {
//         console.error('Error uploading data:', error);
//         res.json({
//             code: -1,
//             msg: "上传失败"
//         });
//     }
// });




//处理更新用户信息的请求
router.post('/update', upload.array('avatar', 1), async (req, res) => {
  console.log(req.files);
    const avatarBuffer = req.files[0].buffer;
    const username = req.body.username;
    const user_id = req.body.user_id;
  
    try {
      const userInstance = await User.findByPk(user_id);
  
      if (userInstance) {
        const timestamp = Date.now();
        const imagePath = `avatar_${timestamp}.jpg`;
        const absoluteImagePath = path.join(__dirname, '..', '..', 'web', 'socialize', 'public', 'img', imagePath);
  
        fs.writeFileSync(absoluteImagePath, avatarBuffer);
  
        userInstance.avatar = `../../public/img/${imagePath}`;
        userInstance.username = username;
  
        await userInstance.save();
  
        res.json({
          data: userInstance,
          code: 0,
          msg: "更新成功"
        });
      } else {
        console.error('用户不存在');
        res.json({
          code: -1,
          msg: "用户不存在"
        });
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      res.json({
        code: -1,
        msg: "更新失败"
      });
    }
  });

module.exports = router;