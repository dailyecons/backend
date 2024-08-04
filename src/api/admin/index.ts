import { Byte } from '@bit-js/byte';
import account from './account';
import posts from './posts';

export default Byte
  .route('/account', account)
  .route('/posts', posts);
