require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const getAccount = require("../account_dao");
const { sequelize } = require("../../../models");

beforeAll(async () => {
  await require("../../../modules/init")();
});

afterAll(async () => {
  await sequelize.close();
});

describe("account", () => {
  test("get account sukses", async (done) => {
    const account = await getAccount(555001);
    expect(account).toStrictEqual({
      "account_number": 555001,
      "customer_name": "Bob Martin",
      "balance": 10000,
    });
    done();
  });

  test("get account not found", async (done) => {
    const account = await getAccount(90909);
    expect(account).toBeUndefined();
    done();
  });
});
