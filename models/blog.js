'use strict';
module.exports = (sequelize, DataTypes) => {
  var blog = sequelize.define('blog', {
    _id: DataTypes.STRING,
    label: DataTypes.STRING,
    title: DataTypes.STRING,
    metaTitle: DataTypes.STRING,
    metaDescription: DataTypes.STRING,
    metaKeywords: DataTypes.STRING,
    body: DataTypes.STRING,
    author: DataTypes.STRING,
    authorName: DataTypes.STRING,
    created: DataTypes.DATE,
    status: DataTypes.STRING,
    _v: DataTypes.INTEGER
  }, {});
  blog.associate = function(models) {
    // associations can be defined here
  };
  return blog;
};