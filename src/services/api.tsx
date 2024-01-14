import axios from "../utils/axios-customize";


const loginUser = (username: string, password: string) => {
    return axios.post('auth/login', { username, password });
}

const register = (username: string, password: string, fullname: string, studentcode: number, address: string) => {
    return axios.post('auth/register', { username, password, fullname, studentcode, address })
}

const fetchAccount = () => {
    return axios.get('/auth/account');
}

const logout = () => {
    return axios.post('auth/logout');
}

const fetchListUser = (query: string) => {
    return axios.get(`/users?${query}`);
}

const getAUser = (_id: string) => {
    return axios.get(`/users/${_id}`);
}

const createANewUser = (username: string, password: string, fullname: string, studentcode: number, address: string) => {
    return axios.post('/users', { username, password, fullname, studentcode, address })
}

const createUser = (data: any) => {
    return axios.post('/users/bulk-create', data);
}

const updateAUser = (_id: string, fullname: string, studentcode: number, address: string) => {
    return axios.patch("/users", { _id, fullname, studentcode, address })
}

const deleteAUser = (_id: string) => {
    return axios.delete(`/users/${_id}`);
}

const changePassword = (currentpassword: string, newpassword: string) => {
    return axios.post(`/auth/change_password`, { currentpassword, newpassword });
}

const loginGoogle = (data: string) => {
    return axios.post(`/google`, data);
}

export {
    loginUser,
    register,
    fetchAccount,
    logout,
    fetchListUser,
    createANewUser,
    updateAUser,
    deleteAUser,
    getAUser,
    changePassword, loginGoogle, createUser
};
