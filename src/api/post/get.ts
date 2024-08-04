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
              sql: 'SELECT rowid as id, title, content, date, author, readTimeApproximation, bannerLink, avatarLink, views FROM posts INNER JOIN admins ON posts.author = admins.name ORDER BY rowid DESC LIMIT ?',
              args: [limit]
            })).rows
            : (await db.execute({
              sql: 'SELECT rowid as id, title, content, date, author, readTimeApproximation, bannerLink, avatarLink, views FROM posts INNER JOIN admins ON posts.author = admins.name WHERE rowid < ? ORDER BY rowid DESC LIMIT ?',
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

  .get('/:id', async (ctx) => {
    try {
      const posts = (await db.execute({
        sql: 'SELECT title, content, date, author, readTimeApproximation, bannerLink, avatarLink, views FROM posts INNER JOIN admins ON posts.author = admins.name WHERE posts.rowid = ? LIMIT 1',
        args: [ctx.params.id]
      })).rows;

      if (posts.length === 1)
        return ctx.json(posts[0]);

      ctx.status = 400;

    } catch (e) {
      ctx.status = 500;
    }

    return ctx.end();
  });
