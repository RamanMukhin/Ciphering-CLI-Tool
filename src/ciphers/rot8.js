import { Rot8Key } from "./keys/rot8Key.js";

export class Rot {
    constructor() {
        this.key = new Rot8Key();
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
