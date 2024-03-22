import connection from '../models/db.js';
import { format } from 'mysql';
import User from '../models/user.js';

export async function findByEmail (email) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM user WHERE email = ?'
        sql = format(sql, [email]);

        connection.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        })
    }).then((results) => {
        return new Promise((resolve, reject) => {
            if (results.length === 0) {
                resolve(null);
            }
            let user = new User();
            user.id = results[0].id;
            user.name = results[0].name;
            user.email = results[0].email;
            user.password = results[0].password;
            user.salt = results[0].salt;

            resolve(user);
        });
    }).catch((error) => {
        console.log(error);
    });
}

export async function findById (id) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM user WHERE id = ?'
        sql = format(sql, [id]);

        connection.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        })
    }).then((results) => {
        return new Promise((resolve, reject) => {
            let user = new User();
            user.id = results[0].id;
            user.name = results[0].name;
            user.email = results[0].email;
            user.password = results[0].password;
            user.salt = results[0].salt;

            resolve(user);
        });
    }).catch((error) => {
        console.log(error);
    });
}

export async function create (user) {
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO user (name, email, password, salt) VALUES (?, ?, ?, ?)'
        sql = format(sql, [user.name, user.email, user.password, user.salt]);

        connection.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        })
    }).then((results) => {
        return new Promise((resolve, reject) => {
            let user = new User();
            user.id = results.insertId;
            user.name = results.name;
            user.email = results.email;
            user.password = results.password;
            user.salt = results.salt;

            resolve(user);
        });
    }).catch((error) => {
        console.log(error);
    });
}