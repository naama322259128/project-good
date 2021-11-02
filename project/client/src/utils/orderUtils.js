import axios from 'axios';

export const getOrderDetailsFromDB = async (_id) => {
    return axios.get(`http://localhost:5000/orders/getOrderDetails/${_id}`);
}