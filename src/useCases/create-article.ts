import connection from './../models/db.js';
import { format } from 'mysql2';
import Article from './../models/article.js';

export interface ArticleDto {
  title: string;
  intro: string;
  text: string;
  published: number;
  mainImageId: number | null;
}

export function perform(articleDto: ArticleDto): Promise<Article> {
  return new Promise((resolve, reject) => {
    let publishedOn: Date | null = null;
    if (articleDto.published === 1) {
      publishedOn = new Date();
    }
    const sql =
      "INSERT INTO article (title, intro, text, published, main_image_id, published_on) VALUES (?, ?, ?, ?, ?, ?)";
    const inserts = [
      articleDto.title,
      articleDto.intro,
      articleDto.text,
      articleDto.published,
      articleDto.mainImageId,
      publishedOn
    ];
    const formattedSql = format(sql, inserts);

    connection.query(formattedSql, (error: Error | null, results: any) => {
      if (error) reject(error);
      else {
        const newArticle = new Article();
        newArticle.id = results.insertId;
        newArticle.title = articleDto.title;
        newArticle.intro = articleDto.intro;
        newArticle.text = articleDto.text;
        newArticle.published = Boolean(articleDto.published);
        newArticle.main_image_id = articleDto.mainImageId ?? null;
        newArticle.publishedOn = publishedOn;
        resolve(newArticle);
      }
    });
  });
}
