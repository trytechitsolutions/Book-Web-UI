
export const rolesForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "text",
            label: "name",
            name: "name",
            rules: [{ required: true, message: 'Please enter Role' }],
            placeholder: "Role",
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
            rules: [{ required: false, message: 'Please choose Active!' }],
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
        justify: "end",
   
        buttons: [
            {type: "contained", colour: "primary", name: "Add", fun: "submit" ,
            style: { marginTop: '20px' } }
           
        ]
    }
}