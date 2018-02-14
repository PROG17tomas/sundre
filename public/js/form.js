document.getElementById("bookingdate").value = new Date().toLocaleDateString('sv-SE');

$('#bookingform').submit(function () {
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