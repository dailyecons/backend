import { Byte, form } from '@bit-js/byte';
import db from '@db';
import { parseUnsign } from '@utils/token';

const parseForm = form.schema({
  name: { type: 'string' },
  description: { type: 'string' }
});

export default new Byte()
  // Only validate whether token is valid
  .use(parseUnsign)
  .post('/', async (ctx) => {
    try {
      const form = await parseForm(ctx);

      if (form === null)
        ctx.status = 400;
      else
        await db.execute({
          sql: 'INSERT INTO themes (name, description) VALUES (?, ?)',
          args: [form.name, form.description]
        })
    } catch {
      ctx.status = 500;
    }

    return ctx.end();
  });
