'use strict';
module.exports = (sequelize, DataTypes) => {
    var comment = sequelize.define('comment', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        author: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
                notNull: true,
            }
        },
        articleId: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
                notNull: true,
            }
        },
        text: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
            }
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

        comment.belongsTo(blog, {as: 'blog', foreignKey: 'articleId'});
        comment.belongsTo(comment, {as: 'childComment', foreignKey: 'parentId'});
    };
    return comment;
};