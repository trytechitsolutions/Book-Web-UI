

export const componentsForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "text",
            label: "Title",
            name: "title",
            rules: [{ required: true, message: 'Please enter Components Title' }],
            placeholder: "Title",
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
            label: "Path",
            name: "path",
            rules: [{ message: 'Component path Rqurire' },],
            placeholder: "Path",
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
                        name: "is_active",
                        rules: [{ required: true, message: 'Please choose Active!' }],
                        xs: 12, // Adjust the xs, sm, md, lg values as needed
                        sm: 12,
                        md: 12,
                        lg: 12,
                        labelCol: "",
                        wrapperCol: "",
                        value: false, // Update with the selected value ("on" or "off")
                        options: [
                            { value: "is_active", label: "Active" },
                        ],
                     },

    ],
    buttonSecction: {
        justify: "center",
   
        buttons: [
            {type: "contained", colour: "primary", name: "Submit", fun: "submit" ,
            style: { marginTop: '20px' } }
           
        ]
    }
}