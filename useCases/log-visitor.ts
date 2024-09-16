import connection from '../models/db.js';
import { format } from 'mysql';

export async function logVisitor(data: { ip: string; userAgent: string }) {
  return new Promise((resolve, reject) => {
        let sql = `INSERT INTO visitor (
          ip,
          inserted_at
        ) VAlUES (?, ?)`
        sql = format(sql, [data.ip, data.userAgent]);

        connection.query(sql, function (error, results) {
            if (error) reject(error);
            resolve(results)
        })
    }).then((results) => {
        return results;
    }).catch((error) => {
        console.log(error);
    });
}