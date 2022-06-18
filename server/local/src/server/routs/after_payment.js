const fs = require("fs")
const path = require("path");
require("dotenv").config();
const _ = require("lodash");
const express = require("express");
const ypco = require('yenepaysdk');

const { errorLog,
    httpSingleResponse,
    httpInternalErrorResponse } = require("../../modules/commons/functions.js");
const {
    invalidCallRegex,
    hostUrl,
    defaultPort,
    requireParamsNotSet,
    noAvailableSlot } = require("../../modules/commons/variables.js");

const payment = express.Router();

payment.get("/", async (req, res) => {
    let { MerchantOrderId, Status } = req.query;
    let afterPaymentPageHtml = fs.readFileSync(path.resolve(__dirname, "../../assets/html/afterpayment.html"), "utf-8");
    if (_.isUndefined(MerchantOrderId) ||
        _.isUndefined(Status)) {
        // res.end("Sorry, you have used invalid link!");
        res.end(afterPaymentPageHtml.replace("<afterPaymentIcon>", `
        <img
        alt="payment failed"
        src="../svg/failed.svg"
        class="after-payment-image payment-failed"
      />`
        ).replace("<afterPaymentDescription>", `
        <p>Sorry, you have used invalid link!</p>
        <div class="divider"></div>
        <p>You can go back to the app and make new reservation. Thank you.</p>
        `));
    } else if (Status === "Canceled") {
        // res.end("Not reserved, you have canceled the payment!");
        res.end(afterPaymentPageHtml.replace("<afterPaymentIcon>", `
        <img
        alt="payment canceled"
        src="../svg/canceled.svg"
        class="after-payment-image payment-canceled"
      />`
        ).replace("<afterPaymentDescription>", `
        <p>Payment is cancelled and no slot reserved!</p>
        <div class="divider"></div>
        <p>You can go back to the app and make another reservation. Thank you.</p>
        `));
    } else if (Status == "Paid") {
        const Reservation = require("../../modules/entities/reservation");
        // @ts-ignore
        let reservation = new Reservation(JSON.parse(MerchantOrderId));
        try {
            reservation = await reservation.add();
            res.end(afterPaymentPageHtml.replace("<afterPaymentIcon>", `
            <img
            alt="payment successful"
            src="../svg/success.svg"
            class="after-payment-image payment-successful"
          />`
            ).replace("<afterPaymentDescription>", `
            <p>You have successfully paid for your reservation at Branch: <b>${reservation.branchName}</b>, Slot: <b>${reservation.slot}</b></p>
            <div class="divider"></div>
            <p>You can go back to the app and see your reservation details. Thank you.</p>
            `));
        } catch (error) {
            if (error.message == noAvailableSlot) {
                res.end(afterPaymentPageHtml.replace("<afterPaymentIcon>", `
                <img
                alt="payment failed"
                src="../svg/failed.svg"
                class="after-payment-image payment-failed"
              />`
                ).replace("<afterPaymentDescription>", `
                <p>Sorry, there are no available slots for your reservation. Please comeback another time!</p>
                <div class="divider"></div>
                <p>We have returned your money back. Thank you.</p>
                `));
            } else {
                errorLog(`ERROR: Payment failed`, req.query);
                res.end(afterPaymentPageHtml.replace("<afterPaymentIcon>", `
                <img
                alt="payment failed"
                src="../svg/failed.svg"
                class="after-payment-image payment-failed"
            />`
                ).replace("<afterPaymentDescription>", `
                <p>Sorry, the reservation is failed for some reason! Please try again.</p>
                <div class="divider"></div>
                <p>We have returned your money back. Thank you.</p>
                `));
            }
        }
    } else {
        errorLog(`ERROR: Payment failed`, req.query);
        res.end(afterPaymentPageHtml.replace("<afterPaymentIcon>", `
        <img
        alt="payment failed"
        src="../svg/failed.svg"
        class="after-payment-image payment-failed"
      />`
        ).replace("<afterPaymentDescription>", `
        <p>Sorry, the payment is failed for some reason!</p>
        <div class="divider"></div>
        <p>Please go back to the app and make new reservation. Thank you.</p>
        `));
    }
})

module.exports = payment;