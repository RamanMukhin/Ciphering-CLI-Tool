import { Transform } from 'stream';
import { Caesar } from '../ciphers/caesar.js';
import { Rot } from '../ciphers/rot8.js';
import { Atbash } from '../ciphers/atbash.js';
import { Operations } from '../constants/operations.js';

export class CustomTransformStream extends Transform {
  constructor() {
    super();
    this.caesar = new Caesar();
    this.rot8 = new Rot();
    this.atbash = new Atbash();
    this.operations = new Operations();
  }

  getOperationsaArr() {
    const myArgs = process.argv.slice(2);

    const configIndex = myArgs.indexOf('-c') !== -1
      ? myArgs.indexOf('-c')
      : myArgs.indexOf('--config');

    const config = myArgs[configIndex + 1];
    return config.split('-').filter(Boolean);
  }

  toCipher(string) {
    const operationsArr = this.getOperationsaArr();
    let result = string;

    for (let operation of operationsArr) {
      switch (operation) {
        case `${this.operations.knownObj.caesarEncode}`:
          result = this.caesar.encode(result);
          break;
        case `${this.operations.knownObj.caesarDecode}`:
          result = this.caesar.decode(result);
          break;
        case `${this.operations.knownObj.rotEncode}`:
          result = this.rot8.encode(result);
          break;
        case `${this.operations.knownObj.rotDecode}`:
          result = this.rot8.decode(result);
          break;
        case `${this.operations.knownObj.atbash}`:
          result = this.atbash.encode(result);
          break;
      }
    }

    return result;
  }

  _transform(chunk, _encoding, callback) {
    try {
      const resultString = `${this.toCipher(chunk.toString('utf8'))}`;
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }

}
