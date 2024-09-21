import { Repository } from 'typeorm';
import Visitor from './../models/visitor.js';
import dataSource from './../config/datasourse.js';

export const visitorRepository: Repository<Visitor> = dataSource.getRepository(Visitor);

export async function create(visitorData: Partial<Visitor>): Promise<Visitor> {
    const visitor = visitorRepository.create(visitorData);
    return visitorRepository.save(visitor);
}
