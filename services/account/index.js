"use strict";

module.exports = function (fastify, opts, done) {
  // this options is used for route validation & output serialization
  const options = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            customer_name: { type: "string" },
            account_number: { type: "number" },
            balance: { type: "number" },
          },
        },
      },
    },
  };
  fastify.get("/account/:account_number", options, handler);

  done();
};

async function handler(request, reply) {
  const { account_number } = request.params;
  const data = await require("./account_dao")(account_number);
  if (!data) {
    return reply.code(404).send(
      { error: true, code: 404, message: "not found" },
    );
  }
  reply.send(data);
}
