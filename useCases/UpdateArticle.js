import connection from '../models/db.js';
import { format } from 'mysql';

export function perform (articleDto, id) {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE articles SET title = ?, text = ?, main_image_id = ? WHERE id = ?";
        let inserts = [articleDto.title, articleDto.text, articleDto.mainImageId, id];
        sql = format(sql, inserts);

        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
        })
    })
}
