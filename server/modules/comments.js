const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./users');
const Recommend = require('./recommend');

const Comment = sequelize.define('comment', {
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
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
    post_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
            model: Recommend,
            key: 'post_id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'comments',
    timestamps: false, // createdAt 和 updatedAt 字段
    underscored: false, // 禁用驼峰式到蛇形式的自动映射
});

// 设置外键关联
Comment.belongsTo(User, { foreignKey: 'user_id',as: 'user' });
Comment.belongsTo(Recommend, { foreignKey: 'post_id',as: 'recommend' });

module.exports = Comment;