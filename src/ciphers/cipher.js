import { Operations } from "../constants/operations.js";
import { CaesarKey } from "./keys/caesarKey.js";
import { AtbashKey } from "./keys/atbashKey.js";
import { Rot8Key } from "./keys/rot8Key.js";

export class Cipher {
    constructor() {
        this.operations = new Operations();
        this.caesarKey = new CaesarKey();
        this.rot8Key = new Rot8Key();
        this.atbashKey = new AtbashKey();
    }

    toCipher(string, operation) {
        return this.operations.encode.includes(operation)
            ? this.encode(string, operation)
            : this.decode(string, operation);
    }

    encode(string, operation) {
        const key = this.operations.caesar.includes(operation)
            ? this.caesarKey
            : this.operations.rot.includes(operation)
                ? this.rot8Key
                : this.atbashKey;

        return this.code(string, 'encode', key);
    }

    decode(string, operation) {
        const key = this.operations.caesar.includes(operation)
            ? this.caesarKey
            : this.rot8Key;

        return this.code(string, 'decode', key);
    }

    code(string, action, key) {
        const result = string.split('').map(simbol => {
            return key[action].hasOwnProperty(simbol)
                ? key[action][simbol]
                : simbol;
        });

        return result.join('');
    }

}
