// 引入sequelize库
// Sequelize：类，DataTypes：数据类型，Op：运算符合辑
const { Sequelize, DataTypes, Op } = require("sequelize") // 引入sequelize依赖

// 创建Sequelize实例
// new Sequelize(要连接的数据库，数据库账号，数据库密码，配置项)
const sequelize = new Sequelize('szc', 'root', '031123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: (sql) => {
        console.log(sql); // 将 SQL 查询日志打印到控制台
    },
    timezone: '+08:00', // 设置为中国的时区（北京时间，UTC+8）
});

// 数据库提示信息
sequelize.authenticate()
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch((err) => {
        console.log('数据库连接失败', err);
    });

// 导出实例
module.exports = { sequelize, DataTypes, Op };