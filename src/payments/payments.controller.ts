import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentRequestBody } from './types/PaymentRequestBody';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { PaymentDto } from './dto/payment.dto';

@Controller('payments')
@ApiTags("Payment")
export class PaymentsController {
  constructor(private paymentService: PaymentsService) { }

  @Post()
  createPayments(
    @Res() response: Response,
    @Body() paymentRequestBody: PaymentDto,
  ) {
    this.paymentService
      .createPayment(paymentRequestBody)
      .then((res) => {
        response.status(HttpStatus.CREATED).json(res);
      })
      .catch((err) => {
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }
}
