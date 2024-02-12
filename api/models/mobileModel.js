const db = require("../config/db");
const bcrypt = require("bcrypt");

class MobileModel {
    static getAllUsers = async (cb) => {
        const query = "SELECT * FROM mobile_user";
        db.query(query, cb);
    };

    static addUser = async (user_f_name, user_name, email, password_hash, role, balance) => {
        const query = "INSERT INTO mobile_user (user_f_name, user_name, email, password_hash, role, balance) VALUES (?, ?, ?, ?, ?, ?)";
        await db.query(query, [user_f_name, user_name, email, password_hash, role, balance]);
    };

    static getUserInfo = async (id_user, cb) => {
        const query = "SELECT * FROM mobile_user WHERE id_user = ?";
        db.query(query, [id_user], cb);
    };

    static updateFName = async (id_user, newFName) => {
        const query = "UPDATE mobile_user SET user_f_name = ? WHERE id_user = ?";
        await db.query(query, [newFName, id_user]);
    };

    static updateUserName = async (id_user, newUserName) => {
        const query = "UPDATE mobile_user SET user_name = ? WHERE id_user = ?";
        await db.query(query, [newUserName, id_user]);
    };

    static updateEmail = async (id_user, newEmail) => {
        const query = "UPDATE mobile_user SET email = ? WHERE id_user = ?";
        await db.query(query, [newEmail, id_user]);
    };

    static updatePassword = async (id_user, newPassword) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const query = "UPDATE mobile_user SET password_hash = ? WHERE id_user = ?";
        await db.query(query, [hashedPassword, id_user]);
    };

    static updateRole = async (id_user, newRole) => {
        const query = "UPDATE mobile_user SET role = ? WHERE id_user = ?";
        await db.query(query, [newRole, id_user]);
    };

    static updateBalance = async (id_user, newBalance) => {
        const query = "UPDATE mobile_user SET balance = ? WHERE id_user = ?";
        await db.query(query, [newBalance, id_user]);
    };

    static deleteUser = async (id_user) => {
        const query = "DELETE FROM mobile_user WHERE id_user = ?";
        await db.query(query, [id_user]);
    };
}

module.exports = MobileModel;