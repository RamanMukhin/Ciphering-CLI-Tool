import { AtbashKey } from "./keys/atbashKey.js";

export class Atbash {
    constructor() {
        this.key = new AtbashKey();
    }

    encode(string) {
        const encoded = string.split('').map(simbol => {
            return this.key.encode.hasOwnProperty(simbol)
                ? this.key.encode[simbol]
                : simbol;
        });

        return encoded.join('');
    }

}
