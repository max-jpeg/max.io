const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const url = require('url');//just did
//var bodyParser = require('body-Parser');
const { query } = require('express');

// my modules:
const {addUser, queryUser, removeUser, printUsers, getID, kickUser} = require('./utils/userTools.js');
const {addRoom, queryRoom, printRooms} = require('./utils/roomTools.js');
const {checkCommands} = require('./utils/commands.js');


app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
//app.use(bodyParser.urlencoded({ extended: true }));

// keep as post for testing purposes only!
app.get('/', (req, res) => {
    //console.log('loading login page');

    res.sendFile('login.html', {
        root: 'views'
    });

});


io.on('connect', socket => {

    //var self = socket.id;

    socket.on('checkFormValidityJoin', (data) => {
        //var data = JSON.stringify(dataPackage);
        var userExists = queryUser(data.user);// === false;
        var roomExists = queryRoom(data.room);// === false; this one was working
    
        console.log(data.room, data.user);
        console.log(userExists, roomExists);

        if (!userExists && roomExists) {
            io.to(socket.id).emit('formValid');
            socket.join(data.room);
            //addUser(null, data.user);
            console.log(`formValidJoin: ${data}`)
        }
        if (userExists && !roomExists) {
            io.to(socket.id).emit('noneValid');
            console.log(`noneValidJoin: ${data}`)
        }
        if (!userExists && !roomExists) {
            io.to(socket.id).emit('roomNotValidJ');
            console.log(`roomNotValidJoin: ${data}`)
        }
        if (userExists && roomExists) {
            io.to(socket.id).emit('userNotValid');
            console.log(`userNotValidJoin: ${data}`)
        }
 
    });

    socket.on('checkFormValidityCreate', (data) => {
        var userExists = queryUser(data.user);// === false;
        var roomExists = queryRoom(data.room);// === false; this one was working
    
        console.log(data.room, data.user);
        console.log(userExists, roomExists);

        if (!userExists && !roomExists) {

            io.to(socket.id).emit('formValid');
            socket.join(data.room);
            //addUser(null, data.user);
            console.log(`formValidCreate: ${data}`)

        }
        if (userExists && roomExists) {
            io.to(socket.id).emit('noneValid');
            console.log(`noneValidCreate: ${data}`)
        }
        if (!userExists && roomExists) {
            io.to(socket.id).emit('roomNotValidC');
            console.log(`roomNotValidCreate: ${data}`)
        }
        if (userExists && !roomExists) {
            io.to(socket.id).emit('userNotValid');
            console.log(`userNotValidCreate: ${data}`)
        }
    });



    app.get('/rooms', (req, res) => {
        /*
        var user = req.query.user;
        var room = req.query.room;
        */

        //console.log('loading room page');

        //addUser(self, user);

        res.sendFile('index.html', {
            root: 'views'
        });
        /*
        addUser(socket.id, user);
        printUsers();
        */
    });

    /* replaced for init
    socket.on('myRoom', (data) => {

        if (data.c == true) {
            addRoom(data.currentRoom);
            socket.join(data.currentRoom);
        }

        socket.join(data.currentRoom);

        printRooms();
    });

    socket.on('createUser', (user) => {
        console.log(user);

        console.log('createUser');
        addUser(socket.id, user);
        printUsers();
    });
    */

    socket.on('init', (data) => {
        addUser(data.currentUser);
        console.log(`createUser ${data.currentUser}`);
        
        socket.join(data.currentRoom);
        console.log(`joinUser ${data.currentUser} ${data.currentRoom}`);

        if (data.c == true) addRoom(data.room);
    })

    socket.on('chat message', (msgData) => {
        //console.log('g');
        /*
        var cmdQuery = checkCommands(msgData.msg);

        if (cmdQuery.query !== false) {
            if(cmdQuery.req === 'kick') {
                kickUser(cmdQuery.params);
                io.of('/').connected[getID(cmdQuery.params)].leave(currentRoom);
            }
            else if (cmdQuery.req === 'colour') {
                changeColour(params[0], params[1]);
            }
            else if (cmdQuery.req === 'lock') {
                lockRoom(currentRoom);
            }
            else if (cmdQuery.req === 'unlock') {
                unlockRoom(currentRoom);
            }
        }
        */

        io.to(msgData.room).emit('chat message', {
            msg: msgData.msg,
            auth: msgData.auth,
            time: msgData.time
        });
    });


    socket.on('disconnect', () => {
        console.log('disconnect ' + socket.id);
        removeUser(socket.id);
        printUsers();
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});