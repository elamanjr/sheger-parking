
const path = require("path");

// database vars
let databaseName = "parking";
let collectionNames = {
    clients: "clients",
    branches: "branches",
    reservations: "reservations",
    admins: "admins",
    staffs: "staffs"
}

// hosting vars
let defaultPort = 5000;
let hostUrl = "http://127.0.0.1";
let basePath = "/:token";
let publicFilesPath = path.resolve("public")
let subdomain = "api-shegerparking";

// Error message vars
let invalidCall = "INVALID_CALL:|:";
let invalidCallRegex = /^INVALID\_CALL\:\|\:/;
let requireParamsNotSet = invalidCall + "SOME_REQUIRED_PARAMS_NOT_SET";
let invalidId = invalidCall + "INVALID_ID";
let userPhoneAlreadyInUse = invalidCall + "USER_PHONE_ALREADY_IN_USE";
let userEmailAlreadyInUse = invalidCall + "USER_EMAIL_ALREADY_IN_USE";
let userEmailNotInUse = invalidCall + "USER_EMAIL_NOT_IN_USE";
let branchNameAlreadyInUse = invalidCall + "BRANCH_NAME_ALREADY_IN_USE";
let noAvailableSlot = invalidCall + "No_Available_Slot";
let pageNotFound = "Page_Not_Found";

// signUp vars
let emailVerificationCodeLength = 5;
let companiesEmail = "shegerparking@gmail.com";
let verificationEmailSubject = "Verify your email.";

// branch vars
let defaultCapacity = 120;
let defaultOnServiceStatus = true;
let defaultPricePerHour = 20;

// reservation vars
let unitDurationInMinutes = 60;

module.exports = {
    databaseName,
    collectionNames,
    defaultPort,
    hostUrl,
    basePath,
    publicFilesPath,
    subdomain,
    invalidCall,
    invalidCallRegex,
    requireParamsNotSet,
    invalidId,
    userPhoneAlreadyInUse,
    userEmailAlreadyInUse,
    userEmailNotInUse,
    pageNotFound,
    emailVerificationCodeLength,
    companiesEmail,
    verificationEmailSubject,
    defaultCapacity,
    defaultOnServiceStatus,
    defaultPricePerHour,
    branchNameAlreadyInUse,
    unitDurationInMinutes,
    noAvailableSlot
}