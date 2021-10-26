import axios from 'axios';


export const signIn = (password, email) => {
    return axios.get(`http://localhost:5000/users/signIn/${password}&${email}`);
}

export const loginGoogle=(name,email)=>{
    return axios.get(`http://localhost:5000/users/loginGoogle/${name}&${email}`);
}