angular.module( 'soformApp' )
.factory('localStorage', function () {
    'use strict';
    var STORAGE_ID = 'incidents';

    return {
        get: function () {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },

        put: function ( data ) {
            localStorage.setItem(STORAGE_ID, JSON.stringify( data ));
        }
    };
});
