import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: 'aes' });

export const setToken = (key, value) => {
    ls.set(key, value);
}

export const getToken = (key) => {
    return ls.get(key);
}

export const removeToken = (key) => {
    ls.remove(key)
}