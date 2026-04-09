import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import PanicButton from '../components/PanicButton';
import StatusCard from '../components/StatusCard';
import { getCurrentLocation } from '../services/location';
import { sendPanicAlert } from '../services/api';

export default function HomeScreen({ navigation, appContext }) {
  const { panicState, setPanicState, contacts, settings } = appContext;

  const handlePanicActivation = async () => {
    try {
      setPanicState((current) => ({
        ...current,
        loading: true,
        lastError: null
      }));

      const location = await getCurrentLocation();
      const activeContacts = contacts.filter((contact) => contact.enabled);
      const alertPayload = {
        triggeredAt: new Date().toISOString(),
        message: 'Emergency alert activated from Z Shield.',
        location,
        contacts: activeContacts,
        subscriptionPlan: settings.subscriptionPlan,
        metadata: {
          deviceLabel: 'Expo Device',
          smsFallbackEnabled: settings.smsFallback
        }
      };

      const response = await sendPanicAlert(alertPayload);

      setPanicState({
        active: true,
        loading: false,
        lastAlert: response.alert,
        lastError: null
      });

      navigation.navigate('Panic');
    } catch (error) {
      setPanicState((current) => ({
        ...current,
        active: false,
        loading: false,
        lastError: error.message
      }));

      Alert.alert('Unable to activate panic mode', error.message);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Stay Protected. Anytime. Anywhere.</Text>
      <Text style={styles.heading}>Rapid response safety controls</Text>
      <Text style={styles.description}>
        Press and hold the shield to send your live location and emergency status to
        trusted contacts.
      </Text>

      <View style={styles.grid}>
        <StatusCard
          label="System Status"
          value={panicState.active ? 'Emergency Active' : 'Protected'}
          tone={panicState.active ? 'danger' : 'safe'}
        />
        <StatusCard
          label="Active Contacts"
          value={`${contacts.filter((item) => item.enabled).length}`}
          tone="info"
        />
        <StatusCard
          label="Plan"
          value={settings.subscriptionPlan}
          tone="neutral"
        />
        <StatusCard
          label="Fallback SMS"
          value={settings.smsFallback ? 'Enabled' : 'Disabled'}
          tone={settings.smsFallback ? 'safe' : 'neutral'}
        />
      </View>

      <PanicButton disabled={panicState.loading} onActivate={handlePanicActivation} />

      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>What happens when Panic Mode starts</Text>
        <Text style={styles.infoItem}>1. Captures current GPS coordinates</Text>
        <Text style={styles.infoItem}>2. Sends alert to the backend API</Text>
        <Text style={styles.infoItem}>3. Prepares SMS delivery to trusted contacts</Text>
        <Text style={styles.infoItem}>4. Opens the live Panic screen for monitoring</Text>
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
  eyebrow: {
    color: '#3AA0FF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.4
  },
  heading: {
    color: '#F4F7FB',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 10
  },
  description: {
    color: '#9BA8C7',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12
  },
  grid: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  infoPanel: {
    marginTop: 12,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#0C1222',
    borderWidth: 1,
    borderColor: '#18233C'
  },
  infoTitle: {
    color: '#F4F7FB',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12
  },
  infoItem: {
    color: '#B8C4E0',
    marginBottom: 8,
    lineHeight: 20
  }
});
