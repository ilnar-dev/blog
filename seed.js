import readline from 'readline';
import { create } from './repositories/user-repository.js';
import crypto from 'crypto';
import User from './models/user.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('close', () => {
    process.exit(0);
});

rl.question('Enter username: ', (username) => {
    rl.question('Enter email: ', (email) => {
        rl.question('Enter password: ', (password) => {
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

            const user = new User();
            user.name = username;
            user.email = `${username}@localhost`;
            user.password = hash;
            user.salt = salt;

            create(user).then((results) => {
                console.log('Admin user created');
                rl.close();
            });
        });
    });
});