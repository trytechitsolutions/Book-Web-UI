

export const componentsForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "text",
            label: "Components Title",
            name: "componentsTitle",
            rules: [{ required: true, message: 'Please enter Components Title' }],
            placeholder: "Components Title",
            xs: 24,
            sm: 16,
            md: 12,
            lg: 12,
            labelCol: "",
            wrapperCol: "",
            value: "",
        }, 
        {
            type: "text",
            label: "Component Path",
            name: "path",
            rules: [{ required: true, message: 'Component path Rqurire' },],
            placeholder: "Component Path",
            xs: 24,
            sm: 16,
            md: 12,
            lg: 12,
            labelCol: "",
            wrapperCol: "",
            value: "",
        },
                   {
                        type: "checkbox",
                        // label: "Active",
                        name: "active",
                        rules: [{ required: true, message: 'Please choose Active!' }],
                        xs: 12, // Adjust the xs, sm, md, lg values as needed
                        sm: 12,
                        md: 12,
                        lg: 12,
                        labelCol: "",
                        wrapperCol: "",
                        value: "", // Update with the selected value ("on" or "off")
                        options: [
                            { value: "active", label: "Active" },
                        ],
                     },

    ],
    buttonSecction: {
        justify: "end",
   
        buttons: [
            {type: "contained", colour: "primary", name: "Add", fun: "submit" ,
            style: { marginTop: '20px' } }
           
        ]
    }
}