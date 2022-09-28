import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Expense, ExpenseDocument } from "src/schemas/expense.schema";
import { Payment, PaymentDocument } from "src/schemas/payment.schema";
import { getDaysInAMonth } from "src/utils/get-weeks.util";
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { dcryption } from "src/utils/dcrypt.util";
import { checkNumber } from "src/utils/checkNumber.util";
import { Category, CategoryDocument } from "src/schemas/category.schema";

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name) private readonly expenseModel: Model<ExpenseDocument>,
        @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>,
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>
    ) { }

    public async checkPaymentId(id: string): Promise<any> {
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                let check = await this.paymentModel.findById({ _id: id });
                if (check) {
                    return "ok"
                } else {
                    return "invalid_id"
                }
            } else {
                return "invalid_id"
            }
        } catch (error) {
            return false
        }
    }

    public async checkCategoryId(id: any, user_id: any): Promise<any> {
        try {
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                let check = await this.categoryModel.findById({ _id: id, user_id: user_id });
                if (check) {
                    return "ok"
                } else {
                    return "invalid_id"
                }
            } else {
                return "invalid_id"
            }
        } catch (error) {
            return false
        }
    }

    public async newExpense(data: any): Promise<any> {
        let check_payment = await this.checkPaymentId(data.new_expense.payment_type);
        if (check_payment && check_payment === "ok") {
            let check_category = await this.checkCategoryId(data.new_expense.category, data.obj1.user_id);
            if (check_category && check_category === "ok") {
                try {
                    data.new_expense.user_id = data.obj1.user_id;
                    data.new_expense.created_at = new Date();
                    data.new_expense.updated_at = new Date();
                    let newExpense = new this.expenseModel(data.new_expense);
                    let saveExpense = await newExpense.save();
                    return saveExpense;
                } catch (error) {
                    return false
                }
            } else {
                return "invalid_category"
            }
        } else {
            return 'invalid_payment'
        }
    }
