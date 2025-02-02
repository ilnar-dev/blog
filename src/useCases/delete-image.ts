import { findById, remove as removeImage } from '../repositories/image-repository.js';
import fs from 'fs/promises';
import path from 'path';

export async function perform(imageId: number): Promise<boolean> {
    try {
        const image = await findById(imageId);
        if (!image) {
            throw new Error('Image not found');
        }

        await removeImage(imageId);
        const filePath = path.join(process.env.UPLOAD_DIR || '', image.fileName);
        await fs.unlink(filePath);

        return true;
    } catch (error: any) {
        throw new Error(`Failed to delete image: ${error.message}`);
    }
}
