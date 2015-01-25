angular.module('soformApp')
.controller('submit', [ '$scope', 'localStorage', 'validator', 'converter', 'sender', function ($scope, localStorage, validator, converter, sender) {
    'use strict';

    function init(){
        // note: validate call changes data
        $scope.valid = validator.validate( $scope.data );
    }
    $scope.$watch( 'data', init);

    $scope.fieldValidity = function( field ){
        if ( field.invalid )
            return field.validationError;
        else
            return field.value;
    }

    $scope.send = function send(){
        var docflowItem = converter.convert( $scope.data );
        $scope.modal = {
            title : 'Raw docflow data',
            content : docflowItem
        }
        sender.send( docflowItem );
    };

    init();

}]);

