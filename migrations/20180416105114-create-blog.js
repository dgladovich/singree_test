'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('blogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            _id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            title: {
                type: Sequelize.STRING
            },
            metaTitle: {
                type: Sequelize.STRING
            },
            metaDescription: {
                type: Sequelize.STRING
            },
            metaKeywords: {
                type: Sequelize.STRING
            },
            body: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING,
                defaultValue: `blog`
            },
            authorName: {
                type: Sequelize.STRING,
                defaultValue: 'blog'
            },
            status: {
                type: Sequelize.STRING
            },
            _v: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('blogs');
    }
};