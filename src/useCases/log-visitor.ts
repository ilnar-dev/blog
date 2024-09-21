import { visitorRepository } from './../repositories/visitor-repository.js';
import Visitor from './../models/visitor.js';

export interface VisitorDto {
  ip: string;
  timestamp: Date;
}

export async function perform(visitorDto: VisitorDto): Promise<Visitor> {
  const newVisitor = new Visitor();
  newVisitor.ip = visitorDto.ip;
  newVisitor.insertedAt = visitorDto.timestamp;

  return await visitorRepository.save(newVisitor);
}
