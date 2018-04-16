'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    _id: DataTypes.STRING,
    author: DataTypes.STRING,
    articleId: DataTypes.STRING,
    text: DataTypes.STRING,
    parentId: DataTypes.STRING,
    created: DataTypes.DATE,
    status: DataTypes.STRING,
    __v: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true,
    timestamps: true
  });
  comment.associate = function(models) {
    let { blog } = models;

    comment.belongsTo(blog, { as: 'blog', foreignKey: 'articleId' });
    comment.belongsTo(comment, { as: 'childComment', foreignKey: 'parentId' });
  };
  return comment;
};