// 
// annually
// monthly & 2022
// weekly & 09,2022
// days & 09,2022
    public async getAllExpenses(data: any): Promise<any> {
        if (!Object.keys(data.query).length) {
            let expenses = await this.expenseModel.find({ user_id: data.user_id }).populate("category").populate("payment_type").sort({ date: -1 });
            if (expenses.length) {
                let allExpenses = [];
                expenses.map((element) => {
                    if (checkNumber(element.category.name)) {
                        element.category.name = dcryption(element.category.name);
                    } else {
                        element.category.name = element.category.name;
                    }
                    const found = allExpenses.some(value => value.date.getTime() === element.date.getTime());
                    if (!found) {
                        allExpenses.push({
                            date: element.date,
                            expense: [element]
                        })
                    } else {
                        allExpenses.forEach((item) => {
                            if (item.date.getTime() === element.date.getTime()) {
                                item.expense.push(element);
                            }
                        })
                    }
                });
                allExpenses.map((element) => {
                    const sum = element.expense.reduce((acc, obj) => {
                        return acc + obj.amount;
                    }, 0)
                    element.total = sum;
                });
                return allExpenses;
            } else {
                return false
            }
        } else {
            function yearValidation(year) {
                var text = /^[0-9]+$/;
                if (year.length == 4) {
                    if (year != 0) {
                        if ((year != "") && (!text.test(year))) {
                            alert("Please Enter Numeric Values Only");
                            return false;
                        }
                        if (year.length != 4) {
                            alert("Year is not proper. Please check");
                            return false;
                        }
                        var current_year = new Date().getFullYear();
                        if ((year < 1920) || (year > current_year)) {
                            alert("Year should be in range 1920 to current year");
                            return false;
                        }
                        return true;
                    }
                }
            }
            if (data.query.month_year_type && data.query.month_year_type.length) {
                if (data.query.month_year_type.length === 7) {
                    var month_value = data.query.month_year_type.slice(0, 2);
                    var year_value = data.query.month_year_type.slice(3,);
                } else if (data.query.month_year_type.length === 4) {
                    var year_value = data.query.month_year_type;
                }
            }
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'];
            if (data.query && data.query.type === "monthly") {
                let year_value = data.query.month_year_type;
                let allExpense = [];
                let index = 0;
                for (const key of months) {
                    let startDate: any = Date.UTC(year_value, index);
                    startDate = new Date(startDate);
                    let endDate: any = Date.UTC(year_value, startDate.getMonth() + 1, 0);
                    endDate = new Date(endDate);
                    var expense = await this.expenseModel.find({ user_id: data.user_id, date: { $gte: startDate, $lte: endDate } });
                    const sum = expense.reduce((acc, obj) => {
                        return acc + obj.amount;
                    }, 0);
                    allExpense.push({
                        month: key,
                        total: sum
                    });
                    index++;
                }
                return allExpense;
            } else if (data.query && data.query.type === "day") {
                let month = month_value - 1;
                if (month >= 0) {
                    let startDate: any = Date.UTC(year_value, month);
                    startDate = new Date(startDate);
                    let endDate: any = Date.UTC(year_value, startDate.getMonth() + 1, 0);
                    endDate = new Date(endDate);

                    var data1 = await this.expenseModel.find({ user_id: data.user_id, date: { $gte: startDate, $lte: endDate } }).populate("category").populate("payment_type");
                    if (data1.length) {
                        let dayExpenses = []
                        data1.map((element) => {
                            if (checkNumber(element.category.name)) {
                                element.category.name = dcryption(element.category.name);
                            } else {
                                element.category.name = element.category.name;
                            }
                            const found = dayExpenses.some(item => item.date.getTime() === element.date.getTime());
                            if (!found) {
                                dayExpenses.push({
                                    date: element.date,
                                    expenses: [element]
                                })
                            } else {
                                dayExpenses.forEach(item => {
                                    if (item.date.getTime() === element.date.getTime()) {
                                        item.expenses.push(element);
                                    }
                                })
                            }
                        });
                        dayExpenses.map((element) => {
                            let result = element.expenses.reduce((acc, obj) => {
                                return acc + obj.amount
                            }, 0);
                            element.total = result;
                        })
                        return dayExpenses;
                    } else {
                        return false
                    }
                }
            } else if (data.query && data.query.type === "weekly") {
                let month = month_value - 1;
                let week = getDaysInAMonth(year_value, month);
                let allweekExpense = []
                for (const key of week) {
                    let startWeekDate = new Date(key.start);
                    let start: any = Date.UTC(startWeekDate.getFullYear(), startWeekDate.getMonth(), startWeekDate.getDate());
                    start = new Date(start);
                    let endWeekDate = new Date(key.end);
                    let end: any = Date.UTC(endWeekDate.getFullYear(), endWeekDate.getMonth(), endWeekDate.getDate());
                    end = new Date(end);
                    let expense = await this.expenseModel.find({ user_id: data.user_id, date: { $gte: start, $lte: end } }).populate("category").populate("payment_type");
                    expense.map((element) => {
                        if (checkNumber(element.category.name)) {
                            element.category.name = dcryption(element.category.name);
                        } else {
                            element.category.name = element.category.name;
                        }
                    })
                    let sum = expense.reduce((acc, obj) => {
                        return acc + obj.amount;
                    }, 0);
                    let sDate = `${start.getFullYear()}/${start.getMonth() + 1}/${start.getDate()}`;
                    let eDate = `${end.getFullYear()}/${end.getMonth() + 1}/${end.getDate()}`;
                    allweekExpense.push({
                        week: `${sDate} to ${eDate}`,
                        expense: expense,
                        total: sum
                    });
                }
                return allweekExpense;
            } else if (data.query && data.query.type === "annually") {

                let annualluy_expense = [];
                let expense = await this.expenseModel.find({ user_id: data.user_id }).sort({ created_at: -1 });
                let years = []
                expense.map((element) => {
                    let getyear = element.date.getFullYear();
                    years.push(getyear);
                });
                let filterYears = [...new Set(years)];
                filterYears.sort();
                for (const key of filterYears) {
                    let startDate: any = Date.UTC(key, 0, 1);
                    startDate = new Date(startDate);
                    let endDate: any = Date.UTC(key, 11, 31);
                    endDate = new Date(endDate);
                    let annuallyExpense = await this.expenseModel.find({ user_id: data.user_id, date: { $gte: startDate, $lte: endDate } }).sort({ created_at: -1 });
                    let sum = annuallyExpense.reduce((acc, obj) => {
                        return acc + obj.amount;
                    }, 0);
                    annualluy_expense.push({
                        year: key,
                        annualluy_expense: annuallyExpense,
                        total: sum,
                    })
                }
                return annualluy_expense;
            }
            return false
        }
    }

    public async getExpense(data: any): Promise<any> {
        if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            let expense = await this.expenseModel.findOne({ user_id: data.obj1.user_id, _id: data.params._id });
            return expense
        } else {
            return "invalid_id"
        }
    }

    public async editExpense(data: any): Promise<any> {
        if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            let check_payment = await this.checkPaymentId(data.posted_data.payment_type);
            if (check_payment && check_payment === "ok") {
                let check_category = await this.checkCategoryId(data.posted_data.category, data.obj1.user_id);
                if (check_category && check_category === "ok") {
                    data.posted_data.updated_at = new Date();
                    let expense = await this.expenseModel.findOneAndUpdate({ user_id: data.obj1.user_id, _id: data.params._id }, data.posted_data, { new: true });
                    return expense;
                } else {
                    return "invalid_category"
                }
            } else {
                return 'invalid_payment'
            }
        } else {
            return "invalid_id";
        }
    }

    public async deleteExpense(data: any): Promise<any> {
        if (data.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            let expense = await this.expenseModel.findOneAndDelete({ user_id: data.obj1.user_id, _id: data.params._id });
            return expense;
        } else {
            return "invalid_id";
        }
    }
}