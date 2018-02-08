$(function() {
    var currentYear = new Date().getFullYear();
    var data = getData();
    $('#calendar').calendar({ 
        disabledDays: [
            new Date(currentYear,1,2),
            new Date(currentYear,1,3),
            new Date(currentYear,1,8),
            new Date(currentYear,1,9),
            new Date(currentYear,1,10),
            new Date(currentYear,1,11),
            new Date(currentYear,1,13),
            new Date(currentYear,1,14),
            new Date(currentYear,1,15)
        ],
        dataSource: [
            {
                id: 0,
                name: 'bajskorv',
                location: 'där bajskorvar bor 22',
                startDate: new Date(currentYear, 4, 28),
                endDate: new Date(currentYear, 4, 29)
            }],
    
        displayWeekNumber: true
    });
});
