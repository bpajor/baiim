import Express from 'express';
import { getHome, getLogin, getSignup } from '../controllers/controllers.js';

export const router = Express.Router();

router.get('/', getHome);

router.get('/login', getLogin);

router.get('/signup', getSignup)

