/**
 * App.tsx – point d’entrée de OpenRaceTimingClean
 */
import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RaceProvider } from './src/contexts/RaceContext';

// ─── Composants d’onglet ────────────────────────────────────────────────────────
import Settings      from './src/components/Settings';
import Registration  from './src/components/Registration';
import Timing        from './src/components/Timing';
import Results       from './src/components/Results';

// ─── Icônes (Expo) ─────────────────────────────────────────────────────────────
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ─── Thème Paper (optionnel) ───────────────────────────────────────────────────
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976d2',
    secondary: '#ff9800',
  },
};

// ─── Navigateur à onglets ──────────────────────────────────────────────────────
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <RaceProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Settings"
            screenOptions={({ route }) => ({
              headerStyle: { height: 80 },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarIcon: ({ color, size }) => {
                const icons = {
                  Settings: 'cog-outline',
                  Registration: 'account-plus-outline',
                  Timing: 'clock-outline',
                  Results: 'chart-bar',
                } as const;
                return (
                  <MaterialCommunityIcons
                    name={icons[route.name as keyof typeof icons]}
                    color={color}
                    size={size}
                  />
                );
              },
            })}
          >
            <Tab.Screen name="Settings"     component={Settings} />
            <Tab.Screen name="Registration" component={Registration} />
            <Tab.Screen name="Timing"       component={Timing} />
            <Tab.Screen name="Results"      component={Results} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RaceProvider>
  );
}
