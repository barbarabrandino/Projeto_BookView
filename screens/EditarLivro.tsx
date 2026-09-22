
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

export default function EditarLivro(props: any) {
  const db = useSQLiteContext();

  const id = props.route.params.id;

  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarLivro();
  }, []);

  async function carregarLivro() {
    try {
      const livro = await db.getFirstAsync(
        `
        SELECT *
        FROM livros
        WHERE id = ?
        `,
        id
      ) as {
        id: number;
        nome: string;
        autor: string;
        lido: number;
      } | null;

      if (livro) {
        setNome(livro.nome);
        setAutor(livro.autor);
      } else {
        setMensagem('Livro não encontrado.');

        setTimeout(() => {
          props.navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      console.error('ERRO AO CARREGAR LIVRO:', error);

      setMensagem(
        `Erro ao carregar o livro: ${String(error)}`
      );
    }
  }

  async function atualizarLivro() {
    if (!nome.trim()) {
      setMensagem('Informe o nome do livro.');
      return;
    }

    if (!autor.trim()) {
      setMensagem('Informe o autor.');
      return;
    }

    try {
      await db.runAsync(
        `
        UPDATE livros
        SET
          nome = ?,
          autor = ?
        WHERE id = ?
        `,
        nome.trim(),
        autor.trim(),
        id
      );

      setMensagem('Atualizado com sucesso!');

      setTimeout(() => {
        props.navigation.goBack();
      }, 1000);

    } catch (error) {
      console.error('ERRO AO ATUALIZAR LIVRO:', error);

      setMensagem(
        `Erro ao atualizar: ${String(error)}`
      );
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.emoji}>📚</Text>

        <Text style={styles.title}>
          Editar livro
        </Text>

        <Text style={styles.subtitle}>
          Altere as informações do seu livro ✨
        </Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.label}>
          Nome do livro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: O Pequeno Príncipe"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>
          Autor
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: Antoine de Saint-Exupéry"
          placeholderTextColor="#aaa"
          value={autor}
          onChangeText={setAutor}
        />

        {mensagem !== '' && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>
              {mensagem}
            </Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={atualizarLivro}
        >
          <Text style={styles.buttonText}>
            ✓ Atualizar livro
          </Text>
        </Pressable>

      </View>
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
    marginBottom: 30,
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

  form: {
    backgroundColor: '#ffffff',
    padding: 22,
    borderRadius: 22,
    shadowColor: '#8c6579',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#65495a',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fffafd',
    borderWidth: 1,
    borderColor: '#ead9e3',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: '#4f3d47',
    marginBottom: 20,
  },

  messageBox: {
    backgroundColor: '#f4eafa',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },

  message: {
    color: '#7a4d78',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#9b6fa3',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
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

