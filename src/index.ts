import { Byte } from '@bit-js/byte';
import api from './api';

const app = new Byte()
  .route('/api', api);

export default app;
