import { createClient } from '@libsql/client';

const db = createClient({
  // eslint-disable-next-line
  url: process.env.DB_URL!,
  // eslint-disable-next-line
  authToken: process.env.DB_AUTH_TOKEN!,
});

await db.executeMultiple(`
  CREATE TABLE IF NOT EXISTS users (
    name TEXT PRIMARY KEY,
    theme INTEGER DEFAULT 0 NOT NULL,
    points INTEGER DEFAULT 0 NOT NULL
  ) WITHOUT ROWID;

  CREATE TABLE IF NOT EXISTS admins (
    name TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    avatarLink TEXT NOT NULL
  ) WITHOUT ROWID;

  CREATE TABLE IF NOT EXISTS posts (
    title TEXT,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    author TEXT NOT NULL,

    readTimeApproximation INTEGER NOT NULL,

    bannerLink TEXT NOT NULL,

    views INTEGER DEFAULT 0 NOT NULL,

    FOREIGN KEY (author)
      REFERENCES admins (name)
  );

  CREATE TABLE IF NOT EXISTS themes (
    name TEXT PRIMARY KEY,
    description TEXT NOT NULL
  ) WITHOUT ROWID;

  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    theme TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,

    FOREIGN KEY (author)
      REFERENCES admins (name),

    FOREIGN KEY (theme)
      REFERENCES themes (name)
  );

  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question INTEGER,
    content TEXT NOT NULL,
    
    FOREIGN KEY (question)
      REFERENCES questions (id)
  );

  CREATE TABLE IF NOT EXISTS explanations (
    question INTEGER,
    answer INTEGER,
    content TEXT NOT NULL,

    FOREIGN KEY (question)
      REFERENCES questions (id),

    FOREIGN KEY (answer)
      REFERENCES answers (id)
  )
`);

export default db;
