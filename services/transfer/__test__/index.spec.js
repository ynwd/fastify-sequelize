const { sequelize } = require("../../../models");
const fastify = require("fastify")({ logger: false });

fastify.addHook("onClose", (instance, done) => {
  sequelize.close();
  done();
});

beforeAll(async () => {
  fastify.register(require("../index"));
  await require("../../../modules/init")();
});

afterAll(async () => {
  await fastify.close();
});

describe("transfer", () => {
  test("transfer sukses", async (done) => {
    const result = await fastify.inject({
      url: "/account/555001/transfer",
      method: "POST",
      payload: {
        to_account_number: 555002,
        amount: 1000,
      },
    });
    expect(result.statusCode).toBe(201);
    done();
  });

  test("transfer account not found", async (done) => {
    const result = await fastify.inject({
      url: "/account/555001/transfer",
      method: "POST",
      payload: {
        to_account_number: 555004,
        amount: 1000,
      },
    });
    const data = JSON.parse(result.body);
    expect(data).toStrictEqual(
      { error: true, code: 404, message: "account not found" },
    );
    done();
  });

  test("transfer insufficient balance", async (done) => {
    const result = await fastify.inject({
      url: "/account/555001/transfer",
      method: "POST",
      payload: {
        to_account_number: 555002,
        amount: 10000,
      },
    });
    const data = JSON.parse(result.body);
    expect(data).toStrictEqual(
      { error: true, code: 505, message: "insufficient balance" },
    );
    done();
  });
});
