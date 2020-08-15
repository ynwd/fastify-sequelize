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

describe("account", () => {
  test("get account sukses", async (done) => {
    const result = await fastify.inject({
      url: "/account/555001",
      method: "GET",
    });
    const data = JSON.parse(result.body);
    expect(data).toStrictEqual(
      {
        customer_name: "Bob Martin",
        account_number: 555001,
        balance: 10000,
      },
    );
    done();
  });

  test("get account not found", async (done) => {
    const result = await fastify.inject({
      url: "/account/555004",
      method: "GET",
    });
    const data = JSON.parse(result.body);
    expect(data).toStrictEqual(
      {
        code: 404,
        error: true,
        message: "not found",
      },
    );
    done();
  });
});
