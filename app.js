
import { Validador } from './src/validator.js'
import * as fs from 'fs';
import { pipeline } from 'stream';
import { CustomTransformStream } from './src/transformStream.js';
import { HumanFriendly } from './src/human-friendly-message.js';

class App {
  constructor() {
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

  createWriteableStream() {
    let writeableStream;
    const myArgs = process.argv.slice(2);

    if (!myArgs.includes('-o') && !myArgs.includes('--output')) {
      return writeableStream = process.stdout;
    } else if (myArgs.includes('-o')) {
      const outputIndex = myArgs.indexOf('-o');
      const outputPath = myArgs[outputIndex + 1];
      return writeableStream = fs.createWriteStream(outputPath, { flags: 'a' });
    } else {
      const outputIndex = myArgs.indexOf('--output');
      const outputPath = myArgs[outputIndex + 1];
      return writeableStream = fs.createWriteStream(outputPath, { flags: 'a' });
    }

  }

  createTransformStream() {
    return new CustomTransformStream();
  }

  createPipeline() {
    pipeline(
      this.createReadableStream(),
      this.createTransformStream(),
      this.createWriteableStream(),
      (err) => {
        if (err) {
          this.humanFriendly.exit(`Program failed. Error is:   ${err.message}`);
        } else {
          console.log('Program succeeded!');
        }
      }
    );
  }

  async start() {
    await this.validador.validate();
    this.createPipeline();
  }

}

const app = new App();
app.start();
