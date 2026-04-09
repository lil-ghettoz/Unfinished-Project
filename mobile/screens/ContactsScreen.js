import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ContactsScreen({ appContext }) {
  const { contacts, setContacts, settings } = appContext;
  const [draft, setDraft] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  const canAddMoreContacts =
    settings.subscriptionPlan === 'Premium' || contacts.length < 1;

  const handleAddContact = () => {
    if (!draft.name || !draft.phone) {
      Alert.alert('Missing details', 'Add at least a name and phone number.');
      return;
    }

    if (!canAddMoreContacts) {
      Alert.alert(
        'Free plan limit reached',
        'Upgrade to Premium to add unlimited emergency contacts.'
      );
      return;
    }

    setContacts((current) => [
      ...current,
      {
        id: Date.now().toString(),
        name: draft.name.trim(),
        phone: draft.phone.trim(),
        relationship: draft.relationship.trim() || 'Trusted Contact',
        enabled: true
      }
    ]);

    setDraft({
      name: '',
      phone: '',
      relationship: ''
    });
  };

  const toggleContact = (id) => {
    setContacts((current) =>
      current.map((contact) =>
        contact.id === id ? { ...contact, enabled: !contact.enabled } : contact
      )
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Trusted contacts</Text>
      <Text style={styles.subheading}>
        Free plan supports 1 active contact. Premium unlocks unlimited contacts and
        custom alert rules.
      </Text>

      {contacts.map((contact) => (
        <View key={contact.id} style={styles.contactCard}>
          <View>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactMeta}>{contact.relationship}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
          <Switch
            value={contact.enabled}
            onValueChange={() => toggleContact(contact.id)}
            trackColor={{ false: '#32415F', true: '#2F8C6C' }}
            thumbColor={contact.enabled ? '#62F0BF' : '#CFD7EA'}
          />
        </View>
      ))}

      <View style={styles.form}>
        <Text style={styles.formTitle}>Add contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#6F7D9C"
          value={draft.name}
          onChangeText={(value) => setDraft((current) => ({ ...current, name: value }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#6F7D9C"
          keyboardType="phone-pad"
          value={draft.phone}
          onChangeText={(value) => setDraft((current) => ({ ...current, phone: value }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Relationship"
          placeholderTextColor="#6F7D9C"
          value={draft.relationship}
          onChangeText={(value) =>
            setDraft((current) => ({ ...current, relationship: value }))
          }
        />
        <TouchableOpacity style={styles.button} onPress={handleAddContact}>
          <Text style={styles.buttonText}>Save Contact</Text>
        </TouchableOpacity>
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
  contactCard: {
    marginTop: 18,
    backgroundColor: '#0C1222',
    borderWidth: 1,
    borderColor: '#18233C',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contactName: {
    color: '#F4F7FB',
    fontSize: 16,
    fontWeight: '700'
  },
  contactMeta: {
    marginTop: 4,
    color: '#8BC5FF'
  },
  contactPhone: {
    marginTop: 4,
    color: '#B8C4E0'
  },
  form: {
    marginTop: 24,
    backgroundColor: '#0C1222',
    borderWidth: 1,
    borderColor: '#18233C',
    borderRadius: 18,
    padding: 18
  },
  formTitle: {
    color: '#F4F7FB',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14
  },
  input: {
    backgroundColor: '#09101E',
    borderWidth: 1,
    borderColor: '#1D2B48',
    borderRadius: 14,
    color: '#F4F7FB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12
  },
  button: {
    marginTop: 4,
    backgroundColor: '#2376D8',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
