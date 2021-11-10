
import { Validador } from './src/middlewares/validator.js'
import { HumanFriendly } from './src/middlewares/human-friendly-message.js';
import { CustomReadablemStream } from './src/streams/readableStream.js';
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
    return (!this.args.includes('-i') && !this.args.includes('--input'))
      ? process.stdin
      : (this.args.includes('-i'))
        ? new CustomReadablemStream(this.args[this.args.indexOf('-i') + 1])
        : new CustomReadablemStream(this.args[this.args.indexOf('--input') + 1]);
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
