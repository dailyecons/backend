import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.DB_URL!,
  authToken: process.env.DB_AUTH_TOKEN!,
});

db.executeMultiple(`
  CREATE TABLE IF NOT EXISTS users (
    name TEXT PRIMARY KEY,
    theme INTEGER DEFAULT 0 NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admins (
    name TEXT PRIMARY KEY,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    title TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    author TEXT NOT NULL,

    readTimeApproximation INTEGER NOT NULL,

    bannerImageLink TEXT NOT NULL,
    avatarLink TEXT NOT NULL,

    views INTEGER DEFAULT 0 NOT NULL,

    FOREIGN KEY (author)
      REFERENCES admins (name)
  );

  CREATE TABLE IF NOT EXISTS comments (
    content TEXT NOT NULL,
    user TEXT NOT NULL,

    FOREIGN KEY (user)
      REFERENCES users (name) 
  )
`);

export default db;
