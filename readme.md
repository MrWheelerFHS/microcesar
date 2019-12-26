# micro:cesar
This small program can be used for educational purposes. It demonstrates the usage of the Ceasar's cipher to de- and encrypt messages.
The unsolved file contains holes in the code that can be filled in by the students, while the solved version contains the working code.

The advanced file can be used with more experienced students. It enables the setting of a key and the sharing of such with the radio module of the micro:bit.

The js file contains the JavaScript source code, as the advanced version was written using JS instead of Blocks. The hex file can simply be pulled on the microcrypt.

## Usage

To use a program on a micro:bit device, plug it into a USB port of a laptop or PC and copy a .hex file on it. Wat while the yellow light flashes, then use the key on the back to start the program. Controls are explained below. Notice: the unfinished file cannot be used right of the box as it is not finished yet (duh).

To edit a file use the Microsoft Make Code Editor for the micro:bit online: https://makecode.microbit.org/#editor. Simply drag and drop a hex file into the editor, change it and save it.

To edit a .js file either use the Microsoft Make Code Editor and switch it to "JavaScript" or use a editor like Atom, Sublime, whatever you fancy. A simple text editor or even a command line editor will do. Save the .js file, open the Microsoft Make Code Editor and switch to "JavaScript". Paste the content of your file, save download and put the newly generated .hex file on the micro:bit.

## Controls

The following actions are used to interact with the software:

### simple

Using A and B button to toggle through the letters alphabetically. Shaking the device will encrypt them using a hardcoded key (default is 5). I suggest the following improvements as tasks for the students:

- set the key by using A and B before the encryption process
- have different motions for decryption and encryption
- share the key between two devices with the radio module

### advanced

Tilting the device will shuffle through numbers, starting at 0 to set the key. Pressing A will send the key to another device on the same channel. Pressing B will start the encryption mode. Tilting the device will shuffle the letters. Pressing A will result in decryption with selected key, pressing B will encrypt instead.

## Contact

Johannes Hassenstein

johannes.hassenstein@protonmail.com

https://johassenstein.de

## Copyright

Use for whatever you want, just nothing illegal please.