import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getPersons = () => {
  const response = axios.get(baseUrl);
  return response.then((res) => res.data);
};

export const addPerson = (newObj) => {
  const response = axios.post(baseUrl, newObj);
  return response.then((res) => res.data);
};
