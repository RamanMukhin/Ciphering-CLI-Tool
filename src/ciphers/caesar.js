import { CaesarKey } from "./keys/caesarKey.js";

export class Caesar {
    constructor() {
        this.key = new CaesarKey();
    }

    encode(string) {
        const encoded = string.split('').map(simbol => {
            return this.key.encode.hasOwnProperty(simbol)
                ? this.key.encode[simbol]
                : simbol;
        });

        return encoded.join('');
    }

    decode(string) {
        const decoded = string.split('').map(simbol => {
            return this.key.decode.hasOwnProperty(simbol)
                ? this.key.decode[simbol]
                : simbol;
        });

        return decoded.join('');
    }

}
