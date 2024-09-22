import { Byte } from '@bit-js/byte';
import post from './post';
import admin from './admin';
import theme from './theme';

export default Byte
  .route('/admin', admin)
  .route('/post', post)
  .route('/theme', theme);
