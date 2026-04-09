import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.status(201).json({ alertId: `alert_${Date.now()}`, status: 'active' });
});

router.get('/history', (req, res) => {
  res.json({
    items: [
      { id: 'alert_1', createdAt: new Date().toISOString(), status: 'resolved' }
    ]
  });
});

export default router;
