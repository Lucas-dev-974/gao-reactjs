import axios from "axios";

let token = window.localStorage.getItem('AccessToken') ?? ''

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Authorization': 'Bearer ' + token
    }
})