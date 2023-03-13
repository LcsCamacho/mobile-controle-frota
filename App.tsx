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


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
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
      </Provider>
    </QueryClientProvider>
  );
}