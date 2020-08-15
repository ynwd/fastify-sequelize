"use strict";

module.exports = function (fastify, opts, done) {
  // options is used for route validation
  const options = {
    schema: {
      body: {
        type: "object",
        required: ["to_account_number", "amount"],
        properties: {
          to_account_number: { type: "number" },
          amount: { type: "number" },
        },
      },
      params: {
        from_account_number: { type: "number" },
      },
    },
  };

  fastify.post("/account/:from_account_number/transfer", options, handler);
  done();
};

async function handler(request, reply) {
  const { from_account_number } = request.params;
  const { to_account_number, amount } = request.body;
  const transferData = { from_account_number, to_account_number, amount };
  const data = await require("./transfer_dao")(transferData);
  if (data && data.error) return reply.send(data);
  reply.code(201).send();
}
