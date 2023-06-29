import { getAll } from '../../repositories/ArticleRepository.js';

export function index (req, res) {
    getAll()
        .then(articles => res.render("public/index", {articles: articles}));
}