/**
 * Created by varsha on 8/7/2016.
 */
'use strict';

angular
    .module('ContactsApp')
        .filter('labelCase', function() {
            return function(input) {
                input = input.replace(/([A-Z])/g,' $1');
                return input[0].toUpperCase() + input.slice(1);
            }

        });




 /*       {
            return function(x) {
                var v,i, c, txt = "";
                if(x==='firstName'||x==='lastName') {
                    v = x.indexOf('Name');
                    c = x.slice(v);
                    i = x.slice(0,v);
                    c = c.charAt(0).toUpperCase() + c.slice(1);
                    i = i.charAt(0).toUpperCase() + i.slice(1);
                    return i + " "+ c;
                }
                else return x.charAt(0).toUpperCase() + x.slice(1);

            };
        });*/