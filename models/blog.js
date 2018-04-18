'use strict';



module.exports = (sequelize, DataTypes) => {
    var blog = sequelize.define('blog', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
            }
        },
        metaTitle: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
            }
        },
        metaDescription: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
            }
        },
        metaKeywords: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
            }
        },
        body: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
            }
        },
        author: DataTypes.STRING,
        authorName: DataTypes.STRING,
        status: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
            }
        },
        _v: DataTypes.INTEGER
    }, {
        paranoid: true,
        timestamps: true,
        defaultScope: {
            attributes: {exclude: ['id', 'label', 'createdAt', 'updatedAt', 'deletedAt']}
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

        blog.hasMany(comment, {as: 'comments', foreignKey: 'articleId'})
    };
    return blog;
};