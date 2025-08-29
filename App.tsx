import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoginView } from './src/views/LoginView';
import { MenuView } from './src/views/MenuView';
import { CadastroView } from './src/views/CadastroView';
import { TabNavigator } from './src/views/TabNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView className='flex-1'>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name="Login"
            component={LoginView}
            options={{
              headerShown: false,
              animation: 'slide_from_left'
            }} />
          <Stack.Screen
            name="Menu"
            component={TabNavigator}
            options={{
              headerShown: false,
              animation: 'fade'
            }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroView}
            options={{
              headerShown: false,
              animation: 'slide_from_right'
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}