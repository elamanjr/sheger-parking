
const express = require("express");
const { errorLog,
    httpSingleResponse,
    httpInternalErrorResponse,
    httpNotFoundResponse } = require("../../modules/commons/functions.js");
const { invalidCallRegex } = require("../../modules/commons/variables.js");
const Staff = require("../../modules/entities/staff.js")

const staffs = express.Router();

/**
 * @swagger
 * /{token}/staffs/login:
 *  post:
 *   description: Staff login
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
 *     - Staffs
 *   responses:
 *     200:
 *       description: An staff object
 *     400:
 *       description: Invalid/incomplete parameters
 *     404:
 *       description: Invalid login credentials
 *     500:
 *       description: Internal error
 */
staffs.post("/login", async (req, res) => {
    try {
        if (await Staff.verifyPassword(req.body)) {
            let staff = await Staff.getByPhone({ phone: req.body.phone });
            if (staff) {
                res.status(200).end(JSON.stringify(staff));
            } else {
                errorLog("ERROR: Getting Staff After Password Got Verified", staff);
                httpInternalErrorResponse(res);
            }
        } else {
            httpNotFoundResponse(res);
        }
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Logging In a Staff", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/staffs:
 *  get:
 *   description: Get all staffs
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   tags:
 *     - Staffs
 *   responses:
 *     200:
 *       description: An array of all staffs
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
staffs.get("/", async (req, res) => {
    try {
        let allStaffs = await Staff.getAll();
        res.status(200).end(JSON.stringify(allStaffs));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Getting All Staffs", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/staffs/{id}:
 *  get:
 *   description: Get an staff by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Staffs
 *   responses:
 *     200:
 *       description: An staff object
 *     400:
 *       description: Invalid/incomplete parameters
 *     404:
 *       description: An staff with the given id not found
 *     500:
 *       description: Internal error
 */
staffs.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let staff = await Staff.get({ id });
        if (staff) {
            res.status(200).end(JSON.stringify(staff));
        } else {
            httpNotFoundResponse(res);
        }
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog(`ERROR: Getting a Staff '${id}'`, error);
            httpInternalErrorResponse(res);
        }

    }
})

/**
 * @swagger
 * /{token}/staffs:
 *  post:
 *   description: Add an staff
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     description: An staff object
 *     required: true
 *   tags:
 *     - Staffs
 *   responses:
 *     200:
 *       description: An staff object
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
staffs.post("/", async (req, res) => {
    try {
        let newStaff = new Staff(req.body);
        newStaff = await newStaff.add();
        res.status(200).end(JSON.stringify(newStaff));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Adding New Staff", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/staffs/{id}:
 *  patch:
 *   description: Updates an staff
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   requestBody:
 *     description: An staff object
 *     required: true
 *   tags:
 *     - Staffs
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
staffs.patch("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let updatedCount = await Staff.update({ id, updates: req.body });
        res.status(200).end(JSON.stringify({ updated: !!updatedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Updating a Staff", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/staffs/{id}:
 *  delete:
 *   description: Deletes an staff by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Staffs
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
staffs.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let deletedCount = await Staff.delete({ id });
        res.status(200).end(JSON.stringify({ deleted: !!deletedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Deleting a Staff", error);
            httpInternalErrorResponse(res);
        }
    }
})

module.exports = staffs;