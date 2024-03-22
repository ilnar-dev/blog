import { create } from './repositories/user-repository.js';
import crypto from 'crypto';
import User from './models/user.js';

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.pbkdf2Sync('admin', salt, 1000, 64, 'sha512').toString('hex');

const user = new User();
user.name = 'Admin';
user.email = 'admin@localhost';
user.password = hash;
user.salt = salt;

create(user).then((results) => {
    console.log('Admin user created');
});