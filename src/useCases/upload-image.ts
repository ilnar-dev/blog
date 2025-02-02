import { UploadedFile } from 'express-fileupload';
import Image from './../models/image.js';
import { create as createImage } from '../repositories/image-repository.js';

export async function perform(image: UploadedFile): Promise<Image> {
    const uploadDir = process.env.UPLOAD_DIR || '/Users/ilnar/Projects/Blog/public/uploads/';
    const uploadPath = uploadDir + image.name;

    try {
        await image.mv(uploadPath);
        
        const dbImage = await createImage({
            fileName: image.name,
            path: uploadPath
        });

        return dbImage;
    } catch (error: any) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}
  