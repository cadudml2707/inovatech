import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoginView } from 'views/LoginView';
import { MenuView } from 'views/MenuView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView className='flex-1'>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={LoginView} options={{ headerShown: false }} />
          <Stack.Screen 
            name="Menu" 
            component={MenuView} 
            options={{
              headerStyle: {
                backgroundColor: '#3b82f6',
              },
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}