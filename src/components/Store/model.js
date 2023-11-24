


export const storeForm = {
    formlayout: "vertical",
    fieldsArray: [
        {
            type: "text",
            label: "Store Name*",
            name: "store_name",
            rules: [{ required: true, message: 'Please enter First name' }],
            placeholder: "Store Name",
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
            label: "Store Logo",
            name: "storeLogo",
            rules: [{ required: true, message: 'Please upload Store Logo' }],
            placeholder: "Store Logo",
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
            label: "Store Fevicon",
            name: "storeFevicon",
            rules: [{ required: true, message: 'Please upload Store Fevicon' }],
            placeholder: "Store Fevicon",
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
            label: "Domain",
            name: "domain",
            rules: [{ required: true, message: 'Please enter Domain' }],
            placeholder: "Domain",
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