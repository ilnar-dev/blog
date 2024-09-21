import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { create as createImage } from '../../../repositories/image-repository.js';

export async function upload(req: Request, res: Response) {
    const uploadedFile = req.files?.upload as UploadedFile;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded');
    }

    const filename = uploadedFile.name;
    const uploadPath = '/Users/ilnar/Projects/Blog/public/uploads/' + filename;

    try {
        await uploadedFile.mv(uploadPath);
        await createImage({
            fileName: filename,
            path: uploadPath
        });
        res.json({ "url": "/uploads/" + filename });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}
