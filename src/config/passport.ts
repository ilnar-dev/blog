import passport from 'passport';
import { Strategy } from 'passport-local';
import crypto from 'crypto';
import { findById, findByEmail } from './../repositories/user-repository.js';
import User from './../models/user.js';

passport.use(new Strategy(function verify(username, password, cb) {
    findByEmail(username).then((user: User) => {
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        
        const storedHash = Buffer.from(user.password, "hex");
        const hashLength = storedHash.length;

        crypto.pbkdf2(password, user.salt, 1000, hashLength, 'sha512', function (err, hashedPassword) {
            if (err) { return cb(err); }
            
            try {
                if (!crypto.timingSafeEqual(storedHash, hashedPassword)) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                return cb(null, user);
            } catch (error) {
                console.error('Password comparison error:', error);
                return cb(null, false, { message: 'An error occurred during authentication.' });
            }
        });
    }).catch(err => {
        console.error('User lookup error:', err);
        return cb(err);
    });
}));

passport.serializeUser(function (user: any, done) {
    done(null, user.id);
});

passport.deserializeUser(function (userId: number, done) {
    findById(userId).then((user) => {
        done(null, user);
    });
});

export default passport;
