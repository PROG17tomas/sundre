$(document).ready(loadData());

function loadData() {
    document.getElementById("t1").innerHTML = "<th>Vecka</th><th>Belopp</th><th>Förnamn</th><th>Efternamn</th><th>Personnr</th><th>Adress</th><th>Postnr</th><th>Ort</th><th>Telefon</th><th>Mail</th><th>Datum</th><th>Verifierad</th>";

    $.get("/admin41data", function (dbdata) {
        var props = ["vecka", "belopp", "förnamn", "efternamn", "pnr", "adress", "postnr", "ort", "telefon", "mail", "datum", "status"];
        console.log("från klient");
        console.log(dbdata);
        var v = dbdata.map((x, i) => {
            var rad = "<tr>";
            let btnType = "";
            for (var j = 0; j < props.length; j++) {
                if (props[j] == "status") {
                    if (x[props[j]]) btnType = "btn-success";
                    else btnType = "btn-danger";
                    rad += `<td><button onclick="confirm('${x["vecka"]}')" class="btn ${btnType}">${x[props[j]]}</button></td>`;
                }
                else
                    rad += "<td>" + x[props[j]] + "</td>";
            }
            rad += "</tr>";
            document.getElementById("t1").innerHTML += rad;
        });
    });
}

function confirm(week) {
    console.log(week);
    $.post('/admin41confirm', { "week": week });
    loadData();
}