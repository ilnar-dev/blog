import { Request, Response, NextFunction } from 'express';
import { perform as logVisitor } from '../../useCases/log-visitor.js';

const visitor = (req: Request, res: Response, next: NextFunction): void => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.ip;
  const timestamp = new Date();

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
