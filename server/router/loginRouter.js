const express = require('express');
const router = express.Router();
const User = require('../modules/users')
const bcrypt = require('bcryptjs')

//Register
router.post('/register', async (req, res) => {
  const { user_id, account, password, email ,username, avatar } = req.body;

  try {
    // Check if the account already exists
    const existingUser = await User.findOne({
      where: {
        account,
      },
    });

    if (existingUser) {
      console.error('用户名已存在');
      res.json({
        code: -1,
        msg: '用户名已存在',
      });
    } else {
      //Hash密码
      const hashedPassword = await bcrypt.hash(password, 10);
      const defaultAvatar = '../../public/img/头像1.jpg';  // 默认头像的路径
      const defaultUsername = 'DefaultUser';  // 默认用户名
      // 创建一个新用户
      const newUser = await User.create({
        user_id,
        account,
        password: hashedPassword,
        email,
        username: defaultUsername,
        avatar: defaultAvatar,
      });

      console.log('User registered:', newUser);
      res.json({
        code: 0,
        msg: '注册成功',
      });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.json({
      code: -1,
      msg: '注册失败',
    });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { account, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        account,
      },
    });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        console.log('登录成功');
        res.json({
          code: 0,
          msg: '登录成功',
          userData: {
            user_id: user.user_id,
            account: user.account,
            username: user.username,
            avatar: user.avatar,
          },
        });
      } else {
        console.error('密码错误');
        res.json({
          code: -1,
          msg: '密码错误',
        });
      }
    } else {
      console.error('账号不存在');
      res.json({
        code: -1,
        msg: '账号不存在',
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.json({
      code: -1,
      msg: '登录失败',
    });
  }
});

module.exports = router;