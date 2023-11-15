
export const categoryForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "text",
            label: "Category Title",
            name: "categoryTitle",
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
            name: "parentCategory",
            rules: [
                { message: 'Please choose Parent Category!' },
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
        // {
        //     type : "file",
        //     label: "Upload File",
        //     name: "uploadFile",
        //     rules: [{ required: true, message: 'Please upload Upload File' }],
        //     placeholder: "Upload File",
        //     xs: 24,
        //     sm: 16,
        //     md: 12,
        //     lg: 12,
        //     labelCol: "",
        //     wrapperCol: "",
        //     value: "",
        // },
    ],
    buttonSecction: {
        justify: "end",
        buttons: [
            { colour: "primary", name: "Add", fun: "submit" },
        ]
    }
}