$(function() {
    var currentYear = new Date().getFullYear();
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

// function getBookedWeeksFromDb(){
//     var bookedWeeks = [];
//     var obj = getDbData();
//     obj.forEach(x => {
//         var tmp = x.vecka.split(',');
//         tmp.forEach(y => {
//             bookedWeeks.push(y);
//         });
//         return bookedWeeks;
//     });}

// function getDateRangeOfWeek(weekNo){
//     var d1 = new Date();
//     numOfdaysPastSinceLastMonday = eval(d1.getDay()- 1);
//     d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
//     var weekNoToday = d1.getWeek();
//     var weeksInTheFuture = eval( weekNo - weekNoToday );
//     d1.setDate(d1.getDate() + eval( 7 * weeksInTheFuture ));
//     var rangeIsFrom = eval(d1.getMonth()+1) +"," + d1.getDate();
//     d1.setDate(d1.getDate() + 6);
//     var rangeIsTo = eval(d1.getMonth()+1) +"," + d1.getDate();
//     return rangeIsFrom + "/" + rangeIsTo;
// };

// Date.prototype.getWeek = function() {
// var onejan = new Date(this.getFullYear(),0,1);
// return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
// }

// (function(){
//     var bookedDates = [];
//     var poop = getBookedWeeksFromDb();
//     var poop = ["2,4/2,11", "3,4/3,11"]
//     poop.forEach(o => {
//         bookedDates.push(getDateRangeOfWeek(o));
//     });
//     poop.forEach(u => {
//         console.log(u);
//     })
//     console.log("bajs");
// })();
