import Express from 'express';
import { getHome, getIndex, getLogin, getSignup, postCharge, postLogin, postLogout, postSignup, postWithdraw } from '../controllers/controllers.js';
import { isAuth } from '../helpers/is-auth.js';

export const router = Express.Router();

router.get('/', isAuth, getHome);

router.get('/index', isAuth, getIndex);

router.get('/login', isAuth, getLogin);

router.get('/signup', isAuth, getSignup);

router.post('/signup', postSignup);

router.post('/login', postLogin);

router.post('/logout', postLogout);

router.post('/charge', isAuth, postCharge);

router.post('/withdraw', isAuth, postWithdraw);

