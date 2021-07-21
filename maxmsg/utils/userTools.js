//these automatically inserted so im leaving them incase they are required for the app to work.
const { query } = require("express");
const e = require("express");


// this
activeUsers = [{id: null, user: 'admin'}, {id: null, user: 'server'}]

function printUsers() {
    console.log(activeUsers);
}

function queryUser(query) {

    var index = activeUsers.findIndex(usr => usr.user === query);
    
    if (index !== -1) {
        return true;
    }
    else {
        return false;
    }
   
}

function getID(user) {
    var index = activeUsers.findIndex(usr => usr.user === query);

    if (index !== -1) {
        return activeUsers[index].id;
    }
    else {
        return false;
    }
}

// call this function when server recieves data of a new socket connection (socket.id & username)
function addUser(id, user) {

    let exists = queryUser(user);

    if (!exists) {
        activeUsers.push({id, user});
        return {id, user};
    }
    else if (exists) {
        return false;
    }
}


function removeUser(query) {
    var index = activeUsers.findIndex(usr => usr.id === query);
    
    if (index !== -1) {
        activeUsers.splice(index, 1);
    }
    else {
        return false;
    }

}
// not in use
function kickUser(user) {
    removeUser(getID(user));
}

//exporting 
module.exports = {addUser, queryUser, removeUser, printUsers, getID, kickUser}


 /*
    Old Code from queryUser() before activeUsers' items were changed to objects instead of strings.

    if (activeUsers.includes(user)) {
        return true;
    }
    else if (!activeUsers.includes(user)) {
        return false;
    }
    */