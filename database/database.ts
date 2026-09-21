import { SQLiteDatabase } from 'expo-sqlite';

export async function inicializarBanco(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      autor TEXT NOT NULL,
      lido INTEGER NOT NULL DEFAULT 0,
      usuario_id INTEGER NOT NULL
    );
  `);
}

