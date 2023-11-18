import { jwtDecode } from "jwt-decode";
import { getToken } from "../../SecureStorage";


export const validatePhoneNumber = (_, value) => {
    if (value && !/^\d{10}$/.test(value)) {
        return Promise.reject(new Error('Please enter a valid 10-digit phone number'));
    }
    return Promise.resolve();
};


//account
export const validateAccountNumber = (_, value) => {
    // Define the regular expression or rules for valid account numbers
    // Replace the regular expression or rules with the specific format and rules for your account numbers.
    const accountNumberPattern = /^\d{14}$/; // Example: Assumes an 8-digit account number

    if (value && !accountNumberPattern.test(value)) {
        return Promise.reject(new Error('Please enter a valid 14 digits account number'));
    }

    return Promise.resolve();
};


export const validateConfirmPassword = (_, value, arr) => {
    let pwd = '';
    const pwdObj = arr.find(ele => ele.name === "password");
    if (pwdObj) {
        pwd = pwdObj.value;
    }
    if (value && pwd && value !== pwd) {
        return Promise.reject(new Error('Passwords do not match'));
    }
    return Promise.resolve();
};

export const dateFormat = (val) => {
    const date = new Date(val);
    return date.toLocaleDateString();
}

export const onChangeValueBind = (formdata, data) => {
    const matchingElement = formdata.fieldsArray.find(ele => ele.name === data.name);
    if (matchingElement) {
        matchingElement.value = data.value;
    }
    if (matchingElement.type === "date") {
        matchingElement.value = dateFormat(data.value);
    }
}


export const preparePayLoad = (arr) => {
    let obj = {};
    // let formData = new FormData();
  
    arr.forEach((ele) => {
      if (ele.type !== "file") {
    //     if (ele.value && ele.value.length > 0) {
    //       ele.value.forEach((file) => {
    //         formData.append(ele.name, file.originFileObj);
    //       });
    //     }
    //   } else {
        obj[ele.name] = ele.value;
        if (ele.type === "phonenumber") {
          obj[ele.name] = ele.value?.toString();
        // }
        // formData.append(ele.name, ele.value);
      }
    }
    });
    // formData.append('payload', JSON.stringify(obj));
    // return {obj: obj, formData: formData};
    return obj;
  };
  
export const getErrorMsg = (res) => {
    if (typeof res.response.data.error == "string") {
        return res.response.data.error;
    } else {
        const msg = res?.response?.data?.err?.errors[0]?.message;
        return msg || "Server Error";
    }

}

export const getLoginData = () => {
    const token = getToken("token");
    if (token) {
        return jwtDecode(token);
    }
    return null;
}

export const isLogedIn = () => {
    const loginData = getLoginData();
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return loginData && (loginData.exp > currentTimestamp);
}

export const upDateForm = (reset, formdata, obj) => {
    formdata.fieldsArray.forEach(ele => {
        ele.value = reset === true ? "" : obj[ele.name];
    });
}

export const validateField = (value, rules) => {
    for (const rule of rules) {
      if (rule.required && !value) {
        return { isValid: false, message: rule.message || 'This field is required.' };
      }
  
      // Add more validation rules as needed
      // Example: if (rule.min && value.length < rule.min) { /* return error message */ }
      // Example: if (rule.type === 'email' && !isValidEmail(value)) { /* return error message */ }
    }
  
    return { isValid: true, message: '' }; // No validation errors
  };