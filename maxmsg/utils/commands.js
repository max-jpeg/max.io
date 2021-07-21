const { ISO_8601 } = require('moment');
const { Socket } = require('socket.io');
const {getID} = require('./userTools.js');

// not currently supported

var cmds = {
    kick: /\$kick\(.*?\)/i,
    colour: /\$colour\(.*?\)/i,
    lock: /\$lock/i,
    unlock: /\$unlock/i
}

console.log(cmds);

function checkCommands(text) {
    
    for(var [key, val] of Object.entries(cmds)) {
        if(val.test(text)) {
            var query = val.test(text);
            var req = key;
            var params = val.exec(text);
        }
        else {
            var query = false;
            var req = null;
            var params = null;
        }
    }
    /*
    var query = cmds.kick.test(text);
    */
    return {query, req, params}
    
}

module.exports = {checkCommands};
