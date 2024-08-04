import db from '@db';

await db.execute({
  sql: 'UPDATE admins SET avatarLink = ? WHERE name = ?',
  args: [prompt('Enter image link:'), prompt('Enter name:')]
});
