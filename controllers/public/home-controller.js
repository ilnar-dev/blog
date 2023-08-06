import { getPublished } from '../../repositories/article-repository.js';

export function index (req, res) {
    getPublished()
        .then(articles => res.render("public/index", {articles: articles}));
}
