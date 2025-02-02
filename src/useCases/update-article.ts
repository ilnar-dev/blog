import Article from './../models/article.js';
import { ArticleDto } from './create-article.js';
import { articleRepository } from './../repositories/article-repository.js';
import { imageRepository } from './../repositories/image-repository.js';

export async function perform(originalArticle: Article, articleDto: ArticleDto): Promise<Article> {
    originalArticle.title = articleDto.title;
    originalArticle.intro = articleDto.intro;
    originalArticle.text = articleDto.text;

    if (!articleDto.published) {
        originalArticle.published = false;
        originalArticle.publishedOn = null;
    } else if (!originalArticle.published && articleDto.published) {
        originalArticle.published = true;
        originalArticle.publishedOn = new Date();
    } else {
        articleDto.published = true;
    }
    
    if (articleDto.mainImageId === null) {
        originalArticle.mainImage = null;
    } else if (articleDto.mainImageId !== undefined) {
        originalArticle.mainImage = await imageRepository.findOneBy({ id: articleDto.mainImageId });
    }

    // Save the updated article using the repository
    return await articleRepository.save(originalArticle);
}
