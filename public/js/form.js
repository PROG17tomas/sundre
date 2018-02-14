document.getElementById("bookingdate").value = new Date().toLocaleDateString('sv-SE');

$('#bookingform').submit(function () {
    if (inValidWeekFormat()) {
        alert("Felaktig veckoinmatning");
        return false;
    }

    var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum", "status"];
    var inputs = Array.from(document.forms["bookingform"].getElementsByTagName("input"));
    var obj = {};
    inputs = inputs.map((x, i) => {
        obj[props[i]] = x.value;
    });


    // reslut = true, week, null, empty
    $.post("/nybokning", obj, function (result) {
        if (result === "week")
            alert("Tyvärr är veckan redan bokad!");
        else if (result === "week52")
            alert("Ange vecka 1-52!");
        else if (result === "null" || result === "empty")
            alert("Ett eller flera fält är tomt/tomma!");
        else
            $("#container").replaceWith(result);
    });
});


function calcPrice() {
    // priser
    let w25_32 = 4500;
    let w33_01 = 3500;
    // -------

    document.getElementById("price").value = 0
    if (inValidWeekFormat()) return false;

    let price = 0;
    var weeks = document.getElementById("week").value.split(',').filter(onlyUnique);;

    weeks.forEach(i => {
        if (!isInt(i)) price += 0;
        else if (i >= 25 && i <= 32) price += w25_32;
        else if (i >= 1 && i <= 52) price += w33_01;
    });
    
    document.getElementById("price").value = price;
}

function inValidWeekFormat() {
    var weeks = document.getElementById("week").value.split(',');
    let failed = false;

    if (weeks.toString() != weeks.filter(onlyUnique).toString()) failed = true;

    weeks.forEach(i => {
        if (!isInt(i)) failed = true;
    });

    if (failed) {
        return true;
    }
    return false;
}

function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}