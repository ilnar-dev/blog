import Article from './../../../models/article.js'
import { getAll, find } from './../../../repositories/article-repository.js'
import { perform as uploadImage } from './../../../useCases/upload-image.js'
import { perform as updateArticle } from './../../../useCases/update-article.js'
import { perform as createArticle, ArticleDto } from './../../../useCases/create-article.js'
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'

export function list (req: Request, res: Response) {
    getAll()
        .then(articles => res.render("admin/articles", {articles: articles, url: req.originalUrl}))
}

export function edit (req: Request, res: Response) {
    find(parseInt(req.params.id, 10))
        .then(article => res.render("admin/article", {article: article, url: req.originalUrl}))
        .catch(error => res.status(404).send(error.message))
}

export async function update(req: Request, res: Response) {
    let id = parseInt(req.params.id, 10);
    try {
        const originalArticle = await find(id);

        let articleDto = {
            title: req.body.title,
            intro: req.body.intro,
            text: req.body.text,
            mainImageId: req.body.main_image_id,
            published: 0
        };
        if ('on' === req.body.published) {
            articleDto.published = 1;
        } else {
            articleDto.published = 0;
        }

        if (req.files && 'mainImage' in req.files) {
            const mainImage = Array.isArray(req.files.mainImage) 
                ? req.files.mainImage[0] 
                : req.files.mainImage;
            let dbImage = await uploadImage(mainImage);
            articleDto.mainImageId = dbImage.id;
            await updateArticle(originalArticle, articleDto);

            res.redirect("/admin/articles/" + id);
        } else {
            await updateArticle(originalArticle, articleDto);

            res.redirect("/admin/articles/" + id);
        }
    } catch (error) {
        res.status(404).send('Article not found'); //todo: make a redirect to 404 page
    }
}

export function add (req: Request, res: Response) {
    let article = new Article()
    res.render("admin/article", {article: article, url: req.originalUrl})
}

export async function create(req: Request, res: Response) {
    const articleDto: ArticleDto = {
        title: req.body.title,
        intro: req.body.intro,
        text: req.body.text,
        published: req.body.published === 'on' ? 1 : 0,
        mainImageId: null
    };

    try {
        if (req.files && 'mainImage' in req.files) {
            const mainImage = req.files.mainImage as UploadedFile;
            const dbImage = await uploadImage(mainImage);
            articleDto.mainImageId = dbImage.id;
        }

        const newArticle = await createArticle(articleDto);
        res.redirect(`/admin/articles/${newArticle.id}`);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).send('Error creating article');
    }
}
