import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Zakaat from '../screens/ZakaatScreens/Zakaat';
import ZakatDashboard from '../screens/ZakaatScreens/ZakatDashboard';
import ZakatFaq from '../screens/ZakaatScreens/ZakatFaq';
import ZakatNisab from '../screens/ZakaatScreens/ZakatNisab';

const Stack = createStackNavigator();

const ZakaatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
      }}>
      <Stack.Screen
        name="Zakaat"
        component={Zakaat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ZakatCalulator"
        component={ZakatDashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ZakatNisab"
        component={ZakatNisab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ZakatFaq"
        component={ZakatFaq}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ZakaatStack;