import express from 'express';
import authRoutes from './routes/auth';
import panicRoutes from './routes/panic';
import locationRoutes from './routes/location';
import contactRoutes from './routes/contacts';
import subscriptionRoutes from './routes/subscriptions';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/panic', panicRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.listen(5000, () => {
  console.log('Z Shield backend listening on port 5000');
});
