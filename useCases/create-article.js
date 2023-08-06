import connection from '../models/db.js';
import { format } from 'mysql';

export function perform (articleDto) {
    return new Promise((resolve) => {
        let publishedOn = null;
        if (1 === articleDto.published) {
            publishedOn = new Date();
        }
        let sql =
            "INSERT INTO article (title, intro, text, published, main_image_id, published_on) VALUES (?, ?, ?, ?, ?, ?)";
        let inserts = [
            articleDto.title,
            articleDto.intro,
            articleDto.text,
            articleDto.published,
            articleDto.mainImageId,
            publishedOn
        ];
        sql = format(sql, inserts);

        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results)
        })
    })
}
