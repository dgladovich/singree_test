'use strict';
module.exports = (sequelize, DataTypes) => {
    const blog = sequelize.define('blog', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
        },
        metaTitle: {
            type: DataTypes.STRING,
        },
        metaDescription: {
            type: DataTypes.STRING,
        },
        metaKeywords: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.STRING,

        },
        author: DataTypes.STRING,
        authorName: DataTypes.STRING,
        status: {
            type: DataTypes.STRING,
        },
        _v: DataTypes.INTEGER
    }, {
        paranoid: true,
        timestamps: true,
        defaultScope: {
            attributes: {exclude: ['label', 'updatedAt', 'deletedAt']}
        },
        hooks: {
            beforeDestroy: (b, opts) => {
                blog.update({ status: 'deleted' }, { where: {_id: opts.where._id }, paranoid: false })
            }
        },
        getterMethods: {
            label() {
                const title = this.getDataValue('title');
                const id = this.getDataValue('id');
                return `${title}-${id}`;
            },
            created() {
                return this.getDataValue('createdAt');
            }
        },
    });
    blog.associate = function (models) {
        let {comment} = models;

        blog.hasMany(comment, {as: 'comments', foreignKey: 'articleId', sourceKey: '_id', onDelete: 'cascade'})
    };
    return blog;
};