require("dotenv").config();
const fastify = require("fastify")({ logger: true });

fastify
  .register(require("./services/account"))
  .register(require("./services/transfer"))
  .listen(process.env.APP_PORT, process.env.APP_HOST, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });
