import { getAll, find } from '../../repositories/article-repository.js'
import { perform } from '../../useCases/upload-image.js'
import { perform as _perform } from '../../useCases/update-article.js'
import { perform as __perform } from '../../useCases/create-article.js'
import Article from '../../models/article.js'

export function list (req, res) {
    getAll()
        .then(articles => res.render("admin/articles", {articles: articles}))
}

export function edit (req, res) {
    let id = req.params.id
    find(id)
        .then(article => res.render("admin/article", article))
}

export function update (req, res) {
    let id = req.params.id
    let articleDto = {
        title: req.body.title,
        text: req.body.text,
        mainImageId: req.body.main_image_id
    }

    if (req.files) {
        perform(req.files.mainImage)
            .then((dbImage) => {
                articleDto.mainImageId = dbImage.id
                return _perform(articleDto, id)
            })
            .then(() => {
                res.redirect("/admin/articles/" + id)
            })
    } else {
        _perform(articleDto, id)
            .then(res.redirect("/admin/articles/" + id))
    }
}

export function add (req, res) {
    let article = new Article()
    res.render("admin/article", article)
}

export function create (req, res) {
    let articleDto = {
        title: req.body.title,
        text: req.body.text,
        mainImageId: req.body.main_image_id
    }

    if (req.files) {
        perform(req.files.mainImage)
            .then((dbImage) => {
                articleDto.mainImageId = dbImage.id
                return __perform(articleDto)
            })
            .then((result) => {
                res.redirect("/admin/articles/" + result.insertId)
            })
    } else {
        __perform(articleDto)
            .then(result => res.redirect("/admin/articles/" + result.insertId))
    }
}
