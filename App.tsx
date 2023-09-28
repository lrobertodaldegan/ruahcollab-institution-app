import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import VoluntariosScreen from './src/screens/Voluntarios/VoluntariosScreen';
import DemandasScreen from './src/screens/Demandas/DemandasScreen';
import DemandaScreen from './src/screens/Demanda/DemandaScreen';
import NovaDemandaScreen from './src/screens/NovaDemanda/NovaDemandaScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import PrimeiroAcessoScreen from './src/screens/PrimeiroAcesso/PrimeiroAcessoScreen';
import ResetSenhaScreen from './src/screens/ResetSenha/ResetSenhaScreen';
import ErrorScreen from './src/screens/Error/ErrorScreen';
import ResetCodeValidationScreen from './src/screens/ResetSenha/ResetCodeValidationScreen';
import ResetLoginScreen from './src/screens/ResetSenha/ResetLoginScreen';

const ScreensOptions = {
  headerShown: false,
  headerTintColor: '#fff',
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={WelcomeScreen} options={ScreensOptions} />
        <Stack.Screen name="login" component={LoginScreen} options={ScreensOptions} />
        <Stack.Screen name="voluntarios" component={VoluntariosScreen} options={ScreensOptions} />
        <Stack.Screen name="demandas" component={DemandasScreen} options={ScreensOptions} />
        <Stack.Screen name="demanda" component={DemandaScreen} options={ScreensOptions} />
        <Stack.Screen name="novademanda" component={NovaDemandaScreen} options={ScreensOptions} />
        <Stack.Screen name="profile" component={ProfileScreen} options={ScreensOptions} />
        <Stack.Screen name="primeiroAcesso" component={PrimeiroAcessoScreen} options={ScreensOptions} />
        <Stack.Screen name="reset" component={ResetSenhaScreen} options={ScreensOptions} />
        <Stack.Screen name="codeValidation" component={ResetCodeValidationScreen} options={ScreensOptions} />
        <Stack.Screen name="resetLogin" component={ResetLoginScreen} options={ScreensOptions} />
        <Stack.Screen name="error" component={ErrorScreen} options={ScreensOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
