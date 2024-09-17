import connection from './../../../models/db.js';
import { format } from 'mysql2';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

export function upload(req: Request, res: Response) {
    const uploadedFile = req.files?.upload as UploadedFile;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded');
    }

    const filename = uploadedFile.name;
    const uploadPath = '/Users/ilnar/Projects/Blog/public/uploads/' + filename;

    uploadedFile.mv(uploadPath)
        .then(() => {
            return new Promise<void>((resolve, reject) => {
                const sql = "INSERT INTO image (file_name, path) VALUES (?, ?)";
                const inserts = [filename, uploadPath];
                const formattedSql = format(sql, inserts);

                connection.query(formattedSql, (error, results) => {
                    if (error) reject(error);
                    resolve();
                });
            });
        })
        .then(() => {
            res.json({ "url": "/uploads/" + filename });
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
}
