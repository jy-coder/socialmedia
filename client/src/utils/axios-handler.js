import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:1337/api'
    // baseURL: 'https://pern-shop-ecommerce.herokuapp.com/api'
})


export default instance