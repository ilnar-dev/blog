import { getAll } from '../../repositories/article-repository.js';

export function index (req, res) {
    getAll()
        .then(articles => res.render("public/index", {articles: articles}));
}