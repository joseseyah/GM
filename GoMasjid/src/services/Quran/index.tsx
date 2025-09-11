import axios from 'axios';

const BASE_URL = 'https://api.quran.com/api/v4/';

export const getRandomAyah = () => {
  return axios.get('https://api.quran.com/api/v4/verses/random', {
    params: {
      language: 'en',
      fields:
        'verse_number,verse_key,verse_id,chapter_id,text_uthmani,text_indopak',
      translations:'20,95',
      translation_fields: 'resource_id,resource_name,language_name,id'
    },
  });
};
