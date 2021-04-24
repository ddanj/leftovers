import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  List,
  ListItem,
  Text,
} from 'native-base';

import { ButtonHeader, IngredientListItem } from '../components/Components';

function IngredientList(props) {
  const { history } = props;

  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [enteredIngredients, setEnteredIngredients] = useState([]);

  useEffect(() => {
    (async () => {
      setDetectedIngredients(['apple', 'pear', 'melon']);
      setEnteredIngredients(['olive']);
    })();
  }, []);

  let ingredientInput;

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

  return (
    <Container>
      <ButtonHeader title="Ingredients" history={history}></ButtonHeader>
      <Content>
        <List>
          {/* Render detected ingredients */}
          <ListItem itemHeader first style={styles.itemHeader}>
            <Text>Ingredients Detected</Text>
          </ListItem>
          <IngredientListItem
            history={history}
            ingredientsArray={detectedIngredients}
            setter={setDetectedIngredients}
          />
          {/* Render user entered ingredients */}
          <ListItem itemHeader first style={styles.itemHeader}>
            <Text>Ingredients Added</Text>
          </ListItem>
          <IngredientListItem
            history={history}
            ingredientsArray={enteredIngredients}
            setter={setEnteredIngredients}
          />
          <Form>
            <Item>
              <Input
                placeholder="Ingredient to add..."
                onChangeText={(val) => handleIngredientInput(val)}
              />
              <Icon
                type="Entypo"
                name="circle-with-plus"
                style={styles.addIcon}
                onPress={() => {
                  addIngredient();
                }}
              />
            </Item>
          </Form>
        </List>

        <View style={styles.contentView}>
          <Button>
            <Text>Submit</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  addIcon: {
    color: 'green',
  },
  contentView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIngredientIcon: {
    marginRight: 10,
    fontSize: 20,
    lineHeight: 20,
    color: 'green',
  },
  itemHeader: {
    marginTop: 10,
    paddingBottom: 0,
  },
});

export default IngredientList;
