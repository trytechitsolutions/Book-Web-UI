export const brandsForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "text",
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
        }, 
        {
            type : "file",
            label: "Upload File",
            name: "file",
            rules: [{required: true,   message: 'Please upload Upload File' }],
            placeholder: "Upload File",
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
                label: "Active",
                name: "is_active",
                rules: [
                    { required: false, message: 'Please selct checkbox!' },
                ],
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
                labelCol: "",
                wrapperCol: "",
                value: "",
                options: [
                    { value: "is_active", label: "Active" },

                ],
            },
       
    ],
    buttonSecction: {
        justify: "end",
   
        buttons: [
            {type: "contained", colour: "primary", name: "Add", fun: "submit" ,
            }
           
        ]
    }
}