
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
 * A class to model a staff
 * in the platform.
 */
class Staff extends User {
    branch;

    constructor({
        id,
        fullName,
        phone,
        email,
        passwordHash,
        branch
    }) {
        super()
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.passwordHash = passwordHash;
        this.branch = branch;
    }

    /** 
     * Checks if the passwordHash is correct for
     * the given staff by phone.
     */
    static async verifyPassword({ phone, passwordHash }) {
        // check required params
        if (_.isUndefined(phone) || _.isUndefined(passwordHash)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                return await checkExistence(collectionNames.staffs, { phone, passwordHash });
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Adds this staff to the system.
    */
    async add() {
        // check required fields
        if (_.isUndefined(this.fullName) ||
            _.isUndefined(this.phone) ||
            _.isUndefined(this.email) ||
            _.isUndefined(this.passwordHash) ||
            _.isUndefined(this.branch)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                // check phone number uniqueness
                let staffPhoneIsInUse = await checkExistence(collectionNames.staffs, { phone: this.phone });
                if (staffPhoneIsInUse) {
                    throw new Error(userPhoneAlreadyInUse);
                } else {
                    // add the new user
                    let staffEmailIsInUse = await checkExistence(collectionNames.staffs, { email: this.email });
                    if (staffEmailIsInUse) {
                        throw new Error(userEmailAlreadyInUse);
                    } else {
                        let id = await addDocument(collectionNames.staffs, this);
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
    * Gets a staff by its id.
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
                let staff = await getDocument(collectionNames.staffs, { _id });
                // @ts-ignore
                if (staff) {
                    // @ts-ignore
                    staff.id = staff._id + "";
                    // @ts-ignore
                    delete staff._id;
                    return new Staff(staff);
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets a staff by its id.
    */
    static async getByPhone({ phone }) {
        if (_.isUndefined(phone)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                let staff = await getDocument(collectionNames.staffs, { phone });
                // @ts-ignore
                if (staff) {
                    // @ts-ignore
                    staff.id = staff._id + "";
                    // @ts-ignore
                    delete staff._id;
                    return new Staff(staff);
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets all staffs in the system.
    */
    static async getAll() {
        try {
            let staffs = await getDocuments(collectionNames.staffs);
            let allStaffs = []
            await staffs.forEach(staff => {
                staff.id = staff._id + "";
                delete staff._id;
                // @ts-ignore
                allStaffs.push(new Staff(staff));
            });
            return allStaffs;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates a staff by its id.
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
                let staffPhoneIsInUse = await checkExistence(collectionNames.staffs, { phone: updates.phone, _id: { $ne: _id } });
                if (staffPhoneIsInUse) {
                    throw new Error(userPhoneAlreadyInUse);
                }
            }

            // cleanup the incoming update

            delete updates._id;

            try {
                let result = await updateDocument(collectionNames.staffs, { _id }, updates);
                return result.modifiedCount;
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Deletes a staff by its id.
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
                let result = await deleteDocument(collectionNames.staffs, { _id });
                return result.deletedCount;
            } catch (error) {
                throw error;
            }
        }
    }
}

module.exports = Staff;