'use strict';
module.exports = (sequelize, DataTypes) => {
    let comment = sequelize.define('comment', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        author: {
            type: DataTypes.STRING,
        },
        articleId: {
            type: DataTypes.UUID,
        },
        text: {
            type: DataTypes.STRING,
        },
        parentId: DataTypes.STRING,
        status: DataTypes.STRING,
        __v: DataTypes.STRING,
    }, {
        paranoid: true,
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt'] }
        },
        hooks: {
            beforeDestroy: (b, opts)=>{
                comment.update({ status: 'deleted' }, { where: {_id: opts.where._id}, paranoid: false })
            }
        },
    });
    comment.associate = function (models) {
        let {blog} = models;

        comment.belongsTo(blog, {as: 'blog', foreignKey: 'articleId', onDelete: 'cascade'});
        comment.belongsTo(comment, {as: 'childComment', foreignKey: 'parentId'});
    };
    return comment;
};