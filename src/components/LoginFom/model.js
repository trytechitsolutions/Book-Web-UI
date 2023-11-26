


export const loginForm = {
    formlayout: "vertical",
    fieldsArray: [
        {
            type: "email",
            label: "Email *",
            name: "email",
            rules: [
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email', 
                regex: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
            ],
            placeholder: "Email",
            xs: 24,
            sm: 16,
            md: 24,
            lg: 24,
            labelCol: 4,
            wrapperCol: 16,
            value: "",
            // regex: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        },
        {
            type: "password",
            label: "Password *",
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
            sm: 16,
            md: 24,
            lg: 24,
            labelCol: 4,
            wrapperCol: 16,
            value: ""
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

