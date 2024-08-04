import { Byte } from '@bit-js/byte';
import post from './post';
import admin from './admin';

export default Byte
  .route('/admin', admin)
  .route('/post', post);
