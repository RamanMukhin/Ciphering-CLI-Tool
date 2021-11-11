import { Transform } from 'stream';
import { Cipher } from '../ciphers/cipher.js';

export class CustomTransformStream extends Transform {
  constructor() {
    super();
    this.args = process.argv.slice(2);
    this.cipher = new Cipher();
  }

  getOperationsaArr() {
    const configIndex = this.args.indexOf('-c') !== -1
      ? this.args.indexOf('-c')
      : this.args.indexOf('--config');

    const config = this.args[configIndex + 1];
    return config.split('-').filter(Boolean);
  }

  toEncrypt(string) {
    const operations = this.getOperationsaArr();
    let result = string;

    for (let operation of operations) {
      result = this.cipher.toCipher(result, operation);
    }

    return result;
  }

  _transform(chunk, _encoding, callback) {
    try {
      const resultString = `${this.toEncrypt(chunk.toString('utf8'))}`;
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }

}
