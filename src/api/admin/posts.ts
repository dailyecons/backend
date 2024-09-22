import { Byte } from '@bit-js/byte';
import db from '@db';
import { parseUnsign } from '@utils/token';

export default new Byte()
  .state('admin', parseUnsign)
  .get('/', async (ctx) => {
    try {
      return ctx.json(
        (await db.execute({
          sql: 'SELECT rowid as id, title, content, date, author, readTimeApproximation, bannerLink, avatarLink, views FROM posts INNER JOIN admins ON posts.author = admins.name WHERE posts.author = ? ORDER BY rowid',
          args: [ctx.admin]
        })).rows
      );
    } catch {
      ctx.status = 500;
    }

    return ctx.end();
  });
