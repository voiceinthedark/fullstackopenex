import axios from 'axios';

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data);    
}

const add = (entry) => {
    return axios.post(baseUrl, entry).then(res => res.data);
}

const del = (entry) => {
    console.log(entry);
    return axios.delete(`${baseUrl}/${entry}`).then(res => res);
}

const update = (entry) => {
    return axios.put(`${baseUrl}/${entry.id}`, entry).then(res => res.data);
}

export default {getAll, add, del, update};