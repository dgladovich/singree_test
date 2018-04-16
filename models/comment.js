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
    __v: DataTypes.STRING
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
  };
  return comment;
};