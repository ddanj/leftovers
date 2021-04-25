var axios = require('axios');

// .env variables
import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from '@env';

export default async function getRecipesByQuery(query, numResults = 5) {
  const url = `https://api.edamam.com/search?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&q=${query}&from=0&to=${numResults}`;

  const res = await axios.get(url);
  const hits = res.data.hits;
  return hits;
}
