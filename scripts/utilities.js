/**
 * Created by drdynscript on 11/10/14.
 */

var Utils = {
    guid: function(){
        var i, random;
        var uuid = '';

        for (i = 0; i < 32; i++){
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    },
    pluralize: function (count, word) {
        return count === 1 ? word : word + 's';
    },
    store: function (namespace, data) {
        if (arguments.length > 1) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        } else {
            var store = localStorage.getItem(namespace);
            return (store && JSON.parse(store)) || null;
        }
    },
    trim: function(str){
        return str.replace(/^\s+|\s+$/gm,'');
    },

    spaceTo_:function(string){
        return string.replace(/ /g,"_");
    },

    _ToSpace:function(string){
        return string.replace(/_/g," ");
    },

    timeToTwitterDateTimeString: function(time){
        var now = new Date();
        var timediff = (now.getTime() - time)/1000;
        if(timediff < 60){
            return Math.floor(timediff) + 's';
        }
        else if(timediff < 3600){
            return Math.floor(timediff/60) + 'm';
        }
        else if(timediff < 3600*24){
            return Math.floor(timediff/3600) + 'h';
        }
        else if(timediff < 3600*24*7){
            return Math.floor(timediff/(3600*24)) + 'd';
        }
        else{
            return new Date(time).toLocaleDateString();
        }
    }
};