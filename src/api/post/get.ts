import { Byte, query } from '@bit-js/byte';
import db from '@db';

const parseQuery = query.schema({
  limit: { type: 'number' },
  startID: { type: 'number' }
});

export default new Byte()
  .get('/', async (ctx) => {
    try {
      const query = parseQuery(ctx);

      if (query !== null) {
        const { limit, startID } = query;

        if (limit > 0 && limit < 30)
          return ctx.json(startID === -1
            ? (await db.execute({
              sql: 'SELECT id, title, content, date, author, readTimeApproximation, bannerLink, avatarLink, views FROM posts INNER JOIN admins ON posts.author = admins.name LIMIT ?',
              args: [limit]
            })).rows
            : (await db.execute({
              sql: 'SELECT id, title, content, date, author, readTimeApproximation, bannerLink, avatarLink, views FROM posts INNER JOIN admins ON posts.author = admins.name WHERE id < ? LIMIT ?',
              args: [startID, limit]
            })).rows
          );
      }

      ctx.status = 400;
    } catch (e) {
      ctx.status = 500;
    }

    return ctx.end();
  })
