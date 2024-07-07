import { Byte, cors } from '@bit-js/byte';
import api from './api';

const app = new Byte()
  .use(cors())
  .route('/api', api);

export default {
  fetch: app.fetch,
  port: +(process.env.PORT ?? 3000)
}
