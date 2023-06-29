import { createConnection } from 'mysql';
const connection = createConnection({
    host     : 'localhost',
    user     : 'blog',
    password : 'blog',
    database : 'blog'
});

connection.connect();

export default connection
