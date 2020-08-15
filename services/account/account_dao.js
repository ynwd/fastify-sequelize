"use strict";

const { Account, Customer } = require("../../models");

module.exports = async function (account_number) {
  const account = await Account.findOne(
    { where: { account_number }, raw: true },
  );

  if (!account) return undefined;

  const { customer_number, balance } = account;
  const customer = await Customer.findOne(
    { where: { customer_number }, raw: true },
  );

  const { name: customer_name } = customer;
  const data = { account_number, customer_name, balance };

  return data;
};
