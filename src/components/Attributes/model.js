export const attributesForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "auto-complete-text",
            label: "Brand Name",
            name: "name",
            rules: [{ required: true, message: 'Please enter Brand' }],
            placeholder: "Brand",
            xs: 24,
            sm: 16,
            md: 12,
            lg: 12,
            labelCol: "",
            wrapperCol: "",
            value: "",
        }
       
    ],
    buttonSecction: {
        justify: "end",
        buttons: [
            {type: "outlined", colour: "secondary", name: "Reset", fun: "reset",
            style: { marginTop: '20px' }  },
            {type: "contained", colour: "primary", name: "Add", fun: "submit",
            style: { marginTop: '20px' }  }
        ]
    }
}