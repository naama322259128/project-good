import axios from 'axios';

export const addUser = (user) => {
    return axios.post("http://localhost:5000/users", user)
}


export const getUserOrdersList = async (_id) => {
    return axios.get(`http://localhost:5000/orders/userOrdersList/${_id}`)
}
export const sendContact = async (details) => {
    console.log(details);
    return axios.post(`http://localhost:5000/users/sendContactToSiteManager`, details).then(succ => {
        console.log(succ.data)
    })

}