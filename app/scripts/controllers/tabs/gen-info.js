angular.module('soformApp')
.controller('genInfo', [ '$scope', function ($scope) {
    'use strict';

    // to use shorter ref in the form
    var fields;

    function init(){
        fields = $scope.f = $scope.data.fields;
        $scope.contactPhonePattern = new RegExp(fields.contactPhone.def.pattern);
    }

    $scope.$watch( 'data', init );

    // TODO: move this dependency to 
    // DATA STRUCTURE definition
    var switcher = {
        'Well-01' : { 
            region: 'South',
            state: 'Oklahoma',
            office : 'Ringwood'
        },
        'Well-02' : { 
            region: 'North',
            state: 'Montana',
            office : 'Sidney'
        },
        'Well-03' : { 
            region: 'North',
            state: 'North Dakota',
            office : 'Tioga'
        }
    };

    // switching wellNumber related fields
    $scope.$watch( 'f.wellNumber.value', function( newValue, oldValue ){
        if( newValue == oldValue )
            return;
        
        var values = switcher[newValue];
        if ( !values )
            return;

        Object.keys( values ).forEach( function( key ){
            fields[key].value = values[ key ];
        });
    } );

    init();

} ]);
