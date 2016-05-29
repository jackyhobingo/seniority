var count = 0;

function debugAlert(str) {
    alert(str);
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

    return new Date(six_length.slice(0, 4), parseInt(six_length.slice(4, 6)) - 1, six_length.slice(6, 8));
}
function isJustAMonth(final_day, initial_day) {
    if(final_day.getDate() >= 28 && initial_day.getDate() == 1) {
        if(isLeapYear(final_day.getFullYear()))
            if(final_day.getDate()== MonthLeap[final_day.getMonth()]) {
                return true;
            }
        else if(final_day.getDate()== Month[final_day.getMonth()]) {
            return true;
        }
    }   
    return false;
}
function isFirstDayOfMonth(initial_day) {
    if(initial_day.getDate() == 1) {
        return true;
    } else {
        return false;
    }
}
function isLastDayOfMonth(final_day) {
    if (isLeapYear(final_day.getFullYear())){
        return final_day.getDate() == MonthLeap[final_day.getMonth()];
    } else {
        return final_day.getDate() == Month[final_day.getMonth()];
    }
}

function dayDiff(final_day, initial_day) { // 考慮是否包含
    // 同年同月
    if (final_day.getMonth() == initial_day.getMonth() && (final_day.getFullYear() == initial_day.getFullYear())) {
        if (isFirstDayOfMonth(initial_day) && isLastDayOfMonth(final_day)){
            return 0;
        }
        return final_day.getDate() - initial_day.getDate() + 1;
    } else if (isLeapYear(initial_day.getFullYear())) {
        return final_day.getDate() + MonthLeap[initial_day.getMonth()] - initial_day.getDate() + 1;
    } else {
        return final_day.getDate() + Month[initial_day.getMonth()] - initial_day.getDate() + 1;
    }

}

function monthDiff(final_day, initial_day) {
    if (final_day.getFullYear() == initial_day.getFullYear()) {
        if (final_day.getMonth() == initial_day.getMonth()) {
            if(isFirstDayOfMonth(initial_day) && isLastDayOfMonth(final_day)){
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

function compute(input_i) {
    var initial_value = document.getElementById("initial" + input_i).value;
    var final_value = document.getElementById("final" + input_i).value;
    var initial_day = get_date(initial_value);
    var final_day = get_date(final_value);
    var ini_y = yearDiff(final_day, initial_day);
    var ini_m = monthDiff(final_day, initial_day);
    var ini_d = dayDiff(final_day, initial_day);

    debugAlert("畸零天數差異" + ini_d + "\n畸零月份差異" + ini_m + "\n畸零年差異" + ini_y + "\n天數差異" + ini_d % 30 + "\n月份差異" + (ini_m + Math.round(ini_d / 30)) % 12 + "\n年差異" + (ini_y + Math.round((ini_m + Math.round(ini_d / 30)) / 12)));

}

function showAnswer(ini_y, ini_m, ini_d) {

}



function add_new() {
    count++;
    var minus = document.getElementById("minus");
    var span_ = document.createElement("span");

    var add = '<span>起始日期</span><input id="initial' + count + '" type="text" placeholder="e.g. 19920907"><br><span>終止日期</span><input id="final' + count + '" type="text" placeholder="e.g. 20161201"><br>'
    span_.innerHTML = "增加區間" + count + "<br>" + add;
    minus.appendChild(span_);
}
