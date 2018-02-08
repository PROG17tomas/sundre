$(document).ready(loadData());

function loadData() {
    $.get("/admin41data", function (dbdata) {
        var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum"];
        console.log("från klient");
        console.log(dbdata);
        var v = dbdata.map((x, i) => {
            var rad = "<tr>";
            for (var j = 0; j < props.length; j++) {
                rad += "<td>" + x[props[j]] + "</td>";
            }
            rad += "</tr>";
            document.getElementById("t1").innerHTML += rad;
        });
    });
}