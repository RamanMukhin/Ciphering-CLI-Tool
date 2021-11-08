import { HumanFriendly } from "./human-friendly-message.js";
import { Operations } from "./operations.js";
import { Options } from "./options.js";

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

    operations.map(operation => this.operations.known.includes(operation)
      ? operation
      : this.humanFriendly.exit(`An error occurred: An unknown encode/decode operation ${operation} was entered.`));

    return this;
  }

  end() {
    console.log('The END!!!')
  }
}
