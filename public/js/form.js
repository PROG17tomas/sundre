document.getElementById("datum").value = new Date().toLocaleDateString();

$('#bookingform').submit(function() {
    var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum"];
    var inputs = Array.from(document.forms["bookingform"].getElementsByTagName("input"));
    var obj = {};
    inputs = inputs.map((x, i) => {
        obj[props[i]] = x.value;
    })
    $.post("/nybokning", obj, function (file) {
        $("#container").replaceWith(file);
    });
});