import { Router, Request, Response, NextFunction } from 'express';
import { list, edit, add, create, update } from './../controllers/admin/article-controller.js';
import { upload, deleteImage } from './../controllers/admin/image-controller.js';
import { index, login } from './../controllers/admin/index-controller.js';
import passport from "passport";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/admin/login')
}

const router = Router();
router.get('/', ensureAuthenticated, index);

// Security
router.get('/login', login);
router.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureMessage: true
}), (req, resp, next) => {});

// Articles
router.get('/articles', ensureAuthenticated, list);
router.get('/articles/:id(\\d+)', ensureAuthenticated, edit);
router.get('/articles/add', ensureAuthenticated, add);
router.post('/articles', ensureAuthenticated, create);
router.post('/articles/:id', ensureAuthenticated, update);

// Images
router.post('/images', ensureAuthenticated, upload);
router.delete('/images/:id', ensureAuthenticated, deleteImage);

export default router;
