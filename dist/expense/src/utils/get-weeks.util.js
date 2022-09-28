"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysInAMonth = void 0;
const Moment = require("moment");
const moment_range_1 = require("moment-range");
const getDaysInAMonth = (year = +Moment().format("YYYY"), month = +Moment().format("MM") - 1) => {
    const moment = (0, moment_range_1.extendMoment)(Moment);
    let startDate = moment.utc([year, month]);
    let firstDay = moment(startDate).startOf('month');
    let endDay = moment(startDate).endOf('month');
    let monthRange = moment.range(firstDay, endDay);
    let weeks = [];
    for (let mday of monthRange.by('days')) {
        if (weeks.indexOf(mday.week()) === -1) {
            weeks.push(mday.week());
        }
    }
    let calendar = [];
    for (let index = 0; index < weeks.length; index++) {
        var weeknumber = weeks[index];
        let firstWeekDay = moment().year(year).month(month).week(weeknumber).day(0);
        let lastWeekDay = moment().year(year).month(month).week(weeknumber).day(6);
        if (month == 11 && (weeks.length - 1) == index) {
            firstWeekDay = moment().year(year).month(month).week(weeks[index - 1]).day(0);
            firstWeekDay.add(7, "day");
            lastWeekDay = moment().year(year).month(month).week(weeks[index - 1]).day(6);
            lastWeekDay.add(6, "day");
        }
        if (firstWeekDay.isBefore(firstDay)) {
            firstWeekDay = firstDay;
        }
        if (lastWeekDay.isAfter(endDay)) {
            lastWeekDay = endDay;
        }
        let weekRange = moment.range(firstWeekDay, lastWeekDay);
        calendar.push(weekRange);
    }
    return calendar;
};
exports.getDaysInAMonth = getDaysInAMonth;
//# sourceMappingURL=get-weeks.util.js.map