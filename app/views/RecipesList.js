import React from 'react';
import { Container, Content } from 'native-base';

import { ButtonHeader } from '../components/Components';
// import getRecipesByQuery from '../api/edamam';

function RecipesList(props) {
  const { history } = props;
  // const ingredients = history.location.state.ingredients;

  // let result = getRecipesByQuery(ingredients.join(", "));
  // console.log(result);
  console.log(history);

  return (
    <Container>
      <ButtonHeader title="Ingredients" history={history}></ButtonHeader>
      <Content></Content>
    </Container>
  );
}

export default RecipesList;
