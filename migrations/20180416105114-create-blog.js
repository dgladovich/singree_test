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
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
      },
      authorName: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      _v: {
        type: Sequelize.INTEGER
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
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('blogs');
  }
};