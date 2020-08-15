const { sequelize } = require("../../../models");
const transfer = require("../transfer_dao");

beforeAll(async () => {
  await require("../../../modules/init")();
});

afterAll(async () => {
  await sequelize.close();
});

describe("TRANSFER", () => {
  test("account not found", async (done) => {
    const data = {
      from_account_number: 1234,
      to_account_number: 8765,
      amount: 100,
    };
    const result = await transfer(data);
    expect(result).toStrictEqual(
      { error: true, code: 404, message: "account not found" },
    );
    done();
  });

  test("insufficient balance", async (done) => {
    const data = {
      from_account_number: 555001,
      to_account_number: 555002,
      amount: 500000,
    };
    const result = await transfer(data);
    expect(result).toStrictEqual(
      { error: true, code: 505, message: "insufficient balance" },
    );
    done();
  });

  test("transfer sukses", async (done) => {
    const data = {
      from_account_number: 555001,
      to_account_number: 555002,
      amount: 200,
    };
    const result = await transfer(data);
    expect(result).toStrictEqual({ code: 200, message: "done" });
    done();
  });
});
