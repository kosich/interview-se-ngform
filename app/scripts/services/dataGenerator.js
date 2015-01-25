angular.module('soformApp')
.factory( 'formDataGenerator', [ function( ){
    'use strict';

    // adds business logic here
    // TODO: set defaults here
    function enrich ( data, definition ){
        var newData = {
            fields : {},
            details : {},
            def : definition
        };

        if( definition.fields ){
            definition.fields.forEach( function( field ){
                var fieldValue;

                if ( data.fields && data.fields[ field.name ] ){
                    // fill with data provided
                    fieldValue = data.fields[ field.name ];
                }
                else {
                    // TODO: set
                    // if field is not nullable
                    // default for the dataType
                }

                newData.fields[ field.name ] = { name : field.name, value : fieldValue, def : field };
            } );
        }

        if( definition.details ) {
            definition.details.forEach( function( detailDef ){
                var detail = { name : detailDef.name, items : [], def : detailDef };
                newData.details[ detailDef.name ] = detail;

                // fill with data provided
                if ( data.details && data.details[ detailDef.name ] && data.details[ detailDef.name ].items ){
                    
                    // enrich and add detail items
                    data.details[ detailDef.name ].items.forEach( function( detailItem ){
                        detail.items.push( enrich( detailItem, detailDef.itemDefinition ) ); 
                    } );

                }
            } );
        } 

        newData.strip = strip;

        return newData;
    }

    // strips data to raw format
    function strip  ( ){
        var item = this,
            stripped = { };

        // strip fields
        if( item.def.fields && item.fields ){

            stripped.fields = {};

            item.def.fields.forEach( function( field ){
                if ( item.fields[ field.name ] && item.fields[ field.name ].value != null ){
                    stripped.fields[ field.name ] = item.fields[ field.name ].value;
                }
            } );
        }

        // strip details
        if( item.def.details && item.details ){

            stripped.details = {};

            item.def.details.forEach( function( detailDefinition ){
                if ( item.details[ detailDefinition.name ] && item.details[ detailDefinition.name ].items){
                    stripped.details[ detailDefinition.name ] = {};
                    var detailItems = stripped.details[ detailDefinition.name ].items = [];

                    item.details[ detailDefinition.name ].items.forEach( function(detailItem){
                        // if subitems is enriched
                        if ( detailItem.def )
                            detailItems.push(strip.apply( detailItem ));
                        else 
                            detailItems.push( detailItem );
                    } );
                }
            } );
        }


        return stripped;
    }

    return {
        create : function( definition ){
            return enrich( {}, definition );
        },
        open : function( item, definition ){
            return enrich( item, definition );
        },
        strip : function ( item ){
            return strip.apply( item );
        }
    }


} ]);
