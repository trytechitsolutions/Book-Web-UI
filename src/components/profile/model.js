import {  validatePhoneNumber } from "../ReusableComponents/CommonFunctions";




export const profileForm = {
    formlayout: "vertical",
    fieldsArray: [
        {
        type: "text",
        label: "Full Name",
        name: "fullName",
        rules: [{ required: true, message: 'Please enter full name' }],
        placeholder: "Full Name",
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
        label: "Company Name",
        name: "companyName",
        rules: [{ required: true, message: 'Please enter Company name' }],
        placeholder: "Company Name",
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
        label: "Store Name",
        name: "storeName",
        rules: [{ required: true, message: 'Please enter Store name' }],
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
        type: "phonenumber",
        label: "Contact Number*",
        name: "contactNumber",
        rules: [
            { required: true, message: 'Please enter contact number' },
            { validator: validatePhoneNumber }
        ],
        placeholder: "Contact Number",
        xs: 24,
        sm: 16,
        md: 12,
        lg: 12,
        labelCol: "",
        wrapperCol: "",
        value: "",
    }, 
    {
        type: "email",
        label: "Email",
        name: "email",
        rules: [
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' },
        ],
        placeholder: "Email",
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
        label: "Business Category",
        name: "businessCategory",
        rules: [
            { required: true, message: 'Please choose Business Category!' },
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
        type: "text-area",
        label: "Address",
        name: "address",
        rules: [
            { required: true, message: 'Please enter address' },
            { min: 4, message: 'address must be at least 4 characters long' }
        ],
        placeholder: "Address",
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
            { colour: "primary", name: "Update", fun: "submit" },
           
        ]
    }
}