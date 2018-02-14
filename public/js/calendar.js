// $(function() {
//     var currentYear = new Date().getFullYear();
//     $('#calendar').calendar({ 
//         disabledDays: [
//             new Date(currentYear,1,2),
//             new Date(currentYear,1,3),
//             new Date(currentYear,1,8),
//             new Date(currentYear,1,9),
//             new Date(currentYear,1,10),
//             new Date(currentYear,1,11),
//             new Date(currentYear,1,13),
//             new Date(currentYear,1,14),
//             new Date(currentYear,1,15)
//         ],
//         dataSource: [
//             {
//                 id: 0,
//                 name: 'bajskorv',
//                 location: 'där bajskorvar bor 22',
//                 startDate: new Date(currentYear, 4, 28),
//                 endDate: new Date(currentYear, 4, 29)
//             }],

//         displayWeekNumber: true
//     });
// });

var currentYear = new Date().getFullYear();

$(document).ready(loadBookedWeeks());

function loadBookedWeeks() {
    $.get("/calendardata", function (bookedWeeks) {
        // console.log(bookedWeeks);
        var dates = [];
        bookedWeeks.forEach(x => {
            dates.push({ date: getDateFromWeeks(x.week - 1), confirmed: x.confirmed });
        });
        // console.log("Veckor test!");
        // console.log(dates);
        drawbookedWeeks(dates);
    });
}

function getDateFromWeeks(week) {
    var date = moment(currentYear).add(week, 'weeks').toDate();
    return date;
}

function drawbookedWeeks(dates) {
    var dateNow = new Date();


    var confirmedDate = [];
    var nonConfirmedDate = [];
    dates.forEach(x => {
        var date = moment(x.date).date();
        var month = moment(x.date).month();
        //console.log(date);
        if (x.confirmed) {
            for (let i = 0; i < 7; i++) {
                confirmedDate.push(new Date(currentYear, month, date + i).getTime());
            }
        }
        else {
            for (let i = 0; i < 7; i++) {
                nonConfirmedDate.push(new Date(currentYear, month, date + i).getTime());
            }
        }
    });

    $('#yearcal').calendar({
        displayWeekNumber: true,
        enableRangeSelection: true,
        minDate: dateNow,
        language: "sv",
        customDayRenderer: function (element, date) {
            confirmedDate.forEach(x => {
                if (date.getTime() == x) {
                    $(element).addClass('confirmedDate');
                }
            });

            nonConfirmedDate.forEach(x => {
                if (date.getTime() == x) {
                    $(element).addClass('nonConfirmedDate');
                }
            });
        }
    });
}