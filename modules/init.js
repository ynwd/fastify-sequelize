const { Account, Customer } = require("../models");

const init = async function () {
  await Customer.sync({ force: true });
  await Account.sync({ force: true });
  await Customer.bulkCreate([
    { customer_number: 1001, name: "Bob Martin" },
    { customer_number: 1002, name: "Linus Torvalds" },
  ], { validate: true });
  await Account.bulkCreate([
    { account_number: 555001, customer_number: 1001, balance: 10000 },
    { account_number: 555002, customer_number: 1002, balance: 15000 },
  ], { validate: true });
};

module.exports = init;
