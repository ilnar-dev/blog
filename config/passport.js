import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import { findById, findByEmail } from '../repositories/user-repository.js';

passport.use(new LocalStrategy(function verify(username, password, cb) {
    findByEmail(username).then((user) => {
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        crypto.pbkdf2(password, user.salt, 1000, 64, 'sha512', function (err, hashedPassword) {
            if (err) { return cb(err); }
            let passw = Buffer.from(user.password, "hex");
            if (!crypto.timingSafeEqual(passw, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, user);
        });
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
    findById(userId).then((user) => {
        done(null, user);
    });
});

export default passport;
