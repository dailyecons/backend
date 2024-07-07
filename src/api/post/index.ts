import { Byte } from '@bit-js/byte';
import update from './update';
import create from './create';

export default Byte
  .route('/update', update)
  .route('/create', create);
