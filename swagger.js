const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Vencedores",
      version: "1.0.0",
      description: "Documentação da API de Vencedores",
    },
    servers: [
      {
        url: "https://winners-api-delta.vercel.app/api", 
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
