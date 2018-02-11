$(function () {
    //var dateNow = new Date();

    // $('#yearcal').calendar({
    //     displayWeekNumber: true,
    //     enableRangeSelection: true,
    //     minDate: dateNow
    // });

    disabledDateTest();
});


function disabledDateTest() {
    var dateNow = new Date();
    var currentYear = new Date().getFullYear();

    var confirmedDate = [];
    for (let i = 0; i < 7; i++) {
        confirmedDate.push(new Date(currentYear, 3, 16 + i).getTime());
    }

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