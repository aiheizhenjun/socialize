const { sequelize, DataTypes, Op } = require("../config/database");
const User = require('./users');

const Recommend = sequelize.define('Recommend', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci',
  },
  upTime: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  commentNum: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  voteNum: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  images: {
    type: DataTypes.STRING,
  },

}, {
  tableName: 'recommend',
  timestamps: false,
  underscored: false, // 禁用驼峰式到蛇形式的自动映射
});

Recommend.belongsTo(User, {
  foreignKey: 'user_id', // 与 User 表关联的外键字段
  as: 'user', // 别名，你在查询中使用的别名
});

module.exports = Recommend;