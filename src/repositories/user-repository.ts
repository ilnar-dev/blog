import { Repository } from 'typeorm';
import User from './../models/user.js';
import dataSource from './../config/datasourse.js';

export const userRepository: Repository<User> = dataSource.getRepository(User);

export async function findByEmail(email: string): Promise<User | null> {
    return userRepository.findOne({ where: { email } });
}

export async function findById(id: number): Promise<User | null> {
    return userRepository.findOne({ where: { id } });
}

export async function create(userData: Partial<User>): Promise<User> {
    const user = userRepository.create(userData);
    return userRepository.save(user);
}
