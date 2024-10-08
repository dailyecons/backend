import { Byte, form } from '@bit-js/byte';
import db from '@db';
import { signToken } from '@utils/token';

const parseForm = form.schema({
  name: { type: 'string' },
  password: { type: 'string' }
});

export default new Byte()
  .state('credentials', async (ctx) => {
    const data = await parseForm(ctx);

    if (data === null) {
      ctx.status = 404;
      return ctx.end();
    }

    return data;
  })

  .post('/login', async (ctx) => {
    try {
      const { name, password } = ctx.credentials;
      const hashedPassword = (await db.execute({
        sql: 'SELECT password FROM admins WHERE name = ? LIMIT 1',
        args: [name]
      })).rows[0]?.[0];

      if (typeof hashedPassword === 'string' && await Bun.password.verify(password, hashedPassword))
        return ctx.body(signToken(name));
    } catch (e) { }

    ctx.status = 404;
    return ctx.end();
  });
