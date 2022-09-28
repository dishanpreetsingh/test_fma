import { PaymentsService } from './payments.service';
import { Response } from 'express';
import { PaymentDto } from './dto/payment.dto';
export declare class PaymentsController {
    private paymentService;
    constructor(paymentService: PaymentsService);
    createPayments(response: Response, paymentRequestBody: PaymentDto): void;
}
