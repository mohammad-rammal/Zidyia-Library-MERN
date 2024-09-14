const express = require("express");
const connect = require("./config/connect");
require("dotenv").config();
const swagger = require("./utils/swagger");
const YAML = require('yamljs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const cors = require("cors");

// Connection To DB
connect();


// Init App
const app = express();


// Middlewares
app.use(express.json());


// Swagger 
swagger(app);
const swaggerDocument = YAML.load(path.join(__dirname, './utils/swagger.yml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Contect-Type", "application/json")
    res.send(swaggerDocument)
})

// Cors Policy 
app.use(cors({
    origin: "http://localhost:3000"
}));


// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/documents", require("./routes/documentRoute"));
app.use("/api/libraries", require("./routes/libraryRoute"));
app.use("/api/requests", require("./routes/requestRoute"));
app.use('/api/subscriptions', require("./routes/subscriptionRoute"));
app.use('/api/password', require("./routes/passRoute"));
app.use('/api/admin-tenant', require("./routes/adminTenantRoute"));

// Error Handler Middlewares
app.use(notFound);
app.use(errorHandler);

// // Location
// app.get('/', (req, res) => {
//     const clientIP = req.ip;
//     res.send(`Client IP address: ${clientIP}`);
// });

// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running normally in ${process.env.NODE_ENV} mode using port ${PORT}.`))