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
    status: DataTypes.STRING,
    _v: DataTypes.INTEGER
  }, {
    paranoid: true,
    timestamps: true
  });
  blog.associate = function(models) {
    let { comment } = models;

    blog.hasMany(comment, { as: 'comments', foreignKey: 'articleId' })
  };
  return blog;
};