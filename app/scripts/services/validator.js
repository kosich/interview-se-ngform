angular.module( 'soformApp' )
.service( 'validator', function(){
    'use strict';

    // validate an item by its definition
    function validate ( data ){
        var valid = true;
        data.def.fields.forEach( function( fieldDefinition ){

            var field = data.fields[ fieldDefinition.name ];
            field.invalid = false;

            if ( fieldDefinition.required ){
                if ( !hasValue( field ) ){
                    field.invalid = true;
                    valid = false;
                    field.validationError = 'This field is required';
                    // console.warn( 'field', field.name, 'is invalid' );
                }
            }

        });

        return valid;
    }


    // check if field has value
    function hasValue ( field ){
        // TODO: refactor to strip string and hande Number
        return ( field.value != null && field.value.length != 0 );
    }

    return {
        validate : validate 
    };
} );
