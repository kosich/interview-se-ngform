angular.module( 'soformApp' )
.factory( 'converter', [ function(){
    'use strict';

    return {
        convert : function convert( data ){

            var result = {
                'workflowCreationInformation':{
                    'workflowTypeName': 'Incident Report',
                    'name': 'Report - ' + (new Date()).toISOString()
                },
                'workflowStepUpdateInformation':{
                    'stepIdOrName': 'Initial Step',
                    'fields':[ ]
                }
            };

            var values = result.workflowStepUpdateInformation.fields;

            data.def.fields.forEach( function( fieldDefinition ){
                var field = data.fields[ fieldDefinition.name ];
                if ( field && field.value != null ){
                    values.push({
                        name : fieldDefinition.title || 'NO TITLE PROVIDED',
                        values : [ field.value ]
                    });
                }
            });

            data.def.details.forEach( function( detailDef ){
                var detail = data.details[ detailDef.name ];
                if ( !detail ) { return;}
                detail.items.forEach( function( item, index ){
                    item.def.fields.forEach( function( fieldDefinition ){
                        var field = item.fields[ fieldDefinition.name ];
                        if ( !field ) { return;}

                        values.push({
                            name : (fieldDefinition.title + ' (' + (index + 1) + ')') || 'NO TITLE PROVIDED',
                            values : [ field.value ]
                        });
                    } );
                } );
            } );

            return JSON.stringify( result );

        }
    };

} ] );
