'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const UsersTable = await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    return UsersTable;
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
