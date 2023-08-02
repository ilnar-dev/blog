import connection from '../models/db.js';
import { format } from 'mysql';

export function perform (articleDto) {
    return new Promise((resolve) => {
        let sql =
            "INSERT INTO article (title, text, main_image_id) VALUES (?, ?, ?)";
        let inserts = [articleDto.title, articleDto.text, articleDto.mainImageId];
        sql = format(sql, inserts);

        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results)
        })
    })
}
