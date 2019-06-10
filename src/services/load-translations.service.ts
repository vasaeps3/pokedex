import config from '../env';
import { INamedAPIResource, INamedLangAPIResource } from '../interfaces/base.interface';
import { ApiService, apiService as apiServiceInstance } from './api.service';


export class LoadTranslationsService {
  private language = config.language;

  constructor(
    private apiService: ApiService,
  ) { }

  public loadTranslateData = async <T extends INamedLangAPIResource>(item: INamedAPIResource) => {
    if (!item) {
      return;
    }

    const { data } = await this.apiService.get<T>(item.url, { useBaseURL: false });
    const findTitle = data.names.find((g) => g.language.name === this.language);
    item.title = findTitle ? findTitle.name : '';
  }

}

export const loadTranslationsService = new LoadTranslationsService(apiServiceInstance);
