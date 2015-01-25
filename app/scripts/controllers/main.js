'use strict';

/**
 * @ngdoc function
 * @name soformApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soformApp
 */
angular.module('soformApp')
.controller('main', [ '$scope', 'formDataGenerator', 'incidentDataStructure', 'localStorage', function ($scope, generator, definition, localStorage) {

    $scope.list = localStorage.get();
    $scope.definition = definition;
    $scope.data = generator.create( definition );

    $scope.open = function open( item ){
        if ( item ){
            $scope.data = generator.open ( item, definition );
        }
        else {
            $scope.create();
        }
    };

    $scope.create = function create(){
        $scope.data = generator.create( definition );
    };

    $scope.save = function save( ){
        var list = $scope.list;
        var savingData = $scope.data.strip();
        list.push( savingData );
        localStorage.put( list );
    };


    $scope.remove = function( item ){
        $scope.list.splice ( $scope.list.indexOf( item ), 1 );
        localStorage.put( $scope.list );
    };

} ]);
