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
    theme INTEGER DEFAULT 0 NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admins (
    name TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    avatarLink TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
`);

export default db;
