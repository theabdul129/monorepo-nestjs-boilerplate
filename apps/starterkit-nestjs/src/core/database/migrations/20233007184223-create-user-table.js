'use strict';
require('ts-node/register');
require('tsconfig-paths/register');
const { TABLE } = require('@packages/database');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE.USER, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING(127),
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING(127),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(127),
        allowNull: false,
      },
      contact_no: {
        type: Sequelize.STRING(17),
        allowNull: true,
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      created_by: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      updated_on: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_by: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      deleted_on: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TABLE.USER);
  },
};
