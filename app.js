import { Validador } from './src/validator.js'

const validador = new Validador();
validador
  .checkOptions()
  .checkConfig()
  .end();
