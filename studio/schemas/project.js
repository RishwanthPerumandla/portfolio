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
                    {value:'personal', title:"PersonalProject"},
                    {value:'client', title:"Client"},
                    {value:'intern', title:"Intern"},
                    {value:'college', title:"College"},

                ],
            },
        },
        {
            name:'link',
            type:'url',

        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
              hotspot: true,
            },
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