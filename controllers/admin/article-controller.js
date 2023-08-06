import { getAll, find } from '../../repositories/article-repository.js'
import { perform as uploadImage } from '../../useCases/upload-image.js'
import { perform as updateArticle } from '../../useCases/update-article.js'
import { perform as createArticle } from '../../useCases/create-article.js'
import Article from '../../models/article.js'

export function list (req, res) {
    getAll()
        .then(articles => res.render("admin/articles", {articles: articles, url: req.originalUrl}))
}

export function edit (req, res) {
    let id = req.params.id
    find(id)
        .then(article => res.render("admin/article", {article: article, url: req.originalUrl}))
}

export async function update(req, res) {
    let id = req.params.id;
    try {
        const originalArticle = await find(id);

        let articleDto = {
            title: req.body.title,
            intro: req.body.intro,
            text: req.body.text,
            mainImageId: req.body.main_image_id
        };
        if ('on' === req.body.published) {
            articleDto.published = 1;
        } else {
            articleDto.published = 0;
        }

        if (req.files) {
            let dbImage = await uploadImage(req.files.mainImage);
            articleDto.mainImageId = dbImage.id
            await updateArticle(originalArticle, articleDto)

            res.redirect("/admin/articles/" + id)
        } else {
            await updateArticle(originalArticle, articleDto);

            res.redirect("/admin/articles/" + id);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send('Article not found'); //todo: make a redirect to 404 page
    }
}

export function add (req, res) {
    let article = new Article()
    res.render("admin/article", {article: article, url: req.originalUrl})
}

export function create (req, res) {
    let articleDto = {
        title: req.body.title,
        intro: req.body.intro,
        text: req.body.text,
        published: req.body.published,
        mainImageId: req.body.main_image_id
    }

    if (req.files) {
        uploadImage(req.files.mainImage)
            .then((dbImage) => {
                articleDto.mainImageId = dbImage.id
                return createArticle(articleDto)
            })
            .then((result) => {
                res.redirect("/admin/articles/" + result.insertId)
            })
    } else {
        createArticle(articleDto)
            .then(result => res.redirect("/admin/articles/" + result.insertId))
    }
}
