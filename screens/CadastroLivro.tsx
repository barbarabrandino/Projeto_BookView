import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import { useState } from 'react';

import { useSQLiteContext } from 'expo-sqlite';

export default function CadastroLivro(props: any) {

  const db = useSQLiteContext();

  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');

  async function salvarLivro() {

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
      INSERT INTO livros
      (nome, autor, lido)
      VALUES (?, ?, ?)
      `,
      nome.trim(),
      autor.trim(),
      0
    );

    Alert.alert(
      'Sucesso',
      'Livro cadastrado!',
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
        Novo Livro
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
        onPress={salvarLivro}
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
