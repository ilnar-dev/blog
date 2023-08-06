import connection from '../models/db.js';
import { format } from 'mysql';

export function perform (originalArticle, articleDto) {
    return new Promise((resolve) => {
        let publishedOn = originalArticle.publishedOn;
        if (1 === articleDto.published && null === originalArticle.publishedOn) {
            publishedOn = new Date();
        }
        let sql = "UPDATE article SET title = ?, intro = ?, text = ?, published = ?, main_image_id = ?, published_on = ? WHERE id = ?";
        let inserts = [
            articleDto.title,
            articleDto.intro,
            articleDto.text,
            articleDto.published,
            articleDto.mainImageId,
            publishedOn,
            originalArticle.id
        ];
        sql = format(sql, inserts);

        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results)
        })
    })
}
