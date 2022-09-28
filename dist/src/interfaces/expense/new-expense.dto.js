"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewExpenseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NewExpenseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        default: '2022-08-28'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], NewExpenseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        default: "631b2a8a4bc2a7568b5b8ea0"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], NewExpenseDto.prototype, "payment_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        default: "631ad751cd7a7a2bd840b1ad"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], NewExpenseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewExpenseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NewExpenseDto.prototype, "note", void 0);
exports.NewExpenseDto = NewExpenseDto;
//# sourceMappingURL=new-expense.dto.js.map