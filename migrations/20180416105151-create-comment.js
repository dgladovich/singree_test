'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            _id: {
                type: Sequelize.UUID
            },
            author: {
                type: Sequelize.STRING
            },
            articleId: {
                type: Sequelize.UUID
            },
            text: {
                type: Sequelize.STRING
            },
            parentId: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            __v: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('comments');
    }
};