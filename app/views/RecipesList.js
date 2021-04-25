import React from "react";
import { Container, Content } from "native-base";

import { ButtonHeader } from "../components/Components";
import getRecipesByQuery from "../api/edamam";

function RecipesList(props) {
  const { history } = props;
  const ingredients = props.location.state.ingredients;

  console.log(ingredients);
  const query = ingredients.join(",");
  console.log(query);
  let result = getRecipesByQuery(ingredients.join(", "));
  console.log(result);

  return (
    <Container>
      <ButtonHeader title="Recipes" history={history}></ButtonHeader>
      <Content></Content>
    </Container>
  );
}

export default RecipesList;
