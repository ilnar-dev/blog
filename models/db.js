import { createPool } from 'mysql';

const pool = createPool({
    host: 'blog-db8',
    user: 'blog',
    password: 'blog',
    database: 'blog',
    connectionLimit: 10
});

export default pool;