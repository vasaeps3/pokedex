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

// type ApiFunction = <T>(...args: any[]) => Promise<T>;

// const memo = <V extends Function>(f: V) => {
//   const cache: { [key: string]: any } = {};

//   const newFunction = (...args: any[]): V => {
//     const token = JSON.stringify(args);

//     if (!cache[token]) {
//       cache[token] = f(...args);
//     }

//     return cache[token];
//   };

//   return newFunction;
// }

// const getWithCache = memo(getByFullUrl);


const httpService = {
  get,
}

export default httpService;