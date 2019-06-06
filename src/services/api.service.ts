import axios, { AxiosResponse } from 'axios';

import config from '../env';


interface IHttpOptions {
  useCache?: boolean;
  useBaseURL?: boolean;
}

export class ApiService {
  // private static serviceInstance = new ApiService();
  private headers = new Headers();
  private cacheMap = new Map();
  private baseURL = config.baseUrl;

  constructor() {
    this.headers.set('Content-Type', 'application/json');
  }

  // tslint:disable-next-line: max-line-length
  public async get<T>(path: string, options: IHttpOptions = { useCache: true, useBaseURL: true }): Promise<AxiosResponse<T>> {
    const url = options.useBaseURL === undefined || options.useBaseURL ? this.baseURL + path : path;

    if (options.useCache === undefined || options.useCache) {
      if (this.cacheMap.has(url)) {
        return this.cacheMap.get(url);
      } else {
        const res = axios.get<T>(`${url}`);
        this.cacheMap.set(url, res);
        return res;
      }
    }

    return axios.get<T>(`${url}`, { headers: this.headers });
  }

}

export const apiService = new ApiService();
