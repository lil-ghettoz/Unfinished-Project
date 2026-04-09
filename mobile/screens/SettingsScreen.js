import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen({ appContext }) {
  const { settings, setSettings } = appContext;
  const supportEmail = process.env.EXPO_PUBLIC_SUPPORT_EMAIL || 'support@example.com';
  const appName = process.env.EXPO_PUBLIC_APP_NAME || 'Z Shield';

  const toggleSetting = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.subheading}>
        Configure emergency fallback behavior, privacy controls, and your current plan.
      </Text>

      <View style={styles.card}>
        <Row
          label="Fallback SMS"
          value={settings.smsFallback}
          onToggle={() => toggleSetting('smsFallback')}
        />
        <Row
          label="Cloud Sync"
          value={settings.cloudSync}
          onToggle={() => toggleSetting('cloudSync')}
        />
        <Row
          label="Dark Mode"
          value={settings.darkMode}
          onToggle={() => toggleSetting('darkMode')}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account security</Text>
        <Text style={styles.cardText}>Panic PIN: {settings.panicPin}</Text>
        <Text style={styles.cardText}>Plan: {settings.subscriptionPlan}</Text>
        <Text style={styles.cardText}>App: {appName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Support</Text>
        <Text style={styles.cardText}>Contact: {supportEmail}</Text>
        <Text style={styles.cardText}>
          In production, upgrade this screen to manage billing, permissions, and hidden mode.
        </Text>
      </View>
    </ScrollView>
  );
}

function Row({ label, value, onToggle }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#32415F', true: '#2F8C6C' }}
        thumbColor={value ? '#62F0BF' : '#CFD7EA'}
      />
    </View>
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
  heading: {
    color: '#F4F7FB',
    fontSize: 28,
    fontWeight: '800'
  },
  subheading: {
    marginTop: 8,
    color: '#9BA8C7',
    lineHeight: 22
  },
  card: {
    marginTop: 18,
    backgroundColor: '#0C1222',
    borderWidth: 1,
    borderColor: '#18233C',
    borderRadius: 18,
    padding: 18
  },
  cardTitle: {
    color: '#F4F7FB',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 10
  },
  cardText: {
    color: '#B8C4E0',
    marginBottom: 8,
    lineHeight: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  rowLabel: {
    color: '#F4F7FB',
    fontSize: 16
  }
});
