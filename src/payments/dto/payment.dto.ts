import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {
@ApiProperty({
    type: String,
    default: [
        {
            "item":6,
            "title":"Solid Gold Petite Micropave ",
            "price":5000,
            "quantity":1
         }
    ]
})
products:any;
@ApiProperty({
    type:String,
    default: "usd"
})
currency:string;

}