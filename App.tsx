import { NavigationContainer } from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { SQLiteProvider } from 'expo-sqlite';

import {
  inicializarBanco,
} from './database/database';

import Home from './screens/LivrosHome';
import CadastroLivro from './screens/CadastroLivro';
import EditarLivro from './screens/EditarLivro';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SQLiteProvider
      databaseName="livros.db"
      onInit={inicializarBanco}
    >

      <NavigationContainer>

        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Meus Livros',
            }}
          />

          <Stack.Screen
            name="CadastroLivro"
            component={CadastroLivro}
            options={{
              title: 'Novo Livro',
            }}
          />

          <Stack.Screen
            name="EditarLivro"
            component={EditarLivro}
            options={{
              title: 'Editar Livro',
            }}
          />

        </Stack.Navigator>

      </NavigationContainer>

    </SQLiteProvider>
  );
}