import { Router } from 'express';
import { login } from '../../api/auth';

const router = Router();

router.post('/', login);

export default router;
