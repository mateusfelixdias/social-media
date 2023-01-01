import user from './user';
import auth from './auth';
import post from './post';
import router from './user';

router.use('/auth', auth);
router.use('/posts', post);
router.use('/users', user);

export default router;
