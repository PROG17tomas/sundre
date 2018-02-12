const express = require("express");
const app = express();
const fs = require('fs');
const fire = require('./firebase.js');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));



// Admin request handling
// ======================
app.get('/admin41', function (req, res) {
    res.sendFile(__dirname + "/public/admin41.html");
});
app.get('/admin41data', function (req, res) {
    fire.admindata(res);
    return false;
});
// End
// =====================


// End
// =====================

// Booking handling
// ================
app.post('/nybokning', function (req, res) {
    fire.sendpost(req.body, res);
    return false;
});
// End
// =====================



// Navbar request handling
// =======================
app.get('/start', function (req, res) {
    fs.readFile('public/html/start.html', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/boka', function (req, res) {
    fs.readFile('public/html/boka.html', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/galleri', function (req, res) {
    fs.readFile('public/html/galleri.html', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/villkor', function (req, res) {
    fs.readFile('public/html/villkor.html', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/omgivning', function (req, res) {
    fs.readFile('public/html/omgivning.html', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/hitta', function (req, res) {
    fs.readFile('public/html/hitta.html', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/historia', function (req, res) {
    fs.readFile('public/html/historia.html', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/bokning', function (req, res) {
    fs.readFile('public/html/temp_boka.html', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});
// End
// =====================
//Calendar request handling
// =====================
app.get('/calendardata', function (req, res) {
    fire.getDb(res);
    return false;
});


//port
const port = 8080;
app.listen(port);
console.log("listening to port: " + port);