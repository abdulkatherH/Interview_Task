/*var sha1 = require('sha1');
 
var check =sha1("message");

console.log("--Check--"+check);
 
var CryptoJS = require("crypto-js");
 
// Encrypt
//var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
 
// Decrypt
//var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');

var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');


var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(plaintext);


var hash = CryptoJS.SHA1("Message");
var test = hash.toString(CryptoJS.enc.Hex)
console.log("+++sha1++++",hash);
console.log("--1----",test);

var hash1 = CryptoJS.SHA1("Message");
var test1 = hash1.toString(CryptoJS.enc.Hex)

console.log("+++sha1++++",hash1);
console.log("--1----",test1);

if(test == test1)
{
   console.log("Success");
}else{
    console.log("Fail");
}*/
//console.log("--2-----",hash.toString(CryptoJS.enc.Utf8));
/*var hash1 =CryptoJS.SHA1("Message");
console.log("+++sha1++++",hash1);

var CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key"));*/
/*const crypto1 = require('crypto');

var genRandomString = function(length){
    return crypto1.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format
            .slice(0,length);   /** return required number of characters
};


var sha512 = function(password, salt){
    var hash = crypto1.createHmac('sha512', salt); /** Hashing algorithm sha512
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
};

saltHashPassword('MYPASSWORD');
saltHashPassword('MYPASSWORD');
*/
var CryptoJS = require("crypto-js");
var hash = CryptoJS.SHA1("Message");
var test = hash.toString(CryptoJS.enc.Hex);
console.log("+++sha1++++", hash);
console.log("--1----", test);
var hash1 = CryptoJS.SHA1("Message");
var test1 = hash1.toString(CryptoJS.enc.Hex);
console.log("+++sha1++++", hash1);
console.log("--1----", test1);
if (test == test1) {
    console.log("Success");
}
else {
    console.log("Fail");
}
