import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guard/jwt-auth-guard";
import { ArrayIds } from "src/interfaces/category/array-ids.dto";
import { createCategoryDto } from "src/interfaces/category/create-category.dto";
import { getAllExpenseByCategory } from "src/interfaces/category/get-expense-by-category.dto";
import { GetCategoryDto } from "src/interfaces/category/get-expense-category.dto";
import { UpdateCategoryDto } from "src/interfaces/category/update-category.dto";


@ApiBearerAuth('defaultBearerAuth')
@Controller()
@UseGuards(JwtAuthGuard)
@ApiTags("Category")
export class CategoryController {
    constructor(@Inject("CATEGORY_SERVICE") private readonly categoryServiceClient: ClientProxy) {}

    @ApiOperation({ summary: "Add Category" })
    @Post("/category/add")
    public async createCategory(@Body() category: createCategoryDto, @Req() req): Promise<any>{
        var obj1 = {user_id: req.user._id};
        let data = {obj1, category};
        return await this.categoryServiceClient.send<any>({cmd:"create_category"},data).toPromise();
    }
    @ApiOperation({ summary: "Get All Categories" })
    @Get("/category/all")
    public async allCategory(@Req() req):Promise<any>{
        let user_id = req.user._id;
        return await this.categoryServiceClient.send({cmd:"all_category"},user_id).toPromise();
    }
    @ApiOperation({ summary: "Get Single Category" })
    @Get("/category/:_id")
    public async singleCategory(@Req() req, @Param() params:GetCategoryDto): Promise<any>{
        var obj1 = {user_id:req.user._id};
        let data = {obj1,params};
        return await this.categoryServiceClient.send<any>({cmd:"get_single_category"},data).toPromise();
    }
    @ApiOperation({ summary: "Edit Category" })
    @Put("/category/edit/:_id")
    public async updateCategory(@Req() req, @Param() params:GetCategoryDto, @Body() category:UpdateCategoryDto): Promise<any>{
        var obj1 = {user_id: req.user._id};
        let data = {obj1,params,category};
        return await this.categoryServiceClient.send<any>({cmd:"update_category"},data).toPromise();
    }
    @ApiOperation({ summary: "Delete Categories" })
    @Delete("/category/delete/:_id")
    public async deleteCategory(@Req() req, @Body() arrayids: ArrayIds): Promise<any>{
        var obj1 = {user_id: req.user._id};
        let data = {obj1,arrayids};
        return await this.categoryServiceClient.send<any>({cmd:"delete_category"},data).toPromise();
    }
   
    @ApiOperation({ summary: 'Get All Expense With Single Category' })
    @Get('/expense/get/:category_id')
    public async getAllExpenseByCategory(@Req() req, @Param() params: getAllExpenseByCategory): Promise<any>{
        var obj1 = {user_id: req.user._id};
        let data = {obj1, params};
        return await this.categoryServiceClient.send<any>({cmd:"get_expense_by_category"},data).toPromise();
    }

    @ApiOperation({ summary: 'Get All Income with Single Category' })
    @Get('/income/get/:category_id')
    public async getAllIncomeByCategory(@Req() req, @Param() params: getAllExpenseByCategory): Promise<any>{
        var obj1 = {user_id: req.user._id};
        let data = {obj1, params};
        return await this.categoryServiceClient.send<any>({cmd:"get_income_by_category"},data).toPromise();
    }
}