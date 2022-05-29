
const _ = require("lodash");
const express = require("express");
const { errorLog,
    httpSingleResponse,
    httpInternalErrorResponse,
    httpNotFoundResponse,
    sendEmailVerificationCode,
    checkExistence } = require("../../modules/commons/functions.js");
const { invalidCallRegex, collectionNames, userPhoneAlreadyInUse, requireParamsNotSet, userEmailNotInUse } = require("../../modules/commons/variables.js");
const Client = require("../../modules/entities/client.js")

const clients = express.Router();

/**
 * @swagger
 * /{token}/clients/signup:
 *  post:
 *   description: Client signup
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: someone@gmail.com
 *             phone:
 *               type: string
 *               example: +251987654321
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       description: An email verification code
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailVerificationCode:
 *                 type: number
 *                 example: 12345
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
clients.post("/signup", async (req, res) => {
    let email = req.body.email;
    let phone = req.body.phone;
    if (_.isUndefined(email) || _.isUndefined(phone)) {
        httpSingleResponse(res, 400, requireParamsNotSet);
    } else {
        try {
            let clientPhoneIsInUse = await checkExistence(collectionNames.clients, { phone });
            if (clientPhoneIsInUse) {
                httpSingleResponse(res, 400, userPhoneAlreadyInUse);
            } else {
                let emailVerificationCode = await sendEmailVerificationCode(email, "signup");
                res.status(200).end(JSON.stringify({ emailVerificationCode }));
            }
        } catch (error) {
            if (error.message.match(invalidCallRegex)) {
                httpSingleResponse(res, 400, error.message);
            } else {
                errorLog("ERROR: Signing Up a Client", error);
                httpInternalErrorResponse(res);
            }
        }
    }
})

/**
 * @swagger
 * /{token}/clients/login:
 *  post:
 *   description: Client login
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             phone:
 *               type: string
 *               example: +251987654321
 *             passwordHash:
 *               type: string
 *               example: gvt56uf65fvgctrtfgcyf6tyggf
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       description: A client object
 *     400:
 *       description: Invalid/incomplete parameters
 *     404:
 *       description: Invalid login credentials
 *     500:
 *       description: Internal error
 */
clients.post("/login", async (req, res) => {
    try {
        if (await Client.verifyPassword(req.body)) {
            let client = await Client.getByPhone({ phone: req.body.phone });
            if (client) {
                res.status(200).end(JSON.stringify(client));
            } else {
                errorLog("ERROR: Getting Client After Password Got Verified", client);
                httpInternalErrorResponse(res);
            }
        } else {
            httpNotFoundResponse(res);
        }
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Logging In a Client", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/clients/recover:
 *  post:
 *   description: Client password recovery
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: someone@gmail.com
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       description: An email verification code
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailVerificationCode:
 *                 type: number
 *                 example: 12345
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
clients.post("/recover", async (req, res) => {
    let email = req.body.email;
    if (_.isUndefined(email)) {
        httpSingleResponse(res, 400, requireParamsNotSet);
    } else {
        try {
            let clientEmailIsInUse = await checkExistence(collectionNames.clients, { email });
            if (!clientEmailIsInUse) {
                httpSingleResponse(res, 404, userEmailNotInUse);
            } else {
                let emailVerificationCode = await sendEmailVerificationCode(email, "passwordRecovery");
                res.status(200).end(JSON.stringify({ emailVerificationCode }));
            }
        } catch (error) {
            if (error.message.match(invalidCallRegex)) {
                httpSingleResponse(res, 400, error.message);
            } else {
                errorLog("ERROR: Sending Password Recovery", error);
                httpInternalErrorResponse(res);
            }
        }
    }
})

/**
 * @swagger
 * /{token}/clients:
 *  get:
 *   description: Get all clients
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       description: An array of all clients
 *     500:
 *       description: Internal error
 */
clients.get("/", async (req, res) => {
    try {
        let allClients = await Client.getAll();
        res.status(200).end(JSON.stringify(allClients));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Getting All Clients", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/clients/{id}:
 *  get:
 *   description: Get a client by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       description: A client object
 *     400:
 *       description: Invalid/incomplete parameters
 *     404:
 *       description: A client with the given id not found
 *     500:
 *       description: Internal error
 */
clients.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let client = await Client.get({ id });
        if (client) {
            res.status(200).end(JSON.stringify(client));
        } else {
            httpNotFoundResponse(res);
        }
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog(`ERROR: Getting a Client '${id}'`, error);
            httpInternalErrorResponse(res);
        }

    }
})

/**
 * @swagger
 * /{token}/clients:
 *  post:
 *   description: Add a client
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     description: A client object
 *     required: true
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       description: A client object
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */

clients.post("/", async (req, res) => {
    try {
        let newClient = new Client(req.body);
        newClient = await newClient.add();
        res.status(200).end(JSON.stringify(newClient));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Adding New Client", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/clients/{id}:
 *  patch:
 *   description: Updates a client
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   requestBody:
 *     description: A client object
 *     required: true
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updated:
 *                 type: boolean
 *                 example: false
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */

clients.patch("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let updatedCount = await Client.update({ id, updates: req.body });
        res.status(200).end(JSON.stringify({ updated: !!updatedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Updating a Client", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/clients/{id}:
 *  delete:
 *   description: Deletes a client by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deleted:
 *                 type: boolean
 *                 example: false
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
clients.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let deletedCount = await Client.delete({ id });
        res.status(200).end(JSON.stringify({ deleted: !!deletedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Deleting a Client", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/clients/{id}/reservations:
 *  get:
 *   description: Get all reservation by a client
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Clients
 *   responses:
 *     200:
 *       description: Array of reservations
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
clients.get("/:id/reservations", async (req, res) => {
    let id = req.params.id;
    try {
        let reservations = await Client.getAllReservations({ id });
        res.status(200).end(JSON.stringify(reservations));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog(`ERROR: Getting All Reservations for a Client '${id}'`, error);
            httpInternalErrorResponse(res);
        }

    }
})
module.exports = clients;