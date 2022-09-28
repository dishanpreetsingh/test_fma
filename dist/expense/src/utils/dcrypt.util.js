"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dcryption = void 0;
const mongoose_field_encryption_1 = require("mongoose-field-encryption");
const crypto = require('crypto');
function dcryption(value) {
    const key = crypto
        .createHash('sha256')
        .update(process.env.ENCRYPT_SECRET_KEY)
        .digest('hex')
        .substring(0, 32);
    const decrypted = (0, mongoose_field_encryption_1.decrypt)(value, key);
    return decrypted;
}
exports.dcryption = dcryption;
//# sourceMappingURL=dcrypt.util.js.map