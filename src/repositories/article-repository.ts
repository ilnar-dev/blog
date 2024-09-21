import { Repository } from 'typeorm';
import Article from './../models/article.js';
import dataSource from './../config/datasourse.js';

export const articleRepository: Repository<Article> = dataSource.getRepository(Article);

export async function find(id: number): Promise<Article> {
    const article = await articleRepository.findOne({
        where: { id },
        relations: ['mainImage']
    });

    if (!article) {
        throw new Error('Article not found');
    }

    return article;
}

export function getAll(): Promise<Article[]> {
    return articleRepository.find({
        relations: ['mainImage']
    });
}

export function getPublished(): Promise<Article[]> {
    return articleRepository.find({
        where: { published: true },
        relations: ['mainImage']
    });
}
