$("#starthtml").on("click", function () {
    $.get("/start", function (file) {
        $("#container").replaceWith(file);
    });
});

$("#bokahtml").on("click", function () {
    $.get("/boka", function (file) {
        $("#container").replaceWith(file);
    });
});

$("#gallerihtml").on("click", function () {
    $.get("/galleri", function (file) {
        $("#container").replaceWith(file);
    });
});

$("#villkorhtml").on("click", function () {
    $.get("/villkor", function (file) {
        $("#container").replaceWith(file);
    });
});

$("#omgivninghtml").on("click", function () {
    $.get("/omgivning", function (file) {
        $("#container").replaceWith(file);
    });
});

$("#hittahtml").on("click", function () {
    $.get("/hitta", function (file) {
        $("#container").replaceWith(file);
    });
});

$("#historiahtml").on("click", function () {
    $.get("/historia", function (file) {
        $("#container").replaceWith(file);
    });
});

$("#temp_bokahtml").on("click", function () {
    $.get("/bokning", function (file) {
        $("#container").replaceWith(file);
    });
});