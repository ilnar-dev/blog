import connection from '../models/db.js';
import { format } from 'mysql';
import Image from '../models/image.js';
import { UploadedFile } from 'express-fileupload';

export function perform(image: UploadedFile) {
    const uploadDir = process.env.UPLOAD_DIR;
    let uploadPath = uploadDir + image.name;

    return image.mv(uploadPath)
        .then(() => {
            return new Promise<Image>((resolve, reject) => {
                let sql = "" +
                    "INSERT INTO image (file_name, path) VALUES (?, ?)";
                let inserts = [image.name, uploadPath];
                sql = format(sql, inserts);

                connection.query(sql, function (error, results, fields) {
                    if (error) reject(error);
                    let dbImage = new Image();
                    dbImage.id = results.insertId;
                    dbImage.filename = image.name;
                    dbImage.path = uploadPath;

                    resolve(dbImage);
                })
            })
        })
}
