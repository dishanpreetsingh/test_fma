import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/jwt-auth-guard";
import { GetExpenseDto } from "src/interfaces/expense/get-expense.dto";
import { GetFilterExpenseDto } from "src/interfaces/expense/get-filter-expense.dto";
import { NewExpenseDto } from "src/interfaces/expense/new-expense.dto";

@ApiBearerAuth("defaultBearerAuth")
@Controller("expense")
@UseGuards(JwtAuthGuard)
@ApiTags("Expense")
export class ExpenseController {
    constructor(@Inject("EXPENSE_SERVICE") private readonly expenseServiceClient: ClientProxy) {}
    @ApiOperation({ summary: 'Add Expense' })
    @Post("/add")
    public async newExpense(@Body() new_expense:NewExpenseDto , @Req() req, ):Promise<any>{
        let obj1 = {user_id: req.user._id};
        let data = {obj1, new_expense};
        return await this.expenseServiceClient.send<any>({cmd:"new_expense"}, data).toPromise();
    }
    @ApiOperation({ summary: 'Get All Expense' })
    @Get("/all")
    public async allExpenses(@Req() req,@Query() query: GetFilterExpenseDto):Promise<any>{
        let obj1 = {user_id: req.user._id,query};
        return await this.expenseServiceClient.send<any>({cmd:"all_expenses"},obj1).toPromise();
    }
    @ApiOperation({ summary: 'Get Single Expense' })
    @Get("/:_id")
    public async getExpense(@Req() req, @Param() params:GetExpenseDto): Promise<any>{
        let obj1 = {user_id: req.user._id};
        let data = {obj1, params};
        return await this.expenseServiceClient.send<any>({cmd: "get_expense"},data).toPromise();
    }
    @ApiOperation({ summary: 'Edit Single Expense' })
    @Put("/edit/:_id")
    public async editExpense(@Req() req, @Param() params:GetExpenseDto, @Body() posted_data: NewExpenseDto): Promise<any>{
        let obj1 = {user_id: req.user._id};
        let data = {obj1,params,posted_data};
        return await this.expenseServiceClient.send<any>({cmd:"edit_expense"},data);
    }
    @ApiOperation({ summary: 'Delete Single Expense' })
    @Delete("/delete/:_id")
    public async deleteExpense(@Req() req, @Param() params:GetExpenseDto): Promise<any>{
        let obj1 = {user_id: req.user._id};
        let data = {obj1,params};
        return await this.expenseServiceClient.send<any>({cmd: "delete_expense"},data).toPromise();
    }


}