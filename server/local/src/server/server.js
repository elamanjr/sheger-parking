
const express = require("express");
const morgan = require("morgan");
const color = require("cli-color");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger-options.json");
const { apiTokens } = require("../../config");
const entities = require("../modules/entities/entities.json");
const {
    defaultPort,
    hostUrl,
    basePath,
    publicFilesPath,
    pageNotFound } = require("../modules/commons/variables");
const {
    httpSingleResponse } = require("../modules/commons/functions");
const clients = require("./routs/clients");
const branches = require("./routs/branches");
const reservations = require("./routs/reservations");
const admins = require("./routs/admins");
const staffs = require("./routs/staffs");
const overviews = require("./routs/overviews");
const payment = require("./routs/payment");
const afterPayment = require("./routs/after_payment");

require("dotenv").config();

const app = express();

let port = process.env.PORT || defaultPort;
let hostUrlWithPort = `${hostUrl}:${port}`
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Methods", "*");
    res.append("Access-Control-Allow-Headers", "*");
    next();
});

// swagger configs
swaggerOptions.swaggerDefinition.servers.push(
    {
        url: hostUrlWithPort
    }
)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/entities", (req, res) => {
    res.end(JSON.stringify(entities))
});

app.use("/afterpayment",afterPayment);

app.use(express.static(publicFilesPath));

app.use(basePath, (req, res, next) => {
    let token = req.params.token;
    if (!apiTokens.includes(token)) {
        httpSingleResponse(res, 400, "INVALID_TOKEN");
    } else next();
})

app.use(basePath + "/clients", clients);
app.use(basePath + "/branches", branches);
app.use(basePath + "/reservations", reservations);
app.use(basePath + "/admins", admins);
app.use(basePath + "/staffs", staffs);
app.use(basePath + "/payment", payment);
app.use(basePath + "/overviews", overviews);

app.use((req, res) => {
    httpSingleResponse(res, 404, pageNotFound);
})

// @ts-ignore
port = parseInt(port);
console.log(color.magenta("Serving the app..."))
app.listen(port, async () => {
    console.log(`App served at:`, color.blue(hostUrlWithPort));
    console.log()
})