
const _ = require("lodash");
const { ObjectId } = require("mongodb");
const {
    addDocument,
    getDocument,
    getDocuments,
    updateDocument,
    deleteDocument } = require("../commons/functions");
const {
    collectionNames,
    requireParamsNotSet,
    invalidId,
    noAvailableSlot,
    unitDurationInMinutes } = require("../commons/variables");

/**
 * A class to model a reservation
 * in the platform.
 */
class Reservation {
    id;
    client;
    reservationPlateNumber;
    branch;
    branchName;
    slot;
    price;
    startingTime;
    duration;
    parked = false;
    completed = false;
    expired = false;

    constructor({
        id,
        client,
        reservationPlateNumber,
        branch,
        branchName,
        slot,
        price,
        startingTime,
        duration,
        parked,
        completed,
        expired,
    }) {
        this.id = id;
        this.client = client;
        this.reservationPlateNumber = reservationPlateNumber;
        this.branch = branch;
        this.branchName = branchName;
        this.slot = slot;
        this.price = price;
        this.startingTime = startingTime;
        this.duration = duration;
        this.parked = _.isUndefined(parked) ? this.parked : parked;
        this.completed = _.isUndefined(completed) ? !this.parked && Date.now() > this.startingTime + this.duration * unitDurationInMinutes * 60 * 1000 : completed;

        if (expired === true) {
            this.expired = true;
        } else if (this.parked && Date.now() > this.startingTime + duration * unitDurationInMinutes * 60 * 1000) {
            this.expired = true;
        }
    }

    /**
    * Adds this branch to the system.
    */
    async add() {
        // check required fields
        if (_.isUndefined(this.client) ||
            _.isUndefined(this.reservationPlateNumber) ||
            _.isUndefined(this.branch) ||
            _.isUndefined(this.branchName) ||
            _.isUndefined(this.price) ||
            _.isUndefined(this.startingTime) ||
            _.isUndefined(this.duration)) {
            throw new Error(requireParamsNotSet);
        } else {
            this.parked = _.isUndefined(this.parked) ? false : this.parked;
            this.completed = _.isUndefined(this.completed) ? !this.parked && Date.now() > this.startingTime + this.duration * unitDurationInMinutes * 60 * 1000 : this.completed;
            this.expired = _.isUndefined(this.expired) ? false : this.expired;

            try {
                // check availability
                const Branch = require("../entities/branch");
                let availableSlot = await Branch.getAvailableSlot(this.branch, this.startingTime, this.duration);
                if (availableSlot === -1) {
                    throw new Error(noAvailableSlot);
                }
                // assign slot
                this.slot = availableSlot;
                {
                    // add the new reservation
                    let id = await addDocument(collectionNames.reservations, this);
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
    * Gets a reservation by its id.
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
                let reservation = await getDocument(collectionNames.reservations, { _id });
                // @ts-ignore
                if (reservation) {
                    // @ts-ignore
                    reservation.id = reservation._id + "";
                    // @ts-ignore
                    delete reservation._id;

                    // @ts-ignore
                    if (!reservation.completed && !reservation.parked && Date.now() > reservation.startingTime + reservation.duration * unitDurationInMinutes * 60 * 1000) {
                        try {
                            // @ts-ignore
                            reservation.completed = true;
                            // @ts-ignore
                            await Reservation.update({ id: reservation.id, updates: { completed: true } });
                        } catch (error) {
                            throw error;
                        }
                    }
                    return new Reservation(reservation);
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Gets all reservations in the system.
    */
    static async getAll(includeCompleted) {
        includeCompleted = !!includeCompleted;
        try {
            let reservations = await getDocuments(collectionNames.reservations, {}, { "startingTime": 1 });
            let tempAllReservations = []
            let allReservations = []

            await reservations.forEach(reservation => {
                if (!includeCompleted && reservation.completed) return;
                reservation.id = reservation._id + "";
                delete reservation._id;
                // @ts-ignore
                tempAllReservations.push(reservation);
            });
            for (let reservation of tempAllReservations) {
                if (!reservation.completed && !reservation.parked && Date.now() > reservation.startingTime + reservation.duration * unitDurationInMinutes * 60 * 1000) {
                    try {
                        // @ts-ignore
                        reservation.completed = true;
                        // @ts-ignore
                        await Reservation.update({ id: reservation.id, updates: { completed: true } });
                        if(!includeCompleted) continue;
                    } catch (error) {
                        throw error;
                    }
                }
                allReservations.push(new Reservation(reservation));
            }
            return allReservations;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates a reservation by its id.
    */
    static async update({ id, updates }) {
        if (_.isUndefined(id) ||
            _.isEmpty(updates)) {
            throw new Error(requireParamsNotSet);
        } else {
            let _id;
            try {
                _id = new ObjectId(id);
            } catch (error) {
                throw new Error(invalidId);
            }
            delete updates._id;
            if (
                !_.isUndefined(updates.branch) ||
                !_.isUndefined(updates.startingTime)
            ) {
                try {
                    let reservation = await Reservation.get({ id })
                    if (
                        (!_.isUndefined(updates.branch) && updates.branch !== reservation.branch) ||
                        (!_.isUndefined(updates.startingTime) && updates.startingTime !== reservation.startingTime)
                    ) {
                        const Branch = require("../entities/branch");
                        try {
                            let availableSlot = await Branch.getAvailableSlot(updates.branch, updates.startingTime, reservation.duration);
                            if (availableSlot === -1) {
                                throw new Error(noAvailableSlot);
                            } else {
                                updates.slot = availableSlot;
                            }
                        } catch (error) {
                            throw error;
                        }
                    }
                } catch (error) {
                    throw error;
                }


            }

            // cleanup the incoming update

            try {
                let result = await updateDocument(collectionNames.reservations, { _id }, updates);
                return result.modifiedCount;
            } catch (error) {
                throw error;
            }
        }
    }

    /**
    * Deletes a reservation by its id.
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
                let result = await deleteDocument(collectionNames.reservations, { _id });
                return result.deletedCount;
            } catch (error) {
                throw error;
            }
        }
    }
}

module.exports = Reservation;