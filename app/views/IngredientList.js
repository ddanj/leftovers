import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Body,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  List,
  ListItem,
  Text,
  Title,
} from 'native-base';

function IngredientList(props) {
  const { history } = props;
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [enteredIngredients, setEnteredIngredients] = useState([]);

  useEffect(() => {
    (async () => {
      setDetectedIngredients([
        'Ingredient #1',
        'Ingredient #2',
        'Ingredient #3',
      ]);
      setEnteredIngredients([
        'EIngredient #1',
        'EIngredient #2',
        'EIngredient #3',
      ]);
    })();
  }, []);

  function ingredientsUI(arr, setFunction) {
    return arr.map((ingredient, i) => {
      return (
        <ListItem key={i}>
          <Icon
            type="Entypo"
            name="circle-with-minus"
            style={[styles.editIngredientIcon, styles.removeIcon]}
            onPress={() => {
              setFunction(
                arr.filter((value, j) => {
                  return j != i;
                })
              );
            }}
          />
          <Text>{ingredient}</Text>
        </ListItem>
      );
    });
  }

  var ingredientInput;
  function handleIngredientInput(value) {
    ingredientInput = value === '' ? ingredientInput : value;
  }
  function addIngredient() {
    if (
      enteredIngredients.indexOf(ingredientInput) === -1 &&
      detectedIngredients.indexOf(ingredientInput) === -1
    ) {
      setEnteredIngredients(enteredIngredients.concat(ingredientInput));
    }
  }

  const detected = ingredientsUI(detectedIngredients, setDetectedIngredients);
  const entered = ingredientsUI(enteredIngredients, setEnteredIngredients);

  return (
    <Container>
      <Header noLeft>
        <Body>
          <Title>Leftovers - My Ingredients</Title>
        </Body>
      </Header>
      <Content>
        <List>
          {/* Render detected ingredients */}
          <ListItem itemHeader first style={styles.itemHeader}>
            <Text>Detected Ingredients</Text>
          </ListItem>
          {detected}

          {/* Render user entered ingredients */}
          <ListItem itemHeader first style={styles.itemHeader}>
            <Text>User Entered Ingredients</Text>
          </ListItem>
          {entered}
          <Form>
            <Item>
              <Input
                placeholder="Add Ingredient"
                onChangeText={(val) => handleIngredientInput(val)}
              />
              <Icon
                type="Entypo"
                name="circle-with-plus"
                style={[styles.editIngredientIcon, styles.addIcon]}
                onPress={() => {
                  addIngredient();
                }}
              />
            </Item>
          </Form>
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  addIcon: {
    color: 'green',
  },
  editIngredientIcon: {
    marginRight: 10,
    fontSize: 20,
    lineHeight: 20,
  },
  itemHeader: {
    marginTop: 10,
    paddingBottom: 0,
  },
  removeIcon: {
    color: 'red',
  },
});

export default IngredientList;
