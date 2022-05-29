const express = require("express");
const {
    getCount,
    errorLog
} = require("../../modules/commons/functions.js");
const { collectionNames } = require("../../modules/commons/variables.js");
const { launchDate } = require("../../../config.js");

const overviews = express.Router();
const overviewsJson = {
    "adminsCount": -1,
    "staffsCount": -1,
    "clientsCount": -1,
    "branchesCount": -1,
    "reservationsCount": -1,
    "dailyAverageReservationCount": -1,
    "todaysReservationCount": -1,
    launchDate,
    "daysOnService": Math.ceil((Date.now() - Date.parse(launchDate)) / (1000 * 60 * 60 * 24))
};

/**
 * @swagger
 * /{token}/overviews:
 *  get:
 *   description: Get a overviews
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   tags:
 *     - General
 *   responses:
 *     200:
 *       description: An overview object
 *     500:
 *       description: Internal error
 */
overviews.get("/", async (req, res) => {
    let now = new Date();
    let todayStartsAt = Date.parse(`${now.getFullYear}-${now.getMonth}-${now.getDay}`);
    let todayEndsAt = todayStartsAt + 1000 * 60 * 60 * 24;
    for (let entity of Object.keys(collectionNames)) {
        try {
            overviewsJson[`${entity}Count`] = await getCount(entity);
        } catch (error) {
            errorLog(`ERROR: Getting ${entity}Count`, error);
        }
    }
    overviewsJson["dailyAverageReservationCount"] = overviewsJson["reservationsCount"] / overviewsJson["daysOnService"];
    try {
        // @ts-ignore
        overviewsJson["todaysReservationCount"] = await getCount(collectionNames.reservations, { startingTime: { $gt: todayStartsAt, $lt: todayEndsAt } })
    } catch (error) {
        errorLog(`ERROR: Getting todaysReservationCount`, error);
    }
    res.end(JSON.stringify(overviewsJson));
})

module.exports = overviews;
