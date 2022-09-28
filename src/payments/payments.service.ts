import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRequestBody } from './types/PaymentRequestBody';

@Injectable()
export class PaymentsService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.API_SECRET_KEY, {
      apiVersion: '2020-08-27',
    });
  }

  createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    console.log("paymentRequestBody",paymentRequestBody);
    let sumAmount = 0;
    paymentRequestBody.products.forEach((product) => {
      sumAmount = sumAmount + product.price * product.quantity;
    });
    return this.stripe.paymentIntents.create({
      amount: sumAmount * 100,
      currency: paymentRequestBody.currency,
    });
  }
}
