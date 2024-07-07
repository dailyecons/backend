import { Byte, serialize } from '@bit-js/byte';
import db from '@db';

export default new Byte()
  .post('/login', async (ctx) => {
    try {
      const username = await ctx.req.text();

      const result = await db.execute({
        sql: 'SELECT 1 FROM users WHERE name = ?',
        args: [username]
      });

      if (result.rows.length === 0)
        ctx.status = 404;
      else
        ctx.headers.push(['Set-Cookie', serialize(username)]);
    } catch (e) {
      ctx.status = 404;
    }

    return ctx.body(null);
  });
