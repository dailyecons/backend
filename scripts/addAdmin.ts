import db from '@db';

await db.execute({
  sql: 'INSERT INTO admins (name, password, avatarLink) VALUES (?, ?, ?)',
  args: [prompt('Enter name:'), Bun.password.hashSync(prompt('Enter password:')!), prompt('Enter avatar link:')]
});
