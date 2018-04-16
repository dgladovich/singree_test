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
        type: Sequelize.STRINGM
      },
      title: {
        type: Sequelize.STRING
      },
      metaTitle: {
        type: Sequelize.STRING
      },
      metaDescription: {
        type: Sequelize.STING
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
        type: Sequelize.SRING
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('blogs');
  }
};