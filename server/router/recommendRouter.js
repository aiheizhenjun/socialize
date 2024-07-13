const express = require('express');
const router = express.Router();
const Recommend = require('../modules/recommend');
const User = require('../modules/users');

router.get('/list', async (req, res) => {
  try {
   

    const recommendations = await Recommend.findAll({

      include: [{
        model: User,
        attributes: ['user_id', 'avatar', 'username'],
        as: 'user',
      }],
    });

    const formattedData = recommendations.map(item => {
      return {
        post_id: item.post_id,
        user_id: item.user_id,
        content: item.content,
        upTime: item.upTime,
        commentNum: item.commentNum,
        voteNum: item.voteNum,
        images: JSON.parse(item.images),
       
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
    });
  }
});


router.post('/upvote', async (req, res) => {
  const postID = req.body.post_id;
  console.log('Backend postID:', postID);
  if (postID) {

    try {
      // 在数据库中更新帖子的点赞数

      const updatedVoteCount = await updateVoteCount(postID);

      // 用更新后的点赞数回应
      res.json({ voteCount: updatedVoteCount });
    } catch (error) {
      console.error('更新点赞数时发生错误:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  else {
    console.log(123);
  }
});

// 更新帖子点赞数的函数
async function updateVoteCount(postID) {
  // 在这里实现根据数据库结构更新点赞数的逻辑

  const post = await Recommend.findByPk(postID);

  if (post) {
    // 更新点赞数
    post.voteNum += 1;
    await post.save();

    // 返回更新后的点赞数
    return post.voteNum;
  } else {
    // 如果找不到帖子，返回 0
    return 0;
  }
}



router.post('/downvote', async (req, res) => {
  const postID = req.body.post_id;

  if (postID) {
    try {
      // 在数据库中更新帖子的点赞数
      const updatedVoteCount = await downvotePost(postID);

      // 用更新后的点赞数回应
      res.json({ voteCount: updatedVoteCount });
    } catch (error) {
      console.error('取消点赞时发生错误:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// 更新取消点赞数的函数
async function downvotePost(postID) {
  // 在这里实现根据数据库结构更新取消点赞数的逻辑

  const post = await Recommend.findByPk(postID);

  if (post) {
    // 更新取消点赞数
    post.voteNum -= 1;
    await post.save();

    // 返回更新后的点赞数
    return post.voteNum;
  } else {
    // 如果找不到帖子，返回 0
    return 0;
  }
}

module.exports = router;