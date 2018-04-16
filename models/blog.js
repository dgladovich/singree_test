'use strict';
module.exports = (sequelize, DataTypes) => {
  var blog = sequelize.define('blog', {
    _id: DataTypes.STRING,
    label: DataTypes.STRINGM,
    title: DataTypes.STRING,
    metaTitle: DataTypes.STRING,
    metaDescription: DataTypes.STING,
    metaKeywords: DataTypes.STRING,
    body: DataTypes.STRING,
    author: DataTypes.STRING,
    authorName: DataTypes.STRING,
    created: DataTypes.DATE,
    status: DataTypes.SRING,
    _v: DataTypes.INTEGER
  }, {});
  blog.associate = function(models) {
    // associations can be defined here
  };
  return blog;
};