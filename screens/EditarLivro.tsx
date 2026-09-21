import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import { useSQLiteContext } from 'expo-sqlite';

export default function EditarLivro(props: any) {

  const db = useSQLiteContext();

  const id = props.route.params.id;

  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');

  useEffect(() => {
    carregarLivro();
  }, []);

  async function carregarLivro() {

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
    };

    if (livro) {

      setNome(livro.nome);
      setAutor(livro.autor);

    } else {

      Alert.alert(
        'Erro',
        'Livro não encontrado.'
      );

      props.navigation.goBack();
    }
  }

  async function atualizarLivro() {

    if (!nome.trim()) {

      Alert.alert(
        'Atenção',
        'Informe o nome do livro.'
      );

      return;
    }

    if (!autor.trim()) {

      Alert.alert(
        'Atenção',
        'Informe o autor.'
      );

      return;
    }

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

    Alert.alert(
      'Sucesso',
      'Livro atualizado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () =>
            props.navigation.goBack(),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Editar Livro
      </Text>

      <Text style={styles.label}>
        Nome
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome do livro"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>
        Autor
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o autor"
        value={autor}
        onChangeText={setAutor}
      />

      <Pressable
        style={styles.button}
        onPress={atualizarLivro}
      >
        <Text style={styles.buttonText}>
          Salvar
        </Text>
      </Pressable>

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
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});