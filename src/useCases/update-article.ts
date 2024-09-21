import Article from './../models/article.js';
import { ArticleDto } from './create-article.js';
import { articleRepository } from './../repositories/article-repository.js';
import { imageRepository } from './../repositories/image-repository.js';
export async function perform(originalArticle: Article, articleDto: ArticleDto): Promise<Article> {
    if (articleDto.published === 1 && originalArticle.publishedOn === null) {
        originalArticle.publishedOn = new Date();
    }

    if (articleDto.mainImageId) {
        const mainImage = await imageRepository.findOne({ where: { id: articleDto.mainImageId } });
        if (mainImage) {
            originalArticle.mainImage = mainImage;
        }
    }

    // Update article properties
    originalArticle.title = articleDto.title;
    originalArticle.intro = articleDto.intro;
    originalArticle.text = articleDto.text;
    originalArticle.published = articleDto.published === 1;

    // Save the updated article using the repository
    return await articleRepository.save(originalArticle);
}
