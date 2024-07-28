import { Byte, cors, send } from '@bit-js/byte';
import api from './api';

console.log(cors({ allowCredentials: true }).toString())

const app = new Byte()
  .use(cors({ allowCredentials: true }))
  .get('/', send.body('This is the backend of Dailyecons'))
  .route('/api', api);

export default {
  fetch: app.fetch,
  port: +(process.env.PORT ?? 3000)
}
