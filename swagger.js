const swaggerAutogen = require('swagger-autogen')();

async function swaggerGen(swaggerFile, endpointsFiles, doc) {
  swaggerAutogen(swaggerFile, endpointsFiles, doc)
    .then(async () => {
      endpointsFiles.forEach(route => {
        require(route);
      });
    })
    .catch((err) => logger.error(err));
}

module.exports = { swaggerGen };
