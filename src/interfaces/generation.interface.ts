import { INamedAPIResource, INamedLangAPIResource } from './base.interface';


export interface IGeneration extends INamedLangAPIResource {
  version_groups: INamedAPIResource[];
}

export interface IVersionGroup {
  versions: INamedAPIResource[];
}
