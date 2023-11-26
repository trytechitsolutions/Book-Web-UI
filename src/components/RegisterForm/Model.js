import { validateConfirmPassword, validatePhoneNumber } from "../ReusableComponents/CommonFunctions";




export const registrationForm = {
    formlayout: "vertical",
    fieldsArray: [
        {
        type: "text",
        label: "Full Name",
        name: "full_name",
        rules: [{ required: true, message: 'Please enter full name' }],
        placeholder: "Full Name",
        xs: 24,
        sm: 6,
        md: 6,
        lg: 6,
        labelCol: "",
        wrapperCol: "",
        value: "",
    },
    {
        type: "text",
        label: "Store Name",
        name: "store_name",
        rules: [{ required: true, message: 'Please enter Store name' }],
        placeholder: "Store Name",
        xs: 24,
        sm: 6,
        md: 6,     
        lg: 6,
        labelCol: "",
        wrapperCol: "",
        value: "",
    },
    {
        type: "phonenumber",
        label: "Contact Number*",
        name: "contact_number",
        rules: [
            { required: true, message: 'Please enter contact number' },
            { type: 'phonenumber', message: 'Please enter a valid contact number', 
            regex: /^\+[0-9]{1,3}\.[0-9]{1,14}$|^[0-9]{1,14}$/ },  
            ],
        placeholder: "Contact Number",
        xs: 24,
        sm: 6,
        md: 6,
        lg: 6,
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
            { type: 'email', message: 'Please enter a valid email', 
            regex: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },        
        ],
        placeholder: "Email",
        xs: 24,
        sm: 6,
        md: 6,
        lg: 6,
        labelCol: "",
        wrapperCol: "",
        value: "",
       },
    {
        type: "password",
        label: "Password",
        name: "password",
        rules: [
            { required: true, message: 'Please enter password' },
                { type:'password', regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, min: 8, message: `Minimum length: 8 characters
                At least one uppercase letter 
                At least one lowercase letter
                At least one digit
                At least one special character (e.g., !, @, #, $, %)` }
        ],
        placeholder: "Password",
        xs: 24,
        sm: 6,
        md: 6,
        lg: 6,
        labelCol: "",
        wrapperCol: "",
        value: "",
    },
    {
        type: "password",
        label: "Confirm Password",
        name: "confirm_password",
        rules: [
            { required: true, message: 'Please enter Confirm Password' },
            { validator: (_, value) => validateConfirmPassword(_, value, registrationForm.fieldsArray) },
            // { validator: validateConfirmPassword }

        ],
        placeholder: "Confirm Password",
        xs: 24,
        sm: 6,
        md: 6,
        lg: 6,
        labelCol: "",
        wrapperCol: "",
        value: "",
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
        sm: 12,
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
            { type: "contained", colour: "primary", name: " Register", fun: "submit" },
            { type:"outlined", colour: "default", name: "Reset", fun: "reset" },
            { type:"outlined", colour: "primary", name: "Cancel", fun: "cancel" },
        ],
      
    }
}





// "development": {
//     "username": "postgres",
//     "password": "Admin@123",
//     "database": "ecom-trytechit",
//     "host": "localhost",
//     "dialect": "postgres",
//     "port":5432
//   },