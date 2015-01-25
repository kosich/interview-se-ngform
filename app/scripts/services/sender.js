angular.module( 'soformApp' )
.factory('sender', [ '$modal', function( $modal ){
    'use strict';

    return {
        send : function ( data ){

            console.log( data );

            // Show a modal with data
            $modal({title: 'Data, going to the workflow system', content: data, show: true});
        }
    };
} ]);
