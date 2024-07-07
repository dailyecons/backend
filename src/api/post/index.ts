import { Byte } from '@bit-js/byte';
import update from './update';
import create from './create';
import get from './get';

export default Byte
  .route('/update', update)
  .route('/create', create)
  .route('/get', get);
