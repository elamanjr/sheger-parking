
const fs = require("fs")
const path = require("path");
const nodemailer = require('nodemailer');
const _ = require("lodash");
const { MongoClient } = require("mongodb");
const color = require("cli-color");
const { databaseName,
    requireParamsNotSet,
    emailVerificationCodeLength,
    companiesEmail,
    verificationEmailSubject,
    unitDurationInMinutes } = require("./variables.js");
require("dotenv").config();

const mongoClient = new MongoClient(process.env.MONGODB_URL);

// utility functions
function errorLog(errorMessage, error) {
    console.error(color.red(errorMessage), color.red("\n[\n"), error, color.red("\n]"));
}

function generateRandomInt(digits = 1) {
    let digitMaker = Math.pow(10, digits);
    let randomInt = Math.round(Math.random() * digitMaker);
    return randomInt < digitMaker ? randomInt : digitMaker - 1;
}

async function sendEmail(from, to, subject, html) {
    if (_.isUndefined(from) ||
        _.isUndefined(to) ||
        _.isUndefined(subject) ||
        _.isUndefined(html)) {
        throw new Error(requireParamsNotSet);
    } else {
        let smtpUrl = process.env.SMTP_URL;
        let mailOptions = { from, to, subject, html };

        const transporter = nodemailer.createTransport(smtpUrl);
        try {
            return await transporter.sendMail(mailOptions);
        } catch (error) {
            throw error;
        }
    }
}
// signUp functions
async function sendEmailVerificationCode(email, context) {
    if (_.isUndefined(email)) {
        throw new Error(requireParamsNotSet);
    } else {
        let verificationCode = generateRandomInt(emailVerificationCodeLength);
        let emailHtmlLocation;
        switch (context) {
            case "signup":
                emailHtmlLocation = "../../assets/html/verification-email.html"
                break
            case "passwordRecovery":
                emailHtmlLocation = "../../assets/html/password-recovery-email.html"
                break
        }
        try {
            let signUpEmailHtml = fs.readFileSync(path.resolve(__dirname, emailHtmlLocation), "utf-8").replace("%code%", verificationCode.toString());
            await sendEmail(companiesEmail, email, verificationEmailSubject, signUpEmailHtml);
            return verificationCode;
        } catch (error) {
            throw error;
        }
    }
}

// Reservation functions
function createDurationArray(startingTime, duration) {
    let durationArray = [];
    let startingTimeInMinutes = Math.floor(startingTime / (1000 * 60 * unitDurationInMinutes));
    for (let durationUnits = 0; durationUnits < duration; durationUnits++) {
        durationArray.push(startingTimeInMinutes + durationUnits);
    }
    return durationArray;
}

// http functions
function httpSingleResponse(res, code, message) {
    return res.status(code).end(JSON.stringify({ message }));
}

function httpInternalErrorResponse(res) {
    return httpSingleResponse(res, 500, "INTERNAL_ERROR");
}

function httpNotFoundResponse(res) {
    return httpSingleResponse(res, 404, "NOT_FOUND");
}

// database functions
async function addDocument(collectionName, document) {
    try {
        mongoClient.connect();
        let collection = mongoClient.db(databaseName).collection(collectionName);
        let result = await collection.insertOne(document);
        return result.insertedId + "";
    } catch (error) {
        throw error;
    }
}

async function checkExistence(collectionName, conditions) {
    try {
        mongoClient.connect();
        let collection = mongoClient.db(databaseName).collection(collectionName);
        let result = await collection.findOne(conditions);
        return result != null;
    } catch (error) {
        throw error;
    }
}

async function getDocument(collectionName, conditions) {
    try {
        mongoClient.connect();
        let collection = mongoClient.db(databaseName).collection(collectionName);
        return await collection.findOne(conditions);
    } catch (error) {
        throw error;
    }
}

async function getDocuments(collectionName, conditions, sort = {}) {
    try {
        mongoClient.connect();
        let collection = mongoClient.db(databaseName).collection(collectionName);
        return await collection.find(conditions).sort(sort);
    } catch (error) {
        throw error;
    }
}

async function updateDocument(collectionName, filters, updates, operator = "$set") {
    updates = { [operator]: updates };
    try {
        mongoClient.connect();
        let collection = mongoClient.db(databaseName).collection(collectionName);
        return await collection.updateOne(filters, updates);
    } catch (error) {
        throw error;
    }
}

async function updateDocuments(collectionName, filters, updates, operator = "$set") {
    updates = { [operator]: updates };
    try {
        mongoClient.connect();
        let collection = mongoClient.db(databaseName).collection(collectionName);
        return await collection.updateMany(filters, updates);
    } catch (error) {
        throw error;
    }
}

async function deleteDocument(collectionName, conditions) {
    try {
        mongoClient.connect();
        let collection = mongoClient.db(databaseName).collection(collectionName);
        return await collection.deleteOne(conditions);
    } catch (error) {
        throw error;
    }
}

async function deleteDocuments(collectionName, conditions) {
    try {
        mongoClient.connect();
        let collection = mongoClient.db(databaseName).collection(collectionName);
        return await collection.deleteMany(conditions);
    } catch (error) {
        throw error;
    }
}

async function getCount(collectionName, conditions) {
    try {
        mongoClient.connect()
        let collection = mongoClient.db(databaseName).collection(collectionName);
        return await collection.countDocuments(conditions);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    errorLog,
    createDurationArray,
    httpSingleResponse,
    httpInternalErrorResponse,
    httpNotFoundResponse,
    addDocument,
    checkExistence,
    getDocument,
    getDocuments,
    updateDocument,
    updateDocuments,
    deleteDocument,
    deleteDocuments,
    generateRandomInt,
    sendEmailVerificationCode,
    getCount
}