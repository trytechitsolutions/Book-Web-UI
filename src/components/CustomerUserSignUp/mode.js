import { validateConfirmPassword, validatePhoneNumber } from "../ReusableComponents/CommonFunctions";

export const userForm = {
    formlayout: "vertical",
    fieldsArray: [
        {
            type: "text",
            label: "First Name*",
            name: "first_name",
            rules: [{ required: true, message: 'Please enter First name' }],
            placeholder: "First Name",
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
            label: "Last Name*",
            name: "last_name",
            rules: [{ required: true, message: 'Please enter Last name' }],
            placeholder: "Last Name",
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
            label: "Email Address*",
            name: "email",
            rules: [
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' },
            ],
            placeholder: "Email",
            xs: 24,
            sm: 16,
            md: 24,
            lg: 24,
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
                { validator: validatePhoneNumber }
            ],
            placeholder: "Contact Number",
            xs: 24,
            sm: 16,
            md: 24,
            lg: 24,
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
                { min: 8, message: 'Password must be at least 8 characters long' }
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
                // { validator: (_, value) => validateConfirmPassword(_, value, registrationForm.fieldsArray) },
                { validator: validateConfirmPassword }
    
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
            type: "checkbox",
            name: "terms_conditions_check",
            rules: [{ required: false, message: 'Please choose Active!' }],
            xs: 12, 
            sm: 12,
            md: 12,
            lg: 12,
            labelCol: "",
            wrapperCol: "",
            value: false,
            options: [
                { value: "terms_conditions_check", label: "I agree all terms and condition in ShopUs" },
            ],
        },   
    ],
    buttonSecction: { 
        justify: "center",      
        buttons: [
            { type: "contained",colour: "primary", name: "Create Account", fun: "submit" ,
            style: { marginTop: '20px' } , },
        ],
    
    }
}