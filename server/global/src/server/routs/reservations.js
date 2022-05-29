
const express = require("express");
const { errorLog,
    httpSingleResponse,
    httpInternalErrorResponse,
    httpNotFoundResponse } = require("../../modules/commons/functions.js");
const {
    invalidCallRegex,
    noAvailableSlot } = require("../../modules/commons/variables.js");
const Reservation = require("../../modules/entities/reservation.js")
const reservations = express.Router();

/**
 * @swagger
 * /{token}/reservations:
 *  get:
 *   description: Get all reservations
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   tags:
 *     - Reservations
 *   responses:
 *     200:
 *       description: An array of all reservations
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
reservations.get("/", async (req, res) => {
    try {
        let allReservations = await Reservation.getAll();
        res.status(200).end(JSON.stringify(allReservations));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Getting All Reservations", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/reservations/{id}:
 *  get:
 *   description: Get a reservation by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Reservations
 *   responses:
 *     200:
 *       description: A reservation object
 *     400:
 *       description: Invalid/incomplete parameters
 *     404:
 *       description: A reservation with the given id not found
 *     500:
 *       description: Internal error
 */
reservations.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let reservation = await Reservation.get({ id });
        if (reservation) {
            res.status(200).end(JSON.stringify(reservation));
        } else {
            httpNotFoundResponse(res);
        }
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog(`ERROR: Getting a Reservation '${id}'`, error);
            httpInternalErrorResponse(res);
        }

    }
})

/**
 * @swagger
 * /{token}/reservations:
 *  post:
 *   description: Add a reservation
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     description: A reservation object
 *     required: true
 *   tags:
 *     - Reservations
 *   responses:
 *     200:
 *       description: A reservation object
 *     400:
 *       description: Invalid/incomplete parameters
 *     500:
 *       description: Internal error
 */
reservations.post("/", async (req, res) => {
    try {
        let newReservation = new Reservation(req.body);
        newReservation = await newReservation.add();
        res.status(200).end(JSON.stringify(newReservation));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else if (error.message === noAvailableSlot) {
            httpSingleResponse(res, 404, error.message);
        } else {
            errorLog("ERROR: Adding New Reservation", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/reservations/{id}:
 *  patch:
 *   description: Updates a reservation
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   requestBody:
 *     description: A reservation object
 *     required: true
 *   tags:
 *     - Reservations
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
reservations.patch("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let updatedCount = await Reservation.update({ id, updates: req.body });
        res.status(200).end(JSON.stringify({ updated: !!updatedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Updating a Reservation", error);
            httpInternalErrorResponse(res);
        }
    }
})

/**
 * @swagger
 * /{token}/reservations/{id}:
 *  delete:
 *   description: Deletes a reservation by id
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *     - in: path
 *       name: id
 *       required: true
 *   tags:
 *     - Reservations
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
reservations.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let deletedCount = await Reservation.delete({ id });
        res.status(200).end(JSON.stringify({ deleted: !!deletedCount }));
    } catch (error) {
        if (error.message.match(invalidCallRegex)) {
            httpSingleResponse(res, 400, error.message);
        } else {
            errorLog("ERROR: Deleting a Reservation", error);
            httpInternalErrorResponse(res);
        }
    }
})

module.exports = reservations;