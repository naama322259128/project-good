import axios from 'axios';

export const addUser = (user) => {
    console.log("user")
    console.log(user)
    return axios.post("http://localhost:5000/users", user)
}




export const sendContact = async (details) => {
    console.log(details);
    return axios.post(`http://localhost:5000/users/sendContactToSiteManager`, details).then(succ => {
        console.log(succ.data)
    })
    //TODO: dispatch ???
}