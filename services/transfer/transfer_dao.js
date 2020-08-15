"use strict";

const { Account } = require("../../models");

async function updateBalance(account_number, balance) {
  await Account.update({ balance }, { where: { account_number } });
}

module.exports = async function (transferData) {
  const { from_account_number, to_account_number, amount } = transferData;
  const targetAccount = await Account.findOne(
    { where: { account_number: to_account_number }, raw: true },
  );
  const fromAccount = await Account.findOne(
    { where: { account_number: from_account_number }, raw: true },
  );

  if (!fromAccount || !targetAccount) {
    return {
      error: true,
      code: 404,
      message: `account not found`,
    };
  }

  if (fromAccount.balance <= amount) {
    return {
      error: true,
      code: 505,
      message: "insufficient balance",
    };
  }

  targetAccount.balance = targetAccount.balance + amount;
  fromAccount.balance = fromAccount.balance - amount;

  await updateBalance(targetAccount.account_number, targetAccount.balance);
  await updateBalance(fromAccount.account_number, fromAccount.balance);

  return {
    code: 200,
    message: "done",
  };
};
