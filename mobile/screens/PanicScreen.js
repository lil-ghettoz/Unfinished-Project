import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StatusCard from '../components/StatusCard';

export default function PanicScreen({ appContext }) {
  const { panicState, contacts, settings } = appContext;
  const lastAlert = panicState.lastAlert;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>Emergency Mode</Text>
        <Text style={styles.bannerTitle}>
          {panicState.active ? 'Alert delivery in progress' : 'No active emergency'}
        </Text>
        <Text style={styles.bannerText}>
          Keep the phone with you if it is safe. Trusted contacts can act using the
          latest alert details.
        </Text>
      </View>

      <View style={styles.grid}>
        <StatusCard
          label="Alert ID"
          value={lastAlert?.id || 'Unavailable'}
          tone={panicState.active ? 'danger' : 'neutral'}
        />
        <StatusCard
          label="Recipients"
          value={`${contacts.filter((item) => item.enabled).length}`}
          tone="info"
        />
        <StatusCard
          label="Cloud Sync"
          value={settings.cloudSync ? 'Queued' : 'Off'}
          tone={settings.cloudSync ? 'info' : 'neutral'}
        />
        <StatusCard
          label="Error State"
          value={panicState.lastError || 'None'}
          tone={panicState.lastError ? 'danger' : 'safe'}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Latest coordinates</Text>
        <Text style={styles.cardText}>
          Latitude: {lastAlert?.location?.latitude ?? '--'}
        </Text>
        <Text style={styles.cardText}>
          Longitude: {lastAlert?.location?.longitude ?? '--'}
        </Text>
        <Text style={styles.cardText}>
          Accuracy: {lastAlert?.location?.accuracy ?? '--'} meters
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Emergency workflow</Text>
        <Text style={styles.cardText}>• Alert stored locally on the backend</Text>
        <Text style={styles.cardText}>• SMS payload prepared for delivery provider</Text>
        <Text style={styles.cardText}>• Tracking and recording reserved for next phase</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#060914'
  },
  content: {
    padding: 20,
    paddingBottom: 32
  },
  banner: {
    backgroundColor: '#2A0D17',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#743140',
    padding: 20
  },
  bannerLabel: {
    color: '#FF8793',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 1.4
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 8
  },
  bannerText: {
    color: '#F3D9DE',
    marginTop: 10,
    lineHeight: 22
  },
  grid: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  card: {
    marginTop: 18,
    backgroundColor: '#0C1222',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#18233C',
    padding: 18
  },
  cardTitle: {
    color: '#F4F7FB',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10
  },
  cardText: {
    color: '#B8C4E0',
    marginBottom: 8,
    lineHeight: 20
  }
});
