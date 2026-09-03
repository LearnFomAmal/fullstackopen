import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getPersons = async () => {
  const response =await axios.get(baseUrl);
   return response.data;
};

export const addPerson = async (newObj) => {
  const response = await axios.post(baseUrl, newObj);
    return response.data;
};

export const deletePerson = async (id) => {
    const response=await axios.delete(`${baseUrl}/${id}`);
    return response.data;
}