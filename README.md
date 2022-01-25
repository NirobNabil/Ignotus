# Ignotus

    this extension doesnt work in messenger.com and other sites where the input field is  heavily scripted but a hack has been used to make it work on facebook.com. other than that it should work in sites with simple html input fields.  

It uses [AES encryption method](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) ( implementation of [Crypto-js](https://cryptojs.gitbook.io/docs/#ciphers) ) to encrypt your messages using a secret/password that you provide. If you click on the extension icon you'll have a text input box to enter your secret - You have to enter the password there and the extension will use it for further encryptions. You can also uncheck the extension active checkbox to disable the extension.

![Popup](/images/extension_popup.PNG "Popup")

<br>

## Installation

Follow this guide to install the extension

https://dev.to/ben/how-to-install-chrome-extensions-manually-from-github-1612

<br>

## Encryption

If your press ctrl+alt+q after you write something on the text input field of chatbox the text will automatically get replaced by the encrypted text. 

Before Encryption             |  After pressing ctrl+alt+q
:-------------------------:|:-------------------------:
![Before Encryption](/images/before_encrypt.PNG "Before Encryption")  |  ![After Encryption](/images/after_encrypt.PNG "After Encryption")
<br>



## Decryption

After you send the encrypted text, facebook will send the encrypted texts to the receipent. Then the receipent will have to press ctrl+q to decrypt all the encrypted texts on screen. 

Before Decryption             |  After pressing ctrl+q
:-------------------------:|:-------------------------:
![Before Decryption](/images/before_decrypt.PNG "Before Encryption")  |  ![After Decryption](/images/after_decrypt.PNG "After Encryption")