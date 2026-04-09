import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  res.json({ token: 'mock-token', userId: 'user_1' });
});

export default router;
