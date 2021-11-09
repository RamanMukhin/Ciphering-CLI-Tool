import { Transform } from 'stream';
import { Caesar } from './ciphers/caesar.js';

export class CustomTransformStream extends Transform {
constructor (func) {
  super();
  this.caesar = new Caesar();
}

  _transform(chunk, encoding, callback) {
    try {
      const resultString = `${this.caesar.encode(chunk.toString('utf8'))}`;
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}
