import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import ContactCard from '../components/ContactCard';

export default function ContactsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Trusted Contacts</Text>
      <ContactCard name="Mom" phone="+639171111111" />
      <ContactCard name="Best Friend" phone="+639181234567" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#040914' },
  content: { padding: 20 },
  heading: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 16 }
});
