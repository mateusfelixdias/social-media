import { Router } from 'express';
import { create } from '../../api/post/create';
import { checkToken } from '../../services/token';
import { likePost } from '../../api/post/likePost';
import { upload } from '../../api/user/utils/upload';
import { findFeedPost } from '../../api/post/findFeedPost';
import { findUserPost } from '../../api/post/findUserPost';

const router = Router();

router.post('/', checkToken, upload.single('picturePath'), create);

router.get('/', checkToken, findFeedPost);

router.get('/:userId/post', checkToken, findUserPost);

router.patch('/:id/like', checkToken, likePost);

export default router;
