export default {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name:"title",
            type: "string",
        },
        {
            name:"date",
            type:'datetime'
        },
        {
            name:"place",
            type:"string",

        },
        {
            name:"description",
            type:"text"
        },
        {
            name:"projectType",
            title:"projectType",
            type:"string",
            options:{
                list:[
                    {value:'personal', title:"Personal"},
                    {value:'client', title:"Client"},
                    {value:'college', title:"College"},

                ],
            },
        },
        {
            name:'link',
            type:'url',

        },
        {
            name:"tags",
            type:"array",
            of:[
                {
                    type:"string"
                },
            ],
            options:{
                layout:"tags",
            }
        }
    ],
};