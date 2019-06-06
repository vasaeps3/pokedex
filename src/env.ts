interface IConfig {
  language: string;
  baseUrl: string;
}

const config: IConfig = {
  language: 'en',
  baseUrl: 'https://pokeapi.co/api/v2',
};

if (process.env.NODE_ENV === 'production') {
  config.language = 'en';
}

export default config;
