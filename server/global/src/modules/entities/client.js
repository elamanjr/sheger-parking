
const _ = require("lodash");
const { ObjectId } = require("mongodb");
const User = require("./user.js");
const Reservation = require("./reservation.js");

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
 * A class to model a client/customer
 * in the platform.
 */
class Client extends User {
    defaultPlateNumber;

    constructor({
        id,
        fullName,
        phone,
        email,
        passwordHash,
        defaultPlateNumber
    }) {
        super();
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.passwordHash = passwordHash;
        this.defaultPlateNumber = defaultPlateNumber;
    }

    /** 
     * Checks if the passwordHash is correct for
     * the given client by phone.
     */
    static async verifyPassword({ phone, passwordHash }) {
        // check required params
        if (_.isUndefined(phone) || _.isUndefined(passwordHash)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                return await checkExistence(collectionNames.clients, { phone, passwordHash });
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Adds this client to the system.
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
                let clientPhoneIsInUse = await checkExistence(collectionNames.clients, { phone: this.phone });
                if (clientPhoneIsInUse) {
                    throw new Error(userPhoneAlreadyInUse);
                } else {
                    let clientEmailIsInUse = await checkExistence(collectionNames.clients, { email: this.email });
                    if (clientEmailIsInUse) {
                        throw new Error(userEmailAlreadyInUse);
                    } else {
                        // add the new user
                        let id = await addDocument(collectionNames.clients, this);
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
    * Gets a client by its id.
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
                let client = await getDocument(collectionNames.clients, { _id });
                // @ts-ignore
                if (client) {
                    // @ts-ignore
                    client.id = client._id + "";
                    // @ts-ignore
                    delete client._id;
                    return new Client(client);
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets a client by its id.
    */
    static async getByPhone({ phone }) {
        if (_.isUndefined(phone)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                let client = await getDocument(collectionNames.clients, { phone });
                // @ts-ignore
                if (client) {
                    // @ts-ignore
                    client.id = client._id + "";
                    // @ts-ignore
                    delete client._id;
                    return new Client(client);
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets all clients in the system.
    */
    static async getAll() {
        try {
            let clients = await getDocuments(collectionNames.clients);
            let allClients = []
            await clients.forEach(client => {
                client.id = client._id + "";
                delete client._id;
                // @ts-ignore
                allClients.push(new Client(client));
            });
            return allClients;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates a client by its id.
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
                let clientPhoneIsInUse = await checkExistence(collectionNames.clients, { phone: updates.phone, _id: { $ne: _id } });
                if (clientPhoneIsInUse) {
                    throw new Error(userPhoneAlreadyInUse);
                }
            }

            // cleanup the incoming update

            delete updates._id;

            try {
                let result = await updateDocument(collectionNames.clients, { _id }, updates);
                return result.modifiedCount;
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Deletes a client by its id.
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
                let result = await deleteDocument(collectionNames.clients, { _id });
                return result.deletedCount;
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets all reservations by a client.
    */
    static async getAllReservations({ id, sort = {} }) {
        if (_.isUndefined(id)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                let reservations = await getDocuments(collectionNames.reservations, { client: id }, sort);
                let allReservations = []
                await reservations.forEach(reservation => {
                    reservation.id = reservation._id + "";
                    delete reservation._id;
                    // @ts-ignore
                    allReservations.push(new Reservation(reservation));
                });
                return allReservations;
            } catch (error) {
                throw error;
            }
        }
    }
}

module.exports = Client;