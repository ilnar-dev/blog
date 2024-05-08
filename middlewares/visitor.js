import { logVisitor } from '../useCases/log-visitor.js';

const formatedTimestamp = ()=> {
  const d = new Date()
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0].replace(/:/g, '-');
  return `${date} ${time}`
}

const visitor = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;

  logVisitor([ip, formatedTimestamp()]);
  next()
}

export default visitor; 