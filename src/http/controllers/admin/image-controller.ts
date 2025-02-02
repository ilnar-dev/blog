import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { perform as uploadImage } from '../../../useCases/upload-image.js';
import { perform as removeImage } from '../../../useCases/delete-image.js';

export async function upload(req: Request, res: Response) {
    const uploadedFile = req.files?.upload as UploadedFile;
    if (!uploadedFile) {
        return res.status(400).send('No file uploaded');
    }
    try {
        const dbImage = await uploadImage(uploadedFile);
        res.json({ "url": `/uploads/${dbImage.fileName}` });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export async function deleteImage(req: Request, res: Response) {
    const imageId = parseInt(req.params.id, 10);
    try {
        await removeImage(imageId);
        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}