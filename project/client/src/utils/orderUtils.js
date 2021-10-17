import axios from 'axios';

export const getOrderDetails = async (_id) => {
    return axios.get(`http://localhost:5000/orders/getOrderDetails/${_id}`);
}