import { Router } from 'express';
import { index } from './../controllers/public/home-controller.js';
import { index as images } from './../controllers/public/image-controller.js';

const router = Router();

router.get('/', index);
router.get('/images', images);

export default router;