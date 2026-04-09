import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    items: [{ id: 'contact_1', name: 'Mom', phone: '+639171111111' }]
  });
});

export default router;
