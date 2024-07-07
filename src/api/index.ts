import { Byte } from '@bit-js/byte';
import user from './user';
import post from './post';
import admin from './admin';

export default Byte
  .route('/user', user)
  .route('/admin', admin)
  .route('/post', post);
