
const _ = require("lodash");
const { ObjectId } = require("mongodb");
const User = require("./user.js");

const {
    addDocument,
    checkExistence,
    getDocument,
    getDocuments,
    updateDocument,
    deleteDocument } = require("../commons/functions");
const {
    collectionNames,
    requireParamsNotSet,
    invalidId,
    userPhoneAlreadyInUse,
    userEmailAlreadyInUse } = require("../commons/variables.js");

/**
 * A class to model a admin
 * in the platform.
 */
class Admin extends User {
    defaultAdmin = false;

    constructor({
        id,
        fullName,
        phone,
        email,
        passwordHash,
        defaultAdmin
    }) {
        super();
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.passwordHash = passwordHash;
        this.defaultAdmin = defaultAdmin;
    }

    /** 
     * Checks if the passwordHash is correct for
     * the given admin by phone.
     */
    static async verifyPassword({ phone, passwordHash }) {
        // check required params
        if (_.isUndefined(phone) || _.isUndefined(passwordHash)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                return await checkExistence(collectionNames.admins, { phone, passwordHash });
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Adds this admin to the system.
    */
    async add() {
        // check required fields
        if (_.isUndefined(this.fullName) ||
            _.isUndefined(this.phone) ||
            _.isUndefined(this.email) ||
            _.isUndefined(this.passwordHash)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                // check phone number uniqueness
                let adminPhoneIsInUse = await checkExistence(collectionNames.admins, { phone: this.phone });
                if (adminPhoneIsInUse) {
                    throw new Error(userPhoneAlreadyInUse);
                } else {
                    let adminEmailIsInUse = await checkExistence(collectionNames.admins, { email: this.email });
                    if (adminEmailIsInUse) {
                        throw new Error(userEmailAlreadyInUse);
                    } else {
                        // add the new user
                        let id = await addDocument(collectionNames.admins, this);
                        this.id = id;
                        // @ts-ignore
                        delete this._id;
                        return this;
                    }
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets a admin by its id.
    */
    static async get({ id }) {
        if (_.isUndefined(id)) {
            throw new Error(requireParamsNotSet);
        } else {
            let _id;
            try {
                _id = new ObjectId(id);
            } catch (error) {
                throw new Error(invalidId);
            }
            try {
                let admin = await getDocument(collectionNames.admins, { _id });
                // @ts-ignore
                if (admin) {
                    // @ts-ignore
                    admin.id = admin._id + "";
                    // @ts-ignore
                    delete admin._id;
                    return new Admin(admin);
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets a admin by its id.
    */
    static async getByPhone({ phone }) {
        if (_.isUndefined(phone)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                let admin = await getDocument(collectionNames.admins, { phone });
                // @ts-ignore
                if (admin) {
                    // @ts-ignore
                    admin.id = admin._id + "";
                    // @ts-ignore
                    delete admin._id;
                    return new Admin(admin);
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets all admins in the system.
    */
    static async getAll() {
        try {
            let admins = await getDocuments(collectionNames.admins);
            let allAdmins = []
            await admins.forEach(admin => {
                admin.id = admin._id + "";
                delete admin._id;
                // @ts-ignore
                allAdmins.push(new Admin(admin));
            });
            return allAdmins;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates a admin by its id.
    */
    static async update({ id, updates }) {
        if (_.isUndefined(id) || _.isEmpty(updates)) {
            throw new Error(requireParamsNotSet);
        } else {
            let _id;
            try {
                _id = new ObjectId(id);
            } catch (error) {
                throw new Error(invalidId);
            }

            if (updates.phone) {
                let adminPhoneIsInUse = await checkExistence(collectionNames.admins, { phone: updates.phone, _id: { $ne: _id } });
                if (adminPhoneIsInUse) {
                    throw new Error(userPhoneAlreadyInUse);
                }
            }

            // cleanup the incoming update

            delete updates._id;

            try {
                let result = await updateDocument(collectionNames.admins, { _id }, updates);
                return result.modifiedCount;
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Deletes a admin by its id.
    */
    static async delete({ id }) {
        if (_.isUndefined(id)) {
            throw new Error(requireParamsNotSet);
        } else {
            let _id;
            try {
                _id = new ObjectId(id);
            } catch (error) {
                throw new Error(invalidId);
            }
            try {
                let result = await deleteDocument(collectionNames.admins, { _id });
                return result.deletedCount;
            } catch (error) {
                throw error;
            }
        }
    }

}

module.exports = Admin;