import Article from './../models/article.js';
import { articleRepository } from './../repositories/article-repository.js';
import { imageRepository } from './../repositories/image-repository.js';

export interface ArticleDto {
  title: string;
  intro: string;
  text: string;
  published: number;
  mainImageId: number | null;
}

export async function perform(articleDto: ArticleDto): Promise<Article> {
  const newArticle = new Article();

  newArticle.title = articleDto.title;
  newArticle.intro = articleDto.intro;
  newArticle.text = articleDto.text;
  newArticle.published = articleDto.published === 1;

  if (articleDto.published === 1) {
    newArticle.publishedOn = new Date();
  }

  if (articleDto.mainImageId) {
    const mainImage = await imageRepository.findOne({ where: { id: articleDto.mainImageId } });
    if (mainImage) {
      newArticle.mainImage = mainImage;
    }
  }

  // Save the new article using the repository
  return await articleRepository.save(newArticle);
}
