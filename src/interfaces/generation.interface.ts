import { INamedAPIResource, INamedLangAPIResource } from './pokemon.interface';


export interface IGeneration extends INamedLangAPIResource {
  version_groups: INamedAPIResource[];
}
