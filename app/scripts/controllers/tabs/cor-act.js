angular.module('soformApp')
.controller('corAct', [ '$scope', 'formDataGenerator', function ($scope, generator) {
    'use strict';

    // to store $index of element being edited
    // refactor to use uid's if table to be sortable
    $scope.editingIndex;

    var detail;

    function init(){
        detail = $scope.data.details.Corrections;
        $scope.detail = detail;

        $scope.itemsDefinitions = detail.def.itemDefinition.fields; 

        $scope.item = newItem();
    }

    $scope.$watch( 'data', init);


    function newItem (  ){
        var item = generator.create( detail.def.itemDefinition );
        return item; 
    }

    $scope.saveItem = function saveItem( form ){
        var data = angular.copy( $scope.item );
        if ( $scope.editing ){
            angular.extend(detail.items[ $scope.editingIndex ], $scope.item);
            $scope.editing = false;
        } else {
            detail.items.push( $scope.item );
        }

        $scope.item = newItem();

        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
    };

    // edit dictionary item
    $scope.edit = function edit_item( item, $index ){
        $scope.editingIndex = $index;
        $scope.editing = true;
        var editingItem = angular.copy( item );
        $scope.item = editingItem;
    };

    // cancel editing dictionary item
    $scope.cancel = function cancel_edit( form ){
        $scope.item = newItem();
        $scope.editing = false;

        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
    };

    // remove dict item from table
    $scope.remove = function remove_item( item ){
        detail.items.splice( detail.items.indexOf( item ), 1 );
    };

}] );
