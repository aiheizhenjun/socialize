const express = require('express');
const router = express.Router();
const path = require('path');
const Recommend = require('../modules/recommend');
const multer = require('multer');
const User = require('../modules/users');
const fs = require('fs');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.array('images', 9), async (req, res) => {
    const images = req.files.map(file => file.buffer);
    const content = req.body.content;
    const user_id = req.body.user_id; 

    // 根据 user_id 获取用户信息
    const user = await User.findByPk(user_id);

    // 检查用户是否存在
    if (!user) {
        return res.json({
            code: -1,
            msg: '未找到用户',
        });
    }

    // 获取用户的头像和用户名
    const avatar = user.avatar;
    const username = user.username;

    // 图片上传目录
    const uploadDir = path.join(__dirname, '..', '..', 'web', 'socialize', 'public', 'img');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const imagePaths = [];

    try {
        // 处理每个图片
        for (let index = 0; index < images.length; index++) {
            const timestamp = Date.now();
            const imagePath = path.join('img', `image_${timestamp}_${index + 1}.jpg`);
            const absoluteImagePath = path.join(__dirname, '..', '..', 'web', 'socialize', 'public', imagePath);

            fs.writeFileSync(absoluteImagePath, images[index]);
            imagePaths.push('../public/img/' + `image_${timestamp}_${index + 1}.jpg`);
        }

        // 将数据插入 Recommend 表
        const recommendInstance = await Recommend.create({
            images: JSON.stringify(imagePaths),
            content: content,
            user_id: user_id,
            upTime: new Date().toISOString().split('T')[0],
        });

        res.json({
            data: {
                recommendInstance,
                user: {
                    avatar: avatar,
                    username: username,
                },
            },
            code: 0,
            msg: '上传成功',
        });
    } catch (error) {
        console.error('上传数据时发生错误:', error);
        res.json({
            code: -1,
            msg: '上传失败',
        });
    }
});

module.exports = router;