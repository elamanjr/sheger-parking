
const express = require("express");
const { errorLog, httpSingleResponse, httpInternalErrorResponse, httpNotFoundResponse } = require("../../modules/commons/functions.js");
const { invalidCallRegex } = require("../../modules/commons/variables.js");
const Branch = require("../../modules/entities/branch.js")

const branches = express.Router();

/**
 * @swagger
 * /{token}/branches:
 *  get:
 *   description: Get all branches
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   tags:
 *     - Branches
 *   responses:
 *     200:
 *       description: An array of all branches
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
branches.get("/", async (req, res) => {
    try {
        let allBranches = await Branch.getAll();
        res.status(200).end(JSON.stringify(allBranches));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Getting All Branches", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/branches/{id}:
 *  get:
 *   description: Get a branch by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Branches
 *   responses:
 *     200:
 *       description: A branch object
 *     400:
 *       description: Invalid/incomplete parameters
 *     404:
 *       description: A branch with the given id not found
 *     500:
 *       description: Internal error
 */
branches.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let branch = await Branch.get({ id });
        if (branch) {
            res.status(200).end(JSON.stringify(branch));
        } else {
            httpNotFoundResponse(res);
        }
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog(`ERROR: Getting a Branch '${id}'`, error);
            httpInternalErrorResponse(res);
        }

    }
})

/**
 * @swagger
 * /{token}/branches:
 *  post:
 *   description: Add a branch
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     description: A branch object
 *     required: true
 *   tags:
 *     - Branches
 *   responses:
 *     200:
 *       description: A branch object
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
branches.post("/", async (req, res) => {
    try {
        let newBranch = new Branch(req.body);
        newBranch = await newBranch.add();
        res.status(200).end(JSON.stringify(newBranch));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Adding New Branch", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/branches/{id}:
 *  patch:
 *   description: Updates a branch
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   requestBody:
 *     description: A branch object
 *     required: true
 *   tags:
 *     - Branches
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
branches.patch("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let updatedCount = await Branch.update({ id, updates: req.body });
        res.status(200).end(JSON.stringify({ updated: !!updatedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Updating a Branch", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
* @swagger
* /{token}/branches/{id}:
*  delete:
*   description: Deletes a branch by id
*   parameters:
*     - in: path
*       name: token
*       required: true
*     - in: path
*       name: id
*       required: true
*   tags:
*     - Branches
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
branches.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let deletedCount = await Branch.delete({ id });
        res.status(200).end(JSON.stringify({ deleted: !!deletedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Deleting a Branch", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/branches/{id}/reservations:
 *  get:
 *   description: Get all reservation at a branch
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Branches
 *   responses:
 *     200:
 *       description: Array of reservations
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
branches.get("/:id/reservations", async (req, res) => {
    let includeCompleted = !!req.query.includeCompleted;
    let id = req.params.id;
    try {
        let reservations = await Branch.getAllReservations({ id, includeCompleted });
        res.status(200).end(JSON.stringify(reservations));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog(`ERROR: Getting All Reservations for a Branch '${id}'`, error);
            httpInternalErrorResponse(res);
        }

    }
})
module.exports = branches;