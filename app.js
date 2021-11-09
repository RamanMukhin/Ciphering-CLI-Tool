import { Caesar } from './src/ciphers/caesar.js';
import { Operations } from './src/operations.js';
import { Validador } from './src/validator.js'
import * as fs from 'fs';
import { CustomTransformStream } from './src/transformStream.js';

class App {
  constructor() {
    this.validador = new Validador();
    this.caesar = new Caesar();
  }

  createReadableStream() {
    let readableStream;
    const myArgs = process.argv.slice(2);

    if (!myArgs.includes('-i') && !myArgs.includes('--input')) {
      return readableStream = process.stdin;
    } else if (myArgs.includes('-i')) {
      const inputIndex = myArgs.indexOf('-i');
      const inputPath = myArgs[inputIndex + 1];
      return readableStream = fs.createReadStream(inputPath, 'utf8');
    } else {
      const inputIndex = myArgs.indexOf('--input');
      const inputPath = myArgs[inputIndex + 1];
      return readableStream = fs.createReadStream(inputPath, 'utf8');
    }

  }

  createWriteableStream() {
    let writeableStream;
    const myArgs = process.argv.slice(2);

    if (!myArgs.includes('-o') && !myArgs.includes('--output')) {
      return writeableStream = process.stdout;
    } else if (myArgs.includes('-o')) {
      const outputIndex = myArgs.indexOf('-o');
      const outputPath = myArgs[outputIndex + 1];
      return writeableStream = fs.createWriteStream(outputPath);
    } else {
      const outputIndex = myArgs.indexOf('--output');
      const outputPath = myArgs[outputIndex + 1];
      return writeableStream = fs.createWriteStream(outputPath);
    }

  }

  createTransformStream(func) {
    return new CustomTransformStream(func);
  }

  getOperationsaArr() {
    const myArgs = process.argv.slice(2);

    const configIndex = myArgs.indexOf('-c') !== -1
      ? myArgs.indexOf('-c')
      : myArgs.indexOf('--config');

    const config = myArgs[configIndex + 1];
    return config.split('-').filter(Boolean);
  }

  start() {
    this.validador
      .checkOptions()
      .checkConfig()
      .end();

    this.createReadableStream().pipe(this.createTransformStream(this.caesar.encode)).pipe(this.createWriteableStream());
  }

}

const app = new App();
app.start();
