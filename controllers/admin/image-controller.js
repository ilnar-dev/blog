import connection from '../../models/db.js';
import { format } from 'mysql';

export function upload(req, res) {
    let filename = req.files.upload.name;
    let uploadPath = '/Users/ilnar/Projects/Blog/public/uploads/' + filename

    req.files.upload.mv(uploadPath)
        .then(
            () => {
                return new Promise((resolve) => {
                    let sql = "" +
                        "INSERT INTO image (file_name, path) VALUES (?, ?)";
                    let inserts = [filename, uploadPath];
                    sql = format(sql, inserts);

                    connection.query(sql, function (error, results) {
                        if (error) throw error;
                        resolve(results)
                    })
                })
            })
        .then(
            res.json({ "url": "/uploads/" + filename })
        )
        .catch((error) => {
            res.status(500).send(error.message)
        })
}
