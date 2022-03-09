/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/user';
import getAuthToken from '../middlewares/authenticate';

const router = express.Router();

/** Controllers */
router.get('/user', getAuthToken, controller.getUsers);
router.post('/sign-up', controller.signup);
router.post('/log-in', controller.login);

export = router;