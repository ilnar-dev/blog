import connection from '../models/db.js';
import { format } from 'mysql';
import Article from '../models/article.js';

export function find (id) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM article WHERE id = ?'
        sql = format(sql, [id]);

        connection.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        })
    }).then((results) => {
        return new Promise((resolve, reject) => {
            let waitForImage = null;
            let article = new Article()
            article.id = results[0].id
            article.title = results[0].title
            article.text = results[0].text
            article.main_image_id = results[0].main_image_id
            if (results[0].main_image_id) {
                waitForImage = new Promise((resolve, reject) => {
                    let queryString = 'SELECT * FROM image WHERE id = ' + results[0].main_image_id

                    connection.query(queryString, function (error, results, fields) {
                        if (error) reject(error);
                        resolve(results)
                    })
                })
            }
            if (null === waitForImage) {
                resolve(article)
            } else {
                waitForImage
                    .then((imageResults) => {
                        article.mainImage = {
                            filename: imageResults[0].file_name
                        }

                        resolve(article);
                    })
                    .catch((error) => reject(error))
            }
        });
    })
}

export function getAll () {
    return new Promise((resolve, reject) => {
        let queryString = `
            SELECT 
                article.id,
                article.title,
                article.text,
                image.file_name
            FROM article JOIN image ON image.id = article.main_image_id`;

        connection.query(queryString, function (error, results, fields) {
            if (error) reject(error);

            let articles = []
            results.forEach(element => {
                console.log(element)
                let article = new Article()
                article.id = element.id
                article.title = element.title
                article.text = element.text
                article.mainImage = {
                    filename: element.file_name
                };

                articles.push(article)
            })

            resolve(articles);
        })
    })
}

