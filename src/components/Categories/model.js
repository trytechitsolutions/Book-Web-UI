
export const categoriesForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "text",
            label: "Category Title",
            name: "name",
            rules: [{ required: true, message: 'Please enter Category Title' }],
            placeholder: "Category Title",
            xs: 24,
            sm: 16,
            md: 12,
            lg: 12,
            labelCol: "",
            wrapperCol: "",
            value: "",
        }, 
        {
            type: "dropdown",
            label: "Parent Category",
            name: "parent_id",
            rules: [
                { required: false,  message: 'Please choose Parent Category!' },
            ],
            xs: 24,
            sm: 16,
            md: 12,
            lg: 12,
            labelCol: "",
            wrapperCol: "",
            value: "",
            options: [
                { id: "Category1", value: "Category 1" },
                { id: "Category2", value: "Category 2" },
                { id: "Category3", value: "Category 3" },
            ], 
        },
        {
            type : "file",
            label: "Upload File",
            name: "file",
            rules: [{ required: true, message: 'Please upload Upload File' }],
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
            {type: "outlined", colour: "secondary", name: "Reset", fun: "reset",
            style: { marginTop: '20px' }  },
            {type: "contained", colour: "primary", name: "Add", fun: "submit",
            style: { marginTop: '20px' }  }
        ]
    }
}