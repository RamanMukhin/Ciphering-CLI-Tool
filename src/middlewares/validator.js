import { HumanFriendly } from "./human-friendly-message.js";
import { Operations } from "../constants/operations.js";
import { Options } from "../constants/options.js";
import { access } from 'fs/promises';
import { constants } from 'fs';

export class Validador {
  constructor() {
    this.args = process.argv.slice(2);
    this.options = new Options();
    this.operations = new Operations();
    this.humanFriendly = new HumanFriendly();
  }

  checkOptions() {
    const args = this.args;

    if (!this.options.known.hasOwnProperty(args[0])) {
      this.humanFriendly.exit('An error occurred: The first argument must be a known option.');
    };

    for (let arg of args) {

      if (arg.startsWith('-')) {

        if (!this.options.known[arg]) {
          this.humanFriendly.exit(`An error occurred: Unknown command line options ${arg} entered.`);
        };

        if (args.indexOf(arg) !== args.lastIndexOf(arg) || args.indexOf(this.options.known[arg]) !== -1) {
          this.humanFriendly.exit('An error occurred: Command line options are being repeated.');
        };
      };
    };

    return this;
  }

  checkConfig() {
    const args = this.args;

    const configIndex = args.indexOf('-c') !== -1
      ? args.indexOf('-c')
      : args.indexOf('--config');

    if (configIndex === -1) {
      this.humanFriendly.exit('An error occurred: A required option -c/--config was not passed.');
    };

    const config = args[configIndex + 1];
    const operations = config.split('-').filter(Boolean);

    if (config.split('-').length - operations.length !== 0) {
      this.humanFriendly.exit(`An error occurred: Not valide config  ${config} passed.`);
    };

    operations.map(operation => this.operations.knownArr.includes(operation)
      ? operation
      : this.humanFriendly.exit(`An error occurred: An unknown encode/decode operation ${operation} was entered.`));

    return this;
  }

  async checkInput() {
    const args = this.args;

    if (!args.includes('-i') && !args.includes('--input')) {
      return;
    } else if (args.includes('-i')) {
      const inputIndex = args.indexOf('-i');
      const inputPath = args[inputIndex + 1];
      try {
        await access(inputPath, constants.R_OK);
      } catch {
        this.humanFriendly.exit('An error occurred: the path to the "input" file was not transferred or there is no access to it.');
      }
    } else {
      const inputIndex = args.indexOf('--input');
      const inputPath = args[inputIndex + 1];
      try {
        await access(inputPath, constants.R_OK);
      } catch {
        this.humanFriendly.exit('An error occurred: the path to the "input" file was not transferred or there is no access to it.');
      }
    }
  }

  async checkOutput() {
    const args = this.args;

    if (!args.includes('-o') && !args.includes('--output')) {
      return;
    } else if (args.includes('-o')) {
      const outputIndex = args.indexOf('-o');
      const outputPath = args[outputIndex + 1];
      try {
        await access(outputPath, constants.W_OK);
      } catch {
        this.humanFriendly.exit('An error occurred: the path to the "output" file was not transferred or there is no access to it.');
      }
    } else {
      const outputIndex = args.indexOf('--output');
      const outputPath = args[outputIndex + 1];
      try {
        await access(outputPath, constants.W_OK);
      } catch {
        this.humanFriendly.exit('An error occurred: the path to the "output" file was not transferred or there is no access to it.');
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
