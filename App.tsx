import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { RaceProvider } from './src/contexts/RaceContext';

import Settings from './src/components/Settings';
import Registration from './src/components/Registration';
import Timing from './src/components/Timing';
import Results from './src/components/Results';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <RaceProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Settings" component={Settings} />
            <Tab.Screen name="Registration" component={Registration} />
            <Tab.Screen name="Timing" component={Timing} />
            <Tab.Screen name="Results" component={Results} />
          </Tab.Navigator>
        </NavigationContainer>
      </RaceProvider>
    </PaperProvider>
  );
}
