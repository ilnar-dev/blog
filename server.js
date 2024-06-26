import express from 'express';
import session from 'express-session';
import redis from 'ioredis';
import RedisStore from 'connect-redis';
import fileUpload from 'express-fileupload';
import passport from './config/passport.js';
import adminRouter from './routes/admin.js';
import publicRouter from './routes/public.js';
import visitor from './middlewares/visitor.js';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({}));


const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

app.use(session({
    store: new RedisStore({ client: redisClient}),
    secret: 'keyboard cat', // TODO: pass it as an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production' ? true : false 
    }
}));

// Middlewares
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(visitor)

// Routers
app.use('/', publicRouter);
app.use('/admin', adminRouter);

const port = process.env.PORT;

app.listen(port);
