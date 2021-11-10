export class Options {
  constructor() {
    this.known = {
      '-c': '--config',
      '-i': '--input',
      '-o': '--output',
      '--config': '-c',
      '--input': '-i',
      '--output': '-o',
    };
  }
}
