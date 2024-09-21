import { Repository } from 'typeorm';
import Image from './../models/image.js';
import dataSource from './../config/datasourse.js';

export const imageRepository: Repository<Image> = dataSource.getRepository(Image);

export async function findById(id: number): Promise<Image | null> {
    return imageRepository.findOne({ where: { id } });
}

export async function create(imageData: Partial<Image>): Promise<Image> {
    const image = imageRepository.create(imageData);
    return imageRepository.save(image);
}

export async function update(id: number, imageData: Partial<Image>): Promise<Image | null> {
    await imageRepository.update(id, imageData);
    return findById(id);
}

export async function remove(id: number): Promise<void> {
    await imageRepository.delete(id);
}