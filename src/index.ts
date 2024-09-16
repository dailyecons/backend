import { Byte, cors, send } from '@bit-js/byte';
import api from './api';

const app = new Byte()
  .prepare(cors({ allowHeaders: '*' }))
  .options('/*', (ctx) => ctx.end())

  .get('/', send.body('This is the backend of Dailyecons'))
  .route('/api', api);

export default {
  fetch: app.fetch,
  port: +(process.env.PORT ?? 3000)
}
