import axios from 'axios';

const baseUrl = "http://localhost:3001/Persons";

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data);    
}

const add = (entry) => {
    return axios.post(baseUrl, entry).then(res => res.data);
}

export default {getAll, add};