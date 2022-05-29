
/**
 * An interface to model a human user
 * in the system. This is an abstract
 * class and needs to be implemented.
 */
class User {
    id;
    fullName;
    phone;
    email;
    passwordHash;

    /**
    * Checks if the passwordHash is correct for
    * the given user.
    */
    static verifyPassword({ phone, passwordHash }) {
        throw new Error("Abstract method!")
    }

    /**
    * Adds this user to the system.
    */
    add() {
        throw new Error("Abstract method!")
    }

    /**
    * Gets a user by its id.
    */
    static get({ id }) {
        throw new Error("Abstract method!")
    }

    /**
    * Gets all users in the system.
    */
    static getAll() {
        throw new Error("Abstract method!")
    }

    /**
    * Updates a user by its id.
    */
    static update({ id, updates }) {
        throw new Error("Abstract method!")
    }

    /**
    * Deletes a user by its id.
    */
    static delete({ id }) {
        throw new Error("Abstract method!")
    }
}

module.exports = User;