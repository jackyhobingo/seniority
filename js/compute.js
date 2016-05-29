var count = 0;

function debugAlert(str) {
    // alert(str);
}

var Month = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];
var MonthLeap = [
    31,
    29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];

function getTheNumberDateOf(date) {
    var day = 0;
    var month = date.getMonth();
    if (isLeapYear(date.getFullYear())) {
        for (var i = 0; i < month; i++) {
            day += MonthLeap[i];
        }
        day += date.getDate();
    } else {
        for (var i = 0; i < month; i++) {
            day += Month[i];
        }
        day += date.getDate();
    }
    return day;
}

function isLeapYear(year) {

    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

function get_date(six_length) {
    six_length = String(Number(six_length))

    return new Date(six_length.slice(0, 4), parseInt(six_length.slice(4, 6)) - 1, six_length.slice(6, 8));
}

function isFirstDayOfMonth(initial_day) {
    return initial_day.getDate() == 1;
}

function isLastDayOfMonth(final_day) {
    if (isLeapYear(final_day.getFullYear())) {
        return final_day.getDate() == MonthLeap[final_day.getMonth()];
    } else {
        return final_day.getDate() == Month[final_day.getMonth()];
    }
}

function dayDiff(final_day, initial_day) { // 考慮是否包含
    // 同年同月
    if (final_day.getMonth() == initial_day.getMonth() && (final_day.getFullYear() == initial_day.getFullYear())) {
        if (isFirstDayOfMonth(initial_day) && isLastDayOfMonth(final_day)) {
            return 0;
        }
        return final_day.getDate() - initial_day.getDate() + 1;
    } else if (isLeapYear(initial_day.getFullYear())) {

        return !isLastDayOfMonth(final_day) * final_day.getDate() + (MonthLeap[initial_day.getMonth()] - initial_day.getDate() + 1) * !isFirstDayOfMonth(initial_day);
    } else {
        return !isLastDayOfMonth(final_day) * final_day.getDate() + (Month[initial_day.getMonth()] - initial_day.getDate() + 1) * !isFirstDayOfMonth(initial_day);
    }

}

function monthDiff(final_day, initial_day) {
    if (final_day.getFullYear() == initial_day.getFullYear()) {
        if (final_day.getMonth() == initial_day.getMonth()) {
            if (isFirstDayOfMonth(initial_day) && isLastDayOfMonth(final_day)) {
                return 1;
            }
            return 0;
        } else {

            return final_day.getMonth() - initial_day.getMonth() - 1 + Number(isFirstDayOfMonth(initial_day)) + Number(isLastDayOfMonth(final_day));
        }
    } else {
        return 11 - initial_day.getMonth() + final_day.getMonth() + Number(isFirstDayOfMonth(initial_day)) + Number(isLastDayOfMonth(final_day));
    }
}

function yearDiff(final_day, initial_day) {
    if (final_day.getFullYear() == initial_day.getFullYear()) {
        return 0;
    } else {
        return final_day.getFullYear() - initial_day.getFullYear() - 1;
    }
}

function showAnswer(ini_y, ini_m, ini_d, i) {
    var year = document.getElementById("year_" + i);
    var month = document.getElementById("month_" + i);
    var day = document.getElementById("day_" + i);
    if (ini_y == ini_y) {
        year.innerHTML = ini_y;
        month.innerHTML = ini_m;
        day.innerHTML = ini_d;
    } else {
        year.innerHTML = 0;
        month.innerHTML = 0;
        day.innerHTML = 0;
    }

}

function showTotalAnswer(ini_y, ini_m, ini_d) {
    var year = document.getElementById("year_t");
    var month = document.getElementById("month_t");
    var day = document.getElementById("day_t");
    ini_y = (ini_y + Math.floor((ini_m + Math.floor(ini_d / 30)) / 12));
    ini_m = (ini_m + Math.floor(ini_d / 30)) % 12;
    ini_d = ini_d % 30;

    year.innerHTML = ini_y;
    month.innerHTML = ini_m;
    day.innerHTML = ini_d;
}

function compute(input_i) {
    var ini_y = 0;
    var ini_m = 0;
    var ini_d = 0;
    for (var i = 0; i <= input_i; i++) {
        var initial_value = document.getElementById("initial" + i).value;
        var final_value = document.getElementById("final" + i).value;
        var initial_day = get_date(initial_value);
        var final_day = get_date(final_value);
        var t_y = yearDiff(final_day, initial_day);
        var t_m = monthDiff(final_day, initial_day);
        var t_d = dayDiff(final_day, initial_day);
        if (t_y == t_y) {
            ini_y += t_y;
            ini_m += t_m;
            ini_d += t_d;
        }
        showAnswer(t_y, t_m, t_d, i);
    }

    showTotalAnswer(ini_y, ini_m, ini_d);
}



function add_new() {
    count++;
    var adds = document.getElementById("adds");
    var span_ = document.createElement("span");
    var add = '<table><tr><td class="subtitle">起始日期</td><td><input id="initial' + count + '" type="text" placeholder="19920907"></td><td class="col">年</td><td class="col">月</td><td class="col">日</td></tr><tr><td class="subtitle">終止日期</td><td><input id="final' + count + '" type="text" placeholder="20161201"></td><td class="ans" id="year_' + count + '">0</td><td class="ans" id="month_' + count + '">0</td><td class="ans" id="day_' + count + '">0</td></tr></table>'
    span_.innerHTML = "區間" + count + "<br>" + add;
    adds.appendChild(span_);
}
