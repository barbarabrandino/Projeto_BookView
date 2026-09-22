
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';

import { useCallback, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';

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

  const carregarLivros = useCallback(async () => {
    try {
      const resultado = await db.getAllAsync(
        `
        SELECT *
        FROM livros
        ORDER BY id DESC
        `
      ) as Livro[];

      setLivros(resultado);
    } catch (error) {
      console.error('ERRO AO CARREGAR LIVROS:', error);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      carregarLivros();
    }, [carregarLivros])
  );

  async function excluirLivro(id: number) {
    try {
      await db.runAsync(
        `
        DELETE FROM livros
        WHERE id = ?
        `,
        id
      );

      await carregarLivros();
    } catch (error) {
      console.error('ERRO AO EXCLUIR LIVRO:', error);
    }
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
    try {
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

      await carregarLivros();
    } catch (error) {
      console.error('ERRO AO ALTERAR STATUS:', error);
    }
  }

  return (

  <View style={styles.container}>

    <View style={styles.header}>

      <Text style={styles.emoji}>
        📚
      </Text>

      <Text style={styles.title}>
        Meus Livros
      </Text>

      <Text style={styles.subtitle}>
        Sua pequena biblioteca digital ✨
      </Text>

    </View>

    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
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

      showsVerticalScrollIndicator={false}

      contentContainerStyle={{
        paddingBottom: 20,
      }}

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
    backgroundColor: '#fff7fb',
    padding: 24,
  },

  header: {
    marginBottom: 24,
  },

  emoji: {
    fontSize: 42,
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#5b3f50',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#8d7281',
  },

  button: {
    backgroundColor: '#9b6fa3',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 24,

    shadowColor: '#8c6579',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 3,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },

});
