const express = require('express');
const router = express.Router();
const Comment = require('../modules/comments');
const Recommend = require('../modules/recommend');
const User = require('../modules/users');

// 获取所有评论
router.get('/list', async (req, res) => {
    try {
      const recommendations = await Comment.findAll({
        include: [{
          model: User,
          attributes: ['user_id', 'avatar', 'username'],
          as: 'user',
        }],
      });
  
      const formattedData = recommendations.map(item => {
        return {
          comment_id: item.comment_id,
          post_id: item.post_id,
          user_id: item.user_id,
          content: item.content,
          created_at: item.created_at,
          user: {
            user_id: item.user ? item.user.user_id : null,
            avatar: item.user ? item.user.avatar : null,
            username: item.user ? item.user.username : null,
          },
        };
      });
  
      res.json({
        code: 0,
        msg: '请求成功',
        data: formattedData,
      });
    } catch (error) {
      console.error('查询出错:', error);
      res.json({
        code: -1,
        msg: '查询出错',
        error: error.message,
      });
    }
  });
  
// 创建新评论
router.post('/add', async (req, res) => {
  const { content, userId } = req.body;

  try {
    const newComment = await Comment.create({ content, userId });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;