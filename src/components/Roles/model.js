
export const roleForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "text",
            label: "Role",
            name: "role",
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
       
    ],
    buttonSecction: {
        justify: "end",
   
        buttons: [
            {type: "contained", colour: "primary", name: "Add", fun: "submit" ,
            style: { marginTop: '20px' } }
           
        ]
    }
}