import { PaymentRequestBody } from './types/PaymentRequestBody';
export declare class PaymentsService {
    private stripe;
    constructor();
    createPayment(paymentRequestBody: PaymentRequestBody): Promise<any>;
}
