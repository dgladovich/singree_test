'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        age: DataTypes.INTEGER,
        password: DataTypes.STRING
    }, {});
    user.associate = function (models) {
        // associations can be defined here
    };
    return user;
};