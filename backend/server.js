require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const alertRoutes = require('./routes/alertRoutes');

const app = express();
const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || '*';
const storageFile = process.env.ALERT_STORAGE_FILE || './data/alerts.json';
const resolvedStoragePath = path.resolve(__dirname, storageFile);

fs.mkdirSync(path.dirname(resolvedStoragePath), { recursive: true });

if (!fs.existsSync(resolvedStoragePath)) {
  fs.writeFileSync(resolvedStoragePath, '[]', 'utf8');
}

app.use(
  cors({
    origin: clientUrl === '*' ? true : clientUrl
  })
);
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/alerts', alertRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Unexpected server error.'
  });
});

app.listen(port, () => {
  console.log(`Z Shield backend running on port ${port}`);
});
