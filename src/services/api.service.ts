import axios, { AxiosResponse } from 'axios';


interface IHttpOptions {
  useCache?: boolean;
  useBaseURL?: boolean;
}
const baseURL = 'https://pokeapi.co/api/v2';

const cacheMap = new Map();

const get = async<T>(path: string, options: IHttpOptions = { useCache: true, useBaseURL: true }): Promise<AxiosResponse<T>> => {
  const url = options.useBaseURL === undefined || options.useBaseURL ? baseURL + path : path;

  if (options.useCache === undefined || options.useCache) {
    if (cacheMap.has(url)) {
      return cacheMap.get(url);
    } else {
      const res = axios.get<T>(`${url}`);
      cacheMap.set(url, res);
      return res;
    }
  }

  return axios.get<T>(`${url}`);
}

const apiService = {
  get,
}

export default apiService;