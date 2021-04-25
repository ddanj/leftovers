import React, { useState, useEffect } from 'react';
import { Container, Content, Text } from 'native-base';

import { ButtonHeader, RecipeCards } from '../components/Components';
import getRecipesByQuery from '../api/edamam';

function RecipesList(props) {
  const { history } = props;
  const [recipeHits, setRecipeHits] = useState(null);
  const ingredients = props.location.state.ingredients;

  useEffect(() => {
    (async () => {
      const query = ingredients.join(', ');
      setRecipeHits(await getRecipesByQuery(query));
    })();
  }, []);

  return (
    <Container>
      <ButtonHeader title="Recipes" history={history}></ButtonHeader>
      <Content>
        {recipeHits ? (
          <RecipeCards recipes={recipeHits} />
        ) : (
          <Text>Loading...</Text>
        )}
      </Content>
    </Container>
  );
}

export default RecipesList;
