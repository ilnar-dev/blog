import { Router } from 'express'
const router = Router()
import { list, edit, add, create, update } from '../controllers/admin/ArticleController.js'
import { temp, upload } from '../controllers/admin/ImageController.js'

router.get('/', function (req, res) {
    res.render("admin/index")
})

// Articles
router.get('/articles', list)
router.get('/articles/:id(\\d+)', edit)
router.get('/articles/add', add)
router.post('/articles', create)
router.post('/articles/:id', update)

// Images
router.get('/images', temp)
router.post('/images', upload)

export default router
