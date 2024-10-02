import { Byte } from '@bit-js/byte';
import create from './create';
import db from '@db';
import questions from './questions';

export default new Byte()
  .get('/', async (ctx) => {
    try {
      return ctx.json(
        (await db.execute('SELECT name, description FROM themes')).rows
      );
    } catch {
      ctx.status = 500;
      return ctx.end();
    }
  })
  .route('/questions', questions)
  .route('/create', create);
