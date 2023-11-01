import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.use(new LocalStrategy(function verify(username, password, cb) {
    if (username === 'admin' && password === 'admin') {
        return cb(null, {id: 1, name: 'admin'});
    } else {
        return cb(null, false);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
    if (userId === 1) {
        done(null, {id: 1, name: 'admin'});
    }
});

export default passport;
