import { Router } from 'express';

const router = Router();

router.get('/status', (req, res) => {
  res.json({ plan: 'free', active: true });
});

export default router;
