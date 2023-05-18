'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const TeamsTable = await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    return TeamsTable;
  },

  async down (queryInterface) {
    await queryInterface.dropTable('teams');
  }
};
