import { Byte } from '@bit-js/byte';
import db from '@db';
import readTime from '@utils/readTime';
import { parseUnsign } from '@utils/token';

export default new Byte()
  .state('admin', parseUnsign)

  // Set content
  .put('/content/:id', async (ctx) => {
    try {
      const id = +ctx.params.id;
      const content = await ctx.req.text();

      // Ensure when one author is somehow compromised the hacker can only modify their post
      await db.execute({
        sql: 'UPDATE posts SET content = ?, readTimeApproximation = ? WHERE id = ? AND author = ?',
        args: [content, readTime(content), id, ctx.admin]
      });
    } catch (err) {
      ctx.status = 404;
      console.log(err);
    }

    return ctx.end();
  })

  // Set title 
  .put('/title/:id', async (ctx) => {
    try {
      const id = +ctx.params.id;
      const title = await ctx.req.text();

      await db.execute({
        sql: 'UPDATE posts SET title = ? WHERE id = ? AND author = ?',
        args: [title, id, ctx.admin]
      });
    } catch (err) {
      ctx.status = 404;
    }

    return ctx.end();
  })

  // Set banner image link
  .put('/banner/:id', async (ctx) => {
    try {
      const id = +ctx.params.id;
      const link = await ctx.req.text();

      await db.execute({
        sql: 'UPDATE posts SET bannerImageLink = ? WHERE id = ? AND author = ?',
        args: [link, id, ctx.admin]
      });
    } catch (err) {
      ctx.status = 404;
    }

    return ctx.end();
  });
