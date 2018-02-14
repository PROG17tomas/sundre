const firebase = require('firebase');
const fs = require('fs');

var config = {
    apiKey: "AIzaSyCqZCsd5sbdHZ9EpLrXrlAfSEBa0GLoGvU",
    authDomain: "sundreskola-51030.firebaseapp.com",
    databaseURL: "https://sundreskola-51030.firebaseio.com",
    projectId: "sundreskola-51030",
    storageBucket: "sundreskola-51030.appspot.com",
    messagingSenderId: "251742010022"
};
firebase.initializeApp(config);

var database = firebase.database();

// var dbdata = [];
// database.ref("users").on('value', function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//         var childData = childSnapshot.val();
//         dbdata.push(childData);
//     });
// });



// Exported functions
// ==================

exports.admindata = async function () {
    // var dbdata = [];
    // dbdata = await getData();
    return await getData();
}

exports.adminconfirm = async function (data) {
    // uppdatera en specifik post med hjälp av 'vecka' i data
    var dbdata = [];
    dbdata = await getData();

    //var bokning = dbdata.find(x => { return x.vecka == data });
    var bokning = dbdata.find(function (x) {
        return x.vecka == data;
    });

    var nystatus = false;
    if (bokning.status == false) {
        nystatus = true;
    }

    database.ref('users').orderByChild("vecka").equalTo(data).on('child_added', function (snapshot) {
        database.ref('users/' + snapshot.key).update({
            status: nystatus
        });
    });
    return true;
}

exports.sendpost = async function (data) {
    let failed = false;

    // kolla om någon input är tom
    // ===========================
    Object.keys(data).forEach(function (key, index) {
        //console.log(req.body[key]);
        if (data[key] == null) {
            console.log("validation failed");
            failed = true;
        }
    });
    // ===========================


    // kolla om veckan är upptagen
    // ===========================
    var bookedWeeks = [];
    var obj = await getData();
    obj.forEach(x => {
        var tmp = x.vecka.split(',');
        tmp.forEach(y => {
            bookedWeeks.push(y);
        });
    });

    var weeksToBook = data.vecka.split(',');
    weeksToBook.forEach(i => {
        if (!(i >= 1 && i <= 52)) failed = true;
        if (bookedWeeks.find(x => x.trim() == i.trim())) failed = true;
    });
    console.log("Veckor att boka: " + weeksToBook);
    console.log("Redan bokade veckor: " + bookedWeeks);
    // ===========================


    if (failed) {   // validation failed
        return false;
    }
    else {          // validation succeeded
        data.status = false;
        database.ref('users').push(data);
        return true;
    }
}

exports.getDb = async function (res) {
    var dbdata = [];
    dbdata = await getData();

    var bookedWeeks = [];

    dbdata.forEach(x => {
        var tmp = x.vecka.split(',');
        tmp.forEach(y => {
            bookedWeeks.push({ week: y, confirmed: x.status });
        });
    });
    res.send(bookedWeeks);
}




// Internal functions
// ==================

async function getData() {
    var dbdata = [];
    await database.ref("users").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            dbdata.push(childData);
        });
    });
    return dbdata;
}