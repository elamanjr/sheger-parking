
require("dotenv").config();
const _ = require("lodash");
const express = require("express");
const ypco = require('yenepaysdk');

const { errorLog,
    httpSingleResponse,
    httpInternalErrorResponse } = require("../../modules/commons/functions.js");
const {
    hostUrl,
    defaultPort,
    requireParamsNotSet } = require("../../modules/commons/variables.js");

const payment = express.Router();

// Checkout Options
const sellerCode = process.env.SELLER_CODE;
let useSandbox = true;
let expiresAfter = 60;

// Checkout Item
let checkoutItem = {
    DeliveryFee: '0',
    Discount: '0',
    Tax1: '0',
    Tax2: '0',
    HandlingFee: '0',
    Quantity: '1'
};

/**
 * @swagger
 * /{token}/payment:
 *  post:
 *   description: Creates payment URL
 *   parameters:
 *     - in: path
 *       name: token
 *       required: true
 *   requestBody:
 *     description: A reservation object
 *     required: true
 *   tags:
 *     - Payment
 *   responses:
 *     200:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentUrl:
 *                 type: string
 *                 example: https://test.yenepay.com/Home/Process/?Process=Express&MerchantId=SB1449&SuccessUrl=http%3A%2F%2F127.0.0.1%3A5000%2F
 *     400:
 *       description: Invalid/incomplete body
 *     500:
 *       description: Internal error
 */

payment.post("/", async (req, res) => {
    if (_.isUndefined(req.body.client) ||
        _.isUndefined(req.body.reservationPlateNumber) ||
        _.isUndefined(req.body.branch) ||
        _.isUndefined(req.body.branchName) ||
        _.isUndefined(req.body.price) ||
        _.isUndefined(req.body.startingTime) ||
        _.isUndefined(req.body.duration) ||
        _.isUndefined(req.body.redirectPath)) {
        httpSingleResponse(res, 400, requireParamsNotSet);
    } else {
        try {

            let { branchName, price, redirectPath } = req.body;
            let orderId = JSON.stringify(req.body);
            const redirectUrl = redirectPath + "/afterpayment";
            let checkoutOptions = ypco.checkoutOptions(sellerCode, orderId, ypco.checkoutType.Express, useSandbox, expiresAfter, redirectUrl, redirectUrl, redirectUrl, redirectUrl);
            checkoutItem.ItemName = `Reservation at: ${branchName}`;
            checkoutItem.UnitPrice = price;
            let paymentUrl = ypco.checkout.GetCheckoutUrlForExpress(checkoutOptions, checkoutItem);
            res.status(200).end(JSON.stringify({ paymentUrl }));
        } catch (error) {
            errorLog(`ERROR: Creating payment url`, error);
            httpInternalErrorResponse(res);
        }
    }
})

module.exports = payment;