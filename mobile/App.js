import React, { useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import PanicScreen from './screens/PanicScreen';
import ContactsScreen from './screens/ContactsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#060914',
    card: '#0D1324',
    primary: '#3AA0FF',
    text: '#F4F7FB',
    border: '#162037'
  }
};

const initialContacts = [
  { id: '1', name: 'Mom', phone: '+639171111111', enabled: true, relationship: 'Family' }
];

export default function App() {
  const [panicState, setPanicState] = useState({
    active: false,
    loading: false,
    lastAlert: null,
    lastError: null
  });
  const [contacts, setContacts] = useState(initialContacts);
  const [settings, setSettings] = useState({
    panicPin: '4582',
    darkMode: true,
    smsFallback: true,
    cloudSync: true,
    subscriptionPlan: 'Free'
  });

  const appContext = useMemo(
    () => ({
      panicState,
      setPanicState,
      contacts,
      setContacts,
      settings,
      setSettings
    }),
    [contacts, panicState, settings]
  );

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#0D1324' },
          headerTintColor: '#F4F7FB',
          headerTitleStyle: { fontWeight: '700' },
          tabBarStyle: {
            backgroundColor: '#0B1020',
            borderTopColor: '#162037'
          },
          tabBarActiveTintColor: route.name === 'Panic' ? '#FF5A6B' : '#3AA0FF',
          tabBarInactiveTintColor: '#7E8AA7',
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'shield-checkmark-outline',
              Panic: 'warning-outline',
              Contacts: 'people-outline',
              Settings: 'settings-outline'
            };

            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} appContext={appContext} />}
        </Tab.Screen>
        <Tab.Screen name="Panic">
          {(props) => <PanicScreen {...props} appContext={appContext} />}
        </Tab.Screen>
        <Tab.Screen name="Contacts">
          {(props) => <ContactsScreen {...props} appContext={appContext} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {(props) => <SettingsScreen {...props} appContext={appContext} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
