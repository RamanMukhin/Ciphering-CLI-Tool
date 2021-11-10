import { HumanFriendly } from "./human-friendly-message.js";
import { Operations } from "./operations.js";
import { Options } from "./options.js";
import { access } from 'fs/promises';
import { constants } from 'fs';

export class Validador {
  constructor() {
    this.options = new Options();
    this.operations = new Operations();
    this.humanFriendly = new HumanFriendly();
  }

  checkOptions() {
    const myArgs = process.argv.slice(2);

    if (!this.options.known.hasOwnProperty([myArgs[0]])) {
      this.humanFriendly.exit('An error occurred: The first argument must be a known option.');
    };

    for (let arg of myArgs) {

      if (arg.startsWith('-')) {

        if (!this.options.known[arg]) {
          this.humanFriendly.exit(`An error occurred: Unknown command line options ${arg} entered.`);
        };

        if (myArgs.indexOf(arg) !== myArgs.lastIndexOf(arg) || myArgs.indexOf(this.options.known[arg]) !== -1) {
          this.humanFriendly.exit('An error occurred: Command line options are being repeated.');
        };
      };
    };

    return this;
  }

  checkConfig() {
    const myArgs = process.argv.slice(2);

    const configIndex = myArgs.indexOf('-c') !== -1
      ? myArgs.indexOf('-c')
      : myArgs.indexOf('--config');

    if (configIndex === -1) {
      this.humanFriendly.exit('An error occurred: A required option -c/--config was not passed.')
    };

    const config = myArgs[configIndex + 1];
    const operations = config.split('-').filter(Boolean);

    operations.map(operation => this.operations.knownArr.includes(operation)
      ? operation
      : this.humanFriendly.exit(`An error occurred: An unknown encode/decode operation ${operation} was entered.`));

    return this;
  }

  async checkInput() {
    const myArgs = process.argv.slice(2);

    if (!myArgs.includes('-i') && !myArgs.includes('--input')) {
      return;
    } else if (myArgs.includes('-i')) {
      const inputIndex = myArgs.indexOf('-i');
      const inputPath = myArgs[inputIndex + 1];
      try {
        await access(inputPath, constants.R_OK);
      } catch {
        this.humanFriendly.exit('An error occurred: the path to the "input" file was not transferred or there is no access to it.');
      }
    } else {
      const inputIndex = myArgs.indexOf('--input');
      const inputPath = myArgs[inputIndex + 1];
      try {
        await access(inputPath, constants.R_OK);
      } catch {
        this.humanFriendly.exit('An error occurred: the path to the "input" file was not transferred or there is no access to it.');
      }
    }
  }

  async checkOutput() {
    const myArgs = process.argv.slice(2);

    if (!myArgs.includes('-o') && !myArgs.includes('--output')) {
      return;
    } else if (myArgs.includes('-o')) {
      const outputIndex = myArgs.indexOf('-o');
      const outputPath = myArgs[outputIndex + 1];
      try {
        await access(outputPath, constants.W_OK);
      } catch {
        this.humanFriendly.exit('An error occurred: the path to the "output" file was not transferred or there is no access to it.')
      }
    } else {
      const outputIndex = myArgs.indexOf('--output');
      const outputPath = myArgs[outputIndex + 1];
      try {
        await access(outputPath, constants.W_OK);
      } catch {
        this.humanFriendly.exit('An error occurred: the path to the "output" file was not transferred or there is no access to it.')
      }
    }
  }

  async validate() {
    this
      .checkOptions()
      .checkConfig();
    await this.checkInput();
    await this.checkOutput();
  }

}
