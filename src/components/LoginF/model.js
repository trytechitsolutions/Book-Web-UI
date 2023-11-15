


export const loginForm = {
    formlayout: "vertical",
    fieldsArray: [
        // {
        //     type: "email",
        //     label: "Email",
        //     name: "email",
        //     rules: [
        //         { required: true, message: 'Please enter email' },
        //         { type: 'email', message: 'Please enter a valid email' },
        //     ],
        //     placeholder: "Email",
        //     xs: 12,
        //     sm: 6,
        //     md: 4,
        //     lg: 4,
        //     labelCol: "",
        //     wrapperCol: "",
        //     value: "",
        //    },
        //    {
        //     type: "password",
        //     label: "Password",
        //     name: "password",
        //     rules: [
        //         { required: true, message: 'Please enter password' },
        //         { min: 8, message: 'Password must be at least 8 characters long' }
        //     ],
        //     placeholder: "Password",
        //     xs: 12,
        //     sm: 6,
        //     md: 4,
        //     lg: 4,
        //     labelCol: "",
        //     wrapperCol: "",
        //     value: "",
        // },
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
        buttons: [
            { type: "primary",colour: "primary", name: "LOGIN", fun: "submit" , },
        ],
    
    }
}



// type="submit"
// variant="contained"
// color="primary"
// fullWidth