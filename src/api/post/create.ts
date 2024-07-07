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

  // Main handling
  .post('/', async (ctx) => {
    try {
      const post = await parseForm(ctx);

      if (post !== null) {
        await db.execute({
          sql: 'INSERT INTO posts (title, content, readTimeApproximation, date, bannerLink, author) VALUES (?, ?, ?, ?, ?, ?)',
          args: [post.title, post.content, readTime(post.content), currentDate(), post.bannerLink, ctx.admin]
        });

        return ctx.end();
      }
    } catch (e) {
      console.log(e);
    }

    ctx.status = 404;
    return ctx.end();
  });
