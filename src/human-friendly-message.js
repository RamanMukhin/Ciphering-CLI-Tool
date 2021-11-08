import { CustomError } from "./customError.js";

export class HumanFriendly {
  exit(message) {
    try {
      throw new CustomError(message);
    } catch (err) {
      console.error(message);
      process.exit(1);
    }
  }
}
