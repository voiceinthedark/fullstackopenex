import axios from "axios";

const baseUrl = "/api/persons";

const getAll = async () => {
  return await axios.get(baseUrl).then((res) => res.data);
};

const add = async (entry) => {
  return await axios.post(baseUrl, entry).then((res) => res.data);
};

const del = async (entry) => {
  console.log(entry);
  return await axios.delete(`${baseUrl}/${entry}`).then((res) => res);
};

const update = async (entry) => {
  return await axios.put(`${baseUrl}/${entry.id}`, entry).then((res) => res.data);
};

export default { getAll, add, del, update };
