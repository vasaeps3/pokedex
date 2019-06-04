import apiService from "./api.service";
import { INamedAPIResource, INamedLangAPIResource } from "../interfaces/pokemon.interface";


const language = 'en';

export const loadTranslateData = async <T extends INamedLangAPIResource>(item: INamedAPIResource) => {
  if (!item) {
    return;
  }

  const { data } = await apiService.get<T>(item.url, { useBaseURL: false });
  const findTitle = data.names.find(g => g.language.name === language);
  item.title = findTitle ? findTitle.name : '';
}