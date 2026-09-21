import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

interface Livro {
  id: number;
  nome: string;
  autor: string;
  lido: number;
}

interface BookCardProps {
  livro: Livro;
  onLido: (id: number, lido: number) => void;
  onExcluir: (id: number) => void;
  onEditar: (id: number) => void;
}

export default function BookCard({
  livro,
  onLido,
  onExcluir,
  onEditar,
}: BookCardProps) {

  return (
    <View style={styles.card}>

      <Text style={styles.nome}>
        {livro.nome}
      </Text>

      <Text style={styles.autor}>
        Autor: {livro.autor}
      </Text>

      <Text style={styles.status}>
        {livro.lido === 1
          ? '✓ Lido'
          : '○ Não lido'}
      </Text>

      <View style={styles.botoes}>

        <Pressable
          style={styles.botao}
          onPress={() =>
            onLido(livro.id, livro.lido)
          }
        >
          <Text style={styles.textoBotao}>
            {livro.lido === 1
              ? 'Marcar não lido'
              : 'Marcar lido'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.botaoEditar}
          onPress={() => onEditar(livro.id)}
        >
          <Text style={styles.textoBotao}>
            Editar
          </Text>
        </Pressable>

        <Pressable
          style={styles.botaoExcluir}
          onPress={() => onExcluir(livro.id)}
        >
          <Text style={styles.textoBotao}>
            Excluir
          </Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  autor: {
    fontSize: 15,
    marginTop: 4,
  },

  status: {
    marginTop: 8,
    fontSize: 14,
  },

  botoes: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },

  botao: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
  },

  botaoEditar: {
    backgroundColor: '#555',
    padding: 8,
    borderRadius: 6,
  },

  botaoExcluir: {
    backgroundColor: '#c62828',
    padding: 8,
    borderRadius: 6,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 12,
  },

});