const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EVENT-TICKET-BOOKING-SYSTEM",
      version: "1.0.0",
      description: "API for Event Ticket Booking System",
    },
    servers: [
      {
        url: "http://localhost:8000", 
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API docs
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:8000/api-docs");
}

module.exports = swaggerDocs;
