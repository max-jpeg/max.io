const { query } = require("express");
const e = require("express");

var activeRooms = ['test'];


function queryRoom(room) {
    if (activeRooms.includes(room)) {
        return true;
    }
    else if (!activeRooms.includes(room)) {
        return false;
    }
}

function addRoom(room) {
    var exists = queryRoom(room);

    if(!exists) {
        activeRooms.push(room);
        return room;
    }
    else if (exists) {
        return false;
    }
    //console.log(activeRooms);
}

function printRooms() {
    console.log(activeRooms);
}

//not wokring
/*
function joinRoom(name) {
    room = activeRooms.findIndex((name) => {name, pass});
    //wwork herre^
    if (activeRooms[room].pass == pass) {
        return true
    }
    else {
        return false
    }
}
*/

module.exports = {addRoom, queryRoom, printRooms}