import { Router } from 'express';

const router = Router();

router.post('/update', (req, res) => {
  res.json({ synced: true });
});

export default router;
