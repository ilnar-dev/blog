import connection from '../../models/db.js';
import { format } from 'mysql';
// const Image = require('../../models/article')

export function temp(req, res) {
    res.render("admin/image")
}

export function upload(req, res) {
    let uploadPath = '/Users/ilnar/Projects/Blog/public/uploads/' + req.files.file.name

    req.files.file.mv(uploadPath)
        .then(
            (result) => {
                return new Promise((resolve, reject) => {
                    let sql = "" +
                        "INSERT INTO images (file_name, path) VALUES (?, ?)";
                    let inserts = [req.files.file.name, uploadPath];
                    sql = format(sql, inserts);

                    connection(sql, function (error, results, fields) {
                        if (error) throw error;
                        resolve(results)
                    })
                })
            })
        .then(
            res.redirect("admin/image")
        )
}
