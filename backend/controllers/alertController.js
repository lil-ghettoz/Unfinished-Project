const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { sendEmergencySms } = require('../services/smsService');

const storagePath = path.resolve(
  __dirname,
  '..',
  process.env.ALERT_STORAGE_FILE || './data/alerts.json'
);

async function readAlerts() {
  try {
    const raw = await fs.readFile(storagePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(path.dirname(storagePath), { recursive: true });
      await fs.writeFile(storagePath, '[]', 'utf8');
      return [];
    }

    throw error;
  }
}

async function writeAlerts(alerts) {
  await fs.mkdir(path.dirname(storagePath), { recursive: true });
  await fs.writeFile(storagePath, JSON.stringify(alerts, null, 2), 'utf8');
}

exports.listAlerts = async (req, res, next) => {
  try {
    const alerts = await readAlerts();
    res.json({
      alerts: alerts.sort(
        (left, right) => new Date(right.triggeredAt) - new Date(left.triggeredAt)
      )
    });
  } catch (error) {
    next(error);
  }
};

exports.createAlert = async (req, res, next) => {
  try {
    const {
      triggeredAt,
      location,
      contacts = [],
      message,
      metadata = {},
      subscriptionPlan
    } = req.body;

    if (
      !triggeredAt ||
      typeof location?.latitude !== 'number' ||
      typeof location?.longitude !== 'number'
    ) {
      return res.status(400).json({
        message: 'triggeredAt and valid location coordinates are required.'
      });
    }

    const alert = {
      id: uuidv4(),
      triggeredAt,
      status: 'ACTIVE',
      message:
        message || process.env.DEFAULT_ALERT_MESSAGE || 'Emergency alert triggered.',
      location,
      contacts,
      metadata,
      subscriptionPlan: subscriptionPlan || 'Free',
      createdAt: new Date().toISOString()
    };

    const existingAlerts = await readAlerts();
    existingAlerts.push(alert);
    await writeAlerts(existingAlerts);

    const smsResult = await sendEmergencySms({
      contacts,
      location,
      alertId: alert.id,
      message: alert.message
    });

    res.status(201).json({
      message: 'Alert created successfully.',
      alert: {
        ...alert,
        sms: smsResult
      }
    });
  } catch (error) {
    next(error);
  }
};
