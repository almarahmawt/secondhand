'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Offerings', 'product_name', {
      type: Sequelize.STRING,
      allowNull: true
    }),
    await queryInterface.addColumn('Offerings', 'price', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Offerings', 'product_name');
    await queryInterface.removeColumn('Offerings', 'price');
  }
};
