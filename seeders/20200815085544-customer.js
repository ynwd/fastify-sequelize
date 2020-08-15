"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Customers", [
      { customer_number: 1001, name: "Bob Martin" },
      { customer_number: 1002, name: "Linus Torvalds" },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
