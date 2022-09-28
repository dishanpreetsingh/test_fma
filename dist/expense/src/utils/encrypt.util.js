"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryption = void 0;
const mongoose_field_encryption_1 = require("mongoose-field-encryption");
const crypto = require('crypto');
function encryption(value) {
    const saltGenerator = function (secret) {
        return process.env.SALT_GENERATOR_KEY;
    };
    const key = crypto
        .createHash('sha256')
        .update(process.env.ENCRYPT_SECRET_KEY)
        .digest('hex')
        .substring(0, 32);
    const res = (0, mongoose_field_encryption_1.encrypt)(value, key, saltGenerator);
    return res;
}
exports.encryption = encryption;
//# sourceMappingURL=encrypt.util.js.map