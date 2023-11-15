export const kycform = {

    formlayout: "vertical",
    fieldsArray: [
    {
        type : "file",
        label: "Aadhar Card",
        name: "aadharCard",
        rules: [{ required: true, message: 'Please upload Aadhar Card' }],
        placeholder: "Aadhar Card",
        xs: 24,
        sm: 16,
        md: 12,
        lg: 12,
        labelCol: "",
        wrapperCol: "",
        value: "",
    },
    {
        type : "file",
        label: "Pan Card",
        name: "panCard",
        rules: [{ required: true, message: 'Please upload Pan Card' }],
        placeholder: "Pan Card",
        xs: 24,
        sm: 16,
        md: 12,
        lg: 12,
        labelCol: "",
        wrapperCol: "",
        value: "",
     },
     {
        type : "file",
        label: "Company CIN",
        name: "companyCIN",
        rules: [{ required: true, message: 'Please upload Company CIN' }],
        placeholder: "Company CIN",
        xs: 24,
        sm: 16,
        md: 12,
        lg: 12,
        labelCol: "",
        wrapperCol: "",
        value: "",
    },
     {
        type : "file",
        label: "Company PAN",
        name: "companyPAN",
        rules: [{ required: true, message: 'Please upload Company PAN' }],
        placeholder: "Company PAN",
        xs: 24,
        sm: 16,
        md: 12,
        lg: 12,
        labelCol: "",
        wrapperCol: "",
        value: "",
    },
    {
        type : "file",
        label: "GST",
        name: "gst",
        rules: [{ required: true, message: 'Please upload GST' }],
        placeholder: "GST",
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
        { colour: "primary", name: "Add", fun: "submit" },
        { colour: "default", name: "Reset", fun: "reset" },
        { colour: "primary", name: "Cancel", fun: "cancel" },
    ]
}
}
// type="file"
// accept=".jpg, .jpeg, .png, .pdf"
// name="gst"