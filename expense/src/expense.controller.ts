import { Controller, HttpStatus } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { NewExpenseResponseInterFace } from "./interfaces/new-expense-response.interface";
import { NewExpenseInterface } from "./interfaces/new-expense.interface";
import { ExpenseService } from "./services/expense.service";

@Controller()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  
  @MessagePattern({cmd: "new_expense"})
  public async newExpense(data:any):Promise<any> {
    let result : NewExpenseResponseInterFace;
    let expense = await this.expenseService.newExpense(data);
    if(expense && expense != "invalid_payment" && expense != "invalid_category"){
        result ={
            status: HttpStatus.ACCEPTED,
            message: "Expense Created Successfully",
            expense: expense,
            errors: null,
        }
    }else if(expense === "invalid_payment"){
        result ={
            status: HttpStatus.NOT_FOUND,
            message: "Please Enter Valid Payment Id",
            expense: null,
            errors: null,
        }
    }else if(expense === "invalid_category"){
        result ={
            status: HttpStatus.NOT_FOUND,
            message: "Please Enter Valid Category Id",
            expense: null,
            errors: null,
        }
    }else{
        result ={
            status: HttpStatus.BAD_REQUEST,
            message: "Bad Request",
            expense: null,
            errors: null,
        }
    }
    return result;
  }

  @MessagePattern({cmd: "all_expenses"})
  public async allExpenses(data:any): Promise<any> {
    let result : NewExpenseResponseInterFace;

    try {
        let getAllExpenses = await this.expenseService.getAllExpenses(data);
        if(getAllExpenses.length){
            result = {
                status:HttpStatus.ACCEPTED,
                message: "All Expenses",
                expense: getAllExpenses,
                errors: null
            }
        }else{
            result = {
                status:HttpStatus.NOT_FOUND,
                message: "Not Found",
                expense: null,
                errors: null
            }
        }
        
    } catch (error) {
        result = {
            status:HttpStatus.BAD_REQUEST,
            message: "Bad Request",
            expense: null,
            errors: null
        }
    }
    return result;
    
  }

  @MessagePattern({cmd:"get_expense"})
  public async getExpense(data:any): Promise<any> {
    let result : NewExpenseResponseInterFace;
    let expense =await this.expenseService.getExpense(data);
    if(expense && expense != "invalid_id"){
        result = {
            status: HttpStatus.ACCEPTED,
            message:"Expense Found",
            expense:expense,
            errors: null
        }
    }else if(expense === "invalid_id"){
        result = {
            status: HttpStatus.NOT_FOUND,
            message:"Please Enter Valid Expense Id",
            expense:null,
            errors: null
        }
    }else{
        result = {
            status: HttpStatus.NOT_FOUND,
            message:"Not Found",
            expense:null,
            errors: null
        }
    }
    return result;
  }

  @MessagePattern({cmd:"edit_expense"})
  public async editExpense(data:any): Promise<any>{
    let expense = await this.expenseService.editExpense(data);
    let result : NewExpenseResponseInterFace;
    if(expense && expense != "invalid_id"  && expense != "invalid_payment" && expense != "invalid_category"){
        result = {
            status: HttpStatus.ACCEPTED,
            message: "Expense Updated Successfully",
            expense: expense,
            errors: null
        }
    }else if(expense === "invalid_id"){
        result = {
            status: HttpStatus.NOT_FOUND,
            message: "Please Enter Valid Expense Id",
            expense: null,
            errors: null
        }
    }else if(expense === "invalid_payment"){
        result = {
            status: HttpStatus.NOT_FOUND,
            message: "Please Enter Valid Paymen Id",
            expense: null,
            errors: null
        }
    }else if(expense === "invalid_category"){
        result = {
            status: HttpStatus.NOT_FOUND,
            message: "Please Enter Valid Category Id",
            expense: null,
            errors: null
        }
    }else{
        result = {
            status: HttpStatus.NOT_FOUND,
            message: "Not Found",
            expense:null,
            errors: null
        }
    }
    return result;
  }

  @MessagePattern({cmd: "delete_expense"})
  public async deleteExpense(data:any):Promise<any> {
    let result : NewExpenseResponseInterFace;
    let expense = await this.expenseService.deleteExpense(data);
    if(expense && expense != "invalid_id"){
        result = {
            status: HttpStatus.ACCEPTED,
            message: "Expense Deleted Successfully",
            expense: expense,
            errors: null
        }
    }else if(expense === "invalid_id"){
        result = {
            status: HttpStatus.NOT_FOUND,
            message: "Please Enter Valid Expense Id",
            expense: null,
            errors: null
        }
    }else{
        result = {
            status: HttpStatus.NOT_FOUND,
            message: "Not Found",
            expense: null,
            errors: null
        }
    }
    return result;
  }

}