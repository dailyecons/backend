import { Byte, form } from '@bit-js/byte';
import db from '@db';
import { currentDate } from '@utils/date';
import readTime from '@utils/readTime';
import { parseUnsign } from '@utils/token';

const parseForm = form.schema({
  title: { type: 'string' },
  content: { type: 'string' },
  bannerLink: { type: 'string' }
});

export default new Byte()
  // Parse credentials
  .state('admin', parseUnsign)
  .state('avatarLink', async (ctx) => {
    try {
      const avatarLink = (await db.execute({
        sql: 'SELECT avatarLink FROM admins WHERE name = ?',
        args: [ctx.admin]
      })).rows[0]?.[0];

      if (typeof avatarLink === 'string') return avatarLink;
    } catch (e) { }

    ctx.status = 404;
    return ctx.body(null);
  })

  // Parse form data data
  .state('post', async (ctx) => {
    const data = await parseForm(ctx);
    if (data === null) {
      ctx.status = 404;
      return ctx.body(null);
    }

    return data;
  })

  // Main handling
  .post('/', async (ctx) => {
    try {
      const { post } = ctx;

      await db.execute({
        sql: 'INSERT INTO posts (title, content, readTimeApproximation, date, bannerLink, author, avatarLink) VALUES (?, ?, ?, ?, ?, ?, ?)',
        args: [post.title, post.content, readTime(post.content), currentDate(), post.bannerLink, ctx.admin, ctx.avatarLink]
      });
    } catch (e) {
      ctx.status = 404;
    }

    return ctx.body(null);
  });
