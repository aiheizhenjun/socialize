const { sequelize, DataTypes, Op } = require("../config/database");

//生成模型
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  account: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    defaultValue: 'DefaultUser', // 设置默认用户名
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: 'path/to/default/avatar.jpg', // 设置默认头像路径
  },
}, {
  tableName: 'users',
  engine: 'InnoDB',
  autoIncrement: 13,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
  timestamps: false, // 如果不需要自动生成 createdAt 和 updatedAt 字段，可以设置为 false
  underscored: true, // 使用下划线命名规则，例如 user_id 而不是 userId
});

module.exports = User;