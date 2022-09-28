import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/jwt-auth-guard";
import { GetIncomeDto } from "src/interfaces/income/get-income.dto";
import { NewIncomeDto } from "src/interfaces/income/new-income.dto";

@ApiBearerAuth("defaultBearerAuth")
@Controller("income")
@UseGuards(JwtAuthGuard)
@ApiTags("Income")
export class IncomeController{
    constructor(@Inject("INCOME_SERVICE") private readonly incomeService: ClientProxy) {}
    @ApiOperation({ summary: 'Add Income' })
    @Post("/add")
    public async createIncome(@Req() req, @Body() posted_data: NewIncomeDto): Promise<any>{
        let obj1 = {user_id: req.user._id};
        let data = {obj1, posted_data};
        return await this.incomeService.send<any>({cmd:"new_income"},data).toPromise();
    }
    @ApiOperation({ summary: 'Get All Income' })
    @Get("/all")
    public async getAllIncomes(@Req() req):Promise<any> {
        let obj1 = {user_id: req.user._id}
        return await this.incomeService.send<any>({cmd: "all_incomes"},obj1).toPromise();
    } 
    @ApiOperation({ summary: 'Get Single Income' })
    @Get("/:_id")
    public async getIncome(@Req() req, @Param() params:GetIncomeDto):Promise<any> {
        let obj1 = {user_id:req.user._id};
        let data= {obj1,params};
        return await this.incomeService.send<any>({cmd:"get_income"},data).toPromise();
    }
    @ApiOperation({ summary: 'Edit Single Income' })
    @Put("/edit/:_id")
    public async editIncome(@Req() req, @Param() params: GetIncomeDto, @Body() posted_data: NewIncomeDto): Promise<any> {
        let obj1 = {user_id: req.user._id};
        let data = {obj1, params, posted_data};
        return await this.incomeService.send<any>({cmd:"edit_income"},data).toPromise();
    }
    @ApiOperation({ summary: 'Delete Single Income' })
    @Delete("/delete/:_id")
    public async deleteIncome(@Req() req, @Param() params: GetIncomeDto): Promise<any>{
        let obj1 = {user_id: req.user._id};
        let data = {obj1, params};
        return await this.incomeService.send<any>({cmd:"delete_income"}, data).toPromise();
    }
}