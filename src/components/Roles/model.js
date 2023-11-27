
export const rolesForm = {
    formlayout: "vertical",
    fieldsArray: [ 
        {
            type: "text",
            label: "name",
            name: "name",
            rules: [{ required: true, message: 'Please enter Role' }],
            placeholder: "Role",
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
            name: "is_active",
            label:'Active',
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
        justify: "end",
   
        buttons: [
            {type: "contained", colour: "primary", name: "Add", fun: "submit" ,
            style: { marginTop: '20px' } }
           
        ]
    }
}



// async function fetchData() {
//     const resp = await apiRequest(null, serverUrl + "/preference/brand/:id ", 'put');
//     setShowLoader(false);
//     if (resp?.data?.data) {
//       setData(resp.data.data);

//     }
//   }
//   fetchData()