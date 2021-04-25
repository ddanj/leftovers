var axios = require('axios');

// .env variables
import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from '@env';

async function getRecipesByQuery(query, numResults) {
  url = `https://api.edamam.com/search?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&q=${query}&from=0&to=${numResults}`;

  res = await axios.get(url);
  hits = res.data.hits;
  return hits;
}
