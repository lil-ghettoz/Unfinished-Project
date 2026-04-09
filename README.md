# Z Shield

Z Shield is a production-oriented starter for a personal safety and cybersecurity platform. This repository includes:

- `mobile/`: Expo React Native mobile app with panic flow, trusted contacts, and settings
- `backend/`: Express API that receives panic alerts, stores them, and prepares SMS delivery

## Project Structure

```text
Z-Shield/
├── mobile/
├── backend/
├── .env.example
├── .gitignore
└── README.md
```

## Environment Variables

Never commit real secrets. Copy the example values into local `.env` files:

- `mobile/.env`
- `backend/.env`

Variables used by the mobile app:

- `EXPO_PUBLIC_API_BASE_URL`: Base URL for the Express API
- `EXPO_PUBLIC_APP_NAME`: Friendly app name shown in the UI
- `EXPO_PUBLIC_SUPPORT_EMAIL`: Support contact shown in settings
- `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`: Reserved for future live map features

Variables used by the backend:

- `PORT`: API server port
- `NODE_ENV`: Runtime environment
- `CLIENT_URL`: Allowed frontend origin for CORS
- `ALERT_STORAGE_FILE`: JSON file path used for local alert storage
- `TWILIO_ACCOUNT_SID`: Twilio account SID
- `TWILIO_AUTH_TOKEN`: Twilio auth token
- `TWILIO_FROM_NUMBER`: Twilio sender number
- `DEFAULT_ALERT_MESSAGE`: Base SMS message used when an alert is triggered

## Setup

### 1. Create environment files

Create these files from the example values:

```bash
cp .env.example backend/.env
cp .env.example mobile/.env
```

On Windows PowerShell, create the files manually and keep only the variables relevant to each app.

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install mobile dependencies

```bash
cd ../mobile
npm install
```

## Run the Backend

```bash
cd backend
npm run dev
```

The API starts on `http://localhost:5000` by default.

## Run the Mobile App

```bash
cd mobile
npm start
```

Then open the Expo app on your Android device or run an emulator. Make sure `EXPO_PUBLIC_API_BASE_URL` points to a reachable backend URL on your local network.

## MVP Features Included

- Press-and-hold panic button
- Location permission request and GPS capture
- Panic alert submission to backend
- Emergency contacts management UI
- Panic mode status screen
- Alert history and safety settings UI
- Backend alert persistence to JSON storage
- Twilio-ready SMS delivery service with safe fallback logging

## Production Recommendations

- Replace local JSON storage with PostgreSQL
- Add authentication before launch
- Move alert fan-out to a queue worker
- Use signed URLs for evidence uploads
- Add Play Billing receipt verification on the backend
