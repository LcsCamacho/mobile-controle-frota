import * as React from "react";
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './screens/loginform';
import Dashboard from './screens/dashboard';
import { persistor, store } from "./features/redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import CadastroUsuario from "./screens/cadUser";
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Login"
                  component={LoginForm}
                  options={{ title: 'Bem vindo ' }}
                />
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{ title: 'Dashboard' }}
                />
                <Stack.Screen
                  name="Register"
                  component={CadastroUsuario}
                  options={{ title: 'Cadastro de usuario' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </PaperProvider>
      </Provider>
    </QueryClientProvider>
  );
}