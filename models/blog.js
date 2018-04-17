'use strict';
module.exports = (sequelize, DataTypes) => {
    var blog = sequelize.define('blog', {
        _id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
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
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ['id', 'label', 'createdAt', 'updatedAt', 'deletedAt'] }
        },
        getterMethods: {
            label() {
                const title = this.getDataValue('title');
                const id = this.getDataValue('id');
                return `${title}-${id}`;
            },
            created(){
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