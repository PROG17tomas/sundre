document.getElementById("bookingdate").value = new Date().toLocaleDateString();

$('#bookingform').submit(function () {
    var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum", "status"];
    var inputs = Array.from(document.forms["bookingform"].getElementsByTagName("input"));
    var obj = {};
    inputs = inputs.map((x, i) => {
        obj[props[i]] = x.value;
    });

    $.post("/nybokning", obj, function (result) {
        if (result != false)
            $("#container").replaceWith(result);
        else
            alert("Tyvärr är veckan redan bokad!");
    });
});