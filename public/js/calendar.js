
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




$(document).ready(loadBookedWeeks());



function loadBookedWeeks() {
    $.get("/calendardata", function (bookedWeeks){
        
        console.log(bookedWeeks);
        var dates = [];
        bookedWeeks.forEach(x => {
            dates.push(getDateFromWeeks(x -1));
            
        });
        
        
       console.log("Veckor test!");
       console.log(dates); 
       drawbookedWeeks(dates);
        
    });
}

function getDateFromWeeks(week){
    var date = moment('2018').add(week, 'weeks').toDate();
    return date;
}

function drawbookedWeeks(dates) {
    var dateNow = new Date();
    var currentYear = new Date().getFullYear();

    var confirmedDate = [];
    dates.forEach(x => {
        var date = moment(x).date();
        var month = moment(x).month();
        console.log(date);
        for (let i = 0; i < 7; i++) {
            confirmedDate.push(new Date(currentYear, month, date + i).getTime());
        }
        
    });

    var nonConfirmedDate = [];
    for (let i = 0; i < 7; i++) {
        nonConfirmedDate.push(new Date(currentYear, 4, 14 + i).getTime());
    }

    $('#yearcal').calendar({
        displayWeekNumber: true,
        enableRangeSelection: true,
        minDate: dateNow,
        customDayRenderer: function (element, date) {
            confirmedDate.forEach(x => {
                if (date.getTime() == x) {
                    $(element).css('background-color', 'red');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '15px');
                }
            });

                nonConfirmedDate.forEach(x => {
                    if (date.getTime() == x) {
                        $(element).css('background-color', 'yellow');
                        $(element).css('border-radius', '15px');
                    }
                });
        }   
    });
}


