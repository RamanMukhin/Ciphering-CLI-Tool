 # Ciphering-CLI-Tool

This is a command line application. it encrypts and decrypts text with Caesar, Atbash, or ROT8  cipher. The application encrypts and decrypts only letters of the Latin alphabet. All other characters, including lettars from alphabets fo other languages, numbers, punctuation marks, etc. remain uncanged.

## How to install 

To install this application, you must perfom the following steps:
1. Download it from this repositiry.
2. Run the command line and go to the application folder.
3. Join the **task_1** branch. Run on the command line: 
```
 git checkout task_1
```
4. The application is ready to go.

---

## How to use

To start the application, in the folder with the application, enter the following into the command line: node "app [options]", where options are command line parameters that determine the operation (short alias and full name):
* `-c`, `--config`: a config (`use only lower case`)
* `-i`, `--input`: an input file (`use only lower case`)
* `-o`, `--output`: an output file (`use only lower case`)



The **config** is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)(`use only UPPER case`)
    * `A` is for Atbash cipher (`use only UPPER case`)
    * `R` is for ROT-8 cipher (`use only UPPER case`)
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding (`it is a number`)
    * `0` is for decoding (`it is a number`)


 **config** option is **mandatory**: if it absent, there vil be an **error**. **input** and **output** options must be relative path to file or even filename if file is in application root folder (**input** is the path to the file from which the text id read; **output** is a path to the file where the text will bi written).

 If the file on any of path **does't exist** or the path is **incorrect**, there will be an error.

 If the **input** and /or **output** options are absennt, then **readin** and/or **writing** will be carried out from/to **command line**. To **interrut** the procces, in this case, press **Ctrl+C**.

---

## Examples of usage:

```
node app -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```
 node app -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```
 node app -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```
 node my_ciphering_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `This is secret. Message about "_" symbol!`

## Use with pleasure!
