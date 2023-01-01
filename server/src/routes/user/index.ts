import { Router } from 'express';
import { create } from '../../api/user/create';
import { showMe } from '../../api/user/showMe';
import { checkToken } from '../../services/token';
import { upload } from '../../api/user/utils/upload';
import { findserFriends } from '../../api/user/findserFriends';
import { addOrRemoveFriend } from '../../api/user/addOrRemoveFriend';

const router = Router();

router.post('/', upload.single('picturePath'), create);

router.get('/me/:id', checkToken, showMe);

router.get('/my-friends/:id', checkToken, findserFriends);

router.patch('/:friendId', checkToken, addOrRemoveFriend);

export default router;
