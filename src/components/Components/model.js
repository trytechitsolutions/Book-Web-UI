

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
            value: ""
        },
        {
            type: "text",
            label: "Path",
            name: "path",
            rules: [{ required: true, message: 'Component path is Reurired' },],
            placeholder: "Path",
            xs: 24,
            sm: 16,
            md: 12,
            lg: 12,
            labelCol: "",
            wrapperCol: "",
            value: ""
        },
        {
            type: "checkbox",
            // label: "Active",
            name: "is_active",
            rules: [{ required: false, message: 'Please choose Active!' }],
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            labelCol: "",
            wrapperCol: "",
            value: false,
            options: [
                { value: "is_active", label: "Active" },
            ],
        },
    
    ],
    buttonSecction: {
        justify: "center",

        buttons: [
            {
                type: "contained", colour: "primary", name: "Submit", fun: "submit",
                style: { marginTop: '20px' }
            }

        ]
    }
}