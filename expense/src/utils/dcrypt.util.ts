import { decrypt, encrypt } from 'mongoose-field-encryption';
const crypto = require('crypto');

export function dcryption(value){
    
   const key = crypto
   .createHash('sha256')
   .update(process.env.ENCRYPT_SECRET_KEY)
   .digest('hex')
   .substring(0, 32);
   const decrypted = decrypt(value, key);
   return decrypted;
}