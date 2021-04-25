import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Left,
  List,
  ListItem,
  Right,
  Text,
  View,
} from 'native-base';
import * as Clarifai from 'clarifai';

// My imports
import { CLARIFAI_API_KEY } from '@env';
import { ButtonHeader, IngredientListItem } from '../components/Components';

function IngredientList(props) {
  const { history } = props;
  const imageUri = props.location.state.image.uri;
  const imageBase64 = props.location.state.image.base64;

  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [enteredIngredients, setEnteredIngredients] = useState([]);

  process.nextTick = setImmediate; // You'll most likely encounter the error process.nextTick is not a function while using this library with React Native. To solve this, add process.nextTick = setImmediate; as close to the top of your entrypoint as you can. See #20 for more info.

  useEffect(() => {
    (async () => {
      try {
        const clarifaiApp = new Clarifai.App({
          apiKey: CLARIFAI_API_KEY,
        });

        const newPredictions = await clarifaiApp.models.predict(
          { id: Clarifai.FOOD_MODEL },
          { base64: imageBase64 },
          { maxConcepts: 10, minValue: 0.4 } // maximum matches with over minimum theshold value
        );

        setDetectedIngredients(
          newPredictions.outputs[0].data.concepts.map((a) => a.name)
        );
      } catch (error) {
        console.log('Exception Error: ', error);
      }
    })();
  }, []);

  let ingredientInput;

  function setIngredientInput(value) {
    ingredientInput = value ? value : ingredientInput;
  }

  function addIngredient() {
    if (
      !enteredIngredients.includes(ingredientInput) &&
      !detectedIngredients.includes(ingredientInput)
    ) {
      setEnteredIngredients(enteredIngredients.concat(ingredientInput));
    }
  }

  return (
    <Container>
      <ButtonHeader title="Ingredients" history={history}></ButtonHeader>
      <Content contentContainerStyle={styles.content}>
        <List>
          {/* Render detected ingredients */}
          <ListItem itemDivider first style={styles.itemDivider}>
            <Text>Ingredients Detected</Text>
          </ListItem>
          {detectedIngredients.length > 0 ? (
            <IngredientListItem
              ingredientsArray={detectedIngredients}
              setter={setDetectedIngredients}
            />
          ) : (
            <ListItem>
              <Text>Loading...</Text>
            </ListItem>
          )}

          {/* Render user entered ingredients */}
          <ListItem itemDivider first style={styles.itemDivider}>
            <Text>Ingredients Added</Text>
          </ListItem>
          <IngredientListItem
            ingredientsArray={enteredIngredients}
            setter={setEnteredIngredients}
          />
          <Form>
            <Item>
              <Left>
                <Input
                  placeholder="Add additional ingredient..."
                  onChangeText={(val) => setIngredientInput(val)}
                />
              </Left>
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

        <View style={styles.buttonContainer}>
          <Right>
            <Button
              bordered
              onPress={() => {
                history.push('/recipes-list', {
                  ingredients: enteredIngredients.concat(detectedIngredients),
                });
              }}
            >
              <Text>CONTINUE</Text>
            </Button>
          </Right>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 28,
    color: 'green',
    lineHeight: 28,
    marginRight: 8,
  },
  buttonContainer: {
    margin: 18,
  },
  itemDivider: {},
});

export default IngredientList;
