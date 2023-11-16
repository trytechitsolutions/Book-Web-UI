import { validatePhoneNumber } from "../ReusableComponents/CommonFunctions";
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hours = [
    '12 AM',
    '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
    '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
];
const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' , 'Sunday'];


export const storeForm = {
    formlayout: "vertical",
    fieldsArray: [
          
        {   inputType:"textarea" ,
            type: "text",
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
            {   
                type: "text",
                label: "Pincode",
                name: "pincode",
                rules: [
                    { required: true, message: 'Please enter Pincode' },
                    { min: 6, message: 'address must be at least 6 characters long' }
                ],
                placeholder: "Pincode",
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
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
                    xs: 12,
                   sm: 6,
                    md: 4,
                    lg: 3,
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
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                    labelCol: "",
                    wrapperCol: "",
                    value: "",
                   },
                   {
                    type: "phonenumber",
                    label: "WhatsApp Number*",
                    name: "whatsappNumber",
                    rules: [
                        { required: true, message: 'Please enter WhatsApp number' },
                        { validator: validatePhoneNumber }
                    ],
                    placeholder: "WhatsApp Number",
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                        labelCol: "",
                    wrapperCol: "",
                    value: "",
                },
                {
                    type: "text",
                    label: "Warehouse Name",
                    name: "warehouseName",
                    rules: [{ required: true, message: 'Please enter Warehouse name' }],
                    placeholder: "Warehouse Name",
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
                    label: "Warehouse Pincode",
                    name: "warehousepincode",
                    rules: [
                        { required: true, message: 'Please enter Warehouse Pincode' },
                        { min: 6, message: 'address must be at least 6 characters long' }
                    ],
                    placeholder: "Warehouse Pincode",
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                    labelCol: "",
                    wrapperCol: "",
                    value: "",
                    },
                    // {
                    //     type: "select",
                    //     label: "Day",
                    //     name: "selectedDay",
                    //     rules: [{ required: true, message: 'Please select a day' }],
                    //     placeholder: "Select a day",
                    //     xs: 4,
                    //     sm: 4,
                    //     md: 4,
                    //     lg: 4,
                    //     labelCol: "",
                    //     wrapperCol: "",
                    //     value:"", // Replace with your state value
                    // },
                    {
                        type: "text",
                        label: "Social Profiles",
                        name: "socialProfiles",
                        rules: [{ required: true, message: 'Please enter Social Profiles name' }],
                        placeholder: "Social Profiles",
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        labelCol: "",
                        wrapperCol: "",
                        value: "",
                    },
                    //                      {
                    //     type: "checkbox",
                    //     label: "Guest Check-Out",
                    //     name: "guestCheckOut",
                    //     rules: [{ required: true, message: 'Please choose Guest Check-Out!' }],
                    //     xs: 12, // Adjust the xs, sm, md, lg values as needed
                    //     sm: 12,
                    //     md: 12,
                    //     lg: 12,
                    //     labelCol: "",
                    //     wrapperCol: "",
                    //     value: "off", // Update with the selected value ("on" or "off")
                    //     options: [
                    //         { value: "on", label: "On" },
                    //         { value: "off", label: "Off" },
                    //     ],
                    //  },
                    {
                        type: "text",
                        label: "Policies",
                        name: "policies",
                        rules: [{ required: true, message: 'Please enter Policies' }],
                        placeholder: "Policies",
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        labelCol: "",
                        wrapperCol: "",
                        value: "",
                    },
                    //  {
                    //     type: "radio",
                    //     label: "Guest Check-Out",
                    //     name: "guestCheckOut",
                    //     rules: [{ required: true, message: 'Please choose Guest Check-Out!' }],
                    //     xs: 12, // Adjust the xs, sm, md, lg values as needed
                    //     sm: 12,
                    //     md: 12,
                    //     lg: 12,
                    //     labelCol: "",
                    //     wrapperCol: "",
                    //     value: "off", // Update with the selected value ("on" or "off")
                    //     options: [
                    //         { value: "on", label: "On" },
                    //         { value: "off", label: "Off" },
                    //     ],
                    //  },
                    //  {
                    //     type : "file",
                    //     label: "Store LOGO",
                    //     name: "storeLogo",
                    //     rules: [{ required: true, message: 'Please upload store Logo' }],
                    //     placeholder: "Store LOGO",
                    //     xs: 24,
                    //     sm: 16,
                    //     md: 12,
                    //     lg: 12,
                    //     labelCol: "",
                    //     wrapperCol: "",
                    //     value: "",
                    // },
                  
                    // {
                    //     type : "file",
                    //     label: "Store Fevicon",
                    //     name: "storeFevicon",
                    //     rules: [{ required: true, message: 'Please upload store Fevicon' }],
                    //     placeholder: "Store Fevicon",
                    //     xs: 24,
                    //     sm: 16,
                    //     md: 12,
                    //     lg: 12,
                    //     labelCol: "",
                    //     wrapperCol: "",
                    //     value: "",
                    // },
                   ],       
              }
                   export const part2 = {
                        formlayout: "vertical",
                        fieldsArray: [
                     {
                         type: "day",
                         label: "Select Day",
                         name: "day",
                         rules: [
                          { required: true, message: 'Please choose a day!' },
                           ],
                           xs: 12,
                           sm: 6,
                           md: 4,
                           lg: 3,
                           labelCol: "", // You can set these to appropriate values if needed
                         wrapperCol: "", // You can set these to appropriate values if needed
                        value: "",
                          options: days.map(day => ({ label: day, value: day })),
           },        
           {
                type: "time",
                label: "Start-time",
                name: "startTime",
                rules: [
                  { required: true, message: 'Please choose time!' },
                 ],
                 xs: 12,
                 sm: 6,
                 md: 4,
                 lg: 3,
                 labelCol: "",
                 wrapperCol: "",
                 value: "",
                 options: hours.map(day => ({ label: day, value: day })),
                 }, 
                  {
                    type: "time",
                    label: "End-time",
                    name: "endTime",
                    rules: [
                    { required: true, message: 'Please choose time!' },
                     ],
                      xs: 12,
                      sm: 6,
                       md: 4,
                       lg: 3,
                       labelCol: "",
                        wrapperCol: "",
                        value: "",
                        options: hours.map(day => ({ label: day, value: day })),
                    },  
                    <p>hello</p>,
                    {
                        type: "checkbox",
                        name: "dayBox",
                        rules: [{ required: true, message: 'Please choose !' }],
                        xs: 12, // Adjust the xs, sm, md, lg values as needed
                        sm: 12,
                        md: 12,
                        lg: 12,
                        labelCol: "",
                        wrapperCol: "",
                        value: "", 
                        options: Days.map(day => ({ label: day, value: day })),

                    },

    ]
}