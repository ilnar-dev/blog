import connection from '../models/db.js';
import { format } from 'mysql';
import Image from '../models/image.js';

export function perform (image) {
    const uploadDir = process.env.UPLOAD_DIR;
    let uploadPath = uploadDir + image.name;

    return image.mv(uploadPath)
        .then((result) => {
            return new Promise((resolve, reject) => {
                let sql = "" +
                    "INSERT INTO image (file_name, path) VALUES (?, ?)";
                let inserts = [image.name, uploadPath];
                sql = format(sql, inserts);

                connection.query(sql, function (error, results, fields) {
                    if (error) throw error;
                    let dbImage = new Image();
                    dbImage.id = results.insertId;
                    dbImage.filename = image.name;
                    dbImage.path = uploadPath;

                    resolve(dbImage);
                })
            })
        })
}
