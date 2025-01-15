import express from 'express';
import { login, current } from '../controllers/sessionController.js';
import { authenticateJwt } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/current', authenticateJwt, current);

export default router;
