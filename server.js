import express from 'express';
import session from 'express-session';
import redis from 'ioredis';
import RedisStore from 'connect-redis';
import fileUpload from 'express-fileupload';
import passport from './config/passport.js';
import adminRouter from './routes/admin.js';
import publicRouter from './routes/public.js';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({}));


const redisClient = redis.createClient({
    host: 'blog-redis',
    port: 6379
});

app.use(session({
    store: new RedisStore({ client: redisClient}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true } // For https connection set true
}));
//test

app.use(passport.initialize({}));
app.use(passport.session({}));

// Routers
app.use('/', publicRouter);
app.use('/admin', adminRouter);

const port = process.env.PORT || 3000;

app.listen(port);
