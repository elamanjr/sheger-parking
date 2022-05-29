
const express = require("express");
const { errorLog,
    httpSingleResponse,
    httpInternalErrorResponse,
    httpNotFoundResponse,
} = require("../../modules/commons/functions.js");
const { invalidCallRegex } = require("../../modules/commons/variables.js");
const Admin = require("../../modules/entities/admin.js")

const admins = express.Router();

/**
 * @swagger
 * /{token}/admins/login:
 *  post:
 *   description: Admin login
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
 *     - Admins
 *   responses:
 *     200:
 *       description: An admin object
 *     400:
 *       description: Invalid/incomplete parameters
 *     404:
 *       description:  Invalid login credentials
 *     500:
 *       description: Internal error
 */
admins.post("/login", async (req, res) => {
    try {
        if (await Admin.verifyPassword(req.body)) {
            let admin = await Admin.getByPhone({ phone: req.body.phone });
            if (admin) {
                res.status(200).end(JSON.stringify(admin));
            } else {
                errorLog("ERROR: Getting Admin After Password Got Verified", admin);
                httpInternalErrorResponse(res);
            }
        } else {
            httpNotFoundResponse(res);
        }
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Logging In an Admin", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/admins:
 *  get:
 *   description: Get all admins
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   tags:
 *     - Admins
 *   responses:
 *     200:
 *       description: An array of all admins
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
admins.get("/", async (req, res) => {
    try {
        let allAdmin = await Admin.getAll();
        res.status(200).end(JSON.stringify(allAdmin));
    } catch (error) {
        errorLog("ERROR: Getting All Admins", error);
        httpInternalErrorResponse(res);
    }
})

/**
 * @swagger
 * /{token}/admins/{id}:
 *  get:
 *   description: Get an admin by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Admins
 *   responses:
 *     200:
 *       description: An admin object
 *     400:
 *       description: Invalid/incomplete parameters
 *     404:
 *       description: An admin with the given id not found
 *     500:
 *       description: Internal error
 */
admins.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let admin = await Admin.get({ id });
        if (admin) {
            res.status(200).end(JSON.stringify(admin));
        } else {
            httpNotFoundResponse(res);
        }
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog(`ERROR: Getting an Admin '${id}'`, error);
            httpInternalErrorResponse(res);
        }

    }
})

/**
 * @swagger
 * /{token}/admins:
 *  post:
 *   description: Add an admin
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     description: An admin object
 *     required: true
 *   tags:
 *     - Admins
 *   responses:
 *     200:
 *       description: An admin object
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
admins.post("/", async (req, res) => {
    try {
        let newAdmin = new Admin(req.body);
        newAdmin = await newAdmin.add();
        res.status(200).end(JSON.stringify(newAdmin));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Adding New Admin", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/admins/{id}:
 *  patch:
 *   description: Updates an admin
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   requestBody:
 *     description: An admin object
 *     required: true
 *   tags:
 *     - Admins
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
admins.patch("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let updatedCount = await Admin.update({ id, updates: req.body });
        res.status(200).end(JSON.stringify({ updated: !!updatedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Updating an Admin", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/admins/{id}:
 *  delete:
 *   description: Deletes an admin by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Admins
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
admins.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let deletedCount = await Admin.delete({ id });
        res.status(200).end(JSON.stringify({ deleted: !!deletedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Deleting an Admin", error);
            httpInternalErrorResponse(res);
        }
    }
})
module.exports = admins;