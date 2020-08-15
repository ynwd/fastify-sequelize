"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Accounts", [
      { account_number: 555001, customer_number: 1001, balance: 10000 },
      { account_number: 555002, customer_number: 1002, balance: 15000 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Accounts", null, {});
  },
};
