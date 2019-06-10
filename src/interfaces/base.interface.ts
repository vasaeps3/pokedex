export interface INamedAPIResourceList<T> {
  count: number;
  results: T[];
}

export interface INamedLangAPIResource {
  name: string;
  names: IName[];
}


export interface IName {
  name: string;
  language: INamedAPIResource;
}


export interface INamedAPIResource {
  name: string;
  title: string;
  url: string;
}
