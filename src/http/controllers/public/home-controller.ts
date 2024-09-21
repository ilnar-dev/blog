import { getPublished } from './../../../repositories/article-repository.js';
import { Request, Response } from 'express';

export function index (req: Request, res: Response) {
    getPublished()
        .then(articles => res.render("public/index", {articles: articles}));
}
