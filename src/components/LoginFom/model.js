


export const loginForm = {
    formlayout: "vertical",
    fieldsArray: [
        {
            type: "email",
            label: "Email *",
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
            labelCol: 4,
            wrapperCol: 16,
            value: "",
        },
        {
            type: "password",
            label: "Password *",
            name: "password",
            rules: [
                { required: true, message: 'Please enter password' },
                { min: 8, message: 'Password must be at least 8 characters long' }
            ],
            placeholder: "Password",
            xs: 24,
            sm: 16,
            md: 24,
            lg: 24,
            labelCol: 4,
            wrapperCol: 16,
            value: "",
        },
    ],
    buttonSecction: { 
        justify: "end",      
        buttons: [
            { type: "contained",colour: "primary", name: "LOGIN", fun: "submit" ,
            style: { marginTop: '20px' } , },
        ],
    
    }
}

