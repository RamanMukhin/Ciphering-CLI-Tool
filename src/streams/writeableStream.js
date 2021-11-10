import { Writable } from 'stream';
import { writeFile } from 'fs';

export class CustomWriteablemStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }

  async _write(chunk, _encoding, callback) {
    try {
      writeFile(this.filename, `\n${chunk}`, { flag: 'a' }, err => err);
      callback();
    } catch (err) {
      callback(err);
    }
  }

}
