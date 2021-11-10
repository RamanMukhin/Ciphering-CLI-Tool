
import { Validador } from './src/middlewares/validator.js'
import * as fs from 'fs';
import { HumanFriendly } from './src/middlewares/human-friendly-message.js';
import { CustomTransformStream } from './src/streams/transformStream.js';
import { CustomWriteablemStream } from './src/streams/writeableStream.js';
import { pipeline } from 'stream';

class App {
  constructor() {
    this.args = process.argv.slice(2);
    this.validador = new Validador();
    this.humanFriendly = new HumanFriendly();
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

  createTransformStream() {
    return new CustomTransformStream();
  }

  createWriteableStream() {
    return (!this.args.includes('-o') && !this.args.includes('--output'))
      ? process.stdout
      : (this.args.includes('-o'))
        ? new CustomWriteablemStream(this.args[this.args.indexOf('-o') + 1])
        : new CustomWriteablemStream(this.args[this.args.indexOf('--output') + 1]);
  }

  createPipeline() {
    pipeline(
      this.createReadableStream(),
      this.createTransformStream(),
      this.createWriteableStream(),
      err => err
        ? this.humanFriendly.exit(`Program failed. Error is:   ${err.message}`)
        : console.log('Program succeeded!')
    );
  }

  async start() {
    await this.validador.validate();
    this.createPipeline();
  }

}

const app = new App();
app.start();
