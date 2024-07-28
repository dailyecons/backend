import db from '@db';

console.log(await db.execute('SELECT * FROM admins'));
