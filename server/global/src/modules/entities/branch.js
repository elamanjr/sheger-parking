
const _ = require("lodash");
const { ObjectId } = require("mongodb");
const Reservation = require("./reservation.js");

const {
    addDocument,
    checkExistence,
    getDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
    createDurationArray } = require("../commons/functions");
const {
    collectionNames,
    requireParamsNotSet,
    invalidId,
    defaultPricePerHour,
    defaultCapacity,
    defaultOnServiceStatus,
    branchNameAlreadyInUse } = require("../commons/variables.js");

/**
 * A class to model a branch
 * in the platform.
 */
class Branch {
    id;
    name;
    location;
    capacity = defaultCapacity;
    onService = defaultOnServiceStatus;
    pricePerHour = defaultPricePerHour;
    description;

    constructor({
        id,
        name,
        location,
        capacity,
        onService,
        pricePerHour,
        description
    }) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = _.isUndefined(capacity) ? this.capacity : capacity;
        this.onService = _.isUndefined(onService) ? this.onService : onService;
        this.pricePerHour = _.isUndefined(pricePerHour) ? this.pricePerHour : pricePerHour;
        this.description = _.isUndefined(description) ? this.getDescription() : description;
    }

    getDescription() {
        return `Location: ${this.location}\nCapacity: ${this.capacity} cars\nPrice per Hour: ${this.pricePerHour} birr\nStatus: ${this.onService ? "On Service" : "Not on Service"}`;
    }

    /**
    * Adds this branch to the system.
    */
    async add() {
        // check required fields
        if (_.isUndefined(this.name) ||
            _.isUndefined(this.location)) {
            throw new Error(requireParamsNotSet);
        } else {
            this.capacity = _.isUndefined(this.capacity) ? defaultCapacity : this.capacity;
            this.pricePerHour = _.isUndefined(this.pricePerHour) ? defaultCapacity : this.pricePerHour;
            this.onService = _.isUndefined(this.onService) ? defaultOnServiceStatus : this.onService;
            this.description = _.isUndefined(this.description) ? this.getDescription() : this.description;
            try {
                // check name uniqueness
                let branchNameIsInUse = await checkExistence(collectionNames.branches, { name: this.name });
                if (branchNameIsInUse) {
                    throw new Error(branchNameAlreadyInUse);
                } else {
                    // add the new branch
                    let id = await addDocument(collectionNames.branches, this);
                    this.id = id;
                    // @ts-ignore
                    delete this._id;
                    return this;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets a branch by its id.
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
                let branch = await getDocument(collectionNames.branches, { _id });
                // @ts-ignore
                if (branch) {
                    // @ts-ignore
                    branch.id = branch._id + "";
                    // @ts-ignore
                    delete branch._id;
                    return new Branch(branch);
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets all branches in the system.
    */
    static async getAll() {
        try {
            let branches = await getDocuments(collectionNames.branches);
            let allBranches = []
            await branches.forEach(branch => {
                branch.id = branch._id + "";
                delete branch._id;
                // @ts-ignore
                allBranches.push(new Branch(branch));
            });
            return allBranches;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates a branch by its id.
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

            if (updates.name) {
                let branchNameIsInUse = await checkExistence(collectionNames.branches, { name: updates.name, _id: { $ne: _id } });
                if (branchNameIsInUse) {
                    throw new Error(branchNameAlreadyInUse);
                }
            }

            // cleanup the incoming update

            delete updates._id;

            try {
                let result = await updateDocument(collectionNames.branches, { _id }, updates);
                return result.modifiedCount;
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Deletes a branch by its id.
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
                let result = await deleteDocument(collectionNames.branches, { _id });
                return result.deletedCount;
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets all reservations at a branch.
    */
    static async getAllReservations({ id, sort = {} }) {
        if (_.isUndefined(id)) {
            throw new Error(requireParamsNotSet);
        } else {
            try {
                let reservations = await getDocuments(collectionNames.reservations, { branch: id}, sort );
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

    static async getAvailableSlot(id, startingTime, duration) {
        // -> get all reservations at the branch
        let branch, reservations;
        try {
            branch = await Branch.get({ id });
            reservations = await Branch.getAllReservations({ id, sort: { slot: 1 } });
        } catch (error) {
            throw error;
        }
        // -> create slot map
        let slotMap = {};
        for (let slot = 1; slot <= branch.capacity; slot++) {
            slotMap[slot] = [];
        }
        try {
            for (let reservation of reservations) {
                if (_.isEmpty(slotMap[reservation.slot])) {
                    slotMap[reservation.slot] = [];
                }
                slotMap[reservation.slot].push(...createDurationArray(reservation.startingTime, reservation.duration));
            }
        } catch (error) {
            throw error;
        }
        // -> search for available slot
        let availableSlot;
        let thisDurationArray = createDurationArray(startingTime, duration);
        mainForLoop: for (let [slot, durationArray] of Object.entries(slotMap)) {
            for (let time of thisDurationArray) {
                if (durationArray.includes(time)) {
                    continue mainForLoop;
                }
            }
            availableSlot = slot;
            break;
        }
        // -> return a slot number or -1
        if (_.isUndefined(availableSlot)) {
            return -1;
        } else {
            return availableSlot;
        }
    }
}

module.exports = Branch;