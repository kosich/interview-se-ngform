angular.module('soformApp')
.factory( 'incidentDataStructure', [ function(){
    'use strict';

    // This form structure should be get from the server

    return {
        // each field consists of:
        // name
        // required
        // type : Int | Date | DateTime | ...
        // validation : string | function
        // placeholder
        views : [
            {
                name : 'default',
                fields : [ 'incidentDate', 'reportedBy', 'company' ]
            }
        ],
        fields : [
            { 
            name : 'incidentDate',
            title : 'Date and Time of Incident',
            required : true,
            dataType : 'Date',
            fieldType : 'DateTime',
            fieldFormat : 'MM/dd/yyyy hh:mm AM/PM'
        },
        { 
            name : 'reportedBy',
            title : 'Reported By',
            required : true,
            dataType : 'String',
            fieldType : 'Text'
        },
        { 
            name : 'company',
            title : 'Company of Reporter',
            required : true,
            dataType : 'String',
            fieldType : 'DropDown',
            options : [
                { value: 'First Company' },
                { value: 'Second Company' },
                { value: 'Third Company' }
            ]
            // TODO: available fields?
        },
        { 
            name : 'contactPhone',
            title : 'Contact Number',
            required : true,
            pattern : /^\s*\d{3}\.\d{3}\.\d{4}\s*$/,
            dataType : 'String',
            fieldType : 'phone',
            tooltip : 'format as YYY.ZZZ.XXXX'
            // TODO: U.S. phone regexp pattern
        },
        { 
            name : 'supervisor',
            title : 'Supervisor Name',
            dataType : 'String'
        },
        { 
            name : 'description',
            title : 'High Level Description of Incident',
            required : true,
            dataType : 'String',
            fieldType : 'TextArea'
        },
        // WELL INFO
        { 
            name : 'wellNumber',
            title : 'Well Number',
            required : true,
            dataType : 'String',
            fieldType : 'DropDown',
            options : [ 
                { value : 'Well-01' },
                { value : 'Well-02' },
                { value : 'Well-03' }
            ]
        },
        {
            name : 'region',
            title : 'Region',
            required : true,
            dataType : 'String'
        },
        {
            name : 'state',
            title : 'State',
            required : true,
            dataType : 'String'
        },
        {
            name : 'office',
            title : 'Office',
            required : true,
            dataType : 'String'
        },
        {
            name : 'incidentSet',
            title : 'Incident Severity (Check all that Apply)',
            dataType : 'Array',
            required : true,
            options : [
                'Loss of well control',
                'Fatality(ies)',
                'Hospitalisation',
                'Spill'
            ]
        }
        ],
        details : [
            {
            title : 'Correction for the incident application',
            name : 'Corrections',
            required : true,
            limit : 5,
            itemDefinition : {
                fields: [
                    { 
                    name : 'description',
                    title : 'Description of corrective action',
                    required : true,
                    dataType : 'String',
                    fieldType : 'TextArea'
                },
                { 
                    name : 'actor',
                    title : 'Action taken by (name)',
                    required : true,
                    dataType : 'String',
                },
                { 
                    name : 'company',
                    title : 'Company',
                    required : true,
                    dataType : 'String',
                    fieldType : 'DropDown',
                    options : [
                        { value: 'Company A' },
                        { value: 'Company B' },
                        { value: 'Company C' }
                    ]
                },
                { 
                    name : 'date',
                    title : 'Date',
                    required : true,
                    dataType : 'Date',
                    fieldType : 'Date',
                    fieldFormat : 'MM/dd/yyyy',
                },
                ]
            } 
        }
        ]
    }; 

} ] )
