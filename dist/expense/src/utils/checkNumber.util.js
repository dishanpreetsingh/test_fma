"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumber = void 0;
function checkNumber(value) {
    let check_number = /[0-9]/.test(value);
    let countNumber = value.replace(/[^0-9]/g, '').length;
    if (check_number && countNumber > 10) {
        return true;
    }
    else {
        return false;
    }
}
exports.checkNumber = checkNumber;
//# sourceMappingURL=checkNumber.util.js.map