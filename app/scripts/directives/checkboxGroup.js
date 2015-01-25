angular.module('seDirectives', [])
.directive('seCheckboxGroup', function(){
    'use strict';

    return {
        restrict : 'E',
        scope: {
            field : '=seField'
        },
        templateUrl : 'scripts/directives/checkboxGroup.html',
        controller : 'seCheckboxGroupController',
        link : function(){
            // 
        }
    };
})
.controller('seCheckboxGroupController', [ '$scope', function( $scope ){
    'use strict';

    var NONE_APPLY = 'None apply';
    var field;

    $scope.$watch( 'field', init );
    $scope.$watch( 'noneApply', onNoneApplyChange );
    init();

    function init(){
        field = $scope.field;
        field.value = field.value || [];

        // read noneapply from the field value
        $scope.noneApply = field.value.indexOf( NONE_APPLY ) >= 0;

        // create options and read noneapply from the field value
        // register change listeners
        $scope.options = [];
        $scope.field.def.options.forEach( function( option, index ){
            $scope.options.push( {
                title: option,
                value : field.value.indexOf( option ) >= 0
            } );

            // WARN : this might cause memory leak
            // on other model loading, this $scope keeps watching old data
            // TODO: unwatch when data changes
            $scope.$watch( 'options[' + index + '].value', onOptionChange );
        } );
    }

    function onOptionChange( newValue, oldValue ){
        if ( newValue == oldValue ){
            return;
        }

        updateModelValue();
    } 

    function onNoneApplyChange( newValue, oldValue ){
        if ( newValue == oldValue ){
            return;
        }

        if ( newValue ){
            $scope.options.forEach( function( option ){
                option.value = false;
            } );
        }

        updateModelValue();
    } 

    function updateModelValue (  ){
        var value;
        if ( $scope.noneApply ){
            value = [ NONE_APPLY ];
        }
        else {
            value = $scope.options.filter( function( option ){
                return option.value;
            } ).map( function( option ){
                return option.title;
            } );

            // set to undefined if nothing checked
            if ( !value.length ){
                value = undefined;
            }
        }

        field.value = value;
    }

} ]);
