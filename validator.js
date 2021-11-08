import { HumanFriendly } from "./human-friendly-message.js";
import { Options } from "./options.js";

export class Validador {
  constructor() {
    this.options = new Options();
    this.humanFriendly = new HumanFriendly();
  }

  checkOptions() {
    const myArgs = process.argv.slice(2);

    if (!this.options.known.hasOwnProperty([myArgs[0]])) {
      this.humanFriendly.exit('An error occurred: The first argument must be a known option.');
    }

    for (let arg of myArgs) {

      if (arg.startsWith('-')) {

        if (!this.options.known[arg]) {
          this.humanFriendly.exit('An error occurred: Unknown command line options entered.');
        };

        if (myArgs.indexOf(arg) !== myArgs.lastIndexOf(arg) || myArgs.indexOf(this.options.known[arg]) !== -1) {
          this.humanFriendly.exit('An error occurred: Command line options are being repeated.');
        };
      };
    }

    return this;

  }

  end() {
    console.log('The END!!!')
  }
}
