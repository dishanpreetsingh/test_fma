import { Controller, HttpStatus, Injectable } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { newIncomeResponseInterface } from "./interfaces/new-income-response.interface";
import { incomeService } from "./services/income.service";

@Controller()
export class IncomeController{
    constructor(private readonly incomeService: incomeService) {}
    @MessagePattern({cmd: "new_income"})
    public async createIncome(data:any): Promise<any> {
        let result : newIncomeResponseInterface;
        let income = await this.incomeService.newIncome(data);
        if(income && income != "invalid_payment" && income != "invalid_category"){
            result = {
                status: HttpStatus.ACCEPTED,
                message: "Income Created Successfully",
                income: income,
                errors: null
            }
        }else if(income === "invalid_payment"){
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Payment Id",
                income: null,
                errors: null
            }
        }else if(income === "invalid_category"){
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Category Id",
                income: null,
                errors: null
            }
        }else{
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: "Bad Request",
                income: null,
                errors: null
            }
        }
        return result;
    }

    @MessagePattern({cmd:"all_incomes"})
    public async allIncomes(data:any):Promise<any>{
        let result : newIncomeResponseInterface;
        let incomes = await this.incomeService.all_incomes(data);
        if(incomes){
            result = {
                status: HttpStatus.FOUND,
                message: "All Incomes",
                income: incomes,
                errors:null
            }
        }else{
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors:null
            } 
        }
        return result;
    }

    @MessagePattern({cmd:"get_income"})
    public async getIncome(data:any):Promise<any> {
        let result : newIncomeResponseInterface;
        let income = await this.incomeService.getIncome(data);
        if(income && income != "invalid_id"){
            result= {
                status: HttpStatus.FOUND,
                message: "Income Found",
                income: income,
                errors: null
            }
        }else if(income === "invalid_id"){
            result= {
                status: HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Income Id",
                income: null,
                errors: null
            }
        }else{
            result= {
                status: HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors: null
            }
        }
        return result;
    }

    @MessagePattern({cmd:"edit_income"})
    public async editIncome(data:any):Promise<any>{
        let result : newIncomeResponseInterface;
        let income = await this.incomeService.edit_income(data);
        if(income && income != "invalid_id" && income != "invalid_payment" && income != "invalid_category"){
            result = {
                status: HttpStatus.ACCEPTED,
                message: "Income Updated Successfully",
                income: income,
                errors: null
            }
        }else if(income === "invalid_id"){
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Income Id",
                income: null,
                errors: null
            }
        }else if(income === "invalid_payment"){
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Payment Id",
                income: null,
                errors: null
            }
        }else if(income === "invalid_category"){
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Category Id",
                income: null,
                errors: null
            }
        }else{
            result = {
                status: HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors: null
            }
        }
        return result;
    }

    @MessagePattern({cmd:"delete_income"})
    public async deleteIncome(data:any):Promise<any>{
        let result : newIncomeResponseInterface;
        let delete_income = await this.incomeService.deleteIncome(data);
        if(delete_income && delete_income != "invalid_id"){
            result = {
                status: HttpStatus.ACCEPTED,
                message: "Income Deleted Successfully",
                income: delete_income,
                errors: null
            }
        }else if(delete_income === "invalid_id"){
            result = {
                status : HttpStatus.NOT_FOUND,
                message: "Please Enter Valid Income Id",
                income: null,
                errors:null
            }
        }else{
            result = {
                status : HttpStatus.NOT_FOUND,
                message: "Not Found",
                income: null,
                errors:null
            }
        }
        return result;
    }
}