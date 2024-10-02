import { Byte } from '@bit-js/byte';
import db from '@db';

export default new Byte()
  .get('/:theme', async (ctx) => {
    try {
      return (await db.execute({
        sql: `SELECT 
          q.id AS question_id,
          q.content AS question_content,
          a.id AS answer_id,
          a.content AS answer_content,
          e.content AS explanation_content
        FROM 
          questions q
        JOIN 
          answers a ON q.id = a.question
        LEFT JOIN 
          explanations e ON q.id = e.question AND a.id = e.answer
        WHERE 
          q.theme = ?`,
        args: [ctx.params.theme]
      })).rows
    } catch { }
  });
