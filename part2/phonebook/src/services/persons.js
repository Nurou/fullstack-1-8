import axios from 'axios';

const baseUrl = '/api/persons';

// get: get
const getAll = () => {
  const request = axios.get(baseUrl); // returns promise
  return request.then(response => response.data);
};
// create: post
const create = newObject => {
  const request = axios.post(baseUrl, newObject); // returns promise
  return request.then(response => response.data);
};

// update: put
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject); // returns promise
  return request.then(response => response.data);
};

// remove: delete
const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`); // returns promise
  return request.then(response => response.data);
};

export default { getAll, create, update, remove };
