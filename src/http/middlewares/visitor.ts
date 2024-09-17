import { Request, Response, NextFunction } from 'express';
import { logVisitor } from '../../useCases/log-visitor.js';

const formattedTimestamp = (): string => {
  const d = new Date();
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0].replace(/:/g, '-');
  return `${date} ${time}`;
};

const visitor = (req: Request, res: Response, next: NextFunction): void => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.ip;
  const timestamp = formattedTimestamp();
  if (typeof ip === 'string') {
    logVisitor({ ip, timestamp })
      .then(() => next())
      .catch((error) => {
        console.error('Error logging visitor:', error);
        next();
      });
  } else {
    console.warn('Unable to log visitor: IP is undefined');
    next();
  }
};

export default visitor;