import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  List,
  ListItem,
  Text,
  Title,
} from "native-base";
import * as Clarifai from "clarifai";

import { ButtonHeader, IngredientsListItem } from "../components/Components";

function IngredientList(props) {
  const { history } = props;

  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [enteredIngredients, setEnteredIngredients] = useState([]);

  useEffect(() => {
    (async () => {
      setDetectedIngredients([
        "Ingredient #1",
        "Ingredient #2",
        "Ingredient #3",
      ]);
      setEnteredIngredients([
        "EIngredient #1",
        "EIngredient #2",
        "EIngredient #3",
      ]);
    })();
  }, []);

  return (
    <Container>
      <ButtonHeader title="Ingredients" history={history}></ButtonHeader>
      <Content>
        <List>
          {/* Render detected ingredients */}
          <ListItem itemHeader first>
            <Text>Ingredients Detected</Text>
          </ListItem>
          <IngredientsListItem
            history={history}
            ingredientsArray={detectedIngredients}
            setter={setDetectedIngredients}
          />

          {/* Render user entered ingredients */}
          <ListItem itemHeader first>
            <Text>Ingredients Added</Text>
          </ListItem>
          <IngredientsListItem
            history={history}
            ingredientsArray={enteredIngredients}
            setter={setEnteredIngredients}
          />
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});

export default IngredientList;
