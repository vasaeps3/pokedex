import axios from 'axios';

const baseURL = 'https://pokeapi.co/api/v2';

const get = async <T>(url: string) => {
  return await axios.get<T>(`${baseURL}${url}`);
}

const httpService = {
  get,
}

export default httpService;