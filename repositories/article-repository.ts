import connection from '../models/db.js';
import { format } from 'mysql';
import Article from '../models/article.js';

export function find(id: number): Promise<Article> {
    return new Promise<any[]>((resolve, reject) => {
        let sql = 'SELECT * FROM article WHERE id = ?'
        sql = format(sql, [id]);

        connection.query(sql, function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        })
    })
    .then((results: any[]) => {
        if (results.length === 0) {
            throw new Error('Article not found');
        }
        return new Promise<Article>((resolve, reject) => {
            let waitForImage = null;
            let article = new Article();
            article.id = results[0].id;
            article.title = results[0].title;
            article.intro = results[0].intro;
            article.text = results[0].text;
            article.main_image_id = results[0].main_image_id;
            article.publishedOn = results[0].published_on;
            article.published = results[0].published;
            if (results[0].main_image_id) {
                waitForImage = new Promise<any[]>((resolve, reject) => {
                    let queryString = 'SELECT * FROM image WHERE id = ?';
                    connection.query(queryString, [results[0].main_image_id], function (error, results, fields) {
                        if (error) reject(error);
                        resolve(results);
                    });
                });
            }
            if (null === waitForImage) {
                resolve(article);
            } else {
                waitForImage
                    .then((imageResults) => {
                        article.mainImage = {
                            filename: imageResults[0].file_name
                        };

                        resolve(article);
                    })
                    .catch((error) => reject(error));
            }
        });
    })
}

export function getAll(): Promise<Article[]> {
    return new Promise((resolve, reject) => {
        let queryString = `
            SELECT 
                article.id,
                article.title,
                article.intro,
                article.text,
                article.published,
                article.published_on,
                image.file_name
            FROM article JOIN image ON image.id = article.main_image_id`;

        connection.query(queryString, function (error, results, fields) {
            if (error) reject(error);

            let articles: Article[] = [];
            results.forEach((element: any) => {
                let article = createArticleFromRow(element);
                articles.push(article);
            })

            resolve(articles);
        })
    })
}

export function getPublished(): Promise<Article[]> {
    return new Promise((resolve, reject) => {
        let queryString = `
            SELECT 
                article.id,
                article.title,
                article.intro,
                article.text,
                article.published,
                article.published_on,
                image.file_name
            FROM article LEFT JOIN image ON image.id = article.main_image_id
            WHERE article.published = 1`;

        connection.query(queryString, function (error, results, fields) {
            if (error) reject(error);

            let articles: Article[] = [];
            results.forEach((element: any) => {
                let article = createArticleFromRow(element);
                articles.push(article);
            })

            resolve(articles);
        })
    });
}

function createArticleFromRow(row: any): Article {
    let article = new Article();
    article.id = row.id;
    article.title = row.title;
    article.intro = row.intro;
    article.text = row.text;
    article.mainImage = {
        filename: row.file_name
    };
    article.published = row.published;
    article.publishedOn = new Date(row.published_on);

    return article;
}
