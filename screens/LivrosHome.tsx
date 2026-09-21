import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';

import { useEffect, useState } from 'react';

import { useSQLiteContext } from 'expo-sqlite';

import BookCard from '../components/BookCard';

interface Livro {
  id: number;
  nome: string;
  autor: string;
  lido: number;
}

export default function Home(props: any) {

  const db = useSQLiteContext();

  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    carregarLivros();
  }, []);

  async function carregarLivros() {

    const resultado = await db.getAllAsync(`
      SELECT *
      FROM livros
      ORDER BY id DESC
    `) as Livro[];

    setLivros(resultado);
  }

  async function excluirLivro(id: number) {

    await db.runAsync(
      `
      DELETE FROM livros
      WHERE id = ?
      `,
      id
    );

    carregarLivros();
  }

  function editarLivro(id: number) {

    props.navigation.navigate(
      'EditarLivro',
      {
        id: id,
      }
    );
  }

  async function marcarLido(
    id: number,
    lido: number
  ) {

    const novoStatus = lido === 1 ? 0 : 1;

    await db.runAsync(
      `
      UPDATE livros
      SET lido = ?
      WHERE id = ?
      `,
      novoStatus,
      id
    );

    carregarLivros();
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Meus Livros
      </Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          props.navigation.navigate(
            'CadastroLivro'
          )
        }
      >
        <Text style={styles.buttonText}>
          + Novo Livro
        </Text>
      </Pressable>

      <FlatList
        data={livros}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={({ item }) => (
          <BookCard
            livro={item}
            onExcluir={excluirLivro}
            onEditar={editarLivro}
            onLido={marcarLido}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f7fb',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});