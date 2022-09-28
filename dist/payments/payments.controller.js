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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const swagger_1 = require("@nestjs/swagger");
const payment_dto_1 = require("./dto/payment.dto");
let PaymentsController = class PaymentsController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    createPayments(response, paymentRequestBody) {
        this.paymentService
            .createPayment(paymentRequestBody)
            .then((res) => {
            response.status(common_1.HttpStatus.CREATED).json(res);
        })
            .catch((err) => {
            response.status(common_1.HttpStatus.BAD_REQUEST).json(err);
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, payment_dto_1.PaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "createPayments", null);
PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    (0, swagger_1.ApiTags)("Payment"),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map