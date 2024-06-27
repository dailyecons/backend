import { Byte } from '@bit-js/byte';
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
        ctx.status = 403;
      else
        ctx.headers.push(['Set-Cookie', `token=${username}; HttpOnly`]);
    } catch (e) {
      ctx.status = 403;
    }

    return ctx.body(null);
  });
