import { Router } from 'express';
import { index } from '../controllers/public/HomeController.js';

const router = Router();

router.get('/', index);

export default router;